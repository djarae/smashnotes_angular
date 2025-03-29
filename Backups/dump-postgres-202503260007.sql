--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-03-26 00:07:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- TOC entry 4920 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-ES';


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 4920
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 17115)
-- Name: escenario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.escenario (
    id integer NOT NULL,
    nombre character varying NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 17120)
-- Name: movimiento; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movimiento (
    id integer NOT NULL,
    nombre text NOT NULL,
    abreviatura character varying NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 17125)
-- Name: personaje; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personaje (
    id integer NOT NULL,
    echo integer NOT NULL,
    nombre character varying NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 17130)
-- Name: posicion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posicion (
    id integer NOT NULL,
    nombre text NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 17135)
-- Name: registro; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.registro (
    id integer NOT NULL,
    idpersonajeemisor integer NOT NULL,
    idpersonajereceptor integer NOT NULL,
    idmovimiento integer NOT NULL,
    idescenario integer NOT NULL,
    idposicion integer NOT NULL,
    porcentajeko integer NOT NULL
);


--
-- TOC entry 4910 (class 0 OID 17115)
-- Dependencies: 217
-- Data for Name: escenario; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.escenario VALUES (1, 'Final Destination');
INSERT INTO public.escenario VALUES (2, 'Battlefield');
INSERT INTO public.escenario VALUES (3, 'Small Battlefield');
INSERT INTO public.escenario VALUES (4, 'Pokemon Stadium 2');
INSERT INTO public.escenario VALUES (5, 'Smashville');
INSERT INTO public.escenario VALUES (6, 'Town and City');
INSERT INTO public.escenario VALUES (7, 'Kalos Pokemon League');
INSERT INTO public.escenario VALUES (8, 'Hollow Bastion');


--
-- TOC entry 4911 (class 0 OID 17120)
-- Dependencies: 218
-- Data for Name: movimiento; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.movimiento VALUES (1, 'Jab', 'Jab');
INSERT INTO public.movimiento VALUES (2, 'Forward Tilt', 'F-Tilt');
INSERT INTO public.movimiento VALUES (3, 'Up Tilt', 'U-Tilt');
INSERT INTO public.movimiento VALUES (4, 'Down Tilt', 'D-Tilt');
INSERT INTO public.movimiento VALUES (5, 'Dash Attack', 'D-Attack');
INSERT INTO public.movimiento VALUES (6, 'Forward Smash', 'F-Smash');
INSERT INTO public.movimiento VALUES (7, 'Up Smash', 'U-Smash');
INSERT INTO public.movimiento VALUES (8, 'Down Smash', 'D-Smash');
INSERT INTO public.movimiento VALUES (9, 'Neutral Air', 'N-Air');
INSERT INTO public.movimiento VALUES (14, 'Neutral Special', 'N-Special');
INSERT INTO public.movimiento VALUES (15, 'Side Special', 'S-Special');
INSERT INTO public.movimiento VALUES (16, 'Up Special', 'U-Special');
INSERT INTO public.movimiento VALUES (17, 'Down Special', 'D-Special');
INSERT INTO public.movimiento VALUES (10, 'Forward Air', 'F-Air');
INSERT INTO public.movimiento VALUES (11, 'Back Air', 'B-Air');
INSERT INTO public.movimiento VALUES (12, 'Up Air', 'A-Air');
INSERT INTO public.movimiento VALUES (13, 'Down Air', 'D-Air');


