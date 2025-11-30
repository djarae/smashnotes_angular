--
-- PostgreSQL database dump
--

\restrict 9pAfH8VPuDgTOlenRwoQbvFC5UD11JRIEq7ShfxlDqBKmfkkuxIpOmN64wGg5SJ

-- Dumped from database version 17.6 (0d47993)
-- Dumped by pg_dump version 17.6 (Debian 17.6-1.pgdg12+1)

-- Started on 2025-11-30 09:31:13 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', 'public', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 139360)
-- Name: ataque; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.ataque (
    id integer NOT NULL,
    id_movimiento integer,
    id_combo integer,
    tipo_ataque character varying(255) NOT NULL,
    CONSTRAINT ataque_check CHECK (((((tipo_ataque)::text = 'movimiento'::text) AND (id_movimiento IS NOT NULL) AND (id_combo IS NULL)) OR (((tipo_ataque)::text = 'combo'::text) AND (id_combo IS NOT NULL) AND (id_movimiento IS NULL)))),
    CONSTRAINT ataque_tipo_ataque_check CHECK (((tipo_ataque)::text = ANY (ARRAY['movimiento'::text, 'combo'::text])))
);


ALTER TABLE public.ataque OWNER TO neondb_owner;

--
-- TOC entry 229 (class 1259 OID 139359)
-- Name: ataque_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.ataque_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ataque_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 229
-- Name: ataque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.ataque_id_seq OWNED BY public.ataque.id;


--
-- TOC entry 228 (class 1259 OID 139349)
-- Name: ataque_propiedad; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.ataque_propiedad (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    abreviatura character varying(255) NOT NULL
);


ALTER TABLE public.ataque_propiedad OWNER TO neondb_owner;

--
-- TOC entry 227 (class 1259 OID 139348)
-- Name: ataque_propiedad_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.ataque_propiedad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ataque_propiedad_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 227
-- Name: ataque_propiedad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.ataque_propiedad_id_seq OWNED BY public.ataque_propiedad.id;


--
-- TOC entry 226 (class 1259 OID 139265)
-- Name: combo; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.combo (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    abreviatura character varying(255)
);


ALTER TABLE public.combo OWNER TO neondb_owner;

--
-- TOC entry 225 (class 1259 OID 139264)
-- Name: combo_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.combo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.combo_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 225
-- Name: combo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.combo_id_seq OWNED BY public.combo.id;


--
-- TOC entry 232 (class 1259 OID 139386)
-- Name: combo_movimiento; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.combo_movimiento (
    id integer NOT NULL,
    id_combo integer NOT NULL,
    id_movimiento integer NOT NULL
);


ALTER TABLE public.combo_movimiento OWNER TO neondb_owner;

--
-- TOC entry 231 (class 1259 OID 139385)
-- Name: combo_movimiento_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.combo_movimiento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.combo_movimiento_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 231
-- Name: combo_movimiento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.combo_movimiento_id_seq OWNED BY public.combo_movimiento.id;


--
-- TOC entry 217 (class 1259 OID 16513)
-- Name: escenario; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.escenario (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    abreviatura character varying(255)
);


ALTER TABLE public.escenario OWNER TO neondb_owner;

--
-- TOC entry 218 (class 1259 OID 16518)
-- Name: movimiento; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.movimiento (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    abreviatura character varying(255)
);


ALTER TABLE public.movimiento OWNER TO neondb_owner;

--
-- TOC entry 219 (class 1259 OID 16523)
-- Name: personaje; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.personaje (
    id integer NOT NULL,
    echo integer NOT NULL,
    nombre character varying(255) NOT NULL,
    abreviatura character varying(255)
);


ALTER TABLE public.personaje OWNER TO neondb_owner;

--
-- TOC entry 220 (class 1259 OID 16530)
-- Name: posicion; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.posicion (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    vertical_horizontal integer,
    abreviatura character varying(255)
);


ALTER TABLE public.posicion OWNER TO neondb_owner;

