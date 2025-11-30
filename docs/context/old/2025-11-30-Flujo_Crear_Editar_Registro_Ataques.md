# Flujo de Creación y Edición de Registros con Ataques

**Fecha:** 2025-11-30  
**Propósito:** Explicar el flujo correcto para crear y editar registros relacionados con ataques (movimientos y combos)

---

## 🎯 Concepto Clave

El sistema usa una **tabla centralizada `ataque`** que contiene tanto movimientos como combos. La tabla `registro` NO guarda directamente el ID del movimiento o combo, sino el **ID de la tabla `ataque`**.

---

## 📊 Estructura de Tablas

### Tabla `ataque`
```sql
CREATE TABLE ataque (
    id INTEGER PRIMARY KEY,           -- ID único del ataque
    id_movimiento INTEGER,            -- FK a tabla movimiento (si es movimiento)
    id_combo INTEGER,                 -- FK a tabla combo (si es combo)
    tipo_ataque VARCHAR(255),         -- 'movimiento' o 'combo'
    id_propiedad INTEGER              -- FK a ataque_propiedad
);
```

**Ejemplos de datos:**
| id    | id_movimiento | id_combo | tipo_ataque |
|-------|---------------|----------|-------------|
| 1     | 1             | NULL     | movimiento  |
| 17    | 17            | NULL     | movimiento  |
| 10001 | NULL          | 1        | combo       |
| 10002 | NULL          | 2        | combo       |

### Tabla `registro`
```sql
CREATE TABLE registro (
    id BIGINT PRIMARY KEY,
    id_personaje_emisor INTEGER NOT NULL,
    id_personaje_receptor INTEGER NOT NULL,
    id_escenario INTEGER NOT NULL,
    id_posicion INTEGER NOT NULL,
    id_ataque BIGINT,                 -- FK a tabla ataque (NO a movimiento/combo)
    tipo_ataque VARCHAR(255),         -- 'movimiento' o 'combo'
    rage INTEGER,
    di BOOLEAN,
    porcentaje_ko INTEGER
);
```

---

## 🔄 Flujo de Creación de Registro

### Frontend (Angular)

**Paso 1: Usuario selecciona un movimiento o combo**

```typescript
// En el componente agregar-registro
selectedMovimiento: number = 17;  // Usuario selecciona "Down Special" (id=17)
selectedCombo: number = null;
```

**Paso 2: Determinar tipo de ataque**

```typescript
let idAtaque: number;
let tipoAtaque: string;

if (selectedMovimiento !== null) {
    idAtaque = selectedMovimiento;  // 17
    tipoAtaque = "1";               // 1 = Movimiento
} else if (selectedCombo !== null) {
    idAtaque = selectedCombo;       // Ejemplo: 1
    tipoAtaque = "2";               // 2 = Combo
}
```

**Paso 3: Enviar al backend**

```typescript
const registro = {
    idPersonajeEmisor: 2,
    idPersonajeReceptor: 2,
    idEscenario: 2,
    idPosicion: 2,
    idAtaque: 17,        // ID del movimiento seleccionado
    tipoAtaque: "1",     // Tipo: Movimiento
    rage: 1,
    di: false,
    porcentajeKO: 22
};

this.registroService.insertarRegistro(registro).subscribe(...);
```

---

### Backend (Spring Boot)

**Paso 1: Recibir DTO**

```java
@PostMapping("/Registro")
public ResponseEntity<String> insertarRegistro(@RequestBody RegistroCreateDTO dto) {
    // dto.idAtaque = 17 (ID del movimiento)
    // dto.tipoAtaque = "1" (Movimiento)
}
```

**Paso 2: Buscar en tabla `ataque`**

```java
if ("1".equals(dto.tipoAtaque)) {
    // Es un Movimiento
    // Buscar en tabla ataque donde id_movimiento = 17
    Ataque ataque = ataqueRepository.findByIdMovimiento(dto.idAtaque).orElse(null);
    // Resultado: ataque.id = 17 (el ID en la tabla ataque)
    
    if (ataque != null) {
        registro.setIdAtaque(ataque);           // Guarda el objeto Ataque
        registro.setTipoAtaque("movimiento");   // Guarda el tipo
    }
} else if ("2".equals(dto.tipoAtaque)) {
    // Es un Combo
    // Buscar en tabla ataque donde id_combo = 1
    Ataque ataque = ataqueRepository.findByIdCombo(dto.idAtaque).orElse(null);
    // Resultado: ataque.id = 10001 (el ID en la tabla ataque)
    
    if (ataque != null) {
        registro.setIdAtaque(ataque);
        registro.setTipoAtaque("combo");
    }
}
```

**Paso 3: Guardar registro**

