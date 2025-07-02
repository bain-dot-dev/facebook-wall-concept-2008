import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ProfileSidebarProps {
  name: string;
  profileImageUrl: string;
  networks: string[];
  location: string;
}

export function ProfileSidebar({
  name,
  profileImageUrl,
  networks,
  location,
}: ProfileSidebarProps) {
  return (
    <div className="w-full md:w-48 lg:w-64 md:flex-shrink-0">
      {/* Mobile: Horizontal profile layout, Tablet/Desktop: Vertical */}
      <div className="flex md:block items-center md:items-stretch gap-4 md:gap-0">
        {/* Profile Image */}
        <div className="w-16 h-20 sm:w-20 sm:h-24 md:w-48 md:h-60 lg:w-64 lg:h-80 mx-0 md:mx-auto mb-0 md:mb-4 rounded-lg md:rounded-xl overflow-hidden bg-gray-100 shadow-sm flex-shrink-0">
          <Image
            src={profileImageUrl}
            alt="Profile picture"
            width={256}
            height={320}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info - Mobile: beside image, Tablet/Desktop: below image */}
        <div className="flex-1 md:flex-initial">
          <Card className="p-3 md:p-4 mb-2 md:mb-4 flex flex-col gap-2">
            <h2 className="font-bold text-base md:text-lg">{name}</h2>
            <p className="text-xs md:text-sm text-gray-600">wall</p>
          </Card>
        </div>
      </div>

      {/* Information Cards - Hidden on mobile, visible on tablet/desktop */}
      <div className="hidden md:block">
        <Card className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Information</h3>
        </Card>

        <Card className="p-4 flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Networks</h3>
          {networks.map((network, index) => (
            <p key={index} className="text-sm text-gray-600">
              {network}
            </p>
          ))}
          <h3 className="font-semibold mt-4 mb-2">Current City</h3>
          <p className="text-sm text-gray-600">{location}</p>
        </Card>
      </div>
    </div>
  );
}
