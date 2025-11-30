# Corrección de Campos Obsoletos en Tabla Registro

**Fecha:** 2025-11-30  
**Problema:** JPA/Hibernate creó automáticamente columnas `id_movimiento` e `id_combo` en la tabla `registro` debido a que la entidad tenía esos campos mapeados.

---

## 🔍 El Problema

### Origen del Problema
La entidad `Registro.java` tenía campos obsoletos que JPA/Hibernate detectó y **automáticamente creó** en la base de datos gracias a la configuración `spring.jpa.hibernate.ddl-auto=update`:

```java
// ❌ CAMPOS OBSOLETOS (Ya eliminados)
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_movimiento")
private Movimiento idMovimiento;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_combo")
private Combo idCombo;
```

### ¿Por qué existían estos campos?
Estos campos eran parte de un diseño anterior donde se guardaba directamente la referencia al movimiento o combo. El nuevo diseño usa **tabla `ataque` centralizada** que contiene tanto movimientos como combos.

---

## ✅ La Solución Implementada

### 1️⃣ **Limpiar la Entidad `Registro.java`**
**Archivo:** `smashnotes_springboot_back/src/main/java/smashnotest_back/matchups/data/entitys/Registro.java`

**Acción:**
- ❌ Eliminados: `idMovimiento`, `idCombo` y sus getters/setters
- ✅ Mantenidos: `idAtaque` y `tipoAtaque`

**Resultado:**
```java
// ✅ CAMPOS CORRECTOS
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_ataque")
private Ataque idAtaque;

@Column(name = "tipo_ataque")
private String tipoAtaque;
```

---

### 2️⃣ **Limpiar el Controller**
**Archivo:** `smashnotes_springboot_back/src/main/java/smashnotest_back/SmashnotestBackController.java`

**Acción:** Simplificar la lógica en `insertarRegistro()` y `updateRegistro()`:

**Antes (❌ Incorrecto):**
```java
if ("1".equals(dto.tipoAtaque)) {
    Movimiento movimiento = new Movimiento();
    movimiento.setId(dto.idAtaque);
    registro.setIdMovimiento(movimiento);  // ❌ Campo obsoleto
    registro.setIdCombo(null);              // ❌ Campo obsoleto
    
    Ataque ataque = ataqueRepository.findByIdMovimiento(dto.idAtaque).orElse(null);
    registro.setIdAtaque(ataque);
}
```

**Después (✅ Correcto):**
```java
if ("1".equals(dto.tipoAtaque)) {
    // Buscar en tabla ataque donde id_movimiento = dto.idAtaque
    Ataque ataque = ataqueRepository.findByIdMovimiento(dto.idAtaque).orElse(null);
    if (ataque != null) {
        registro.setIdAtaque(ataque);
        registro.setTipoAtaque("movimiento");
    }
}
```

---

### 3️⃣ **Cambiar Configuración de Hibernate**
**Archivo:** `smashnotes_springboot_back/src/main/resources/application.properties`

**Antes:**
```properties
spring.jpa.hibernate.ddl-auto=update
```

**Después:**
```properties
spring.jpa.hibernate.ddl-auto=validate
```

**¿Por qué?**
- `update`: Hibernate **modifica automáticamente** el schema (crea/elimina columnas)
- `validate`: Hibernate **solo verifica** que las entidades coincidan con el schema, pero **NO modifica la base de datos**

⚠️ **Importante:** Con `validate`, cualquier cambio en el schema debe hacerse **manualmente con scripts SQL**. Esto da más control y previene cambios accidentales.

---

### 4️⃣ **Script SQL de Migración**
**Archivo:** `smashnotes_angular/docs/migrations/2025-11-30_eliminar_columnas_obsoletas_registro.sql`

**Pasos del Script:**
1. **Verificar estado actual** de los datos
2. **Migrar datos** de `id_movimiento` → `id_ataque` (si es necesario)
3. **Migrar datos** de `id_combo` → `id_ataque` (si es necesario)
4. **Eliminar columnas obsoletas** `id_movimiento` e `id_combo`
5. **Verificar** la estructura final de la tabla

---

## 🚀 Flujo de Datos Correcto

### Frontend → Backend

**Frontend envía (`RegistroCreateDTO` / `RegistroUpdateDTO`):**
```typescript
{
  idAtaque: 17,        // ID del movimiento o combo seleccionado
  tipoAtaque: "1"      // "1" = Movimiento, "2" = Combo
}
```

