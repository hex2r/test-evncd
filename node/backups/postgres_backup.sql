--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE root;
ALTER ROLE root WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:yVeoZm3txEViS+Au1PZcCA==$/mvyQ2mTKsbYUYSZfjBjrGo7a+PoCB6l03h+iG/qPc4=:di5nUDyJlTm0B653hKY/Cu6U4gGj84Y2yFSYePSvW8g=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

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
-- PostgreSQL database dump complete
--

--
-- Database "evinced" dump
--

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
-- Name: evinced; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE evinced WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE evinced OWNER TO root;

\connect evinced

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
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    origin text NOT NULL
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
-- Name: Page; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Page" (
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    url text NOT NULL,
    "domainID" integer NOT NULL,
    id integer NOT NULL,
    issues jsonb NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Page" OWNER TO root;

--
-- Name: Page_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Page_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Page_id_seq" OWNER TO root;

--
-- Name: Page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Page_id_seq" OWNED BY public."Page".id;


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
-- Name: Page id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Page" ALTER COLUMN id SET DEFAULT nextval('public."Page_id_seq"'::regclass);


--
-- Data for Name: Domain; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Domain" (id, "createdAt", origin) FROM stdin;
1	2025-06-19 19:43:53.472	https://www.ynet.co.il
\.


--
-- Data for Name: Page; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Page" ("createdAt", url, "domainID", id, issues, "updatedAt") FROM stdin;
2025-06-19 19:50:23.19	https://www.ynet.co.il/articles/0,7340,L-5778984.html	1	3	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1)", "severity": "Low", "component": "xydww2ed"}]	2025-06-19 19:50:23.19
2025-06-19 19:51:21.673	https://www.ynet.co.il/dating/couples	1	4	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:51:21.673
2025-06-19 19:52:24.987	https://www.ynet.co.il/dating/singles	1	5	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:52:24.987
2025-06-19 19:52:53.852	https://www.ynet.co.il/economy/category/5363	1	6	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:52:53.852
2025-06-19 19:53:38.165	https://www.ynet.co.il/economy/category/8091	1	7	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}]	2025-06-19 19:53:38.165
2025-06-19 19:54:07.908	https://www.ynet.co.il/economy/marketingadvertising	1	8	[{"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:54:07.908
2025-06-19 19:55:05.116	https://www.ynet.co.il/food/recipies	1	9	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:55:05.116
2025-06-19 19:55:05.116	https://www.ynet.co.il/home/0,7340,L-1039,00.html	1	10	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:55:05.116
2025-06-19 19:55:38.277	https://www.ynet.co.il/home/0,7340,L-1042,00.html	1	11	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:55:38.277
2025-06-19 19:56:04.808	https://www.ynet.co.il/home/0,7340,L-10610,00.html	1	12	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}]	2025-06-19 19:56:04.808
2025-06-19 19:56:32.842	https://www.ynet.co.il/home/0,7340,L-10677,00.html	1	13	[{"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}, {"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Accessible Name", "selector": "#tbl_mt > TBODY:nth-child(2) > TR:nth-child(1) > TD:nth-child(6)", "severity": "Critical", "component": "6543wcfr"}, {"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:56:32.842
2025-06-19 19:56:59.646	https://www.ynet.co.il/home/0,7340,L-2758,00.html	1	14	[{"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:56:59.646
2025-06-19 19:57:21.628	https://www.ynet.co.il/home/0,7340,L-2758,01.html	1	15	[{"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:57:21.628
2025-06-19 19:57:50.93	https://www.ynet.co.il/home/0,7340,L-2758,02.html	1	16	[{"type": "Interactive Role", "selector": "#BJrajb3MOdP > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > A:nth-child(2)", "severity": "Critical", "component": "xydww2ed"}]	2025-06-19 19:57:50.93
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e75cf7cb-442c-422c-9c1d-4fc2e5372d46	3de6443fda761435781107dc7c963d3bad075c7bb8b37d78dfb92e6943c3ec2b	2025-06-19 19:42:12.268788+00	20250619185201_three_models	\N	\N	2025-06-19 19:42:12.239922+00	1
ca1411b8-8ff2-49ea-a170-9184402a86e1	07e3f69f0ade6a6ded73407dc1af4c05a16a8109997752482512604952ec8d05	2025-06-19 19:42:12.296617+00	20250619192101_xxx	\N	\N	2025-06-19 19:42:12.272809+00	1
12b0db62-11c7-405f-9ffa-b649e8f47d38	8065b59dd4c6799504d4b9befdd315e4800394b89d287d5995c6d979fefc67fb	2025-06-19 19:42:12.350673+00	20250619192600_xxx1	\N	\N	2025-06-19 19:42:12.298035+00	1
3902bb70-c0b4-4f43-9ac3-d5f489dd46d1	238f9e91c68262b840243920a21bcaf122acdbb757a523cd5d3efc3f1ec63e40	2025-06-19 19:42:12.367984+00	20250619193010_xxx2	\N	\N	2025-06-19 19:42:12.351932+00	1
d53462ee-30b9-478d-b35d-f7af8b31cd26	5489960b2a1a344bb2141efc3a3266fdf97d7c8750ea9fc21a6ecb9cc3a867fd	2025-06-19 19:42:35.956938+00	20250619194235_json	\N	\N	2025-06-19 19:42:35.935805+00	1
e3923031-b261-4834-a71c-0e0ae8d8b274	602ecb75aa2ea4343070226c57b253d8342c722561f0796d3626d501a7f07ce8	2025-06-19 19:49:03.696802+00	20250619194903_last	\N	\N	2025-06-19 19:49:03.683922+00	1
\.


--
-- Name: Domain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Domain_id_seq"', 1, true);


--
-- Name: Page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Page_id_seq"', 16, true);


--
-- Name: Domain Domain_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Domain"
    ADD CONSTRAINT "Domain_pkey" PRIMARY KEY (id);


--
-- Name: Page Page_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_pkey" PRIMARY KEY (id);


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
-- Name: Page_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Page_id_key" ON public."Page" USING btree (id);


--
-- Name: Page_url_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Page_url_key" ON public."Page" USING btree (url);


--
-- Name: Page Page_domainID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_domainID_fkey" FOREIGN KEY ("domainID") REFERENCES public."Domain"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "mydb" dump
--

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
-- Name: mydb; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE mydb OWNER TO root;

\connect mydb

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

SET default_tablespace = '';

SET default_table_access_method = heap;

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
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

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
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

