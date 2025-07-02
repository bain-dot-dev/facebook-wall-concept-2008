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
    <div className="w-64 flex-shrink-0">
      <div className="w-64 h-80 mx-auto mb-4 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
        <Image
          src={profileImageUrl}
          alt="Profile picture"
          width={256}
          height={320}
          className="w-full h-full object-cover"
        />
      </div>

      <Card className="p-4 mb-4">
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-sm text-gray-600">wall</p>
      </Card>

      <Card className="p-4 mb-4">
        <h3 className="font-semibold mb-2">Information</h3>
      </Card>

      <Card className="p-4">
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
  );
}
