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
  },

  async updateDocument(id: string, updates: Partial<Document>) {
    const { data, error } = await supabase
      .from('documents')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateDocumentStatus(id: string, status: 'inbox' | 'processed' | 'archived') {
    const { data, error } = await supabase
      .from('documents')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async processDocument(id: string) {
    try {
      // 1. Fetch Document
      const { data: doc, error: fetchError } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !doc) throw fetchError || new Error('Document not found');
      if (!doc.storage_path) throw new Error('Document has no file');

      // 2. Download File
      const { data: fileBlob, error: downloadError } = await supabase.storage
        .from('docaos-docs') // Hardcoded bucket name for now, should match storageService
        .download(doc.storage_path);

      if (downloadError || !fileBlob) throw downloadError || new Error('Failed to download file');

      // 3. Convert to Base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = error => reject(error);
      });

      // 4. Analyze with AI
      // Dynamic import to avoid circular dependencies if any, though unlikely here
      const { aiService } = await import('./aiService');
      const analysis = await aiService.analyzeDocument(base64Data, doc.mime_type || 'application/octet-stream');

      // 5. Update Document
      const updates: any = {
        status: 'processed',
        metadata: {
          ...((doc.metadata as object) || {}),
          ai_analysis: analysis
        }
      };

      if (analysis.summary) updates.title = analysis.summary.substring(0, 50) + (analysis.summary.length > 50 ? '...' : ''); // Optional: Auto-title? Maybe just keep original title or use summary if title is generic
      // Let's stick to updating metadata and status for now, maybe tags and type

      if (analysis.keywords) updates.tags = [...(doc.tags || []), ...analysis.keywords];
      if (analysis.document_type) updates.document_type = analysis.document_type;

      return await this.updateDocument(id, updates);

    } catch (error) {
      console.error('Error processing document:', error);
      throw error;
    }
  }
};
