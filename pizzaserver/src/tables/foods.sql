CREATE TABLE IF NOT EXISTS public.foods
(
    id integer NOT NULL DEFAULT nextval('food_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    topping text[] COLLATE pg_catalog."default",
    price integer,
    image text COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by text COLLATE pg_catalog."default",
    CONSTRAINT food_pkey PRIMARY KEY (id),
    CONSTRAINT food_created_by_fkey FOREIGN KEY (created_by)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