--
-- TOC entry 4912 (class 0 OID 17125)
-- Dependencies: 219
-- Data for Name: personaje; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.personaje VALUES (1, 1, 'Mario');
INSERT INTO public.personaje VALUES (2, 1, 'Donkey Kong');
INSERT INTO public.personaje VALUES (3, 1, 'Link');
INSERT INTO public.personaje VALUES (4, 1, 'Samus');
INSERT INTO public.personaje VALUES (5, 1, 'Yoshi');
INSERT INTO public.personaje VALUES (6, 1, 'Kirby');
INSERT INTO public.personaje VALUES (7, 1, 'Fox');
INSERT INTO public.personaje VALUES (8, 1, 'Pikachu');
INSERT INTO public.personaje VALUES (9, 1, 'Luigi');
INSERT INTO public.personaje VALUES (10, 1, 'Ness');
INSERT INTO public.personaje VALUES (11, 1, 'Captain Falcon');
INSERT INTO public.personaje VALUES (12, 1, 'Jigglypuff');
INSERT INTO public.personaje VALUES (13, 1, 'Peach');
INSERT INTO public.personaje VALUES (14, 1, 'Bowser');
INSERT INTO public.personaje VALUES (15, 1, 'Ice Climbers');
INSERT INTO public.personaje VALUES (16, 1, 'Sheik');
INSERT INTO public.personaje VALUES (17, 1, 'Zelda');
INSERT INTO public.personaje VALUES (18, 1, 'Dr. Mario');
INSERT INTO public.personaje VALUES (19, 1, 'Pichu');
INSERT INTO public.personaje VALUES (20, 1, 'Falco');
INSERT INTO public.personaje VALUES (21, 1, 'Marth');
INSERT INTO public.personaje VALUES (22, 1, 'Young Link');
INSERT INTO public.personaje VALUES (23, 1, 'Ganondorf');
INSERT INTO public.personaje VALUES (24, 1, 'Mewtwo');
INSERT INTO public.personaje VALUES (25, 1, 'Roy');
INSERT INTO public.personaje VALUES (26, 1, 'Mr. Game & Watch');
INSERT INTO public.personaje VALUES (27, 1, 'Meta Knight');
INSERT INTO public.personaje VALUES (28, 1, 'Pit');
INSERT INTO public.personaje VALUES (29, 1, 'Zero Suit Samus');
INSERT INTO public.personaje VALUES (30, 1, 'Wario');
INSERT INTO public.personaje VALUES (31, 1, 'Snake');
INSERT INTO public.personaje VALUES (32, 1, 'Ike');
INSERT INTO public.personaje VALUES (33, 1, 'Squirtle');
INSERT INTO public.personaje VALUES (34, 1, 'Ivysaur');
INSERT INTO public.personaje VALUES (35, 1, 'Charizard');
INSERT INTO public.personaje VALUES (36, 1, 'Diddy Kong');
INSERT INTO public.personaje VALUES (37, 1, 'Lucas');
INSERT INTO public.personaje VALUES (38, 1, 'Sonic');
INSERT INTO public.personaje VALUES (39, 1, 'King Dedede');
INSERT INTO public.personaje VALUES (40, 1, 'Olimar');
INSERT INTO public.personaje VALUES (41, 1, 'Lucario');
INSERT INTO public.personaje VALUES (42, 1, 'R.O.B.');
INSERT INTO public.personaje VALUES (43, 1, 'Toon Link');
INSERT INTO public.personaje VALUES (44, 1, 'Wolf');
INSERT INTO public.personaje VALUES (45, 1, 'Villager');
INSERT INTO public.personaje VALUES (46, 1, 'Mega Man');
INSERT INTO public.personaje VALUES (47, 1, 'Wii Fit Trainer');
INSERT INTO public.personaje VALUES (48, 1, 'Rosalina & Luma');
INSERT INTO public.personaje VALUES (49, 1, 'Little Mac');
INSERT INTO public.personaje VALUES (50, 1, 'Greninja');
INSERT INTO public.personaje VALUES (51, 1, 'Mii Brawler');
INSERT INTO public.personaje VALUES (52, 1, 'Mii Swordfighter');
INSERT INTO public.personaje VALUES (53, 1, 'Mii Gunner');
INSERT INTO public.personaje VALUES (54, 1, 'Palutena');
INSERT INTO public.personaje VALUES (55, 1, 'Pac-Man');
INSERT INTO public.personaje VALUES (56, 1, 'Robin');
INSERT INTO public.personaje VALUES (57, 1, 'Shulk');
INSERT INTO public.personaje VALUES (58, 1, 'Bowser Jr.');
INSERT INTO public.personaje VALUES (59, 1, 'Dunk Hunt');
INSERT INTO public.personaje VALUES (60, 1, 'Ryu');
INSERT INTO public.personaje VALUES (61, 1, 'Cloud');
INSERT INTO public.personaje VALUES (62, 1, 'Corrin');
INSERT INTO public.personaje VALUES (63, 1, 'Bayonetta');
INSERT INTO public.personaje VALUES (64, 1, 'Inkling');
INSERT INTO public.personaje VALUES (65, 1, 'Ridley');
INSERT INTO public.personaje VALUES (66, 1, 'Simon');
INSERT INTO public.personaje VALUES (67, 1, 'King K. Rool');
INSERT INTO public.personaje VALUES (68, 1, 'Isabelle ');
INSERT INTO public.personaje VALUES (69, 1, 'Incineroar');
INSERT INTO public.personaje VALUES (70, 1, 'Piranha Plant');
INSERT INTO public.personaje VALUES (71, 1, 'Joker ');
INSERT INTO public.personaje VALUES (72, 1, 'Hero');
INSERT INTO public.personaje VALUES (73, 1, 'Banjo & Kazooie');
INSERT INTO public.personaje VALUES (74, 1, 'Terry');
INSERT INTO public.personaje VALUES (75, 1, 'Byleth');
INSERT INTO public.personaje VALUES (76, 1, 'Min Min');
INSERT INTO public.personaje VALUES (77, 1, 'Steve/Alex');
INSERT INTO public.personaje VALUES (78, 1, 'Sephiroth');
INSERT INTO public.personaje VALUES (79, 1, 'Pyra');
INSERT INTO public.personaje VALUES (80, 1, 'Mythra');
INSERT INTO public.personaje VALUES (81, 1, 'Kazuya');
INSERT INTO public.personaje VALUES (82, 1, 'Sora');


--
-- TOC entry 4913 (class 0 OID 17130)
-- Dependencies: 220
-- Data for Name: posicion; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posicion VALUES (1, 'Plataforma Principal');


--
-- TOC entry 4914 (class 0 OID 17135)
-- Dependencies: 221
-- Data for Name: registro; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.registro VALUES (2, 35, 36, 16, 1, 1, 100);
INSERT INTO public.registro VALUES (3, 35, 73, 16, 1, 1, 111);
INSERT INTO public.registro VALUES (4, 35, 66, 16, 1, 1, 114);
INSERT INTO public.registro VALUES (5, 35, 74, 16, 1, 1, 119);
INSERT INTO public.registro VALUES (1, 35, 63, 16, 1, 1, 98);


--
-- TOC entry 4758 (class 2606 OID 17139)
-- Name: escenario escenario_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.escenario
    ADD CONSTRAINT escenario_pkey PRIMARY KEY (id);


--
-- TOC entry 4760 (class 2606 OID 17141)
-- Name: movimiento movimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movimiento
    ADD CONSTRAINT movimiento_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 17143)
-- Name: personaje personaje_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personaje
    ADD CONSTRAINT personaje_pkey PRIMARY KEY (id, echo);


--
-- TOC entry 4764 (class 2606 OID 17145)
-- Name: registro registro_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registro
    ADD CONSTRAINT registro_pkey PRIMARY KEY (id);


-- Completed on 2025-03-26 00:07:37

--
-- PostgreSQL database dump complete
--

