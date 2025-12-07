import { supabase } from './supabase';
import type { Database } from '../types/supabase';

export type Folder = Database['public']['Tables']['folders']['Row'];
export type Document = Database['public']['Tables']['documents']['Row'];
export type Workspace = Database['public']['Tables']['workspaces']['Row'];

export const dataService = {
  // Workspaces
  async getWorkspaces() {
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createWorkspace(name: string) {
    const { data, error } = await supabase
      .from('workspaces')
      .insert({ name } as any)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  // Folders
  async getFolders(workspaceId: string, parentId: string | null = null) {
    let query = supabase
      .from('folders')
      .select('*')
      .eq('workspace_id', workspaceId);
      
    if (parentId) {
      query = query.eq('parent_id', parentId);
    } else {
      query = query.is('parent_id', null);
    }

    const { data, error } = await query.order('sort_order', { ascending: true });
      
    if (error) throw error;
    return data;
  },

  async createFolder(workspaceId: string, name: string, icon?: string, color?: string, parentId: string | null = null) {
    const { data, error } = await supabase
      .from('folders')
      .insert({ workspace_id: workspaceId, name, icon, color, parent_id: parentId } as any)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  // Documents
  async getDocuments(workspaceId: string, folderId: string | null = null) {
    let query = supabase
      .from('documents')
      .select('*')
      .eq('workspace_id', workspaceId);
      
    if (folderId) {
      query = query.eq('folder_id', folderId);
    } else {
      query = query.is('folder_id', null); // Inbox
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createDocument(
    workspaceId: string, 
    title: string, 
    folderId: string | null = null,
    metadata: Record<string, any> = {}
  ) {
    const { data, error } = await supabase
      .from('documents')
      .insert({
        workspace_id: workspaceId,
        folder_id: folderId,
        title,
        metadata,
        version: 1,
        status: 'inbox'
      } as any)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};
