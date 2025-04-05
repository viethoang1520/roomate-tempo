import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm, { ProfileFormData } from "./ProfileForm";

interface ProfileTabsProps {
  onSave?: (data: ProfileFormData) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ onSave }) => {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="personal-info" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal-info">
          {t("profile.tabs.personalInfo", "Thông tin cá nhân")}
        </TabsTrigger>
        <TabsTrigger value="my-posts">
          {t("profile.tabs.myPosts", "Bài đăng của tôi")}
        </TabsTrigger>
        <TabsTrigger value="deposit-history">
          {t("profile.tabs.depositHistory", "Lịch sử đặt cọc")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal-info" className="mt-6">
        <ProfileForm onSave={onSave} />
      </TabsContent>

      <TabsContent value="my-posts" className="mt-6">
        <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            {t("profile.myPosts.empty.title", "Chưa có bài đăng nào")}
          </h3>
          <p className="text-gray-500 mb-4">
            {t(
              "profile.myPosts.empty.description",
              "Bạn chưa đăng phòng nào. Hãy đăng phòng để tìm người ghép.",
            )}
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">
            {t("profile.myPosts.postRoom", "Đăng phòng ngay")}
          </button>
        </div>
      </TabsContent>

      <TabsContent value="deposit-history" className="mt-6">
        <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            {t("profile.depositHistory.empty.title", "Chưa có lịch sử đặt cọc")}
          </h3>
          <p className="text-gray-500">
            {t(
              "profile.depositHistory.empty.description",
              "Bạn chưa có giao dịch đặt cọc nào. Khi bạn đặt cọc phòng, thông tin sẽ hiển thị ở đây.",
            )}
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
