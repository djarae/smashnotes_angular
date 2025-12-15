# Análisis de Renombrado: `tipo_ataque` -> `ataque_tipo`

## Hipótesis
Se plantea cambiar el nombre de la tabla (y posiblemente columna) `tipo_ataque` a `ataque_tipo` para mantener coherencia en las convenciones de nombrado (Entidad_Detalle).

## Opinión Técnica
**Sí, tiene mucho sentido.** En diseño de base de datos, agrupar las tablas por prefijo es una práctica excelente para mantener el orden visual.
*   Ejemplo:
    *   `ataque`
    *   `ataque_tipo`
    *   `ataque_propiedad`
*   Esto es mucho mejor que tener: `ataque`, `tipo_ataque`, `propiedad_ataque`.

**Veredicto:** Es un cambio positivo para la calidad del código/DB ("Refactorización cosmética/organizativa"), pero tiene un costo de implementación.

## Análisis de Impacto y Archivos a Modificar

Si decides hacerlo, este es el alcance de los cambios:

### 1. Base de Datos
*   **Renombrado de Tabla:** `ALTER TABLE tipo_ataque RENAME TO ataque_tipo;`
*   **Columnas (Foreign Keys):**
    *   En la tabla `ataque`: Cambiar columna `tipo_ataque` (si es que es FK) a `id_ataque_tipo`.
    *   En la tabla `registro`: Cambiar columna `tipo_ataque` a `id_ataque_tipo` (si aplica).
*   **Secuencias y Restricciones:** Renombrar PKs, FKs y secuencias asociadas para ser consistente (`ataque_tipo_id_seq`, `fk_ataque_ataque_tipo`).

### 2. Backend (API)
Dependiendo de qué tan atado esté tu ORM a los nombres de base de datos:
*   **Entidades:** Renombrar clase `TipoAtaque` a `AtaqueTipo`.
*   **Mapeos:** Actualizar la configuración que dice `Table("tipo_ataque")` a `Table("ataque_tipo")`.
*   **DTOs:** Actualizar propiedades `idTipoAtaque` a `idAtaqueTipo`.
*   **Queries SQL Puros:** Si tienes queries escritos a mano ("SELECT * FROM tipo_ataque..."), tendrás que buscarlos y reemplazarlos todos.

### 3. Frontend (Angular)
*   **Interfaces:** Buscar donde defines la interfaz (probablemente `models/ataque.ts` o similar) y cambiar `tipo_ataque` por `ataque_tipo`.
*   **Vistas (HTML):**
    *   `agr-registro.component.ts`: Si usabas `item.tipo_ataque` como propiedad.
    *   `tbl-registros.component.html/ts`: Lo mismo.
*   **Servicios:** Endpoints que llamen a `/api/TipoAtaque` quizás cambien a `/api/AtaqueTipo`.

## Referencias Encontradas (Codebase actual)
He encontrado múltiples referencias a `tipo_ataque` en tus scripts de migración y documentación.
*   `docs/migrations/2025-11-30_eliminar_nombre_abreviatura_ataque.sql`
*   `docs/migrations/2025-11-30_eliminar_columnas_obsoletas_registro.sql`

> **Nota:** No encontré la clase Typescript `TipoAtaque` explícita, lo que sugiere que quizás la manejas como un string `'movimiento'` / `'combo'` o una propiedad simple `numero` dentro de los otros objetos. Si es así, ¡el cambio es mucho más fácil! Solo renombras la tabla SQL y la propiedad en el objeto DTO.

## Recomendación
Si el proyecto está en etapas tempranas o en mantenimiento activo, **hazlo ahora**. Cuanto más crezca el proyecto, más difícil será renombrar tablas centrales.
