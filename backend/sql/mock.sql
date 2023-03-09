--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: easup; Type: DATABASE; Schema: -; Owner: easup_admin
--

CREATE DATABASE easup WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE easup OWNER TO easup_admin;

\connect easup

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: board; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.board (
    board_id integer NOT NULL,
    name text NOT NULL,
    description text,
    "projectId" integer
);


ALTER TABLE public.board OWNER TO easup_admin;

--
-- Name: board_board_id_seq; Type: SEQUENCE; Schema: public; Owner: easup_admin
--

CREATE SEQUENCE public.board_board_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.board_board_id_seq OWNER TO easup_admin;

--
-- Name: board_board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: easup_admin
--

ALTER SEQUENCE public.board_board_id_seq OWNED BY public.board.board_id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.organization (
    organization_id integer NOT NULL,
    name text NOT NULL,
    description text,
    mission text,
    webpage text,
    logo text,
    details text
);


ALTER TABLE public.organization OWNER TO easup_admin;

--
-- Name: organization_organization_id_seq; Type: SEQUENCE; Schema: public; Owner: easup_admin
--

CREATE SEQUENCE public.organization_organization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organization_organization_id_seq OWNER TO easup_admin;

--
-- Name: organization_organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: easup_admin
--

ALTER SEQUENCE public.organization_organization_id_seq OWNED BY public.organization.organization_id;


--
-- Name: organization_users_person; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.organization_users_person (
    "organizationOrganizationId" integer NOT NULL,
    "personUserId" integer NOT NULL
);


ALTER TABLE public.organization_users_person OWNER TO easup_admin;

--
-- Name: person; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.person (
    user_id integer NOT NULL,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    nickname text NOT NULL,
    password text NOT NULL,
    description text,
    photo text
);


ALTER TABLE public.person OWNER TO easup_admin;

--
-- Name: person_tasks_task; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.person_tasks_task (
    "personUserId" integer NOT NULL,
    "taskTaskId" integer NOT NULL
);


ALTER TABLE public.person_tasks_task OWNER TO easup_admin;

--
-- Name: person_user_id_seq; Type: SEQUENCE; Schema: public; Owner: easup_admin
--

CREATE SEQUENCE public.person_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_user_id_seq OWNER TO easup_admin;

--
-- Name: person_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: easup_admin
--

ALTER SEQUENCE public.person_user_id_seq OWNED BY public.person.user_id;


--
-- Name: project; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.project (
    project_id integer NOT NULL,
    name text NOT NULL,
    description text,
    details text,
    "organizationId" integer
);


ALTER TABLE public.project OWNER TO easup_admin;

--
-- Name: project_project_id_seq; Type: SEQUENCE; Schema: public; Owner: easup_admin
--

CREATE SEQUENCE public.project_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_project_id_seq OWNER TO easup_admin;

--
-- Name: project_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: easup_admin
--

ALTER SEQUENCE public.project_project_id_seq OWNED BY public.project.project_id;


--
-- Name: project_users_person; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.project_users_person (
    "projectProjectId" integer NOT NULL,
    "personUserId" integer NOT NULL
);


ALTER TABLE public.project_users_person OWNER TO easup_admin;

--
-- Name: section; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.section (
    section_id integer NOT NULL,
    name text NOT NULL,
    description text,
    "boardId" integer
);


ALTER TABLE public.section OWNER TO easup_admin;

--
-- Name: section_section_id_seq; Type: SEQUENCE; Schema: public; Owner: easup_admin
--

CREATE SEQUENCE public.section_section_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.section_section_id_seq OWNER TO easup_admin;

--
-- Name: section_section_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: easup_admin
--

ALTER SEQUENCE public.section_section_id_seq OWNED BY public.section.section_id;


--
-- Name: section_tasks_task; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.section_tasks_task (
    "sectionSectionId" integer NOT NULL,
    "taskTaskId" integer NOT NULL
);


ALTER TABLE public.section_tasks_task OWNER TO easup_admin;

--
-- Name: task; Type: TABLE; Schema: public; Owner: easup_admin
--

CREATE TABLE public.task (
    task_id integer NOT NULL,
    name text NOT NULL,
    description text,
    deadline date
);


ALTER TABLE public.task OWNER TO easup_admin;

--
-- Name: task_task_id_seq; Type: SEQUENCE; Schema: public; Owner: easup_admin
--

