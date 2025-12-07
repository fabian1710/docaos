-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone
);

-- 2. WORKSPACES
create table public.workspaces (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. WORKSPACE MEMBERS
create table public.workspace_members (
  workspace_id uuid references public.workspaces on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text check (role in ('admin', 'editor', 'viewer')) default 'viewer',
  primary key (workspace_id, user_id)
);

-- 4. FOLDERS (The "Stack")
create table public.folders (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  parent_id uuid references public.folders on delete cascade, -- Null = Top Level
  name text not null,
  icon text, -- Emoji or icon name
  color text, -- Hex code or var name
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. DOCUMENTS (The "Papers")
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  folder_id uuid references public.folders on delete set null, -- Null = Inbox
  title text not null,
  storage_path text, -- Path in Supabase Storage
  mime_type text,
  file_size int,
  version int default 1, -- Simple versioning
  metadata jsonb default '{}'::jsonb, -- Flexible metadata
  tags text[] default array[]::text[],
  status text check (status in ('inbox', 'processed', 'archived')) default 'inbox',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Basic Setup)

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.folders enable row level security;
alter table public.documents enable row level security;

-- Profiles: Users can view/edit their own profile
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Workspaces: Visible to members
create policy "Members can view workspaces." on public.workspaces
  for select using (
    exists (
      select 1 from public.workspace_members
      where workspace_id = public.workspaces.id
      and user_id = auth.uid()
    )
  );

-- Folders: Visible to workspace members
create policy "Members can view folders." on public.folders
  for select using (
    exists (
      select 1 from public.workspace_members
      where workspace_id = public.folders.workspace_id
      and user_id = auth.uid()
    )
  );

-- Documents: Visible to workspace members
create policy "Members can view documents." on public.documents
  for select using (
    exists (
      select 1 from public.workspace_members
      where workspace_id = public.documents.workspace_id
      and user_id = auth.uid()
    )
  );