--
-- TOC entry 222 (class 1259 OID 98305)
-- Name: registro; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.registro (
    id bigint NOT NULL,
    id_personaje_emisor integer NOT NULL,
    id_personaje_receptor integer NOT NULL,
    id_escenario integer NOT NULL,
    id_posicion integer NOT NULL,
    rage integer,
    di boolean,
    porcentaje_ko integer,
    id_ataque bigint,
    id_propiedad_ataque integer
);


ALTER TABLE public.registro OWNER TO neondb_owner;

--
-- TOC entry 221 (class 1259 OID 98304)
-- Name: registro_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.registro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.registro_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 221
-- Name: registro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.registro_id_seq OWNED BY public.registro.id;


--
-- TOC entry 234 (class 1259 OID 204811)
-- Name: tipo_ataque; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.tipo_ataque (
    id integer NOT NULL,
    nombre text NOT NULL,
    abreviatura text
);


ALTER TABLE public.tipo_ataque OWNER TO neondb_owner;

--
-- TOC entry 233 (class 1259 OID 204810)
-- Name: tipo_ataque_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.tipo_ataque_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_ataque_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 233
-- Name: tipo_ataque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.tipo_ataque_id_seq OWNED BY public.tipo_ataque.id;


--
-- TOC entry 224 (class 1259 OID 131074)
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- TOC entry 223 (class 1259 OID 131072)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3236 (class 2604 OID 139363)
-- Name: ataque id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ataque ALTER COLUMN id SET DEFAULT nextval('ataque_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 139352)
-- Name: ataque_propiedad id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ataque_propiedad ALTER COLUMN id SET DEFAULT nextval('ataque_propiedad_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 155648)
-- Name: combo id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.combo ALTER COLUMN id SET DEFAULT nextval('combo_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 139389)
-- Name: combo_movimiento id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.combo_movimiento ALTER COLUMN id SET DEFAULT nextval('combo_movimiento_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 98308)
-- Name: registro id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.registro ALTER COLUMN id SET DEFAULT nextval('registro_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 204814)
-- Name: tipo_ataque id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipo_ataque ALTER COLUMN id SET DEFAULT nextval('tipo_ataque_id_seq'::regclass);


--
-- TOC entry 3431 (class 0 OID 139360)
-- Dependencies: 230
-- Data for Name: ataque; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.ataque (id, id_movimiento, id_combo, tipo_ataque) FROM stdin;
1	1	\N	movimiento
2	2	\N	movimiento
3	3	\N	movimiento
4	4	\N	movimiento
5	5	\N	movimiento
6	6	\N	movimiento
7	7	\N	movimiento
8	8	\N	movimiento
9	9	\N	movimiento
10	10	\N	movimiento
11	11	\N	movimiento
12	12	\N	movimiento
13	13	\N	movimiento
14	14	\N	movimiento
15	15	\N	movimiento
16	16	\N	movimiento
17	17	\N	movimiento
18	18	\N	movimiento
19	19	\N	movimiento
20	20	\N	movimiento
21	21	\N	movimiento
10001	\N	1	combo
10002	\N	2	combo
\.


--
-- TOC entry 3429 (class 0 OID 139349)
-- Dependencies: 228
-- Data for Name: ataque_propiedad; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.ataque_propiedad (id, nombre, abreviatura) FROM stdin;
1	Damage	DMG
2	Kill	KILL
3	Tumbling	TUMBL
4	Spike	SPIKE
\.


--
-- TOC entry 3427 (class 0 OID 139265)
-- Dependencies: 226
-- Data for Name: combo; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.combo (id, nombre, abreviatura) FROM stdin;
1	Bair => RazorLeaf => UAir	Bair/RazorL/UAir
2	Dair => UAir	Dair/Uair
\.


--
-- TOC entry 3433 (class 0 OID 139386)
-- Dependencies: 232
-- Data for Name: combo_movimiento; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.combo_movimiento (id, id_combo, id_movimiento) FROM stdin;
\.


--
-- TOC entry 3418 (class 0 OID 16513)
-- Dependencies: 217
-- Data for Name: escenario; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.escenario (id, nombre, abreviatura) FROM stdin;
1	Final Destination	Final
2	Battlefield	Batle
3	Small Battlefield	Small
4	Pokemon Stadium 2	PS2
5	Smashville	Smash
6	Town and City	Town
7	Kalos Pokemon League	Kalos
8	Hollow Bastion	Holow
\.


--
-- TOC entry 3419 (class 0 OID 16518)
-- Dependencies: 218
-- Data for Name: movimiento; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.movimiento (id, nombre, abreviatura) FROM stdin;
1	Jab	Jab
2	Forward Tilt	FTilt
3	Up Tilt	UTilt
4	Down Tilt	DTilt
5	Dash Attack	DashA
6	Forward Smash	FSmsh
7	Up Smash	USmsh
8	Down Smash	DSmsh
9	Neutral Air	NAir
10	Forward Air	FAir
11	Back Air	BAir
12	Up Air	UAir
13	Down Air	DAir
14	Neutral Special	NSpec
15	Side Special	SSpec
16	Up Special	USpec
17	Down Special	DSpec
18	Forward Throw	FGrab
19	Back Throw	BGrab
20	Up Throw	UGrab
21	Down Throw	DGrab
\.


--
-- TOC entry 3420 (class 0 OID 16523)
-- Dependencies: 219
-- Data for Name: personaje; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.personaje (id, echo, nombre, abreviatura) FROM stdin;
1	1	Mario	Mario
2	1	Donkey Kong	Donky
3	1	Link	Link
4	1	Samus	Samus
5	1	Yoshi	Yoshi
6	1	Kirby	Kirby
7	1	Fox	Fox
9	1	Luigi	Luigi
10	1	Ness	Ness
13	1	Peach	Peach
16	1	Sheik	Sheik
17	1	Zelda	Zelda
19	1	Pichu	Pichu
20	1	Falco	Falco
21	1	Marth	Marth
23	1	Ganondorf	Ganon
24	1	Mewtwo	Mewtw
25	1	Roy	Roy
26	1	Mr. Game & Watch	Mr. G
27	1	Meta Knight	Meta 
28	1	Pit	Pit
29	1	Zero Suit Samus	Zero 
30	1	Wario	Wario
31	1	Snake	Snake
32	1	Ike	Ike
33	1	Squirtle	Squir
36	1	Diddy Kong	Diddy
37	1	Lucas	Lucas
38	1	Sonic	Sonic
42	1	R.O.B.	R.O.B
44	1	Wolf	Wolf
48	1	Rosalina & Luma	Rosal
50	1	Greninja	Greni
51	1	Mii Brawler	Mii B
52	1	Mii Swordfighter	Mii S
53	1	Mii Gunner	Mii G
55	1	Pac-Man	Pac-M
56	1	Robin	Robin
57	1	Shulk	Shulk
60	1	Ryu	Ryu
61	1	Cloud	Cloud
62	1	Corrin	Corri
64	1	Inkling	Inkli
66	1	Simon	Simon
69	1	Incineroar	Incin
71	1	Joker	Joker
72	1	Hero	Hero
73	1	Banjo & Kazooie	Banjo
74	1	Terry	Terry
75	1	Byleth	Bylet
76	1	Min Min	Min M
77	1	Steve/Alex	Steve
78	1	Sephiroth	Sephi
79	1	Pyra	Pyra
8	1	Pikachu	Pika
11	1	Captain Falcon	Capi
12	1	Jigglypuff	Jigly
14	1	Bowser	Bwser
15	1	Ice Climbers	Ice C
18	1	Dr. Mario	Doc
22	1	Young Link	YLink
34	1	Ivysaur	Ivy
35	1	Charizard	Zard
40	1	Olimar	Olimr
41	1	Lucario	Lcrio
45	1	Villager	Villg
39	1	King Dedede	DDD
46	1	Mega Man	MegaM
43	1	Toon Link	TLink
47	1	Wii Fit Trainer	WiiFi
49	1	Little Mac	Mac
54	1	Palutena	Palu
58	1	Bowser Jr.	BowJr
59	1	Dunk Hunt	DuckH
63	1	Bayonetta	Bayo
65	1	Ridley	Ridly
67	1	King K. Rool	KRool
68	1	Isabelle	Cnela
70	1	Piranha Plant	Plant
82	1	Sora	Sora
80	1	Mythra	Mytra
81	1	Kazuya	Kzuya
\.


--
-- TOC entry 3421 (class 0 OID 16530)
-- Dependencies: 220
-- Data for Name: posicion; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.posicion (id, nombre, vertical_horizontal, abreviatura) FROM stdin;
1	Main Stage	1	Main
2	Low Platform	1	Low
3	High Platform	1	High
\.


--
-- TOC entry 3423 (class 0 OID 98305)
-- Dependencies: 222
-- Data for Name: registro; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.registro (id, id_personaje_emisor, id_personaje_receptor, id_escenario, id_posicion, rage, di, porcentaje_ko, id_ataque, id_propiedad_ataque) FROM stdin;
1	35	63	1	1	0	t	105	16	2
2	35	36	1	1	0	t	111	16	2
3	35	73	1	1	0	t	122	16	2
4	35	66	1	1	0	t	122	16	2
5	35	74	1	1	0	t	125	16	2
6	35	79	1	1	0	t	115	16	2
7	35	36	1	1	150	t	83	16	2
8	35	36	1	1	75	t	101	16	2
9	35	36	1	1	100	t	96	16	2
10	35	36	1	1	0	t	108	7	2
11	35	66	1	1	0	t	122	7	2
12	34	66	1	2	0	t	124	\N	2
55	3	4	5	3	22	t	22	\N	2
\.


--
-- TOC entry 3435 (class 0 OID 204811)
-- Dependencies: 234
-- Data for Name: tipo_ataque; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.tipo_ataque (id, nombre, abreviatura) FROM stdin;
1	Movimiento	Mov
2	Combo	Com
\.


--
-- TOC entry 3425 (class 0 OID 131074)
-- Dependencies: 224
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, password, username) FROM stdin;
1	$2a$10$sVC0cvWE6jKW5Qm5qKL1hOTsB1CwkxtA6/fvND55ZI88ul383A6ae	RedHammer96
2	$2a$10$5fLpKpvSoB8/3u7cpuDqE.82afBpkq34RKRteAAgDP83Oj59zx2ti	hammer
3	$2a$10$1djG5BHwkco9XjMaorR.o.tqPJ28HfNtxmODIJP3mLIisWrTBbYci	hammerald
\.


--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 229
-- Name: ataque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.ataque_id_seq', 21, true);


--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 227
-- Name: ataque_propiedad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.ataque_propiedad_id_seq', 4, true);


--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 225
-- Name: combo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.combo_id_seq', 1, false);


--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 231
-- Name: combo_movimiento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.combo_movimiento_id_seq', 1, false);


--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 221
-- Name: registro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.registro_id_seq', 55, true);


--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 233
-- Name: tipo_ataque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.tipo_ataque_id_seq', 1, false);


--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 3260 (class 2606 OID 139369)
-- Name: ataque ataque_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ataque
    ADD CONSTRAINT ataque_pkey PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 147470)
-- Name: ataque_propiedad ataque_propiedad_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ataque_propiedad
    ADD CONSTRAINT ataque_propiedad_nombre_key UNIQUE (nombre);


--
-- TOC entry 3258 (class 2606 OID 139356)
-- Name: ataque_propiedad ataque_propiedad_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ataque_propiedad
    ADD CONSTRAINT ataque_propiedad_pkey PRIMARY KEY (id);


--
-- TOC entry 3262 (class 2606 OID 139391)
-- Name: combo_movimiento combo_movimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.combo_movimiento
    ADD CONSTRAINT combo_movimiento_pkey PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 155650)
-- Name: combo combo_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.combo
    ADD CONSTRAINT combo_pkey PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 90115)
-- Name: movimiento movimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.movimiento
    ADD CONSTRAINT movimiento_pkey PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 90113)
