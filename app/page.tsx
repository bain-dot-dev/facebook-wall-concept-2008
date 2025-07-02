"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { PostCreation } from "@/components/PostCreation";
import { PostsFeed } from "@/components/PostsFeed";
import { useRealtimePosts } from "@/hooks/useRealtimePosts";
import { PostService } from "@/services/PostService";
import { ImageUploadService } from "@/services/ImageUploadService";
import { formatTimeAgo } from "@/utils/timeUtils";

// Constants
const USER_NAME = "Bain Hansly Cruz";
const PROFILE_IMAGE_URL =
  "/profile-image/491008199_1160551489182611_8571331077311254131_n.jpg";
const USER_NETWORKS = ["Data Geeks Society", "Web Tech Society"];
const USER_LOCATION = "San Jose City, Central Luzon";

export default function FacebookWall() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const { posts, setPosts, realtimeStatus } = useRealtimePosts();

  const fetchPosts = async () => {
    setIsLoadingPosts(true);
    setError(null);

    try {
      const { data, error } = await PostService.fetchPosts();

      if (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again.");
      } else {
        console.log("Fetched posts:", data?.length || 0);
        setPosts(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handlePostSubmit = async (content: string, image: File | null) => {
    setIsLoading(true);
    setError(null);

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await ImageUploadService.uploadImage(image);
        if (!imageUrl) {
          throw new Error("Failed to upload image");
        }
      }

      const { data, error } = await PostService.createPost(
        content || null,
        imageUrl,
        USER_NAME
      );

      if (error) {
        throw error;
      }

      console.log("Post created successfully:", data);
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
      throw err; // Re-throw to prevent form clearing
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Show realtime error if connection fails
  useEffect(() => {
    if (realtimeStatus === "CHANNEL_ERROR") {
      setError("Real-time updates unavailable. Posts will refresh manually.");
    }
  }, [realtimeStatus]);

  return (
    <div className="min-h-screen bg-white">
      {/* Facebook Header */}
      <div className="bg-[#3b5998] text-white p-2 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">WALL</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 p-2 sm:p-4">
        {/* Mobile: Profile at top, Tablet/Desktop: Left Sidebar */}
        <div className="w-full md:w-48 lg:w-64 md:flex-shrink-0">
          <ProfileSidebar
            name={USER_NAME}
            profileImageUrl={PROFILE_IMAGE_URL}
            networks={USER_NETWORKS}
            location={USER_LOCATION}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <PostCreation onSubmit={handlePostSubmit} isLoading={isLoading} />

          {error && (
            <Card className="p-4 mb-4 bg-red-50 border-red-200">
              <div className="flex items-center gap-2 text-red-700">
                <span className="text-sm">{error}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setError(null)}
                  className="ml-auto text-red-700 hover:text-red-900"
                >
                  ×
                </Button>
              </div>
            </Card>
          )}

          <PostsFeed
            posts={posts}
            isLoading={isLoadingPosts}
            realtimeStatus={realtimeStatus}
            profileImageUrl={PROFILE_IMAGE_URL}
            onRefresh={fetchPosts}
            formatTimeAgo={formatTimeAgo}
          />
        </div>
      </div>
    </div>
  );
}
