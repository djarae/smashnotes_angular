-- ============================================================
-- SCRIPT DE MIGRACIÓN: Eliminar columnas obsoletas de tabla registro
-- Fecha: 2025-11-30
-- Descripción: Elimina las columnas id_movimiento e id_combo 
--             ya que ahora solo se usa id_ataque
-- ============================================================

-- PASO 1: Verificar estado actual de la tabla
SELECT 
    COUNT(*) as total_registros,
    COUNT(id_movimiento) as registros_con_id_movimiento,
    COUNT(id_combo) as registros_con_id_combo,
    COUNT(id_ataque) as registros_con_id_ataque
FROM registro;

-- PASO 2: Ver si hay datos en columnas obsoletas que no estén migrados
SELECT 
    id, 
    id_movimiento, 
    id_combo, 
    id_ataque, 
    tipo_ataque 
FROM registro 
WHERE (id_movimiento IS NOT NULL OR id_combo IS NOT NULL);

-- PASO 3: OPCIONAL - Migrar datos si es necesario
-- Solo ejecutar si el PASO 2 muestra registros con datos en id_movimiento o id_combo

-- Migrar movimientos: Buscar en tabla ataque el id correspondiente
UPDATE registro r
SET 
    id_ataque = (
        SELECT a.id 
        FROM ataque a 
        WHERE a.id_movimiento = r.id_movimiento 
        AND a.tipo_ataque = 'movimiento'
        LIMIT 1
    ),
    tipo_ataque = 'movimiento'
WHERE r.id_movimiento IS NOT NULL 
  AND r.id_ataque IS NULL;

-- Migrar combos: Buscar en tabla ataque el id correspondiente
UPDATE registro r
SET 
    id_ataque = (
        SELECT a.id 
        FROM ataque a 
        WHERE a.id_combo = r.id_combo 
        AND a.tipo_ataque = 'combo'
        LIMIT 1
    ),
    tipo_ataque = 'combo'
WHERE r.id_combo IS NOT NULL 
  AND r.id_ataque IS NULL;

-- PASO 4: Verificar que todos los datos fueron migrados
SELECT 
    id, 
    id_movimiento, 
    id_combo, 
    id_ataque, 
    tipo_ataque 
FROM registro 
WHERE id_ataque IS NULL;
-- Si este query devuelve filas, revisa manualmente esos registros antes de continuar

-- PASO 5: Eliminar las columnas obsoletas
-- ⚠️ ADVERTENCIA: Esta operación es irreversible. Asegúrate de tener un backup.

ALTER TABLE registro 
DROP COLUMN IF EXISTS id_movimiento;

ALTER TABLE registro 
DROP COLUMN IF EXISTS id_combo;

-- PASO 6: Verificar la estructura final de la tabla
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'registro'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- PASO 7: Verificar datos finales
SELECT 
    id,
    id_personaje_emisor,
    id_personaje_receptor,
    id_ataque,
    tipo_ataque,
    id_escenario,
    id_posicion,
    rage,
    di,
    porcentaje_ko
FROM registro
LIMIT 10;

-- ============================================================
-- FIN DEL SCRIPT
-- ============================================================
