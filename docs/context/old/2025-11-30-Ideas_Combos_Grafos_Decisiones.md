# Ideas Futuras: Representación de Combos como Grafos de Decisión

**Fecha:** 30 de Noviembre 2025
**Contexto:** Sistema de análisis de Fighting Games - SmashNotes

---

## Problema a Resolver

Los combos en fighting games no son todos lineales. Existen varios tipos:

1. **True Combos:** Secuencias garantizadas (no hay escape)
   - Ejemplo: `Jab → Jab → UpTilt → UpAir`
   - Siempre funcionan si se ejecutan correctamente

2. **Follow-ups:** Secuencias probables pero no garantizadas
   - Dependen de DI (Directional Influence) del oponente
   - Ejemplo: `Nair → (DI óptimo: UpAir | DI malo: Fair)`

3. **Tech Chase:** Secuencias de lectura basadas en opciones del oponente
   - Ejemplo tras un Down Throw:
     - `Si Tech In-place → Grab`
     - `Si Tech Roll Izq → Dash Attack`
     - `Si Tech Roll Der → UpSmash`
     - `Si No Tech → Jab Reset`

4. **50/50 Situations:** Situaciones de ventaja con múltiples opciones viables
   - Ejemplo: `Jab at ledge → (Shield: Grab | Jump: UpAir | Neutral: FTilt)`

---

## Propuesta Conceptual: Grafos Dirigidos

Todos estos escenarios son **grafos dirigidos** donde:
- **Nodos:** Movimientos o estados del juego
- **Aristas:** Transiciones (pueden ser condicionales)
- **Condiciones:** Etiquetas en las aristas que determinan la ruta

### Ejemplo Visual (True Combo)
```
[Jab] → [Jab] → [UpTilt] → [UpAir]
```
Grafo lineal sin ramificaciones.

### Ejemplo Visual (Tech Chase)
```
             [Down Throw]
                  |
         +--------+--------+--------+
         |        |        |        |
   (Tech In) (Tech L) (Tech R) (No Tech)
         |        |        |        |
      [Grab]  [DashAtk] [UpSmash] [Jab]
```
Grafo con 4 ramas basadas en la decisión del oponente.

---

## Diseño de Base de Datos (Opciones)

### Opción 1: Campo "Tipo de Combo" (Simple)

**Tabla: `combo`**
```sql
id INT PRIMARY KEY,
nombre VARCHAR(100),
abreviatura VARCHAR(50),
tipo_combo ENUM('true_combo', 'follow_up', 'tech_chase', '50_50')
```

**Tabla: `combo_movimiento`** (Para True Combos)
```sql
id_combo INT,
id_movimiento INT,
orden INT,  -- 1, 2, 3... (secuencia lineal)
FOREIGN KEY (id_combo) REFERENCES combo(id),
FOREIGN KEY (id_movimiento) REFERENCES movimiento(id)
```

**Pros:**
- Sencillo de implementar YA
- Suficiente para registrar que "este combo existe"
- Fácil de mantener

**Contras:**
- No modela las decisiones/condiciones
- No puede representar rutas múltiples

---

### Opción 2: Grafo de Decisiones (Complejo, Escalable)

**Tabla: `combo`** (Igual que Opción 1)

**Tabla: `combo_nodo`** (Cada punto del combo)
```sql
id INT PRIMARY KEY,
id_combo INT,
id_movimiento INT,
es_nodo_inicial BOOLEAN,  -- TRUE para el primer movimiento
descripcion VARCHAR(200),  -- Ej: "Si oponente hace Tech Roll Left"
FOREIGN KEY (id_combo) REFERENCES combo(id),
FOREIGN KEY (id_movimiento) REFERENCES movimiento(id)
```

**Tabla: `combo_transicion`** (Las conexiones entre nodos)
```sql
id INT PRIMARY KEY,
id_nodo_origen INT,
id_nodo_destino INT,
condicion VARCHAR(200),  -- Ej: "DI óptimo", "Shield", "Tech In Place", NULL si es garantizado
probabilidad_exito FLOAT,  -- 0.0 a 1.0 (opcional, basado en datos reales)
FOREIGN KEY (id_nodo_origen) REFERENCES combo_nodo(id),
FOREIGN KEY (id_nodo_destino) REFERENCES combo_nodo(id)
```