CREATE SEQUENCE public.task_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_task_id_seq OWNER TO easup_admin;

--
-- Name: task_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: easup_admin
--

ALTER SEQUENCE public.task_task_id_seq OWNED BY public.task.task_id;


--
-- Name: board board_id; Type: DEFAULT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.board ALTER COLUMN board_id SET DEFAULT nextval('public.board_board_id_seq'::regclass);


--
-- Name: organization organization_id; Type: DEFAULT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.organization ALTER COLUMN organization_id SET DEFAULT nextval('public.organization_organization_id_seq'::regclass);


--
-- Name: person user_id; Type: DEFAULT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.person ALTER COLUMN user_id SET DEFAULT nextval('public.person_user_id_seq'::regclass);


--
-- Name: project project_id; Type: DEFAULT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.project ALTER COLUMN project_id SET DEFAULT nextval('public.project_project_id_seq'::regclass);


--
-- Name: section section_id; Type: DEFAULT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.section ALTER COLUMN section_id SET DEFAULT nextval('public.section_section_id_seq'::regclass);


--
-- Name: task task_id; Type: DEFAULT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.task ALTER COLUMN task_id SET DEFAULT nextval('public.task_task_id_seq'::regclass);


--
-- Data for Name: board; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.board (board_id, name, description, "projectId") FROM stdin;
1	Main	Main board	1
2	Adverts	Advertisement management	1
3	Main	Main board	2
4	Frontend	Frontend tasks	2
5	Backend	Special boards for backend	2
6	Graphics	Graphic related tasks	3
7	Game	Logic oriented tasks	3
8	Main	Main board	4
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.organization (organization_id, name, description, mission, webpage, logo, details) FROM stdin;
1	Easup Inc.	Best platform for task management.	We are here to not pass this semester!	\N	https://i5.walmartimages.ca/images/Large/234/6_r/6000191272346_R.jpg	\N
2	OweMe	You owe me homie!	To get your money back!	\N	https://i5.walmartimages.ca/images/Large/234/6_r/6000191272346_R.jpg	\N
\.


--
-- Data for Name: organization_users_person; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.organization_users_person ("organizationOrganizationId", "personUserId") FROM stdin;
1	1
1	2
1	3
2	1
2	2
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.person (user_id, email, first_name, last_name, nickname, password, description, photo) FROM stdin;
1	patryk@gmail.com	Patryk	Lesiak	vLesio	qwerty	I have crippling depression.	https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Coelho-5829.jpg/1200px-Coelho-5829.jpg
2	maciej@gmail.com	Maciej	Pieniazek	Kaszet	qwerty	I do not even know what I am doing.	\N
3	adrian@gmail.com	Adrian	Markowski	Adrianoooooooooo	qwerty	I am, that is all.	\N
\.


--
-- Data for Name: person_tasks_task; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.person_tasks_task ("personUserId", "taskTaskId") FROM stdin;
1	1
2	1
1	2
2	2
3	2
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.project (project_id, name, description, details, "organizationId") FROM stdin;
1	IO	IO project	\N	1
2	CSV reader	CSV reader in Java	\N	2
3	Zombie game	Game where you can shoot zombies!	\N	2
4	Coin management	We do everything, but it leads to us doing nothing.	\N	2
\.


--
-- Data for Name: project_users_person; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.project_users_person ("projectProjectId", "personUserId") FROM stdin;
1	1
1	2
2	2
2	3
3	1
3	3
4	1
4	3
\.


--
-- Data for Name: section; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.section (section_id, name, description, "boardId") FROM stdin;
1	To do	\N	1
2	In progress	\N	1
3	Done	\N	1
4	TODO	Section 4 description	2
5	DONE	Section 5 description	2
6	All	All tasks	3
7	BackLog	\N	4
8	In progress	\N	4
9	Review	\N	4
10	Done	\N	4
11	Todo	\N	5
12	Done	\N	5
13	Whatever	\N	6
14	TODO	\N	7
15	DOING	\N	7
16	DONE	\N	7
\.


--
-- Data for Name: section_tasks_task; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.section_tasks_task ("sectionSectionId", "taskTaskId") FROM stdin;
1	1
1	2
2	1
2	2
3	1
3	2
4	1
4	2
5	1
5	2
6	1
6	2
7	1
7	2
8	1
8	2
9	1
9	2
10	1
10	2
11	1
11	2
12	1
12	2
13	1
13	2
14	1
14	2
15	1
15	2
16	1
16	2
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: easup_admin
--

