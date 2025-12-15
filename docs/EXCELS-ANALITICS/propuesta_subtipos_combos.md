# Propuesta de Diseño: Subtipos de Combos

## Contexto
Se desea clasificar los combos en categorías específicas como:
*   True Combo
*   Follow Up
*   Tech Chase
*   50/50
*   Etc.

## Análisis de la Solución Propuesta

**Tu propuesta:** Crear una tabla `tipo_combo` y agregar una columna `id_tipo_combo` a la tabla `combo`.

**Evaluación Técnica:** **Es la solución CORRECTA y recomendada** para un sistema flexible y escalable en una base de datos relacional.

### ¿Por qué es la mejor opción?
1.  **Normalización:** Evitas repetir textos como "True Combo" en cada registro de la tabla `combo`. Ahorra espacio y evita errores de tipeo.
2.  **Mantenibilidad:** Si mañana quieres cambiar el nombre de "50/50" a "Mix-up", cambias un solo registro en la tabla `tipo_combo` y se actualiza para todos.
3.  **Escalabilidad:** Puedes agregar nuevos tipos (ej. "Z-Drop Setup") insertando una fila en `tipo_combo` sin necesidad de modificar el código del programa ni la estructura de la tabla.

---

## Plan de Implementación Sugerido

Si decides avanzar con esto, estos serían los pasos técnicos a seguir en orden:

### 1. Base de Datos (SQL)
*   **Crear Tabla:**
    ```sql
    CREATE TABLE tipo_combo (
        id INT PRIMARY KEY, -- o SERIAL/AUTO_INCREMENT
        nombre VARCHAR(50) NOT NULL -- Ej: 'True Combo', 'Tech Chase'
    );
    ```
*   **Insertar Datos Iniciales:**
    ```sql
    INSERT INTO tipo_combo (id, nombre) VALUES (1, 'True Combo');
    INSERT INTO tipo_combo (id, nombre) VALUES (2, 'Follow Up');
    -- etc..
    ```
*   **Modificar Tabla Combo:**
    ```sql
    ALTER TABLE combo ADD COLUMN id_tipo_combo INT;
    ALTER TABLE combo ADD CONSTRAINT fk_combo_tipo 
    FOREIGN KEY (id_tipo_combo) REFERENCES tipo_combo(id);
    ```

### 2. Backend (API)
*   **Modelo/Entidad:** Crear la clase `TipoCombo` y agregar la propiedad `IdTipoCombo` y la relación `TipoCombo` a la clase existente `Combo`.
*   **DTOs:** Actualizar `ComboDTO` para incluir `NombreTipoCombo` (para mostrarlo en el front) y `IdTipoCombo` (para guardarlo/editarlo).
*   **Endpoints:** 
    *   Probablemente necesites un nuevo endpoint `GET /api/TipoCombo` para llenar el desplegable en el formulario de creación de combos.

### 3. Frontend (Angular)
*   **Nueva Interfaz:** Crear `interface TipoCombo { id: number; nombre: string; }`.
*   **Creación de Combos:** En la pantalla donde creas/editas combos (no en el registro de matchups, sino en el mantenedor de combos), agregar un `<select>` que cargue la lista de tipos.
*   **Visualización:** En `tbl-registros` o donde se muestre el combo, podrías querer mostrar el tipo al lado del nombre (ej. *"D-Throw -> Fair (True Combo)"*).

## Conclusión
Tu intuición es correcta. Esta estructura te dará la máxima flexibilidad para categorizar tus combos ahora y en el futuro.
