-- 1. STORAGE POLICIES
-- Allow authenticated users to upload to 'docaos-docs' bucket
create policy "Authenticated users can upload files"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'docaos-docs' );

-- Allow authenticated users to view files in 'docaos-docs' bucket
create policy "Authenticated users can view files"
on storage.objects for select
to authenticated
using ( bucket_id = 'docaos-docs' );

-- 2. DATABASE POLICIES (INSERT)
-- Allow authenticated users to create workspaces
create policy "Authenticated users can create workspaces"
on public.workspaces for insert
to authenticated
with check (true);

-- Allow members to create folders
create policy "Members can create folders"
on public.folders for insert
to authenticated
with check (
  exists (
    select 1 from public.workspace_members
    where workspace_id = public.folders.workspace_id
    and user_id = auth.uid()
  )
);

-- Allow members to create documents
create policy "Members can create documents"
on public.documents for insert
to authenticated
with check (
  exists (
    select 1 from public.workspace_members
    where workspace_id = public.documents.workspace_id
    and user_id = auth.uid()
  )
);

-- Allow members to join the workspace they created
create policy "Users can add themselves to workspace members"
on public.workspace_members for insert
to authenticated
with check ( auth.uid() = user_id );
