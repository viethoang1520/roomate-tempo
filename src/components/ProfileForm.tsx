import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

interface ProfileFormProps {
  onSave?: (data: ProfileFormData) => void;
}

export interface ProfileFormData {
  name: string;
  age: number;
  gender: string;
  location: string;
  interests: string;
  habits: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "Nguyễn Văn A",
    age: 22,
    gender: "male",
    location: "HCM",
    interests: "Đọc sách, nghe nhạc, xem phim",
    habits: "Dậy sớm, ngăn nắp, sạch sẽ",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // In a real implementation, this would be an actual API call
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Failed to update profile');

      // For now, we'll simulate a successful response
      console.log("Profile updated:", formData);

      // Call the onSave callback if provided
      if (onSave) {
        onSave(formData);
      }

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // List of Vietnamese provinces (simplified)
  const vietnameseProvinces = [
    "Hà Nội",
    "TP.HCM",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showSuccess && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
          <AlertDescription>
            {t("profile.updateSuccess", "Cập nhật thành công")}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">{t("profile.name", "Tên")}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("profile.namePlaceholder", "Nhập tên của bạn")}
              required
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">{t("profile.age", "Tuổi")}</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min={16}
              max={30}
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">{t("profile.gender", "Giới tính")}</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <SelectTrigger id="gender">
                <SelectValue
                  placeholder={t("profile.selectGender", "Chọn giới tính")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t("profile.male", "Nam")}</SelectItem>
                <SelectItem value="female">
                  {t("profile.female", "Nữ")}
                </SelectItem>
                <SelectItem value="other">
                  {t("profile.other", "Khác")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              {t("profile.location", "Quê quán")}
            </Label>
            <Select
              value={formData.location}
              onValueChange={(value) => handleSelectChange("location", value)}
            >
              <SelectTrigger id="location">
                <SelectValue
                  placeholder={t("profile.selectLocation", "Chọn quê quán")}
                />
              </SelectTrigger>
              <SelectContent>
                {vietnameseProvinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <Label htmlFor="interests">
            {t("profile.interests", "Sở thích")}
          </Label>
          <Textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder={t(
              "profile.interestsPlaceholder",
              "Mô tả sở thích của bạn (tối đa 200 từ)",
            )}
            className="min-h-[100px]"
            maxLength={1000}
          />
        </div>

        {/* Habits */}
        <div className="space-y-2">
          <Label htmlFor="habits">
            {t("profile.habits", "Thói quen sống")}
          </Label>
          <Textarea
            id="habits"
            name="habits"
            value={formData.habits}
            onChange={handleChange}
            placeholder={t(
              "profile.habitsPlaceholder",
              "Mô tả thói quen sống của bạn (tối đa 200 từ)",
            )}
            className="min-h-[100px]"
            maxLength={1000}
          />
        </div>
      </div>

      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        {t("profile.saveChanges", "Lưu thay đổi")}
      </Button>
    </form>
  );
};

export default ProfileForm;
