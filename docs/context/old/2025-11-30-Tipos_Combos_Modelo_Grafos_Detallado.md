# Tipos de Combos y Representación como Grafos de Decisión

**Fecha:** 30 de Noviembre 2025
**Contexto:** Sistema de análisis de Fighting Games - SmashNotes
**Objetivo:** Documentar en detalle cómo representar combos condicionales mediante grafos dirigidos

---

## 1. Clasificación de Combos en Fighting Games

### 1.1 True Combos (Combos Verdaderos)
**Definición:** Secuencias de ataques garantizadas donde el oponente no puede escapar si se ejecutan correctamente.

**Características:**
- No hay opciones para el oponente (hitstun garantizado)
- Funcionan en rangos específicos de porcentaje
- Son deterministas (siempre el mismo resultado)

**Ejemplo:**
```
Mario a 40%:
Down Throw → Up Air → Up Air → Up Air
```

**Representación en Grafo:**
```
[DThrow] --garantizado--> [UAir₁] --garantizado--> [UAir₂] --garantizado--> [UAir₃]
```
Es un **grafo lineal** (lista enlazada simple).

---

### 1.2 Follow-ups (Seguimientos)
**Definición:** Ataques que no son garantizados pero tienen alta probabilidad de conectar según la reacción/DI del oponente.

**Características:**
- Dependen del DI (Directional Influence) del rival
- No son 100% garantizados pero son "true" con DI malo
- La efectividad cambia según el %

**Ejemplo:**
```
Fox a 80%:
Nair → (DI hacia adentro: UpAir | DI hacia afuera: Fair | DI neutral: Nair)
```

**Representación en Grafo:**
```
                    [Nair]
                      |
         +------------+------------+
         |            |            |
    [DI Adentro]  [DI Afuera]  [DI Neutral]
         |            |            |
      [UpAir]      [Fair]       [Nair]
```

**Diferencia con True Combo:** Hay **ramificación basada en input del oponente**, pero una vez tomado el camino, el siguiente hit es garantizado.

---

### 1.3 Tech Chase (Persecución de Techs)
**Definición:** Situaciones donde el oponente está en el suelo y debe elegir una opción de tech. El jugador ofensivo "lee" (predice) la opción y castiga en consecuencia.

**Características:**
- El oponente tiene 4+ opciones (Tech In-place, Tech Roll Left/Right, No Tech/Getup Attack)
- Requiere **lectura/predicción** del atacante
- Las ramas son **excluyentes** (solo una sucede)

**Ejemplo:**
```
Captain Falcon después de Down Throw (70%):
- Si Tech In-place → Grab
- Si Tech Roll Izquierda → Dash Attack
- Si Tech Roll Derecha → Knee (Fair)
- Si No Tech (getup normal) → Jab Reset → Knee
```

**Representación en Grafo:**
```
                      [DThrow]
                         |
        +----------------+----------------+----------------+
        |                |                |                |
   [Tech In]        [Tech Left]      [Tech Right]      [No Tech]
        |                |                |                |
     [Grab]         [DashAtk]          [Fair]          [Jab]
                                                           |
                                                        [Fair]
```

**Complejidad:** El grafo tiene **múltiples ramas** desde un nodo, y la elección depende 100% del oponente.

---

### 1.4 Situaciones 50/50
**Definición:** Escenarios de ventaja donde el atacante tiene múltiples opciones viables, y debe predecir la defensa del rival.

**Características:**
- Ambos jugadores toman decisiones simultáneamente
- No hay opción "correcta" universal (rock-paper-scissors)
- La efectividad depende del contexto (%, posición, etc.)

**Ejemplo:**
```
Jugador en ledge (borde del escenario):
Atacante puede:
- Si oponente hace ledge jump → UpAir
- Si oponente hace neutral getup → Grab
- Si oponente hace roll → FSmash
- Si oponente hace ledge attack → Shield → Grab
```

**Representación en Grafo:**
```
                   [Jugador en Ledge]
                          |
       +------------------+------------------+------------------+
       |                  |                  |                  |
  [Ledge Jump]      [Neutral Getup]    [Ledge Roll]      [Ledge Attack]
       |                  |                  |                  |
    [UpAir]            [Grab]            [FSmash]      [Shield → Grab]
```

**Diferencia con Tech Chase:** En 50/50, **ambos** jugadores toman decisiones activas. En Tech Chase, solo el defensor elige (el atacante reacciona).

---

## 2. Modelo Avanzado: Grafos de Decisión en Base de Datos

### 2.1 Estructura de Tablas

#### Tabla: `combo`
Define el combo como entidad.

```sql
CREATE TABLE combo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    abreviatura VARCHAR(50),
    id_personaje INT,  -- A qué personaje pertenece
    tipo_combo ENUM('true_combo', 'follow_up', 'tech_chase', '50_50', 'otro') DEFAULT 'true_combo',
    descripcion TEXT,  -- Notas adicionales
    FOREIGN KEY (id_personaje) REFERENCES personaje(id)
);
```

