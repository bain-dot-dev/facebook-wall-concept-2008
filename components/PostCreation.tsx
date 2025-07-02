import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface PostCreationProps {
  onSubmit: (content: string, image: File | null) => Promise<void>;
  isLoading: boolean;
  maxChars?: number;
}

export function PostCreation({
  onSubmit,
  isLoading,
  maxChars = 280,
}: PostCreationProps) {
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const remainingChars = maxChars - newPost.length;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!newPost.trim() && !selectedImage) return;

    await onSubmit(newPost.trim(), selectedImage);

    // Clear form after successful submission
    setNewPost("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <Card className="p-3 sm:p-4 mb-4">
      <div className="gap-2 flex flex-col">
        <Textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          maxLength={maxChars}
          className="border-0 resize-none text-sm sm:text-base p-0 focus-visible:ring-0"
          rows={3}
        />

        <div
          className={`text-xs transition-colors duration-200 ${
            remainingChars < 20
              ? "text-red-500"
              : remainingChars < 50
              ? "text-yellow-500"
              : "text-gray-500"
          }`}
        >
          {remainingChars} characters remaining
        </div>
      </div>

      {/* Image Upload Area */}
      <div className="p-3 sm:p-4 border-2 border-dashed border-gray-200 rounded-lg">
        {imagePreview ? (
          <div className="relative">
            <Image
              src={imagePreview}
              alt="Preview"
              width={400}
              height={300}
              className="rounded-lg max-w-full h-auto"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm"
              onClick={removeImage}
            >
              Remove
            </Button>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center justify-center py-3 sm:py-4">
            <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2" />
            <span className="text-xs sm:text-sm text-gray-500 text-center">
              Click to add photo (optional)
            </span>
            <span className="text-xs text-gray-400 text-center">
              JPG, PNG, GIF up to 5MB
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={(!newPost.trim() && !selectedImage) || isLoading}
          className="bg-[#3b5998] hover:bg-[#2d4373] transition-all duration-200 disabled:opacity-50 text-sm sm:text-base px-4 sm:px-6"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden sm:inline">Sharing...</span>
              <span className="sm:hidden">...</span>
            </div>
          ) : (
            "Share"
          )}
        </Button>
      </div>
    </Card>
  );
}
