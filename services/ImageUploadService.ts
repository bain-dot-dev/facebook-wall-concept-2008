import { supabase } from "@/lib/supabase";

export class ImageUploadService {
  static async uploadImage(file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("post-images")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading image:", error);
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("post-images").getPublicUrl(fileName);

      return publicUrl;
    } catch (err) {
      console.error("Unexpected error during image upload:", err);
      return null;
    }
  }
}