### Backend Procesa

**Para Movimiento (`tipoAtaque = "1"`):**
1. Recibe `idAtaque = 17` (ID del movimiento en tabla `movimiento`)
2. Busca en tabla `ataque` donde `id_movimiento = 17`
3. Encuentra `ataque.id = 17` (ID en tabla `ataque`)
4. Guarda `registro.id_ataque = 17` y `registro.tipo_ataque = "movimiento"`

**Para Combo (`tipoAtaque = "2"`):**
1. Recibe `idAtaque = 1` (ID del combo en tabla `combo`)
2. Busca en tabla `ataque` donde `id_combo = 1`
3. Encuentra `ataque.id = 10001` (ID en tabla `ataque`)
4. Guarda `registro.id_ataque = 10001` y `registro.tipo_ataque = "combo"`

---

## 📊 Estructura de Tablas

### Tabla `ataque`
```sql
CREATE TABLE ataque (
    id INTEGER PRIMARY KEY,
    id_movimiento INTEGER,    -- FK a movimiento
    id_combo INTEGER,          -- FK a combo
    tipo_ataque VARCHAR(255),  -- 'movimiento' o 'combo'
    id_propiedad INTEGER,
    CONSTRAINT ataque_check CHECK (
        (tipo_ataque = 'movimiento' AND id_movimiento IS NOT NULL AND id_combo IS NULL) OR
        (tipo_ataque = 'combo' AND id_combo IS NOT NULL AND id_movimiento IS NULL)
    )
);
```

**Ejemplos de datos:**
| id | id_movimiento | id_combo | tipo_ataque |
|----|---------------|----------|-------------|
| 1  | 1             | NULL     | movimiento  |
| 17 | 17            | NULL     | movimiento  |
| 10001 | NULL       | 1        | combo       |
| 10002 | NULL       | 2        | combo       |

### Tabla `registro` (NUEVA estructura)
```sql
CREATE TABLE registro (
    id BIGINT PRIMARY KEY,
    id_personaje_emisor INTEGER NOT NULL,
    id_personaje_receptor INTEGER NOT NULL,
    id_escenario INTEGER NOT NULL,
    id_posicion INTEGER NOT NULL,
    id_ataque BIGINT,          -- ✅ FK a ataque
    tipo_ataque VARCHAR(255),  -- ✅ 'movimiento' o 'combo'
    rage INTEGER,
    di BOOLEAN,
    porcentaje_ko INTEGER
    -- ❌ id_movimiento eliminado
    -- ❌ id_combo eliminado
);
```

---

## 📝 Checklist de Ejecución

### ✅ Cambios en Código (Ya aplicados)
- [x] Eliminar campos obsoletos de `Registro.java`
- [x] Limpiar lógica en `SmashnotestBackController.java`
- [x] Cambiar `hibernate.ddl-auto` a `validate`
- [x] Crear script de migración SQL

### ⏳ Cambios en Base de Datos (Por ejecutar)
- [ ] **PASO 1:** Ejecutar el script SQL de migración
- [ ] **PASO 2:** Verificar que las columnas fueron eliminadas
- [ ] **PASO 3:** Probar insertar un registro nuevo
- [ ] **PASO 4:** Probar editar un registro existente

---

## ⚠️ Precauciones

1. **Hacer backup de la base de datos** antes de ejecutar el script SQL
2. **Revisar los datos** con los queries de verificación del script
3. **Ejecutar el script paso a paso**, no todo de una vez
4. **Probar la aplicación** después de la migración

---

## 🔗 Archivos Modificados

1. `smashnotes_springboot_back/src/main/java/smashnotest_back/matchups/data/entitys/Registro.java`
2. `smashnotes_springboot_back/src/main/java/smashnotest_back/SmashnotestBackController.java`
3. `smashnotes_springboot_back/src/main/resources/application.properties`
4. `smashnotes_angular/docs/migrations/2025-11-30_eliminar_columnas_obsoletas_registro.sql` (nuevo)

---

## 📚 Referencias

- [Hibernate DDL Auto](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties.data.spring.jpa.hibernate.ddl-auto)
- Conversación relacionada: `efaca900-a14e-4534-9795-8b197d5b7da0`
