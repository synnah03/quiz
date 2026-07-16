--
-- PostgreSQL database dump
--

\restrict QZ3cy3JJhZnekNl3IlYlH8D80DQwH9wrsNUuPqGP7JWW23qNhBLhBISpofIAZul

-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

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
-- Name: attempt_answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.attempt_answers (
    id bigint NOT NULL,
    quiz_attempt_id bigint NOT NULL,
    question_id bigint NOT NULL,
    option_id bigint NOT NULL,
    is_correct boolean DEFAULT false NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: attempt_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.attempt_answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: attempt_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.attempt_answers_id_seq OWNED BY public.attempt_answers.id;


--
-- Name: cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images (
    id bigint NOT NULL,
    user_id bigint,
    path character varying(255) NOT NULL,
    mime_type character varying(50) NOT NULL,
    size bigint NOT NULL,
    width integer,
    height integer,
    original_name character varying(255),
    alt_text character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: model_has_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.model_has_permissions (
    permission_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);


--
-- Name: model_has_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.model_has_roles (
    role_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);


--
-- Name: options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.options (
    id bigint NOT NULL,
    question_id bigint NOT NULL,
    option_text text NOT NULL,
    is_correct boolean DEFAULT false NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.options_id_seq OWNED BY public.options.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permissions (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    body text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.questions (
    id bigint NOT NULL,
    quiz_id bigint NOT NULL,
    question_text text NOT NULL,
    image_path character varying(255),
    type character varying(255) DEFAULT 'single'::character varying NOT NULL,
    points integer DEFAULT 1 NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT questions_type_check CHECK (((type)::text = ANY ((ARRAY['single'::character varying, 'multiple'::character varying])::text[])))
);


--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: quiz_attempts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_attempts (
    id bigint NOT NULL,
    quiz_id bigint NOT NULL,
    user_id bigint NOT NULL,
    started_at timestamp(0) without time zone,
    completed_at timestamp(0) without time zone,
    score numeric(8,2),
    score_percentage numeric(5,2),
    passed boolean,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: quiz_attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.quiz_attempts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quiz_attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quiz_attempts_id_seq OWNED BY public.quiz_attempts.id;


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quizzes (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    duration_minutes integer,
    pass_percentage integer DEFAULT 50 NOT NULL,
    shuffle_questions boolean DEFAULT false NOT NULL,
    is_published boolean DEFAULT false NOT NULL,
    created_by bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.quizzes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quizzes_id_seq OWNED BY public.quizzes.id;


--
-- Name: role_has_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role_has_permissions (
    permission_id bigint NOT NULL,
    role_id bigint NOT NULL
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: attempt_answers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attempt_answers ALTER COLUMN id SET DEFAULT nextval('public.attempt_answers_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: options id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options ALTER COLUMN id SET DEFAULT nextval('public.options_id_seq'::regclass);


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: quiz_attempts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_attempts ALTER COLUMN id SET DEFAULT nextval('public.quiz_attempts_id_seq'::regclass);


--
-- Name: quizzes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quizzes ALTER COLUMN id SET DEFAULT nextval('public.quizzes_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: attempt_answers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.attempt_answers (id, quiz_attempt_id, question_id, option_id, is_correct, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cache (key, value, expiration) FROM stdin;
spatie.permission.cache	a:3:{s:5:"alias";a:4:{s:1:"a";s:2:"id";s:1:"b";s:4:"name";s:1:"c";s:10:"guard_name";s:1:"r";s:5:"roles";}s:11:"permissions";a:4:{i:0;a:4:{s:1:"a";i:5;s:1:"b";s:9:"edit post";s:1:"c";s:3:"web";s:1:"r";a:2:{i:0;i:7;i:1;i:8;}}i:1;a:4:{s:1:"a";i:6;s:1:"b";s:11:"delete post";s:1:"c";s:3:"web";s:1:"r";a:2:{i:0;i:7;i:1;i:8;}}i:2;a:4:{s:1:"a";i:7;s:1:"b";s:12:"publish post";s:1:"c";s:3:"web";s:1:"r";a:2:{i:0;i:6;i:1;i:8;}}i:3;a:4:{s:1:"a";i:8;s:1:"b";s:11:"create post";s:1:"c";s:3:"web";s:1:"r";a:2:{i:0;i:7;i:1;i:8;}}}s:5:"roles";a:3:{i:0;a:3:{s:1:"a";i:7;s:1:"b";s:7:"Creator";s:1:"c";s:3:"web";}i:1;a:3:{s:1:"a";i:8;s:1:"b";s:5:"admin";s:1:"c";s:3:"web";}i:2;a:3:{s:1:"a";i:6;s:1:"b";s:6:"viewer";s:1:"c";s:3:"web";}}}	1784109931
\.


--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.images (id, user_id, path, mime_type, size, width, height, original_name, alt_text, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2025_10_07_101017_create_posts_table	1
5	2025_10_30_120522_create_permission_tables	1
6	2026_01_19_075350_create_images_table	1
7	2026_07_14_053037_quizzes	1
8	2026_07_14_053132_questions	1
9	2026_07_14_053243_options	1
10	2026_07_14_053327_quiz_attempts	1
11	2026_07_14_053432_attempt_answers	1
12	2026_07_14_090107_alter_table_quiz_add_new_column	1
\.


--
-- Data for Name: model_has_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.model_has_permissions (permission_id, model_type, model_id) FROM stdin;
\.


--
-- Data for Name: model_has_roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.model_has_roles (role_id, model_type, model_id) FROM stdin;
10	App\\Models\\User	2
9	App\\Models\\User	1
\.


--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.options (id, question_id, option_text, is_correct, "order", created_at, updated_at) FROM stdin;
1255	320	<style>	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1256	320	<css>	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1257	320	<script>	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1258	320	<link>	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1259	321	src	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1260	321	url	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1261	321	href	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1262	321	link	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1263	322	title	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1264	322	alt	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1265	322	description	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1266	322	caption	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1267	323	<table>	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1268	323	<tr>	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1269	323	<td>	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1270	323	<th>	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1271	324	<comment> This is comment </comment>	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1272	324	<!-- This is comment -->	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1273	324	// This is comment	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1274	324	/* This is comment */	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1275	325	target	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1276	325	method	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1277	325	action	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1278	325	submit	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1279	326	<textarea>	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1280	326	<input type="text">	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1281	326	<textbox>	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1282	326	<multiline>	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1283	327	<head>	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1284	327	<h1>	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1285	327	<header>	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1286	327	<heading>	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1287	328	<link>	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1288	328	<css>	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1289	328	<style>	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1290	328	<script>	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1291	329	As many as needed	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1292	329	One per section	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1293	329	Only one	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1294	329	Depends on the HTML version	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1295	330	React is a programming language.	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1296	330	React is a JavaScript library for building user interfaces	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1297	330	React is a database engine.	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1298	331	true	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1299	331	NaN	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1300	331	undefined	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1301	331	false	t	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1302	332	55	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1303	332	10	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1304	332	TypeError	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1305	332	NaN	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1306	333	function myFunction() {}	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1307	333	def myFunction() {}	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1308	333	void myFunction() {}	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1309	333	function: myFunction() {}	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1310	334	/* This is a comment */	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1311	334	# This is a comment	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1312	334	// This is a comment	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1313	334	<!-- This is a comment -->	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1314	335	{}	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1315	335	[]	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1316	335	()	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1317	335	<>	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1318	336	JSON.stringify()	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1319	336	JSON.parse()	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1320	336	JSON.objectify()	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1321	336	JSON.convert()	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1322	337	true	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1323	337	NaN	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1324	337	undefined	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1325	337	false	t	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1326	338	<js>	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1327	338	<scripting>	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1328	338	<javascript>	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1329	338	<script>	t	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1330	339	document.getElementById()	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1331	339	document.querySelector()	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1332	339	document.getElementsByTagName()	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1333	339	document.getElementsByClassName()	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1334	340	Calls a function after a specified delay	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1335	340	Executes code repeatedly at fixed intervals	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1336	340	Calls a function continuously until stopped	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1337	340	Pauses JavaScript execution for a specified time	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1338	341	var	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1339	341	let	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1340	341	const	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1341	341	static	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1342	342	0	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1343	342	null	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1344	342	undefined	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1345	342	NaN	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1346	343	NaN	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1347	343	23	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1348	343	6	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1349	343	undefined	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1350	344	Refers to the current function	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1351	344	Refers to the previous object	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1352	344	Refers to the object that is executing the current code	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1353	344	Refers to the next object	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1354	345	{make: 'Ford', model: 'Mustang'}	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1355	345	{{make: 'Ford', model: 'Mustang'}}	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1356	345	{car: {make: 'Ford', model: 'Mustang'}}	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1357	345	{car: 'Ford', car: 'Mustang'}}	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1358	346	npm serve	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1359	346	npm build	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1360	346	npm run dev	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1361	346	npm start	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1362	347	JavaScript X-factor	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1363	347	JavaScript XML	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1364	347	JavaScript Extreme	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1365	347	JavaScript Expressions	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1366	348	export Car as Component;	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1367	348	export internal Car;	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1368	348	export Component.Car;	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1369	348	export default Car;	t	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1370	349	only static ones	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1371	349	only updated ones	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1372	349	all of them	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1373	349	children	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1374	350	Pretext Hypertext Preprocessor	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1375	350	Hypertext Preprocessor	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1376	350	Processor Hypertext Processor	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1377	350	None of the above	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1378	351	!	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1379	351	#	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1380	351	$	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1381	351	&	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1382	352	/* */	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1383	352	#	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1384	352	//	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1385	352	All of the above	t	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1386	353	Append	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1387	353	.	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1388	353	+	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1389	353	All of the above	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1390	354	class_name()	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1391	354	__construct	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1392	354	constructor	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1393	354	None of the above.	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1394	355	DESC	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1395	355	ASCENDING	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1396	355	DESCENDING	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1397	355	SORT DESC	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1398	356	DELETE TABLE	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1399	356	DROP TABLE	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1400	356	REMOVE TABLE	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1401	356	ERASE TABLE	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1402	357	INSERT INTO table_name VALUES (value1, value2, ...)	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1403	357	ADD INTO table_name (value1, value2, ...)	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1404	357	ADD VALUES INTO table_name (value1, value2, ...)	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1405	357	ADD ROW INTO table_name (value1, value2, ...)	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1406	358	5432	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1407	358	1521	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1408	358	1433	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1409	358	3306	t	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1410	359	ALTER TABLE table_name ADD column_name datatype	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1411	359	MODIFY COLUMN table_name ADD column_name datatype	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1412	359	ADD COLUMN table_name column_name datatype	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1413	359	UPDATE TABLE table_name ADD column_name datatype	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1414	360	Frontend styling	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1415	360	Backend PHP web framework	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1416	360	Database management system	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1417	360	Operating system	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1418	361	MVC	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1419	361	MVVM	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1420	361	Singleton	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1421	361	Observer	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1422	362	A caching system	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1423	362	A PHP code formatter	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1424	362	A caching system	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1425	362	A CLI for Laravel commands	t	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1426	363	Twig	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1427	363	Blade	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1428	363	Smarty	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1429	363	Mustache	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1430	364	php artisan make:controller	t	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1431	364	php artisan generate:controller	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1432	364	php artisan new:controller	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1433	364	php artisan controller:make	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1434	365	php artisan db:migrate	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1435	365	php artisan migrate	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1436	365	php artisan run:migrations	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1437	365	php artisan migration:run	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1438	366	A templating engine	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1439	366	Laravel's built-in ORM	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1440	366	A caching driver	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1441	366	A queue system	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1442	367	app/Routes	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1443	367	routes	t	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1444	367	config/routes	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1445	367	resources/routes	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1446	368	php artisan routes	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1447	368	php artisan show:routes	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1448	368	php artisan list:routes	f	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1449	368	php artisan route:list	t	3	2026-07-15 06:40:55	2026-07-15 06:40:55
1450	369	config.php	f	0	2026-07-15 06:40:55	2026-07-15 06:40:55
1451	369	settings.json	f	1	2026-07-15 06:40:55	2026-07-15 06:40:55
1452	369	.env	t	2	2026-07-15 06:40:55	2026-07-15 06:40:55
1453	369	environment.php	f	3	2026-07-15 06:40:55	2026-07-15 06:40:55
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.permissions (id, name, guard_name, created_at, updated_at) FROM stdin;
5	edit post	web	2026-07-14 09:34:39	2026-07-14 09:34:39
6	delete post	web	2026-07-14 09:34:39	2026-07-14 09:34:39
7	publish post	web	2026-07-14 09:34:39	2026-07-14 09:34:39
8	create post	web	2026-07-14 09:34:39	2026-07-14 09:34:39
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts (id, body, created_at, updated_at) FROM stdin;
1	“ I have not failed. I've just found 10,000 ways that won't work. ”\n  — Thomas Edison	2026-07-14 10:32:18	2026-07-14 10:32:18
2	“ Nothing worth having comes easy. ”\n  — Theodore Roosevelt	2026-07-14 10:32:41	2026-07-14 10:32:41
3	“ It is quality rather than quantity that matters. ”\n  — Lucius Annaeus Seneca	2026-07-14 10:33:09	2026-07-14 10:33:09
4	“ Live as if you were to die tomorrow. Learn as if you were to live forever. ”\n  — Mahatma Gandhi	2026-07-14 10:33:23	2026-07-14 10:33:23
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.questions (id, quiz_id, question_text, image_path, type, points, "order", created_at, updated_at) FROM stdin;
320	3	Which HTML tag is used to define an internal style sheet?	\N	single	1	0	2026-07-15 06:40:55	2026-07-15 06:40:55
321	3	Which attribute of the <a> tag specifies the destination URL?	\N	single	1	1	2026-07-15 06:40:55	2026-07-15 06:40:55
322	3	Which attribute provides alternative text for an image if the image cannot be displayed?	\N	single	1	2	2026-07-15 06:40:55	2026-07-15 06:40:55
323	3	Which HTML tag is used to define a standard data cell within a table?	\N	single	1	3	2026-07-15 06:40:55	2026-07-15 06:40:55
324	3	How do you write a comment in HTML?	\N	single	1	4	2026-07-15 06:40:55	2026-07-15 06:40:55
325	3	Which attribute specifies where a form should send its data when submitted?	\N	single	1	5	2026-07-15 06:40:55	2026-07-15 06:40:55
326	3	Which HTML element is specifically designed to create a multi-line text input field?	\N	single	1	6	2026-07-15 06:40:55	2026-07-15 06:40:55
327	3	Which HTML element defines the largest heading?	\N	single	1	7	2026-07-15 06:40:55	2026-07-15 06:40:55
328	3	Which HTML element is used to link an external CSS file to a document?	\N	single	1	8	2026-07-15 06:40:55	2026-07-15 06:40:55
329	3	How many paragraph elements can an HTML document contain?	\N	single	1	9	2026-07-15 06:40:55	2026-07-15 06:40:55
330	3	What is React?	\N	single	1	10	2026-07-15 06:40:55	2026-07-15 06:40:55
331	3	What is the output of the following JavaScript code?\n\nconsole.log(0.1 + 0.2 == 0.3);	\N	single	1	11	2026-07-15 06:40:55	2026-07-15 06:40:55
332	3	What is the output of the following JavaScript code?\n\nconsole.log("5" + 5);	\N	single	1	12	2026-07-15 06:40:55	2026-07-15 06:40:55
333	3	How do you declare a function in JavaScript?	\N	single	1	13	2026-07-15 06:40:55	2026-07-15 06:40:55
334	3	Which syntax is used to create a single-line comment in JavaScript?	\N	single	1	14	2026-07-15 06:40:55	2026-07-15 06:40:55
335	3	Which syntax is used to create an object in JavaScript?	\N	single	1	15	2026-07-15 06:40:55	2026-07-15 06:40:55
336	3	Which method converts a JSON string into a JavaScript object?	\N	single	1	16	2026-07-15 06:40:55	2026-07-15 06:40:55
337	3	What is the output of the following JavaScript code?\n\nconsole.log(Boolean(0));	\N	single	1	17	2026-07-15 06:40:55	2026-07-15 06:40:55
338	3	Which HTML element is used to embed JavaScript code in a web page?	\N	single	1	18	2026-07-15 06:40:55	2026-07-15 06:40:55
339	3	Which DOM method selects an element by its id attribute?	\N	single	1	19	2026-07-15 06:40:55	2026-07-15 06:40:55
340	3	What is the purpose of setTimeout() in JavaScript?	\N	single	1	20	2026-07-15 06:40:55	2026-07-15 06:40:55
341	3	Which keyword declares a variable whose binding cannot be reassigned after initialization?	\N	single	1	21	2026-07-15 06:40:55	2026-07-15 06:40:55
342	3	What is the output of the following JavaScript code?\n\nlet a;\nconsole.log(a);	\N	single	1	22	2026-07-15 06:40:55	2026-07-15 06:40:55
343	3	What is the output of the following JavaScript code?\n\nconsole.log("2" * "3");	\N	single	1	23	2026-07-15 06:40:55	2026-07-15 06:40:55
344	3	What is the primary purpose of the this keyword in JavaScript?	\N	single	1	24	2026-07-15 06:40:55	2026-07-15 06:40:55
345	3	What is the output of the following code?\n\nconst make = 'Ford';\nconst model = 'Mustang';\nconst car = { make, model };\nconsole.log(car);	\N	single	1	25	2026-07-15 06:40:55	2026-07-15 06:40:55
346	3	What command is used to start the React local development server?	\N	single	1	26	2026-07-15 06:40:55	2026-07-15 06:40:55
347	3	What does JSX stand for?	\N	single	1	27	2026-07-15 06:40:55	2026-07-15 06:40:55
348	3	What is the correct syntax to export a component named Car from a file?	\N	single	1	28	2026-07-15 06:40:55	2026-07-15 06:40:55
349	3	What props will be available to the following component?\n\n<Car {...props} />	\N	single	1	29	2026-07-15 06:40:55	2026-07-15 06:40:55
350	3	Full form of PHP is	\N	single	1	30	2026-07-15 06:40:55	2026-07-15 06:40:55
351	3	How does the name of the variable in PHP starts?	\N	single	1	31	2026-07-15 06:40:55	2026-07-15 06:40:55
352	3	Which of the following is the syntax for commenting in PHP?	\N	single	1	32	2026-07-15 06:40:55	2026-07-15 06:40:55
353	3	Which of the following is the correct way to concrete() the two strings in PHP?	\N	single	1	33	2026-07-15 06:40:55	2026-07-15 06:40:55
354	3	How do we call the constructor function in the PHP class?	\N	single	1	34	2026-07-15 06:40:55	2026-07-15 06:40:55
355	3	In MySQL, which keyword is used to sort the result-set in descending order?	\N	single	1	35	2026-07-15 06:40:55	2026-07-15 06:40:55
356	3	Which MySQL command is used to delete a table?	\N	single	1	36	2026-07-15 06:40:55	2026-07-15 06:40:55
357	3	What is the correct SQL syntax for inserting a new row into a table?	\N	single	1	37	2026-07-15 06:40:55	2026-07-15 06:40:55
358	3	What is the default port number for MySQL server?	\N	single	1	38	2026-07-15 06:40:55	2026-07-15 06:40:55
359	3	Which statement is used to add a new column to an existing table in MySQL?	\N	single	1	39	2026-07-15 06:40:55	2026-07-15 06:40:55
360	3	What is Laravel primarily used for?'	\N	single	1	40	2026-07-15 06:40:55	2026-07-15 06:40:55
361	3	Laravel follows which architectural pattern?	\N	single	1	41	2026-07-15 06:40:55	2026-07-15 06:40:55
362	3	What is Artisan in Laravel?	\N	single	1	42	2026-07-15 06:40:55	2026-07-15 06:40:55
363	3	What is the default templating engine used in Laravel views?	\N	single	1	43	2026-07-15 06:40:55	2026-07-15 06:40:55
364	3	Which Artisan command generates a new controller?'	\N	single	1	44	2026-07-15 06:40:55	2026-07-15 06:40:55
365	3	Which Artisan command runs pending database migrations?	\N	single	1	45	2026-07-15 06:40:55	2026-07-15 06:40:55
366	3	What does "Eloquent" refer to in Laravel?	\N	single	1	46	2026-07-15 06:40:55	2026-07-15 06:40:55
367	3	Which folder contains route definition files by default?	\N	single	1	47	2026-07-15 06:40:55	2026-07-15 06:40:55
368	3	Which command lists all registered routes in a Laravel app?	\N	single	1	48	2026-07-15 06:40:55	2026-07-15 06:40:55
369	3	Which file typically holds your application's environment variables?	\N	single	1	49	2026-07-15 06:40:55	2026-07-15 06:40:55
\.


--
-- Data for Name: quiz_attempts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quiz_attempts (id, quiz_id, user_id, started_at, completed_at, score, score_percentage, passed, created_at, updated_at) FROM stdin;
2	3	2	2026-07-14 11:51:24	\N	\N	\N	\N	2026-07-14 11:51:24	2026-07-14 11:51:24
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quizzes (id, title, description, duration_minutes, pass_percentage, shuffle_questions, is_published, created_by, created_at, updated_at) FROM stdin;
3	WEB DEVELOPMENT INTERNSHIP PROGRAMME (June – July)	Basic knowledge test.	45	50	t	t	1	2026-07-14 11:51:15	2026-07-14 11:51:15
\.


--
-- Data for Name: role_has_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.role_has_permissions (permission_id, role_id) FROM stdin;
7	6
5	7
8	7
6	7
5	8
6	8
7	8
8	8
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id, name, guard_name, created_at, updated_at) FROM stdin;
6	viewer	web	2026-07-14 09:34:39	2026-07-14 09:34:39
7	Creator	web	2026-07-14 09:34:39	2026-07-14 09:34:39
8	admin	web	2026-07-14 09:34:40	2026-07-14 09:34:40
9	super-admin	web	2026-07-14 09:34:40	2026-07-14 09:34:40
10	student	web	2026-07-14 09:34:40	2026-07-14 09:34:40
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
DSum3CPGzYOu13qtAt7kg4myitpZK1rC0X7mN0YQ	1	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	YTo0OntzOjY6Il90b2tlbiI7czo0MDoiR0haMWY4MTB3QmpLak9xZE1uVm5BeGs0dVNUQ05EbGM5dFZmS1k0SCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9	1784098626
1EAfQrxUGY7RWNrQB7kFgPCi02fhoT6K69Not7Z6	1	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	YTo0OntzOjY6Il90b2tlbiI7czo0MDoiYjB1ODlVbTg1TmI5UHBJZ2dKdHdOb2JDcjY0UGNXQ2JHZVhzREF2QyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9	1784106784
0BTPU6fzfHu1o7BdL5s5QCFf84DUumEtrR0HO2wR	2	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	YTo1OntzOjY6Il90b2tlbiI7czo0MDoiZkZBQm9MaHFkWmVlVm9HZVBqMVNleGc1b29nYmZHS3Q0Z0pKQ1JlWiI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIxOiJodHRwOi8vbG9jYWxob3N0OjgwMDAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyO30=	1784098903
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) FROM stdin;
1	Super Admin	super@admin.admin	\N	$2y$12$bcMFBBSq1KKTG8HUwdGGkOC.iVM0q3NXWhJz4fPhAGJi3.YLKC34K	\N	2026-07-14 09:13:59	2026-07-14 09:13:59
2	student 001	student@admin.admin	\N	$2y$12$IZgBkFOwW4.oU3R6VdDzg.XTXLRUhIXQVd5t5U7y/c/zp35X7nOiG	z8dvMqNvJ4DpJKZFkmxjjiz0osdmib1hDnwkVczKCser4JdwpxltCSoq3Zgj	2026-07-14 09:34:40	2026-07-14 09:34:40
\.


--
-- Name: attempt_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.attempt_answers_id_seq', 2, true);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.images_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 12, true);


--
-- Name: options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.options_id_seq', 1457, true);


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.permissions_id_seq', 8, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 4, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.questions_id_seq', 371, true);


--
-- Name: quiz_attempts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quiz_attempts_id_seq', 6, true);


--
-- Name: quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quizzes_id_seq', 9, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: attempt_answers attempt_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attempt_answers
    ADD CONSTRAINT attempt_answers_pkey PRIMARY KEY (id);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: model_has_permissions model_has_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_pkey PRIMARY KEY (permission_id, model_id, model_type);


--
-- Name: model_has_roles model_has_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_pkey PRIMARY KEY (role_id, model_id, model_type);


--
-- Name: options options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: permissions permissions_name_guard_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_guard_name_unique UNIQUE (name, guard_name);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: quiz_attempts quiz_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_pkey PRIMARY KEY (id);


--
-- Name: quiz_attempts quiz_attempts_quiz_id_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_quiz_id_user_id_unique UNIQUE (quiz_id, user_id);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);


--
-- Name: role_has_permissions role_has_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_pkey PRIMARY KEY (permission_id, role_id);


--
-- Name: roles roles_name_guard_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_guard_name_unique UNIQUE (name, guard_name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: model_has_permissions_model_id_model_type_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX model_has_permissions_model_id_model_type_index ON public.model_has_permissions USING btree (model_id, model_type);


--
-- Name: model_has_roles_model_id_model_type_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX model_has_roles_model_id_model_type_index ON public.model_has_roles USING btree (model_id, model_type);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: attempt_answers attempt_answers_option_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attempt_answers
    ADD CONSTRAINT attempt_answers_option_id_foreign FOREIGN KEY (option_id) REFERENCES public.options(id) ON DELETE CASCADE;


--
-- Name: attempt_answers attempt_answers_question_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attempt_answers
    ADD CONSTRAINT attempt_answers_question_id_foreign FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- Name: attempt_answers attempt_answers_quiz_attempt_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attempt_answers
    ADD CONSTRAINT attempt_answers_quiz_attempt_id_foreign FOREIGN KEY (quiz_attempt_id) REFERENCES public.quiz_attempts(id) ON DELETE CASCADE;


--
-- Name: images images_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: model_has_permissions model_has_permissions_permission_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- Name: model_has_roles model_has_roles_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: options options_question_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_question_id_foreign FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- Name: questions questions_quiz_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_quiz_id_foreign FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE;


--
-- Name: quiz_attempts quiz_attempts_quiz_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_quiz_id_foreign FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE;


--
-- Name: quiz_attempts quiz_attempts_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: quizzes quizzes_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: role_has_permissions role_has_permissions_permission_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- Name: role_has_permissions role_has_permissions_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict QZ3cy3JJhZnekNl3IlYlH8D80DQwH9wrsNUuPqGP7JWW23qNhBLhBISpofIAZul