COPY public.task (task_id, name, description, deadline) FROM stdin;
1	Task 1	Task 1 description	2023-01-12
2	Task 2	Task 2 description	2023-01-12
\.


--
-- Name: board_board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: easup_admin
--

SELECT pg_catalog.setval('public.board_board_id_seq', 8, true);


--
-- Name: organization_organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: easup_admin
--

SELECT pg_catalog.setval('public.organization_organization_id_seq', 2, true);


--
-- Name: person_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: easup_admin
--

SELECT pg_catalog.setval('public.person_user_id_seq', 3, true);


--
-- Name: project_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: easup_admin
--

SELECT pg_catalog.setval('public.project_project_id_seq', 4, true);


--
-- Name: section_section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: easup_admin
--

SELECT pg_catalog.setval('public.section_section_id_seq', 16, true);


--
-- Name: task_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: easup_admin
--

SELECT pg_catalog.setval('public.task_task_id_seq', 2, true);


--
-- Name: project_users_person PK_17203c96bc02ac84ae829b0a74c; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.project_users_person
    ADD CONSTRAINT "PK_17203c96bc02ac84ae829b0a74c" PRIMARY KEY ("projectProjectId", "personUserId");


--
-- Name: project PK_1a480c5734c5aacb9cef7b1499d; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "PK_1a480c5734c5aacb9cef7b1499d" PRIMARY KEY (project_id);


--
-- Name: person PK_5157fa65538cae06e66c922c898; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "PK_5157fa65538cae06e66c922c898" PRIMARY KEY (user_id);


--
-- Name: section PK_64bb5bb8f6931759fee65510d8e; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.section
    ADD CONSTRAINT "PK_64bb5bb8f6931759fee65510d8e" PRIMARY KEY (section_id);


--
-- Name: task PK_721f914bb100703f201a77dd58f; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_721f914bb100703f201a77dd58f" PRIMARY KEY (task_id);


--
-- Name: organization_users_person PK_7fc1b5802dcbe13415672041400; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.organization_users_person
    ADD CONSTRAINT "PK_7fc1b5802dcbe13415672041400" PRIMARY KEY ("organizationOrganizationId", "personUserId");


--
-- Name: person_tasks_task PK_9230905e4039677664aaee3d046; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.person_tasks_task
    ADD CONSTRAINT "PK_9230905e4039677664aaee3d046" PRIMARY KEY ("personUserId", "taskTaskId");


--
-- Name: section_tasks_task PK_b332340e85c3e9efe69fd209136; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.section_tasks_task
    ADD CONSTRAINT "PK_b332340e85c3e9efe69fd209136" PRIMARY KEY ("sectionSectionId", "taskTaskId");


--
-- Name: board PK_bd86e5e77833cf112439f9af37b; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT "PK_bd86e5e77833cf112439f9af37b" PRIMARY KEY (board_id);


--
-- Name: organization PK_ed1251fa3856cd1a6c98d7bcaa3; Type: CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT "PK_ed1251fa3856cd1a6c98d7bcaa3" PRIMARY KEY (organization_id);


--
-- Name: IDX_1609d9798b43b006a391ad1926; Type: INDEX; Schema: public; Owner: easup_admin
--

CREATE INDEX "IDX_1609d9798b43b006a391ad1926" ON public.project_users_person USING btree ("personUserId");


--
-- Name: IDX_3496e6c20bfe0958681593fbff; Type: INDEX; Schema: public; Owner: easup_admin
--

CREATE INDEX "IDX_3496e6c20bfe0958681593fbff" ON public.section_tasks_task USING btree ("taskTaskId");


--
-- Name: IDX_3b49f0dd9641d9263009d81f44; Type: INDEX; Schema: public; Owner: easup_admin
--

CREATE INDEX "IDX_3b49f0dd9641d9263009d81f44" ON public.project_users_person USING btree ("projectProjectId");


--
-- Name: IDX_58a2a8b88032d41f24ba70bd82; Type: INDEX; Schema: public; Owner: easup_admin
--

CREATE INDEX "IDX_58a2a8b88032d41f24ba70bd82" ON public.section_tasks_task USING btree ("sectionSectionId");


