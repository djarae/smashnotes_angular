# ✅ Migración Completada - id_propiedad_ataque

**Fecha:** 2025-11-30  
**Estado:** ✅ COMPLETADO - Backend compilando correctamente

---

## 📋 Cambios Realizados en Backend

### 1. Entidad `Registro.java` ✅
**Antes:**
```java
@Column(name = "tipo_ataque")
private String tipoAtaque;
```

**Después:**
```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_propiedad_ataque")
private AtaquePropiedad idPropiedadAtaque;
```

**Cambios:**
- ❌ Eliminado: `tipoAtaque` (String) - NO existe en tabla registro
- ✅ Agregado: `idPropiedadAtaque` (ManyToOne → AtaquePropiedad)

---

### 2. Entidad `Ataque.java` ✅
**Cambios:**
- ❌ Eliminado: `idPropiedad` (ManyToOne) - NO existe en tabla ataque
- ✅ Mantiene: `tipoAtaque` (String) - SÍ existe en tabla ataque

---

### 3. Entidad `AtaquePropiedad.java` ✅
**Nueva entidad creada:**
```java
@Entity
@Table(name = "ataque_propiedad")
public class AtaquePropiedad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @Column(name = "abreviatura", nullable = false)
    private String abreviatura;
}
```

---

### 4. DTOs ✅

**RegistroCreateDTO:**
```java
public class RegistroCreateDTO {
    public Integer idPersonajeEmisor;
    public Integer idPersonajeReceptor;
    public Integer idEscenario;
    public Integer idAtaque;
    public String tipoAtaque;
    public Integer idPropiedadAtaque;  // ✅ NUEVO
    public Integer idPosicion;
    public Integer rage;
    public Boolean di;
    public Integer porcentajeKO;
}
```

**RegistroUpdateDTO:**
```java
public class RegistroUpdateDTO {
    public Long id;
    public Integer idPersonajeEmisor;
    public Integer idPersonajeReceptor;
    public Integer idEscenario;
    public Integer idAtaque;
    public String tipoAtaque;
    public Integer idPropiedadAtaque;  // ✅ NUEVO
    public Integer idPosicion;
    public Integer rage;
    public Boolean di;
    public Integer porcentajeKO;
}
```

---

### 5. Repository ✅

**Nuevo: `AtaquePropiedadRepository.java`**
```java
public interface AtaquePropiedadRepository extends JpaRepository<AtaquePropiedad, Integer> {
}
```

---

### 6. Controller ✅

**Cambios en `SmashnotestBackController.java`:**

1. **Inyección de dependencia:**
```java
@Autowired
private AtaquePropiedadRepository ataquePropiedadRepository;
```

2. **Método `insertarRegistro()`:**
```java
// ❌ ELIMINADO: registro.setTipoAtaque("movimiento");
// ✅ AGREGADO:
if (dto.idPropiedadAtaque != null) {
    AtaquePropiedad propiedad = new AtaquePropiedad();
    propiedad.setId(dto.idPropiedadAtaque);
    registro.setIdPropiedadAtaque(propiedad);
}
```

3. **Método `updateRegistro()`:**
```java
// ❌ ELIMINADO: registro.setTipoAtaque("combo");
// ✅ AGREGADO:
if (dto.idPropiedadAtaque != null) {
    AtaquePropiedad propiedad = new AtaquePropiedad();
    propiedad.setId(dto.idPropiedadAtaque);
    registro.setIdPropiedadAtaque(propiedad);
}
```

4. **Nuevo endpoint:**
```java
@GetMapping("/AtaquePropiedades")
public List<AtaquePropiedad> getAtaquePropiedades() {
    return ataquePropiedadRepository.findAll();
}
```

---

## 📊 Estructura Final de la BD

### Tabla `ataque`
```sql
CREATE TABLE ataque (
    id INTEGER PRIMARY KEY,
    id_movimiento INTEGER,
    id_combo INTEGER,
    tipo_ataque VARCHAR(255) NOT NULL  -- 'movimiento' o 'combo'
);
```

### Tabla `registro`
```sql
CREATE TABLE registro (
    id BIGINT PRIMARY KEY,
    id_personaje_emisor INTEGER NOT NULL,
    id_personaje_receptor INTEGER NOT NULL,
    id_escenario INTEGER NOT NULL,
    id_posicion INTEGER NOT NULL,
    id_ataque BIGINT,                    -- FK a ataque.id
    id_propiedad_ataque INTEGER,         -- FK a ataque_propiedad.id ✅ NUEVO
    rage INTEGER,
    di BOOLEAN,
    porcentaje_ko INTEGER
);
```

