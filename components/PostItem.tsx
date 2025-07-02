import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Post } from "@/lib/supabase";

interface PostItemProps {
  post: Post;
  profileImageUrl: string;
  formatTimeAgo: (dateString: string) => string;
}

export function PostItem({
  post,
  profileImageUrl,
  formatTimeAgo,
}: PostItemProps) {
  return (
    <Card className="p-4 transition-all duration-300 hover:shadow-md animate-in slide-in-from-top-2">
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={profileImageUrl} />
          <AvatarFallback>BH</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{post.user_name}</span>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(post.created_at)}
            </span>
          </div>
          {post.body && <p className="text-sm mb-3">{post.body}</p>}
          {post.image_url && (
            <div className="mb-3">
              <Image
                src={post.image_url}
                alt="Post image"
                width={400}
                height={300}
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
