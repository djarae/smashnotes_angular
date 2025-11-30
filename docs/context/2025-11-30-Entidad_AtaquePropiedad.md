# Entidad AtaquePropiedad - Creación

**Fecha:** 2025-11-30  
**Propósito:** Mapear la tabla `ataque_propiedad` que contiene las propiedades de los ataques

---

## 📋 Entidad Creada

### `AtaquePropiedad.java`

**Ubicación:** `smashnotes_springboot_back/src/main/java/smashnotest_back/matchups/data/entitys/AtaquePropiedad.java`

**Estructura:**
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

## 🔗 Relación con Ataque

**Modificación en `Ataque.java`:**

**Antes:**
```java
@Column(name = "id_propiedad")
private Integer idPropiedad;
```

**Después:**
```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_propiedad")
private AtaquePropiedad idPropiedad;
```

---

## 📊 Datos en Base de Datos

La tabla `ataque_propiedad` contiene:

| ID | Nombre   | Abreviatura |
|----|----------|-------------|
| 1  | Damage   | DMG         |
| 2  | Kill     | KILL        |
| 3  | Tumbling | TUMBL       |
| 4  | Spike    | SPIKE       |

---

## 🎯 Uso

Ahora puedes acceder a la propiedad de un ataque de forma relacional:

```java
Ataque ataque = ataqueRepository.findById(1).orElse(null);
if (ataque != null && ataque.getIdPropiedad() != null) {
    String nombrePropiedad = ataque.getIdPropiedad().getNombre(); // "Damage"
    String abreviatura = ataque.getIdPropiedad().getAbreviatura(); // "DMG"
}
```

---

## ✅ Estado

- [x] Entidad `AtaquePropiedad` creada
- [x] Relación en `Ataque` actualizada
- [x] Compilación exitosa
- [x] Listo para usar

---

## 📝 Notas

- La relación es `@ManyToOne` porque muchos ataques pueden tener la misma propiedad
- Se usa `FetchType.LAZY` para optimizar el rendimiento
- No se requieren cambios en la base de datos, la tabla ya existe