```java
registroService.insertarRegistro(registro);
// Se guarda en BD:
// id_ataque = 17 (ID de la tabla ataque, NO de movimiento)
// tipo_ataque = 'movimiento'
```

---

## 📝 Ejemplo Completo: Crear Registro con Movimiento

### Escenario
Usuario quiere crear un registro con el movimiento **"Down Special"** (id=17 en tabla `movimiento`)

### Frontend envía:
```json
{
  "idPersonajeEmisor": 2,
  "idPersonajeReceptor": 2,
  "idEscenario": 2,
  "idPosicion": 2,
  "idAtaque": 17,        // ← ID del movimiento en tabla movimiento
  "tipoAtaque": "1",     // ← 1 = Movimiento
  "rage": 1,
  "di": false,
  "porcentajeKO": 22
}
```

### Backend procesa:
1. Recibe `idAtaque=17` y `tipoAtaque="1"`
2. Como `tipoAtaque="1"`, busca en tabla `ataque` donde `id_movimiento=17`
3. Encuentra: `ataque.id=17`, `ataque.id_movimiento=17`, `ataque.tipo_ataque='movimiento'`
4. Guarda en `registro`: `id_ataque=17`, `tipo_ataque='movimiento'`

### Resultado en BD:
```sql
INSERT INTO registro (
    id_personaje_emisor, 
    id_personaje_receptor, 
    id_escenario, 
    id_posicion, 
    id_ataque,        -- 17 (ID de tabla ataque)
    tipo_ataque,      -- 'movimiento'
    rage, 
    di, 
    porcentaje_ko
) VALUES (2, 2, 2, 2, 17, 'movimiento', 1, false, 22);
```

---

## 📝 Ejemplo Completo: Crear Registro con Combo

### Escenario
Usuario quiere crear un registro con el combo **"Bair => RazorLeaf => UAir"** (id=1 en tabla `combo`)

### Frontend envía:
```json
{
  "idPersonajeEmisor": 35,
  "idPersonajeReceptor": 63,
  "idEscenario": 1,
  "idPosicion": 1,
  "idAtaque": 1,         // ← ID del combo en tabla combo
  "tipoAtaque": "2",     // ← 2 = Combo
  "rage": 0,
  "di": true,
  "porcentajeKO": 105
}
```

### Backend procesa:
1. Recibe `idAtaque=1` y `tipoAtaque="2"`
2. Como `tipoAtaque="2"`, busca en tabla `ataque` donde `id_combo=1`
3. Encuentra: `ataque.id=10001`, `ataque.id_combo=1`, `ataque.tipo_ataque='combo'`
4. Guarda en `registro`: `id_ataque=10001`, `tipo_ataque='combo'`

### Resultado en BD:
```sql
INSERT INTO registro (
    id_personaje_emisor, 
    id_personaje_receptor, 
    id_escenario, 
    id_posicion, 
    id_ataque,        -- 10001 (ID de tabla ataque)
    tipo_ataque,      -- 'combo'
    rage, 
    di, 
    porcentaje_ko
) VALUES (35, 63, 1, 1, 10001, 'combo', 0, true, 105);
```

---

## 🔄 Flujo de Edición de Registro

### Frontend

**Paso 1: Cargar registro existente**

```typescript
// Registro cargado desde BD
registro = {
    id: 1,
    idPersonajeEmisor: 35,
    idPersonajeReceptor: 63,
    idAtaque: 16,           // ID de la tabla ataque
    tipoAtaque: 'movimiento',
    // ... otros campos
};
```

**Paso 2: Determinar qué mostrar en el select**

```typescript
// Necesitas hacer JOIN para obtener el id_movimiento o id_combo
// Desde la tabla ataque

// Si tipo_ataque = 'movimiento':
// SELECT id_movimiento FROM ataque WHERE id = 16
// Resultado: id_movimiento = 16

// Entonces en el frontend:
selectedMovimiento = 16;  // Mostrar en el select de movimientos
selectedCombo = null;
```

**Paso 3: Usuario cambia el ataque**

```typescript
// Usuario cambia a otro movimiento, por ejemplo id=17
selectedMovimiento = 17;

// Al guardar:
const registroUpdate = {
    id: 1,
    idAtaque: 17,        // Nuevo ID del movimiento
    tipoAtaque: "1",     // Sigue siendo movimiento
    // ... otros campos
};
```

**Paso 4: Enviar al backend**

```typescript
this.registroService.updateRegistro(registroUpdate).subscribe(...);
```

---

### Backend

**Paso 1: Recibir DTO**

```java
@PutMapping("/Registro")
public ResponseEntity<String> updateRegistro(@RequestBody RegistroUpdateDTO dto) {
    // dto.id = 1
    // dto.idAtaque = 17 (nuevo ID del movimiento)
    // dto.tipoAtaque = "1"
}
```

