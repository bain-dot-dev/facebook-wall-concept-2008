import { useEffect, useState } from "react";
import { supabase, Post } from "@/lib/supabase";

export function useRealtimePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [realtimeStatus, setRealtimeStatus] = useState<string>("connecting");

  useEffect(() => {
    const channel = supabase
      .channel("posts-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          console.log("New post received:", payload.new);
          const newPost = payload.new as Post;
          setPosts((current) => {
            // Avoid duplicates by checking if post already exists
            const exists = current.find((post) => post.id === newPost.id);
            if (exists) return current;
            return [newPost, ...current];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts" },
        (payload) => {
          console.log("Post updated:", payload.new);
          const updatedPost = payload.new as Post;
          setPosts((current) =>
            current.map((post) =>
              post.id === updatedPost.id ? updatedPost : post
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts" },
        (payload) => {
          console.log("Post deleted:", payload.old);
          const deletedPost = payload.old as Post;
          setPosts((current) =>
            current.filter((post) => post.id !== deletedPost.id)
          );
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
        setRealtimeStatus(status);
        if (status === "SUBSCRIBED") {
          console.log("Successfully subscribed to real-time updates");
        } else if (status === "CHANNEL_ERROR") {
          console.error("Error subscribing to real-time updates");
        }
      });

    return () => {
      console.log("Cleaning up subscription");
      supabase.removeChannel(channel);
    };
  }, []);

  return { posts, setPosts, realtimeStatus };
}
