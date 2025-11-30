# Resumen de Cambios - Migración a id_propiedad_ataque

**Fecha:** 2025-11-30  
**Estado:** ⚠️ EN PROGRESO - Errores de compilación

---

## ✅ Cambios Completados en Backend

### 1. Entidad `Registro.java`
- ✅ Eliminado: `tipoAtaque` (String)
- ✅ Agregado: `idPropiedadAtaque` (ManyToOne → AtaquePropiedad)

### 2. Entidad `Ataque.java`
- ✅ Eliminado: `idPropiedad` (que no existe en la BD)
- ✅ Mantiene: `tipoAtaque` (String) - existe en tabla ataque

### 3. DTOs
- ✅ `RegistroCreateDTO`: Agregado campo `idPropiedadAtaque`
- ✅ `RegistroUpdateDTO`: Agregado campo `idPropiedadAtaque`

### 4. Repository
- ✅ Creado: `AtaquePropiedadRepository.java`

### 5. Controller
- ⚠️ **PENDIENTE**: Archivo corrupto, necesita reescribirse
- Debe incluir:
  - Inyección de `AtaquePropiedadRepository`
  - Lógica para asignar `idPropiedadAtaque` en insert/update
  - Endpoint `/AtaquePropiedades` para obtener lista

---

## ❌ Problemas Actuales

1. **SmashnotestBackController.java** - Archivo duplicado/corrupto
2. **Errores de compilación** - Debido al controller corrupto

---

## 📋 Estructura Correcta de la BD

### Tabla `ataque`
```sql
CREATE TABLE ataque (
    id INTEGER,
    id_movimiento INTEGER,
    id_combo INTEGER,
    tipo_ataque VARCHAR(255)  -- 'movimiento' o 'combo'
);
```

### Tabla `registro`
```sql
CREATE TABLE registro (
    id BIGINT,
    id_personaje_emisor INTEGER,
    id_personaje_receptor INTEGER,
    id_escenario INTEGER,
    id_posicion INTEGER,
    id_ataque BIGINT,              -- FK a ataque.id
    id_propiedad_ataque INTEGER,   -- FK a ataque_propiedad.id
    rage INTEGER,
    di BOOLEAN,
    porcentaje_ko INTEGER
);
```

### Tabla `ataque_propiedad`
```sql
CREATE TABLE ataque_propiedad (
    id INTEGER,
    nombre VARCHAR(255),    -- 'Damage', 'Kill', 'Spike', 'Tumbling'
    abreviatura VARCHAR(255) -- 'DMG', 'KILL', 'SPIKE', 'TUMBL'
);
```

---

## 🎯 Flujo Correcto

### Frontend → Backend (Crear/Editar)

**Frontend envía:**
```json
{
  "idPersonajeEmisor": 2,
  "idPersonajeReceptor": 2,
  "idEscenario": 2,
  "idAtaque": 17,              // ID del movimiento/combo
  "tipoAtaque": "1",           // "1"=Movimiento, "2"=Combo
  "idPropiedadAtaque": 1,      // 1=Damage, 2=Kill, 3=Tumbling, 4=Spike
  "idPosicion": 2,
  "rage": 1,
  "di": false,
  "porcentajeKO": 22
}
```

**Backend procesa:**
1. Busca `ataque` donde `id_movimiento=17` (si tipo="1") o `id_combo=17` (si tipo="2")
2. Asigna `registro.idAtaque` = ataque encontrado
3. Asigna `registro.idPropiedadAtaque` = AtaquePropiedad con id=1
4. Guarda registro

---

## 🔧 Próximos Pasos

1. ✅ Restaurar `SmashnotestBackController.java` desde git
2. ⏳ Reescribir controller con la lógica correcta
3. ⏳ Compilar y verificar
4. ⏳ Actualizar frontend para agregar select de propiedades
5. ⏳ Probar crear/editar registros

---

## 📝 Notas Importantes

- `ataque.tipo_ataque` **SÍ existe** en la tabla ataque (movimiento/combo)
- `registro.tipo_ataque` **NO existe** - fue eliminado
- `registro.id_propiedad_ataque` **SÍ existe** - apunta a ataque_propiedad
- `ataque.id_propiedad` **NO existe** - fue eliminado de la entidad

---

## 🐛 Error Actual

El archivo `SmashnotestBackController.java` se duplicó durante la última edición.  
Necesita ser restaurado y reescrito correctamente.