--
-- Name: IDX_75b3c032fa93551dd2835cb1a6; Type: INDEX; Schema: public; Owner: easup_admin
--

CREATE INDEX "IDX_75b3c032fa93551dd2835cb1a6" ON public.organization_users_person USING btree ("organizationOrganizationId");


--
-- Name: IDX_8f14c15b4fb9dd445028ba9e3c; Type: INDEX; Schema: public; Owner: easup_admin
--

CREATE INDEX "IDX_8f14c15b4fb9dd445028ba9e3c" ON public.person_tasks_task USING btree ("taskTaskId");


--
-- Name: IDX_99ecc8684de37f6088bc84baf9; Type: INDEX; Schema: public; Owner: easup_admin
--

CREATE INDEX "IDX_99ecc8684de37f6088bc84baf9" ON public.person_tasks_task USING btree ("personUserId");


--
-- Name: IDX_a3b09fca06c9a4ca5b2866ced5; Type: INDEX; Schema: public; Owner: easup_admin
--

CREATE INDEX "IDX_a3b09fca06c9a4ca5b2866ced5" ON public.organization_users_person USING btree ("personUserId");


--
-- Name: project FK_0028dfadf312a1d7f51656c4a9a; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_0028dfadf312a1d7f51656c4a9a" FOREIGN KEY ("organizationId") REFERENCES public.organization(organization_id) ON DELETE CASCADE;


--
-- Name: section FK_05dc09669e1196c2bff8c76686c; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.section
    ADD CONSTRAINT "FK_05dc09669e1196c2bff8c76686c" FOREIGN KEY ("boardId") REFERENCES public.board(board_id) ON DELETE CASCADE;


--
-- Name: project_users_person FK_1609d9798b43b006a391ad19262; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.project_users_person
    ADD CONSTRAINT "FK_1609d9798b43b006a391ad19262" FOREIGN KEY ("personUserId") REFERENCES public.person(user_id);


--
-- Name: section_tasks_task FK_3496e6c20bfe0958681593fbff2; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.section_tasks_task
    ADD CONSTRAINT "FK_3496e6c20bfe0958681593fbff2" FOREIGN KEY ("taskTaskId") REFERENCES public.task(task_id);


--
-- Name: project_users_person FK_3b49f0dd9641d9263009d81f44a; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.project_users_person
    ADD CONSTRAINT "FK_3b49f0dd9641d9263009d81f44a" FOREIGN KEY ("projectProjectId") REFERENCES public.project(project_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: section_tasks_task FK_58a2a8b88032d41f24ba70bd824; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.section_tasks_task
    ADD CONSTRAINT "FK_58a2a8b88032d41f24ba70bd824" FOREIGN KEY ("sectionSectionId") REFERENCES public.section(section_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: organization_users_person FK_75b3c032fa93551dd2835cb1a63; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.organization_users_person
    ADD CONSTRAINT "FK_75b3c032fa93551dd2835cb1a63" FOREIGN KEY ("organizationOrganizationId") REFERENCES public.organization(organization_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: person_tasks_task FK_8f14c15b4fb9dd445028ba9e3ce; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.person_tasks_task
    ADD CONSTRAINT "FK_8f14c15b4fb9dd445028ba9e3ce" FOREIGN KEY ("taskTaskId") REFERENCES public.task(task_id);


--
-- Name: board FK_954fce22cf9a797afc6b1560c76; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT "FK_954fce22cf9a797afc6b1560c76" FOREIGN KEY ("projectId") REFERENCES public.project(project_id) ON DELETE CASCADE;


--
-- Name: person_tasks_task FK_99ecc8684de37f6088bc84baf90; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.person_tasks_task
    ADD CONSTRAINT "FK_99ecc8684de37f6088bc84baf90" FOREIGN KEY ("personUserId") REFERENCES public.person(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: organization_users_person FK_a3b09fca06c9a4ca5b2866ced5e; Type: FK CONSTRAINT; Schema: public; Owner: easup_admin
--

ALTER TABLE ONLY public.organization_users_person
    ADD CONSTRAINT "FK_a3b09fca06c9a4ca5b2866ced5e" FOREIGN KEY ("personUserId") REFERENCES public.person(user_id);


--
-- PostgreSQL database dump complete
--

