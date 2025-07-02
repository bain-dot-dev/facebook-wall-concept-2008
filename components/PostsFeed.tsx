import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/supabase";
import { PostItem } from "./PostItem";

interface PostsFeedProps {
  posts: Post[];
  isLoading: boolean;
  realtimeStatus: string;
  profileImageUrl: string;
  onRefresh: () => void;
  formatTimeAgo: (dateString: string) => string;
}

export function PostsFeed({
  posts,
  isLoading,
  realtimeStatus,
  profileImageUrl,
  onRefresh,
  formatTimeAgo,
}: PostsFeedProps) {
  const getStatusColor = () => {
    switch (realtimeStatus) {
      case "SUBSCRIBED":
        return "bg-green-500";
      case "CHANNEL_ERROR":
        return "bg-red-500";
      default:
        return "bg-yellow-500 animate-pulse";
    }
  };

  const getStatusText = () => {
    switch (realtimeStatus) {
      case "SUBSCRIBED":
        return "Live";
      case "CHANNEL_ERROR":
        return "Offline";
      default:
        return "Connecting...";
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      {/* Posts Feed Header with Refresh */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Posts</h2>
        <div className="flex items-center gap-3">
          {/* Real-time Status Indicator */}
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
            <span className="text-xs text-gray-600">{getStatusText()}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="text-sm"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Refreshing...
              </div>
            ) : (
              "Refresh"
            )}
          </Button>
        </div>
      </div>

      {/* Posts Feed */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              profileImageUrl={profileImageUrl}
              formatTimeAgo={formatTimeAgo}
            />
          ))}
        </div>
      )}
    </>
  );
}
