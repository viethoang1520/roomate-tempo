import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileSidebar from "@/components/ProfileSidebar";
import { ProfileFormData } from "@/components/ProfileForm";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    name: "Nguyễn Văn A",
    username: "nguyenvana",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=profile",
  });

  const handleProfileUpdate = (data: ProfileFormData) => {
    console.log("Profile updated:", data);
    // In a real app, this would update the user data in the state and possibly in a backend
    setUserData((prev) => ({
      ...prev,
      name: data.name,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar (Left) */}
          <div className="w-full md:w-3/10">
            <ProfileSidebar
              name={userData.name}
              username={userData.username}
              avatarUrl={userData.avatarUrl}
              onLogout={() => console.log("Logout clicked")}
              onAvatarUpload={(file) =>
                console.log("Avatar upload:", file.name)
              }
            />
          </div>

          {/* Main Content (Right) */}
          <div className="w-full md:w-7/10 bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">
              {t("profile.updateProfile")}
            </h1>

            {/* Profile Tabs */}
            <ProfileTabs onSave={handleProfileUpdate} />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ở Ghép Vinhomes</h3>
              <p className="text-gray-300 mb-4">
                Nền tảng kết nối người ghép phòng tại Vinhomes Grand Park
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-300 hover:text-white">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="/search" className="text-gray-300 hover:text-white">
                    Tìm phòng
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/faq" className="text-gray-300 hover:text-white">
                    Câu hỏi thường gặp
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-300 hover:text-white">
                    Điều khoản sử dụng
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
              <p className="text-gray-300 mb-2">
                Vinhomes Grand Park, Quận 9, TP.HCM
              </p>
              <p className="text-gray-300 mb-2">Email: info@oghepvinhomes.vn</p>
              <p className="text-gray-300">Hotline: 0123 456 789</p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} Ở Ghép Vinhomes. Tất cả quyền
              được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
