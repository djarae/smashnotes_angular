-- Script para actualizar la base de datos con las propiedades de ataque

-- 1. Crear la tabla ataque_propiedad si no existe
CREATE TABLE IF NOT EXISTS public.ataque_propiedad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    abreviatura VARCHAR(255) NOT NULL
);

-- 2. Insertar los valores por defecto
INSERT INTO public.ataque_propiedad (id, nombre, abreviatura) VALUES (1, 'Damage', 'DMG') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.ataque_propiedad (id, nombre, abreviatura) VALUES (2, 'Kill', 'KILL') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.ataque_propiedad (id, nombre, abreviatura) VALUES (3, 'Tumbling', 'TUMBL') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.ataque_propiedad (id, nombre, abreviatura) VALUES (4, 'Spike', 'SPIKE') ON CONFLICT (id) DO NOTHING;

-- 3. Agregar la columna id_ataque_propiedad a la tabla registro
ALTER TABLE public.registro ADD COLUMN IF NOT EXISTS id_ataque_propiedad INTEGER;

-- 4. Agregar la restricción de clave foránea
ALTER TABLE public.registro 
ADD CONSTRAINT fk_registro_ataque_propiedad 
FOREIGN KEY (id_ataque_propiedad) 
REFERENCES public.ataque_propiedad (id);

-- 5. Eliminar columnas obsoletas (Opcional, ejecutar con precaución)
-- ALTER TABLE public.registro DROP COLUMN IF EXISTS tipo_ataque;
-- ALTER TABLE public.ataque DROP COLUMN IF EXISTS id_propiedad;
