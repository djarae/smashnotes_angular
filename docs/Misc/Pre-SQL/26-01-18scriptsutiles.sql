select * from MOVIMIENTO order by id
select * from POSICION order by id

select * from registro order by id;


INSERT INTO movimiento (id, nombre, abreviatura) VALUES (3120, 'UpAir DiNeutro', 'DiEsp');


insert into posicion (id,nombre,id_escenario,id_posicion_comun,vertical_horizontal) values (3,'High Platform',null,null,null);


CREATE TABLE combo (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    abreviatura TEXT
);

CREATE TABLE movimiento_combo (
    id SERIAL PRIMARY KEY,
    id_combo INTEGER NOT NULL REFERENCES combo(id) ON DELETE CASCADE,
    id_movimiento INTEGER NOT NULL REFERENCES movimiento(id) ON DELETE CASCADE
);

CREATE TABLE ataque (
    id SERIAL PRIMARY KEY,

    -- Solo uno de estos FKs se usará según tipo_ataque
    id_movimiento INTEGER REFERENCES movimiento(id) ON DELETE CASCADE,
    id_combo INTEGER REFERENCES combo(id) ON DELETE CASCADE,

    tipo_ataque TEXT NOT NULL CHECK (tipo_ataque IN ('movimiento', 'combo')),

    -- Reglas de consistencia:
    CHECK (
        (tipo_ataque = 'movimiento' AND id_movimiento IS NOT NULL AND id_combo IS NULL)
        OR
        (tipo_ataque = 'combo' AND id_combo IS NOT NULL AND id_movimiento IS NULL)
    )
);


CREATE TABLE ataque_propiedad (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE
);


id_propiedad INTEGER REFERENCES ataque_propiedad(id);

drop table ataque;


CREATE TABLE ataque (
    id SERIAL PRIMARY KEY,

    -- FK a movimiento o combo (solo uno aplica)
    id_movimiento INTEGER REFERENCES movimiento(id) ON DELETE CASCADE,
    id_combo INTEGER REFERENCES combo(id) ON DELETE CASCADE,

    tipo_ataque TEXT NOT NULL CHECK (tipo_ataque IN ('movimiento', 'combo')),

    -- Nueva FK a la propiedad del ataque
    id_propiedad INTEGER REFERENCES ataque_propiedad(id),

    -- Reglas de consistencia
    CHECK (
        (tipo_ataque = 'movimiento' AND id_movimiento IS NOT NULL AND id_combo IS NULL)
        OR
        (tipo_ataque = 'combo' AND id_combo IS NOT NULL AND id_movimiento IS NULL)
    )
);


drop table ataque_propiedad;

-- 1) Tabla de propiedades de ataque (ahora con abreviatura)
CREATE TABLE ataque_propiedad (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE,
    abreviatura TEXT NOT NULL
);

select * from movimiento

delete from movimiento where id>  22




INSERT INTO ataque_propiedad (nombre, abreviatura) VALUES
  ('Damage',    'DMG'),
  ('Kill',      'KILL'),
  ('Tumbling',  'TUMBL'),
  ('Spike',     'SPIKE');





INSERT INTO ataque (id_movimiento, tipo_ataque, id_propiedad)
VALUES
(1,  'movimiento', 1),
(2,  'movimiento', 1),
(3,  'movimiento', 1),
(4,  'movimiento', 1),
(5,  'movimiento', 1),
(6,  'movimiento', 1),
(7,  'movimiento', 1),
(8,  'movimiento', 1),
(9,  'movimiento', 1),
(10, 'movimiento', 1),
(11, 'movimiento', 1),
(12, 'movimiento', 1),
(13, 'movimiento', 1),
(14, 'movimiento', 1),
(15, 'movimiento', 1),
(16, 'movimiento', 1),
(17, 'movimiento', 1),
(18, 'movimiento', 1),
(19, 'movimiento', 1),
(20, 'movimiento', 1),
(21, 'movimiento', 1);



DROP TABLE IF EXISTS movimiento_combo;

CREATE TABLE combo_movimiento (
    id SERIAL PRIMARY KEY,
    id_combo INTEGER NOT NULL REFERENCES combo(id) ON DELETE CASCADE,
    id_movimiento INTEGER NOT NULL REFERENCES movimiento(id) ON DELETE CASCADE
);



select * from combo


insert into combo (id, nombre, abreviatura)  values (1,'Bair => RazorLeaf => UAir', 'Bair/RazorL/UAir');
insert into combo (id, nombre, abreviatura)  values (2,'Dair => UAir','Dair/Uair' );
insert into "ataque" (id,id_movimiento,id_combo,tipo_ataque,id_propiedad) values (10001,null,1,'combo',1);
insert into "ataque" (id,id_movimiento,id_combo,tipo_ataque,id_propiedad) values (10002,null,2,'combo',1);

select  * from ataque;
select * from movimiento;
select * from combo;
select * from ataque_propiedad;

select * from registro order by id;



ALTER TABLE registro
DROP COLUMN porcentaje_ko;

ALTER TABLE registro
DROP COLUMN tipo_ataque;

ALTER TABLE registro
DROP COLUMN id_combo;



