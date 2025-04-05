import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ProfileSidebarProps {
  name?: string;
  username?: string;
  avatarUrl?: string;
  onLogout?: () => void;
  onAvatarUpload?: (file: File) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  name = "Nguyễn Văn A",
  username = "nguyenvana",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=profile",
  onLogout,
  onAvatarUpload,
}) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarUpload) {
      onAvatarUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-green-500"
          />
          <button
            className="absolute bottom-0 right-0 bg-green-600 text-white p-1 rounded-full"
            onClick={handleAvatarClick}
          >
            <Upload className="h-4 w-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-500 text-sm">@{username}</p>
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <Button variant="destructive" className="w-full" onClick={onLogout}>
          {t("profile.logout", "Đăng xuất")}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