### Tabla `ataque_propiedad`
```sql
CREATE TABLE ataque_propiedad (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    abreviatura VARCHAR(255) NOT NULL
);
```

**Datos:**
| id | nombre   | abreviatura |
|----|----------|-------------|
| 1  | Damage   | DMG         |
| 2  | Kill     | KILL        |
| 3  | Tumbling | TUMBL       |
| 4  | Spike    | SPIKE       |

---

## 🎯 Flujo Completo

### Frontend → Backend (Crear Registro)

**Frontend envía:**
```json
{
  "idPersonajeEmisor": 2,
  "idPersonajeReceptor": 2,
  "idEscenario": 2,
  "idAtaque": 17,              // ID del movimiento en tabla movimiento
  "tipoAtaque": "1",           // "1" = Movimiento, "2" = Combo
  "idPropiedadAtaque": 1,      // 1 = Damage, 2 = Kill, 3 = Tumbling, 4 = Spike
  "idPosicion": 2,
  "rage": 1,
  "di": false,
  "porcentajeKO": 22
}
```

**Backend procesa:**
1. Busca en tabla `ataque` donde `id_movimiento = 17` (porque tipoAtaque="1")
2. Encuentra `ataque.id = 17`
3. Asigna `registro.idAtaque` = Ataque con id=17
4. Asigna `registro.idPropiedadAtaque` = AtaquePropiedad con id=1 (Damage)
5. Guarda en BD:
   - `id_ataque = 17`
   - `id_propiedad_ataque = 1`

---

## ✅ Compilación

```bash
mvn clean compile
# [INFO] BUILD SUCCESS
# [INFO] Total time: 3.402 s
```

---

## 📝 Próximos Pasos (Frontend)

### 1. Crear Service para AtaquePropiedad

**Archivo:** `smashnotes_angular/src/services/matchups/ataque-propiedad.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url_entorno } from '../../configs/url_entorno';

export interface AtaquePropiedad {
  id: number;
  nombre: string;
  abreviatura: string;
}

@Injectable({
  providedIn: 'root'
})
export class AtaquePropiedadService {
  private url = url_entorno() + '/apiSmash/AtaquePropiedades';

  constructor(private http: HttpClient) {}

  getAtaquePropiedades(): Observable<AtaquePropiedad[]> {
    return this.http.get<AtaquePropiedad[]>(this.url);
  }
}
```

### 2. Actualizar Componente Agregar Registro

**Agregar en el HTML:**
```html
<!-- Después de los selects de Movimiento/Combo -->
<div>
  <label>Atk Prop:</label>
  <select [(ngModel)]="selectedPropiedadAtaque">
    <option value="">-- Seleccionar --</option>
    <option *ngFor="let prop of ataquePropiedades" [value]="prop.id">
      {{prop.nombre}} ({{prop.abreviatura}})
    </option>
  </select>
</div>
```

**Agregar en el TS:**
```typescript
ataquePropiedades: AtaquePropiedad[] = [];
selectedPropiedadAtaque: number | null = null;

ngOnInit() {
  // ... código existente
  this.ataquePropiedadService.getAtaquePropiedades().subscribe(data => {
    this.ataquePropiedades = data;
  });
}

// Al enviar:
const registro = {
  // ... campos existentes
  idPropiedadAtaque: this.selectedPropiedadAtaque
};
```

### 3. Actualizar Componente Editar Registro

Similar al componente agregar, agregar el select de propiedades.

---

## 🎉 Resumen

✅ **Backend completado y compilando**  
✅ **Entidades corregidas según estructura de BD**  
✅ **DTOs actualizados**  
✅ **Controller con lógica correcta**  
✅ **Endpoint `/AtaquePropiedades` disponible**  
⏳ **Pendiente: Actualizar frontend para agregar select de propiedades**

---

## 🔗 Archivos Modificados

1. `Registro.java` - Eliminado tipoAtaque, agregado idPropiedadAtaque
2. `Ataque.java` - Eliminado idPropiedad
3. `AtaquePropiedad.java` - Nueva entidad
4. `RegistroCreateDTO.java` - Agregado idPropiedadAtaque
5. `RegistroUpdateDTO.java` - Agregado idPropiedadAtaque
6. `AtaquePropiedadRepository.java` - Nuevo repository
7. `SmashnotestBackController.java` - Lógica actualizada + nuevo endpoint