UPDATE registro SET porcentajeko = 105 WHERE id = 1;
UPDATE registro SET porcentajeko = 111 WHERE id = 2;
UPDATE registro SET porcentajeko = 122 WHERE id = 3;
UPDATE registro SET porcentajeko = 122 WHERE id = 4;
UPDATE registro SET porcentajeko = 125 WHERE id = 5;
UPDATE registro SET porcentajeko = 115 WHERE id = 6;
UPDATE registro SET porcentajeko = 83  WHERE id = 7;
UPDATE registro SET porcentajeko = 101 WHERE id = 8;
UPDATE registro SET porcentajeko = 96  WHERE id = 9;
UPDATE registro SET porcentajeko = 108 WHERE id = 10;
UPDATE registro SET porcentajeko = 122 WHERE id = 11;
UPDATE registro SET porcentajeko = 127 WHERE id = 12;
UPDATE registro SET porcentajeko = 23  WHERE id = 34;
UPDATE registro SET porcentajeko = 333 WHERE id = 35;



ALTER TABLE registro
ADD COLUMN id_ataque INTEGER;




UPDATE registro
SET id_ataque = id_movimiento;

ALTER TABLE registro
DROP COLUMN id_movimiento;

ALTER TABLE registro
ADD COLUMN id_movimiento INTEGER;


UPDATE registro
SET id_movimiento = id_ataque;

select * from registro


update registro set tipo_ataque=1

select * from movimiento



ALTER TABLE registro
RENAME COLUMN porcentajeko TO porcentaje_ko;


select * from registro;
select * from ataque;
select * from movimiento;
select * from posicion;


update posicion set abreviatura='Main' where id=1;
update posicion set vertical_horizontal  = 1 ;
update posicion set abreviatura='Low' where id=2;

update posicion set abreviatura='High' where id=3;


ALTER TABLE posicion DROP COLUMN id_posicion_comun;
ALTER TABLE posicion DROP COLUMN id_escenario;


update registro set tipo_ataque = 2 where id_Ataque > 9999


select * from combo;



ALTER TABLE registro
DROP COLUMN tipo_ataque ;

ALTER TABLE registro
ADD COLUMN id_propiedad_ataque integer;


select * from ataque


select * from registro




CREATE TABLE tipo_ataque (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    abreviatura TEXT
);


INSERT INTO tipo_ataque (id, nombre, abreviatura) VALUES (1, 'Movimiento', 'Mov');

INSERT INTO tipo_ataque (id, nombre, abreviatura) VALUES (2, 'Combo', 'Com');




select * from ataque_propiedad

update registro set id_ataque_propiedad= 2 

ALTER TABLE registro
DROP COLUMN id_propiedad_ataque ;

ALTER TABLE registro
ADD COLUMN id_ataque_propiedad integer;

-- Para tabla registro
ALTER TABLE registro DROP COLUMN IF EXISTS id_movimiento;
ALTER TABLE registro DROP COLUMN IF EXISTS id_combo;

-- Para tabla ataque
ALTER TABLE ataque DROP COLUMN IF EXISTS nombre;
ALTER TABLE ataque DROP COLUMN IF EXISTS abreviatura;


select * from registro
INSERT INTO public.registro (id, id_personaje_emisor, id_personaje_receptor, id_escenario, id_posicion, rage, di, porcentaje_ko, id_ataque, id_ataque_propiedad) VALUES (100, 35, 63, 1, 1, 0, TRUE, 105, 16, 2);

select * from ataque

update ataque set tipo_ataque=2 where id >1000;


SELECT conname
FROM pg_constraint
WHERE conrelid = 'ataque'::regclass;


ALTER TABLE ataque DROP CONSTRAINT ataque_tipo_ataque_check;
ALTER TABLE ataque DROP CONSTRAINT ataque_check;



ALTER TABLE ataque
DROP CONSTRAINT ataque_check;



delete from registro where id=100


select * from registro;


select * from ataque
update registro set id_ataque=12 where id =12

update registro set id_ataque_propiedad =1;
select * from ataque_propiedad 
update ataque_propiedad  set nombre = 'Kill'  where id =1 
update ataque_propiedad  set abreviatura = 'KO'  where id =1 
update ataque_propiedad  set nombre = 'Damage' where id =2
update ataque_propiedad  set abreviatura = 'DMG' where id =2
























ALTER TABLE ataque ADD COLUMN eje varchar(255);

ALTER TABLE ataque ADD CONSTRAINT ataque_eje_check CHECK (eje IN ('vertical', 'horizontal'));


ALTER TABLE posicion RENAME COLUMN vertical_horizontal TO eje;


select * from ataque;

select * from posicion;

update ataque set eje='vertical';
update posicion set eje='vertical'


ALTER TABLE posicion
ALTER COLUMN eje TYPE varchar(255)
USING eje::varchar;


insert into posicion values (4,'Edge Stage','horizontal','Corner');
insert into posicion values (5,'Edge Roll ','horizontal','Roll');
insert into posicion values (6,'Center Stage','horizontal','Center');


ALTER TABLE posicion ADD COLUMN descripcion  varchar(255)


select * from ataque;
select * from combo;

insert into combo values (100000,'TEST HORIZONTAL','TEST/HORIZONTAL');
insert into ataque values (100000,null,2,2,'horizontal');


select * from ataque;

update ataque set id_combo =100000 where id = 100000;

select * from tipo_ataque;



select * from personaje ORDER by ID;



CREATE TABLE IF NOT EXISTS usuarios (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL DEFAULT 'ADMIN'
);

select * from usuarios;
'

INSERT INTO usuarios (email, password, rol) VALUES (
    'megawhitegengar@gmail.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq4H9Q0q5aTvPxGHvl/Zy3GQQ6O1pu',
    'ADMIN'
) ON CONFLICT (email) DO NOTHING;
