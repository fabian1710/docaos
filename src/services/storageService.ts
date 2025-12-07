import { supabase } from './supabase';

const BUCKET_NAME = 'docaos-docs';

export const storageService = {
    /**
     * Uploads a file to the 'documents' bucket.
     * @param file The file to upload.
     * @param path Optional path within the bucket. If not provided, a random path is generated.
     * @returns The path of the uploaded file.
     */
    async uploadFile(file: File, path?: string): Promise<{ path: string; error: any }> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = path || `${fileName}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading file:', error);
            return { path: '', error };
        }

        return { path: data.path, error: null };
    },

    /**
     * Gets a public URL for a file.
     * @param path The path of the file in the bucket.
     */
    getPublicUrl(path: string) {
        const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
        return data.publicUrl;
    },

    /**
     * Downloads a file from the bucket.
     * @param path The path of the file in the bucket.
     */
    async downloadFile(path: string) {
        const { data, error } = await supabase.storage.from(BUCKET_NAME).download(path);
        if (error) throw error;
        return data;
    },

    /**
     * Deletes a file from the bucket.
     * @param path The path of the file to delete.
     */
    async deleteFile(path: string) {
        const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);
        if (error) throw error;
    }
};