**Paso 2: Buscar registro existente**

```java
Registro registro = registroService.obtenerRegistroPorId(dto.id);
```

**Paso 3: Buscar nuevo ataque**

```java
if ("1".equals(dto.tipoAtaque)) {
    // Buscar en tabla ataque donde id_movimiento = 17
    Ataque ataque = ataqueRepository.findByIdMovimiento(dto.idAtaque).orElse(null);
    if (ataque != null) {
        registro.setIdAtaque(ataque);
        registro.setTipoAtaque("movimiento");
    }
} else if ("2".equals(dto.tipoAtaque)) {
    // Buscar en tabla ataque donde id_combo = dto.idAtaque
    Ataque ataque = ataqueRepository.findByIdCombo(dto.idAtaque).orElse(null);
    if (ataque != null) {
        registro.setIdAtaque(ataque);
        registro.setTipoAtaque("combo");
    }
}
```

**Paso 4: Actualizar registro**

```java
registroService.actualizarRegistro(registro);
```

---

## 🔍 Consulta para Listar Registros

Para mostrar los registros con los nombres de movimientos/combos:

```sql
SELECT 
    r.id,
    r.id_personaje_emisor,
    r.id_personaje_receptor,
    r.id_ataque,
    r.tipo_ataque,
    a.id_movimiento,
    a.id_combo,
    m.nombre as nombre_movimiento,
    c.nombre as nombre_combo,
    r.rage,
    r.di,
    r.porcentaje_ko
FROM registro r
LEFT JOIN ataque a ON r.id_ataque = a.id
LEFT JOIN movimiento m ON a.id_movimiento = m.id
LEFT JOIN combo c ON a.id_combo = c.id
ORDER BY r.id;
```

---

## ✅ Resumen del Flujo

### Crear/Editar Registro

1. **Frontend:** Usuario selecciona movimiento (id=17) o combo (id=1)
2. **Frontend:** Determina `tipoAtaque` ("1" o "2")
3. **Frontend:** Envía `{idAtaque: 17, tipoAtaque: "1"}`
4. **Backend:** Busca en tabla `ataque` donde:
   - Si tipo="1": `id_movimiento = 17` → encuentra `ataque.id = 17`
   - Si tipo="2": `id_combo = 1` → encuentra `ataque.id = 10001`
5. **Backend:** Guarda `registro.id_ataque = 17` (o 10001)
6. **BD:** Se guarda el ID de la tabla `ataque`, NO de movimiento/combo

### Listar Registros

1. **Backend:** Hace JOIN entre `registro`, `ataque`, `movimiento` y `combo`
2. **Backend:** Retorna datos con nombres de movimientos/combos
3. **Frontend:** Muestra los datos en la tabla

---

## 🎯 Puntos Clave

1. ✅ `registro.id_ataque` apunta a `ataque.id`, NO a `movimiento.id` ni `combo.id`
2. ✅ Frontend envía el ID del movimiento/combo seleccionado
3. ✅ Backend busca en tabla `ataque` el registro correspondiente
4. ✅ Backend guarda el `ataque.id` en `registro.id_ataque`
5. ✅ Para listar, se hace JOIN a través de la tabla `ataque`

---

## 🐛 Errores Comunes

### ❌ Error 1: Guardar directamente el ID del movimiento
```java
// INCORRECTO
registro.setIdAtaque(dto.idAtaque); // Esto guarda 17 directamente
```

```java
// CORRECTO
Ataque ataque = ataqueRepository.findByIdMovimiento(dto.idAtaque).orElse(null);
registro.setIdAtaque(ataque); // Esto guarda el objeto Ataque con id=17
```

### ❌ Error 2: No buscar en tabla ataque
```java
// INCORRECTO - Asumir que el ID es el mismo
registro.setIdAtaque(new Ataque(dto.idAtaque));
```

```java
// CORRECTO - Buscar en la tabla
Ataque ataque = ataqueRepository.findByIdMovimiento(dto.idAtaque).orElse(null);
if (ataque != null) {
    registro.setIdAtaque(ataque);
}
```

### ❌ Error 3: Confundir los IDs
```
Frontend envía: idAtaque=17 (ID de movimiento)
Backend debe buscar: ataque donde id_movimiento=17
Backend debe guardar: ataque.id (que también es 17 en este caso)

Frontend envía: idAtaque=1 (ID de combo)
Backend debe buscar: ataque donde id_combo=1
Backend debe guardar: ataque.id (que es 10001, NO 1)
```

---

## 📚 Referencias

- Tabla `ataque`: Centraliza movimientos y combos
- Tabla `registro`: Guarda referencia a `ataque.id`
- `AtaqueRepository`: Tiene métodos `findByIdMovimiento()` y `findByIdCombo()`
