import { supabase } from './supabase';
import type { Database } from '../types/supabase';

export type Folder = Database['public']['Tables']['folders']['Row'];
export type Document = Database['public']['Tables']['documents']['Row'];

export const dataService = {
  // Folders
  async getFolders(parentId: string | null = null) {
    let query = supabase
      .from('folders')
      .select('*');

    if (parentId) {
      query = query.eq('parent_id', parentId);
    } else {
      query = query.is('parent_id', null);
    }

    const { data, error } = await query.order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async createFolder(name: string, icon?: string, color?: string, parentId: string | null = null) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('folders')
      .insert({
        user_id: user.id,
        name,
        icon,
        color,
        parent_id: parentId
      } as any)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Documents
  async getDocuments(folderId: string | null = null) {
    let query = supabase
      .from('documents')
      .select('*');

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
    title: string,
    folderId: string | null = null,
    metadata: Record<string, any> = {},
    fileData?: {
      storage_path: string;
      mime_type: string;
      file_size: number;
    }
  ) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const documentData: any = {
      user_id: user.id,
      folder_id: folderId,
      title,
      metadata,
      version: 1,
      status: 'inbox'
    };

    if (fileData) {
      documentData.storage_path = fileData.storage_path;
      documentData.mime_type = fileData.mime_type;
      documentData.file_size = fileData.file_size;
    }

    const { data, error } = await supabase
      .from('documents')
      .insert(documentData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