**Ejemplo de registros:**
```sql
INSERT INTO combo VALUES 
(1, 'Mario Ladder Combo', 'MLadder', 1, 'true_combo', 'Down Throw → UAir × 3'),
(2, 'Fox Nair Follow-ups', 'FoxNair', 2, 'follow_up', 'Nair → variable según DI'),
(3, 'Falcon DThrow Tech Chase', 'FalconTC', 3, 'tech_chase', 'Cobertura de todas las opciones de tech');
```

---

#### Tabla: `combo_nodo`
Cada nodo representa un **estado** en el combo (un movimiento o situación).

```sql
CREATE TABLE combo_nodo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_combo INT NOT NULL,
    id_movimiento INT,  -- FK a la tabla movimiento (puede ser NULL si es un "estado" sin movimiento)
    es_nodo_inicial BOOLEAN DEFAULT FALSE,  -- ¿Es el primer movimiento del combo?
    descripcion VARCHAR(200),  -- Ej: "Después de DI hacia adentro", "Oponente en el suelo"
    FOREIGN KEY (id_combo) REFERENCES combo(id),
    FOREIGN KEY (id_movimiento) REFERENCES movimiento(id)
);
```

**Ejemplo de registros:**
```sql
-- Combo 1: Mario Ladder (True Combo lineal)
INSERT INTO combo_nodo VALUES
(1, 1, 10, TRUE, 'Down Throw inicial'),     -- Nodo inicial
(2, 1, 15, FALSE, 'Primer Up Air'),
(3, 1, 15, FALSE, 'Segundo Up Air'),
(4, 1, 15, FALSE, 'Tercer Up Air');

-- Combo 2: Fox Nair Follow-ups (Con ramificación por DI)
INSERT INTO combo_nodo VALUES
(5, 2, 20, TRUE, 'Nair inicial'),             -- Nodo inicial
(6, 2, 21, FALSE, 'Up Air (DI adentro)'),
(7, 2, 22, FALSE, 'Fair (DI afuera)'),
(8, 2, 20, FALSE, 'Nair (DI neutral)');
```

---

#### Tabla: `combo_transicion`
Define las **conexiones** entre nodos (las aristas del grafo).

```sql
CREATE TABLE combo_transicion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_nodo_origen INT NOT NULL,
    id_nodo_destino INT NOT NULL,
    condicion VARCHAR(200),  -- NULL si es garantizado, sino "DI adentro", "Tech Roll Left", etc.
    probabilidad_exito DECIMAL(5,2),  -- 0.00 a 100.00 (% de éxito observado, NULL si no hay datos)
    notas TEXT,  -- Información adicional
    FOREIGN KEY (id_nodo_origen) REFERENCES combo_nodo(id),
    FOREIGN KEY (id_nodo_destino) REFERENCES combo_nodo(id)
);
```

**Ejemplo de registros:**
```sql
-- Combo 1: Mario Ladder (transiciones garantizadas)
INSERT INTO combo_transicion VALUES
(1, 1, 2, NULL, 100.00, 'Garantizado entre 40-60%'),
(2, 2, 3, NULL, 100.00, 'Garantizado con buen timing'),
(3, 3, 4, NULL, 100.00, 'Remate del combo');

-- Combo 2: Fox Nair Follow-ups (transiciones condicionales)
INSERT INTO combo_transicion VALUES
(4, 5, 6, 'DI hacia adentro', 85.00, 'Requiere perseguir ligeramente'),
(5, 5, 7, 'DI hacia afuera', 90.00, 'Más fácil de conectar'),
(6, 5, 8, 'DI neutral o malo', 95.00, 'Casi garantizado');
```

---

### 2.2 Ventajas del Modelo de Grafos

#### A) Flexibilidad Total
- **True Combos:** Grafos sin ramificaciones (todas las transiciones tienen `condicion = NULL`)
- **Combos condicionales:** Grafos con múltiples transiciones desde un nodo
- **Combos híbridos:** Mezcla de secciones garantizadas y condicionales

#### B) Análisis de Datos
Con este modelo puedes hacer consultas como:

**"¿Cuál es el % promedio de éxito del camino DI adentro vs DI afuera?"**
```sql
SELECT condicion, AVG(probabilidad_exito) AS exito_promedio
FROM combo_transicion
WHERE id_nodo_origen IN (SELECT id FROM combo_nodo WHERE id_combo = 2)
GROUP BY condicion;
```

**"¿Cuántas opciones tiene el oponente después del Down Throw de Falcon?"**
```sql
SELECT COUNT(*) AS num_opciones
FROM combo_transicion
WHERE id_nodo_origen = (SELECT id FROM combo_nodo WHERE id_combo = 3 AND es_nodo_inicial = TRUE);
```

#### C) Actualización de Probabilidades con Datos Reales
A medida que registras replays/partidas, puedes actualizar el campo `probabilidad_exito`:

```sql
UPDATE combo_transicion
SET probabilidad_exito = (
    SELECT (COUNT(CASE WHEN exito = TRUE THEN 1 END) * 100.0 / COUNT(*))
    FROM registro_detalle_combo
    WHERE id_transicion = combo_transicion.id
)
WHERE id = ?;
```

---

### 2.3 Ejemplo Completo: Captain Falcon Tech Chase

