-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.documents (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  folder_id uuid,
  title text NOT NULL,
  storage_path text,
  mime_type text,
  file_size integer,
  version integer DEFAULT 1,
  metadata jsonb DEFAULT '{}'::jsonb,
  tags ARRAY DEFAULT ARRAY[]::text[],
  status text DEFAULT 'inbox'::text CHECK (status = ANY (ARRAY['inbox'::text, 'processed'::text, 'archived'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id uuid DEFAULT auth.uid(),
  CONSTRAINT documents_pkey PRIMARY KEY (id),
  CONSTRAINT documents_folder_id_fkey FOREIGN KEY (folder_id) REFERENCES public.folders(id),
  CONSTRAINT documents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.folders (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  parent_id uuid,
  name text NOT NULL,
  icon text,
  color text,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id uuid DEFAULT auth.uid(),
  CONSTRAINT folders_pkey PRIMARY KEY (id),
  CONSTRAINT folders_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.folders(id),
  CONSTRAINT folders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);