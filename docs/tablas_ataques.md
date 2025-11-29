# Modelo de Datos — Versión Resumida (Markdown)

## 1. Movimiento
Representa un movimiento individual.

**Campos**
- id (PK)
- nombre
- abreviatura


## 2. Combo
Representa un combo compuesto por movimientos.

**Campos**
- id (PK)
- nombre
- abreviatura
- apodo


## 3. Combo_movimiento
Tabla intermedia: define qué movimientos componen un combo.

**Campos**
- id (PK)
- id_combo (FK → combo.id)
- id_movimiento (FK → movimiento.id)



## 4. Ataque
Concepto unificado: puede ser un movimiento o un combo.

**Campos**
- id (PK)
- id_movimiento (FK opcional)
- id_combo (FK opcional)
- tipo_ataque ('movimiento' | 'combo')
- id_propiedad (FK → ataque_propiedad.id)
- nombre
- descripcion

**Lógica**
- Si tipo_ataque = "movimiento" → id_movimiento obligatorio, id_combo NULL  
- Si tipo_ataque = "combo" → id_combo obligatorio, id_movimiento NULL



## 5. Ataque_propiedad
Propiedades que describen qué hace un ataque.

**Campos**
- id (PK)
- nombre (único)
- abreviatura

Ejemplos: kill, dmg, tumble, spike
