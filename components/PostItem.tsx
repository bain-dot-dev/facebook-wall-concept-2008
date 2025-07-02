import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Post } from "@/lib/supabase";

interface PostItemProps {
  post: Post;
  profileImageUrl: string;
  formatTimeAgo: (dateString: string) => string;
}

export function PostItem({
  post,
  // profileImageUrl,
  formatTimeAgo,
}: PostItemProps) {
  return (
    <Card className="p-3 sm:p-4 transition-all duration-300 hover:shadow-md animate-in slide-in-from-top-2">
      <div className="flex items-start gap-2 sm:gap-3">
        {/* <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
          <AvatarImage src={profileImageUrl} />
          <AvatarFallback className="text-xs sm:text-sm">BH</AvatarFallback>
        </Avatar> */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-xs sm:text-sm truncate">
              {post.user_name}
            </span>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {formatTimeAgo(post.created_at)}
            </span>
          </div>
          {post.body && (
            <p className="text-xs sm:text-sm mb-3 break-words">{post.body}</p>
          )}
          {post.image_url && (
            <div className="mb-3">
              <Image
                src={post.image_url}
                alt="Post image"
                width={600}
                height={400}
                className="rounded-lg w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
