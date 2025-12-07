-- 1. DROP TABLES
drop table if exists public.workspace_members cascade;
drop table if exists public.workspaces cascade;

-- 2. ALTER FOLDERS
alter table public.folders
  drop column if exists workspace_id;

alter table public.folders
  add column if not exists user_id uuid references public.profiles(id) on delete cascade default auth.uid();

-- Update existing rows (if any) to current user (dangerous but okay for dev)
-- update public.folders set user_id = auth.uid() where user_id is null;
-- alter table public.folders alter column user_id set not null;

-- 3. ALTER DOCUMENTS
alter table public.documents
  drop column if exists workspace_id;

alter table public.documents
  add column if not exists user_id uuid references public.profiles(id) on delete cascade default auth.uid();

-- 4. UPDATE RLS POLICIES

-- Folders
drop policy if exists "Members can view folders." on public.folders;
drop policy if exists "Members can create folders" on public.folders;

create policy "Users can view own folders" on public.folders
  for select using (auth.uid() = user_id);

create policy "Users can insert own folders" on public.folders
  for insert with check (auth.uid() = user_id);

create policy "Users can update own folders" on public.folders
  for update using (auth.uid() = user_id);

create policy "Users can delete own folders" on public.folders
  for delete using (auth.uid() = user_id);

-- Documents
drop policy if exists "Members can view documents." on public.documents;
drop policy if exists "Members can create documents" on public.documents;

create policy "Users can view own documents" on public.documents
  for select using (auth.uid() = user_id);

create policy "Users can insert own documents" on public.documents
  for insert with check (auth.uid() = user_id);

create policy "Users can update own documents" on public.documents
  for update using (auth.uid() = user_id);

create policy "Users can delete own documents" on public.documents
  for delete using (auth.uid() = user_id);
