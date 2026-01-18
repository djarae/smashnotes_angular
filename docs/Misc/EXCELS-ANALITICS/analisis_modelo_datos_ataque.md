# Auditoría del Modelo de Datos: Tabla `Ataque`

## Observación
Se analiza la estructura actual de la tabla `ataque`, la cual contiene los siguientes campos clave para relacionar el registro con una acción específica (movimiento o combo):

*   `tipo_ataque`: Discriminador (1 = Movimiento, 2 = Combo).
*   `id_movimiento`: Clave foránea hacia la tabla `movimiento`.
*   `id_combo`: Clave foránea hacia la tabla `combo`.

Se plantea la duda sobre si esta estructura es redundante y si debería simplificarse en un único campo (ej. `id_origen` o `id_referencia`), dado que `tipo_ataque` ya nos indica de qué se trata.

## Análisis de la Estrategia Actual (Claves Foráneas Separadas)

La estrategia implementada (tener columnas separadas anulables `id_movimiento` e `id_combo`) es un patrón común conocido como **"Exclusive Arcs"** o claves foráneas exclusivas.

### Ventajas
1.  **Integridad Referencial Estricta (SQL Nativo):** Es la mayor ventaja. La base de datos puede garantizar físicamente que si colocas un valor en `id_movimiento`, ese valor **realmente existe** en la tabla `movimiento`. Lo mismo para `id_combo`.
2.  **Tipado Fuerte:** Si los IDs fueran de tipos diferentes (ej. uno numérico y otro UUID), columnas separadas lo soportan sin problemas.

### Desventajas
1.  **Esparcimiento (Sparsity):** Por cada registro, siempre habrá columnas con valor `NULL`.
2.  **Complejidad en Validaciones:** Se requiere lógica adicional (Check Constraints o Triggers) para asegurar que **solo uno** de los dos campos esté lleno y que coincida con el `tipo_ataque` indicado. Sin esto, es técnicamente posible tener un registro con ambos campos llenos (inconsistencia).

## Alternativa Propuesta: Columna Única (Asociación Polimórfica)

La alternativa sugerida es tener:
*   `tipo_ataque`: (1 o 2)
*   `id_referencia`: (El ID del movimiento o del combo)

### Opinión Técnica
Aunque parece más "limpio" visualmente tener una sola columna, esta aproximación tiene un inconveniente técnico grave en bases de datos relacionales tradicionales:

*   **Pérdida de Integridad Referencial Estricta:** No se puede definir una restricción `FOREIGN KEY` estándar que diga: *"Si tipo=1 apunta a tabla A, pero si tipo=2 apunta a tabla B"*.
*   La base de datos no podrá evitar que insertes un `id_referencia` que no existe en la tabla destino. La integridad pasa a depender "del código" (aplicación) y no "del dato" (base de datos).

## Conclusión y Recomendación

1.  **Mantener la estructura actual** es lo más robusto si valoras que la base de datos te proteja de IDs inválidos (integridad referencial). Aunque parezca redundante tener dos columnas, es el "precio" por usar SQL estándar para validar relaciones contra tablas distintas.
2.  **Si se desea unificar:** La forma "correcta" en diseño de base de datos sería crear una tabla padre (ej. `Accion` o `EntidadCombate`) de la cual hereden tanto `Movimiento` como `Combo`. La tabla `Ataque` apuntaría simplemente a `id_accion`. Sin embargo, esto requiere una reestructuración mayor de las tablas existentes.

**Veredicto:** La "redundancia" visual de las dos columnas está justificada por la seguridad que aportan las claves foráneas (Foreign Keys).

---

## Análisis de Impacto de Refactorización (Hipotético)

Si decidieras unificar los campos `id_movimiento` e `id_combo` en un único campo `id_referencia` (o similar), tendrías que modificar las siguientes áreas:

### 1. Base de Datos
*   **Ataque Table:**
    *   Eliminar `id_movimiento` y `id_combo`.
    *   Agregar `id_referencia`.
    *   **IMPORTANTE:** Deberías eliminar las Foreign Keys existentes, perdiendo la validación automática.

### 2. Backend (API/Server)
*   **Entidades (Modelos):**
    *   Clase `Ataque`: Cambiar las propiedades `IdMovimiento` e `IdCombo` por una sola `IdReferencia`.
    *   Ajustar las relaciones (Navigation Properties). Entity Framework (o el ORM que uses) ya no podrá hacer `Include(a => a.Movimiento)` directamente de forma sencilla sin configuración adicional compleja.
*   **DTOs (Data Transfer Objects):**
    *   `AtaqueDTO` o `RegistroDTO`: Unificar los campos.
*   **Lógica de Negocio / Repositorios:**
    *   Al insertar: Ya no asignarías a una columna u otra según el tipo, sino siempre a `id_referencia`.
    *   Al leer (`listar`): Si el query hacía `JOIN` con Movimiento y Combo, tendría que cambiar a hacer ambos JOINS condicionalmente o dos queries separados basándose en `tipo_ataque`. Esto puede complicar las consultas SQL/LINQ.

### 3. Frontend (Angular)
Tendrías que renombrar y ajustar la lógica en casi todos los componentes que manejan registros:

*   **Interfaces (`models/*.ts`)**: Ajustar la interfaz de `Ataque` para tener la nueva propiedad.
*   **Listado (`tbl-registros.component.ts/html`)**:
    *   Actualmente parece que recibes el objeto populado (`item.idMovimiento` / `item.idCombo`).
    *   Tendrías que cambiar la interpolación: `{{ item.tipo == 1 ? item.referencia.nombre : item.referencia.nombre }}` (asumiendo que el backend logre popular algo genérico).
    *   Modificar inputs: `[inputIdMovimiento]` desaparecería.
*   **Edición (`editar-registro.component.ts`)**:
    *   Líneas afectadas (Refactorización): `this.selectedMovimiento = this.inputIdMovimiento;` cambiaría a lógica condicional leyendo `idReferencia` si el tipo es movimiento.
*   **Creación (`agr-registro.component.ts`)**:
    *   La búsqueda que arreglamos (`this.lstAtaques.find(...)`) cambiaría de:
        `a.idMovimiento.id == ...`
        a:
        `a.tipo == 1 && a.idReferencia == ...`

### Resumen del Esfuerzo
El cambio parece pequeño en base de datos, pero **rompe la integridad referencial** y obliga a **reescribir la lógica de JOINs y mapeo** en el backend, además de renombrar propiedades en todo el frontend.

**Nivel de Riesgo:** Alto (por pérdida de integridad de datos y posible introducción de bugs en consultas complejas).
**Esfuerzo:** Medio-Alto (toca todas las capas).
