import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileSidebar from "@/components/ProfileSidebar";
import { ProfileFormData } from "@/components/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    name: "Đinh Việt Hoàng",
    username: "nguyenvana",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=profile",
    phoneNumber: "0367 862 734",
    email: "viethoang1520@gmail.com",
    joinDate: "Tháng 4, 2025",
  });

  const handleProfileUpdate = (data: ProfileFormData) => {
    console.log("Profile updated:", data);
    setUserData((prev) => ({
      ...prev,
      name: data.name,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Thiết lập tài khoản
          </h1>
          <p className="text-gray-500">
            Quản lý thông tin tài khoản và thiết lập của bạn
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* User Profile Card */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="relative">
                  <img
                    src={userData.avatarUrl}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                  />
                  <button className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-1 border border-gray-200">
                    <Icon icon="mdi:pencil" className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{userData.name}</h3>
                  <p className="text-sm text-gray-500">
                    {userData.phoneNumber}
                  </p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                <a
                  href="#profile"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-50 text-green-600 font-medium"
                >
                  <Icon icon="mdi:account" className="w-5 h-5" />
                  <span>Thông tin cá nhân</span>
                </a>
                <a
                  href="#preferences"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Icon icon="mdi:cog" className="w-5 h-5" />
                  <span>Thiết lập</span>
                </a>
                <a
                  href="#notifications"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Icon icon="mdi:bell" className="w-5 h-5" />
                  <span>Thông báo</span>
                </a>
                <a
                  href="#security"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Icon icon="mdi:shield-lock" className="w-5 h-5" />
                  <span>Bảo mật</span>
                </a>
                <a
                  href="#roommates"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Icon icon="mdi:account-group" className="w-5 h-5" />
                  <span>Bạn cùng phòng</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-sm p-6">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                <TabsTrigger value="preferences">Thiết lập</TabsTrigger>
                <TabsTrigger value="notifications">Thông báo</TabsTrigger>
                <TabsTrigger value="security">Bảo mật</TabsTrigger>
                <TabsTrigger value="roommates">Bạn cùng phòng</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <ProfileTabs onSave={handleProfileUpdate} />
              </TabsContent>
              <TabsContent value="preferences">
                <p>Thiết lập nội dung</p>
              </TabsContent>
              <TabsContent value="notifications">
                <p>Nội dung thông báo</p>
              </TabsContent>
              <TabsContent value="security">
                <p>Nội dung bảo mật</p>
              </TabsContent>
              <TabsContent value="roommates">
                <p>Nội dung bạn cùng phòng</p>
              </TabsContent>
            </Tabs>
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
