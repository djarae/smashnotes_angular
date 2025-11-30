-- ============================================================
-- SCRIPT: Eliminar columnas obsoletas de tabla ataque
-- Fecha: 2025-11-30
-- Descripción: Elimina las columnas nombre y abreviatura de 
--             la tabla ataque que fueron creadas por error
-- ============================================================

-- PASO 1: Verificar estado actual
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ataque'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- PASO 2: Ver datos actuales (verificar si hay datos en nombre/abreviatura)
SELECT id, id_movimiento, id_combo, tipo_ataque, 
       id_propiedad, nombre, abreviatura
FROM ataque
LIMIT 10;

-- PASO 3: Eliminar las columnas
-- ⚠️ ADVERTENCIA: Esta operación es irreversible

ALTER TABLE ataque 
DROP COLUMN IF EXISTS nombre;

ALTER TABLE ataque 
DROP COLUMN IF EXISTS abreviatura;

-- PASO 4: Verificar estructura final
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ataque'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- PASO 5: Verificar datos finales
SELECT id, id_movimiento, id_combo, tipo_ataque, id_propiedad
FROM ataque
LIMIT 10;

-- ============================================================
-- RESULTADO ESPERADO:
-- La tabla ataque debe tener solo estas columnas:
-- - id (integer)
-- - id_movimiento (integer)
-- - id_combo (integer)
-- - tipo_ataque (varchar)
-- - id_propiedad (integer)
-- ============================================================
