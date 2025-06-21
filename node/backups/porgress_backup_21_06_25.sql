--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: root
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO root;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: root
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Domain; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Domain" (
    id integer NOT NULL,
    origin text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Domain" OWNER TO root;

--
-- Name: Domain_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Domain_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Domain_id_seq" OWNER TO root;

--
-- Name: Domain_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Domain_id_seq" OWNED BY public."Domain".id;


--
-- Name: Issue; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Issue" (
    id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    domain_id integer NOT NULL,
    url text NOT NULL,
    type text NOT NULL,
    severity text NOT NULL,
    component text NOT NULL,
    selector text NOT NULL
);


ALTER TABLE public."Issue" OWNER TO root;

--
-- Name: Issue_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Issue_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Issue_id_seq" OWNER TO root;

--
-- Name: Issue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Issue_id_seq" OWNED BY public."Issue".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO root;

--
-- Name: Domain id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Domain" ALTER COLUMN id SET DEFAULT nextval('public."Domain_id_seq"'::regclass);


--
-- Name: Issue id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Issue" ALTER COLUMN id SET DEFAULT nextval('public."Issue_id_seq"'::regclass);


--
-- Data for Name: Domain; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Domain" (id, origin, created_at, updated_at) FROM stdin;
1	https://www.ynet.co.il	2025-06-21 15:11:15.701	2025-06-21 15:11:15.701
\.


--
-- Data for Name: Issue; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Issue" (id, created_at, updated_at, domain_id, url, type, severity, component, selector) FROM stdin;
1	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/articles/0,7340,L-5778984.html	Accessible Name	Critical	6543wcfr	#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)
2	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/articles/0,7340,L-5778984.html	Interactive Role	Low	xydww2ed	#BJrajb3MOdP > DIV:nth-child(1)
3	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/dating/couples	Accessible Name	Critical	6543wcfr	#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)
4	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/dating/couples	Interactive Role	Critical	xydww2ed	#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)
5	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/dating/couples	Interactive Role	Critical	xydww2ed	#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)
6	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/dating/singles	Accessible Name	Critical	6543wcfr	#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)
7	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/dating/singles	Interactive Role	Critical	xydww2ed	#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)
8	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/economy/category/5363	Accessible Name	Critical	6543wcfr	#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)
9	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/economy/category/5363	Interactive Role	Critical	xydww2ed	#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)
10	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/food/recipies	Accessible Name	Critical	6543wcfr	#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)
11	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/food/recipies	Interactive Role	Critical	xydww2ed	#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)
12	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/home/0,7340,L-1039,00.html	Accessible Name	Critical	6543wcfr	#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)
13	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/home/0,7340,L-1039,00.html	Interactive Role	Critical	xydww2ed	#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)
14	2025-06-21 15:16:56.914	2025-06-21 15:16:56.914	1	https://www.ynet.co.il/home/0,7340,L-1042,00.html	Accessible Name	Critical	xydww2ed	#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8a5e57b6-ade9-4dd6-8b1b-c987ab236262	b648e228c9ec90e1c8b4504e11f14c569bd0854e6a3e3a53a826a0d2e0da92ef	2025-06-21 10:45:25.989014+00	20250621104525_issues_count	\N	\N	2025-06-21 10:45:25.918411+00	1
3c5256cc-24e6-4293-8809-d7185362a010	18923f2134e2adee24ad81c56eb3d3a954d558688e3cc4b19a7443b2054488fa	2025-06-21 15:11:15.765383+00	20250621151115_last	\N	\N	2025-06-21 15:11:15.671042+00	1
3fb2b51e-0f3a-49c6-9108-af649346da2c	b49e05406b284ab4b2c88265def09c9d655b693633f7a94ba9b0c2ee9d105161	2025-06-21 15:18:51.38798+00	20250621151851_	\N	\N	2025-06-21 15:18:51.376082+00	1
\.


--
-- Name: Domain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Domain_id_seq"', 1, true);


--
-- Name: Issue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Issue_id_seq"', 14, true);


--
-- Name: Domain Domain_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Domain"
    ADD CONSTRAINT "Domain_pkey" PRIMARY KEY (id);


--
-- Name: Issue Issue_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Issue"
    ADD CONSTRAINT "Issue_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Domain_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Domain_id_key" ON public."Domain" USING btree (id);


--
-- Name: Domain_origin_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Domain_origin_key" ON public."Domain" USING btree (origin);


--
-- Name: Issue_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Issue_id_key" ON public."Issue" USING btree (id);


--
-- Name: Issue Issue_domain_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Issue"
    ADD CONSTRAINT "Issue_domain_id_fkey" FOREIGN KEY (domain_id) REFERENCES public."Domain"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