-- Name: personaje personaje_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.personaje
    ADD CONSTRAINT personaje_pkey PRIMARY KEY (id);


--
-- TOC entry 3246 (class 2606 OID 81924)
-- Name: posicion posicion_pk; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.posicion
    ADD CONSTRAINT posicion_pk PRIMARY KEY (id);


--
-- TOC entry 3248 (class 2606 OID 98310)
-- Name: registro registro_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.registro
    ADD CONSTRAINT registro_pkey PRIMARY KEY (id);


--
-- TOC entry 3264 (class 2606 OID 204818)
-- Name: tipo_ataque tipo_ataque_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipo_ataque
    ADD CONSTRAINT tipo_ataque_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 131082)
-- Name: users ukr43af9ap4edm43mmtq01oddj6; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username);


--
-- TOC entry 3252 (class 2606 OID 131080)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3269 (class 2606 OID 155651)
-- Name: ataque ataque_id_combo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ataque
    ADD CONSTRAINT ataque_id_combo_fkey FOREIGN KEY (id_combo) REFERENCES combo(id) ON DELETE CASCADE;


--
-- TOC entry 3270 (class 2606 OID 139370)
-- Name: ataque ataque_id_movimiento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ataque
    ADD CONSTRAINT ataque_id_movimiento_fkey FOREIGN KEY (id_movimiento) REFERENCES movimiento(id) ON DELETE CASCADE;