#### Definición del Combo
```sql
INSERT INTO combo (nombre, abreviatura, id_personaje, tipo_combo, descripcion)
VALUES ('Falcon DThrow Tech Chase', 'FalconTC', 3, 'tech_chase', 'Cobertura completa de techs tras DThrow a 70%');
```

#### Nodos del Grafo
```sql
INSERT INTO combo_nodo (id_combo, id_movimiento, es_nodo_inicial, descripcion) VALUES
(1, 3, 10, TRUE, 'Down Throw inicial'),           -- ID 1
(2, 3, 12, FALSE, 'Grab (si Tech In-place)'),     -- ID 2
(3, 3, 13, FALSE, 'Dash Attack (si Tech Left)'),  -- ID 3
(4, 3, 14, FALSE, 'Knee (si Tech Right)'),        -- ID 4
(5, 3, 11, FALSE, 'Jab Reset (si No Tech)'),      -- ID 5
(6, 3, 14, FALSE, 'Knee tras Jab Reset');         -- ID 6
```

#### Transiciones (Aristas)
```sql
INSERT INTO combo_transicion (id_nodo_origen, id_nodo_destino, condicion, probabilidad_exito, notas) VALUES
(1, 2, 'Tech In-place', NULL, 'Requiere reacción rápida, esperar en el sitio'),
(1, 3, 'Tech Roll Izquierda', NULL, 'Dash inmediato hacia la izquierda'),
(1, 4, 'Tech Roll Derecha', NULL, 'Dash inmediato hacia la derecha'),
(1, 5, 'No Tech (getup normal)', NULL, 'Esperar a que se levante'),
(5, 6, NULL, 100.00, 'Garantizado tras Jab Reset');
```

#### Visualización del Grafo
```
                          [DThrow] ①
                              |
          +-------------------+-------------------+-------------------+
          |                   |                   |                   |
    [Tech In-place]    [Tech Roll L]      [Tech Roll R]        [No Tech]
          |                   |                   |                   |
       [Grab] ②         [DashAtk] ③           [Knee] ④            [Jab] ⑤
                                                                      |
                                                                 (garantizado)
                                                                      |
                                                                  [Knee] ⑥
```

---

### 2.4 Consultas de Ejemplo

#### ¿Cuántas opciones defensivas cubre este tech chase?
```sql
SELECT COUNT(*) AS num_opciones
FROM combo_transicion
WHERE id_nodo_origen = 1;  -- El nodo del DThrow
-- Resultado: 4 opciones
```

#### ¿Qué movimientos son el "finisher" de cada rama?
```sql
SELECT 
    ct.condicion AS opcion_defensor,
    m.nombre AS castigo_optimo
FROM combo_transicion ct
JOIN combo_nodo cn ON ct.id_nodo_destino = cn.id
JOIN movimiento m ON cn.id_movimiento = m.id
WHERE ct.id_nodo_origen = 1;
```

**Resultado:**
```
| opcion_defensor       | castigo_optimo |
|-----------------------|----------------|
| Tech In-place         | Grab           |
| Tech Roll Izquierda   | Dash Attack    |
| Tech Roll Derecha     | Knee           |
| No Tech               | Jab Reset      |
```

---

## 3. Implementación en el Frontend

### 3.1 Visualización de Grafos
Para mostrar estos combos visualmente, necesitarías una librería de grafos como:
- **Cytoscape.js** (JavaScript)
- **D3.js** (para visualizaciones custom)
- **mermaid.js** (si quieres diagramas de flujo simples)

### 3.2 Editor de Combos
Un editor visual donde el usuario:
1. Arrastra movimientos desde un panel lateral
2. Los conecta con flechas
3. Etiqueta las condiciones en cada flecha
4. Guarda el grafo → se traduce a registros en `combo_nodo` y `combo_transicion`

---

## 4. Migración Gradual

### Fase 1: Mantener estructura actual
- Tablas `movimiento` y `combo` separadas
- `combo_movimiento` para combos lineales
- Campo `tipo_combo` agregado a `combo`

### Fase 2: Implementar tablas de grafos
- Crear `combo_nodo` y `combo_transicion`
- Migrar combos existentes (los lineales → grafos sin ramificaciones)

### Fase 3: Poblar con combos condicionales
- A medida que aprendas más del juego, agregar follow-ups y tech chases
- Actualizar probabilidades con datos de partidas reales

---

## 5. Conclusión

El modelo de **grafos dirigidos** es la forma más robusta y escalable de representar la complejidad real de los combos en fighting games. Aunque es más complejo de implementar, ofrece:

1. **Representación exacta** de la naturaleza condicional de los combos
2. **Capacidad de análisis** (qué rutas son más exitosas)
3. **Escalabilidad** (agregar nuevos tipos sin cambiar estructura)
4. **Visualización intuitiva** (los jugadores entienden flowcharts)

Para tu caso, la recomendación es:
- **Ahora:** Agregar `tipo_combo` a la tabla `combo`
- **Próximo paso:** Cuando quieras profundizar, implementar el modelo de grafos
- **Largo plazo:** Integrar datos de replays para calcular probabilidades reales