**Pros:**
- Representa CUALQUIER tipo de combo (lineal o ramificado)
- Escalable: puedes agregar nuevas condiciones sin cambiar estructura
- Permite análisis probabilístico (% éxito de cada rama)

**Contras:**
- Complejo de implementar en el frontend (necesitas un editor visual de grafos)
- Overkill si solo quieres registrar "este combo existe"
- Requiere mucha data para calcular probabilidades reales

---

## Recomendación de Implementación por Fases

### Fase 1 (Actual): Mantener lo que tienes
- Tablas separadas: `movimiento` y `combo`
- `combo_movimiento` para registrar la secuencia de un combo
- Campo `tipo_combo` (opcional) para distinguir true combos vs condicionales
- **Objetivo:** Poder registrar combos básicos en Registro

### Fase 2 (Cuando tengas 100+ registros): Agregar Metadatos
- Campo `es_true_combo BOOLEAN` en tabla `combo`
- Notas/observaciones en combo sobre condiciones (texto libre)
- **Objetivo:** Categorizar mejor los datos existentes

### Fase 3 (Cuando quieras análisis avanzado): Grafos
- Implementar `combo_nodo` y `combo_transicion`
- Migrar combos existentes a este modelo
- Crear un editor visual (tipo flowchart) para armar combos
- **Objetivo:** Visualizar rutas óptimas, calcular % de éxito por rama

---

## Conceptos Clave para Grafos

1. **Nodo Raíz:** El movimiento inicial del combo/setup
2. **Nodo Hoja:** Los posibles finales (puede haber múltiples)
3. **Condición Garantizada:** Arista sin condición (true combo)
4. **Condición de Lectura:** Arista que requiere predecir al oponente
5. **Condición de DI:** Arista basada en la dirección de escape del rival

### Ventaja del Modelo de Grafo
Con grafos, **TODO es el mismo tipo de dato**:
- Un True Combo es un grafo lineal (1 camino)
- Un 50/50 es un grafo con 2+ ramas desde un nodo
- Un Tech Chase es un grafo con ramas etiquetadas por opción del oponente

No necesitas tipos diferentes, solo consultas diferentes:
```sql
-- ¿Es un True Combo?
SELECT COUNT(DISTINCT id_nodo_destino) AS ramas
FROM combo_transicion
WHERE id_combo = ?
GROUP BY id_nodo_origen
HAVING ramas > 1;
-- Si no hay registros con ramas > 1, es True Combo
```

---

## Ejemplo Concreto: Mario Down Throw Combos

### Como True Combo (Bajo %):
```
[DThrow] → (garantizado) → [UpAir] → (garantizado) → [UpAir]
```

### Como Grafo de Decisión (Alto %):
```
                [DThrow]
                    |
           (DI hacia adentro?) 
              /          \
            SÍ           NO
            /              \
        [UpAir]         [Fair]
           |                |
    (¿Alcanza?)      (¿Alcanza?)
        /   \            /   \
      SÍ    NO         SÍ    NO
      /      \         /      \
  [UpAir]  [Nada]  [Fair]  [Nada]
```

Con el modelo de grafos, registras cada ruta y sus condiciones. Luego, al analizar replays, marcas qué ruta se tomó y si funcionó. Con el tiempo, sabes que "DI adentro → UpAir doble funciona 78% del tiempo entre 80-100%".

---

## Conclusión

**Para ahora:** Mantén las tablas actuales (`movimiento`, `combo`, `combo_movimiento`).

**Para después:** Cuando quieras profundizar, el modelo de grafos es la respuesta. Es complejo pero es la única forma realista de representar la verdadera naturaleza condicional de los combos en fighting games.

**Decisión de diseño:** Agrega un campo `tipo_combo` (string o enum) a la tabla `combo` como preparación. Cuando estés listo para grafos, ese campo te dirá qué combos necesitas migrar primero al modelo complejo.
