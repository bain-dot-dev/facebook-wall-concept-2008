import { supabase, Post } from "@/lib/supabase";

export class PostService {
  static async fetchPosts(): Promise<{ data: Post[] | null; error: unknown }> {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      return { data, error };
    } catch (err) {
      console.error("Unexpected error fetching posts:", err);
      return { data: null, error: err };
    }
  }

  static async createPost(
    body: string | null,
    imageUrl: string | null,
    userName: string
  ): Promise<{ data: Post[] | null; error: unknown }> {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert({
          body,
          image_url: imageUrl,
          user_name: userName,
        })
        .select();

      return { data, error };
    } catch (err) {
      console.error("Unexpected error creating post:", err);
      return { data: null, error: err };
    }
  }
}