--
-- TOC entry 3271 (class 2606 OID 155656)
-- Name: combo_movimiento combo_movimiento_id_combo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.combo_movimiento
    ADD CONSTRAINT combo_movimiento_id_combo_fkey FOREIGN KEY (id_combo) REFERENCES combo(id) ON DELETE CASCADE;


--
-- TOC entry 3272 (class 2606 OID 139397)
-- Name: combo_movimiento combo_movimiento_id_movimiento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.combo_movimiento
    ADD CONSTRAINT combo_movimiento_id_movimiento_fkey FOREIGN KEY (id_movimiento) REFERENCES movimiento(id) ON DELETE CASCADE;


--
-- TOC entry 3265 (class 2606 OID 98316)
-- Name: registro fkah285er29vhjxept79dlhl4w2; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.registro
    ADD CONSTRAINT fkah285er29vhjxept79dlhl4w2 FOREIGN KEY (id_personaje_emisor) REFERENCES personaje(id);


--
-- TOC entry 3266 (class 2606 OID 180226)
-- Name: registro fkh6lxcq5mv9whpo3u8clktk1h6; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.registro
    ADD CONSTRAINT fkh6lxcq5mv9whpo3u8clktk1h6 FOREIGN KEY (id_ataque) REFERENCES ataque(id);


--
-- TOC entry 3267 (class 2606 OID 98321)
-- Name: registro fknponbfiwck9eaewokvv06yfr4; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.registro
    ADD CONSTRAINT fknponbfiwck9eaewokvv06yfr4 FOREIGN KEY (id_personaje_receptor) REFERENCES personaje(id);


--
-- TOC entry 3268 (class 2606 OID 98326)
-- Name: registro fks3a0l9s70k1cr6iutponq39fh; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.registro
    ADD CONSTRAINT fks3a0l9s70k1cr6iutponq39fh FOREIGN KEY (id_posicion) REFERENCES posicion(id);


--
-- TOC entry 2091 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2090 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2025-11-30 09:31:15 UTC

--
-- PostgreSQL database dump complete
--

\unrestrict 9pAfH8VPuDgTOlenRwoQbvFC5UD11JRIEq7ShfxlDqBKmfkkuxIpOmN64wGg5SJ

