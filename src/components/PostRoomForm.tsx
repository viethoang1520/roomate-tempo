import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { RootState } from "@/store/store";
import {
  setFormField,
  setAmenity,
  addFiles,
  removeFile,
  postRoom,
} from "@/store/roomPostSlice";
import type { AppDispatch } from "@/store/store";

interface PostRoomFormProps {
  onSubmit?: (e: React.FormEvent) => void;
  onPreview?: () => void;
}

const PostRoomForm: React.FC<PostRoomFormProps> = ({ onSubmit, onPreview }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.roomPost);

  // Building options
  const buildings = [
    "S1.01",
    "S1.02",
    "S1.03",
    "S1.05",
    "S1.06",
    "S1.07",
    "S2.01",
    "S2.02",
    "S2.03",
    "S2.05",
    "S2.06",
    "S2.07",
    "S3.01",
    "S3.02",
    "S3.03",
    "S3.05",
    "S3.06",
    "S3.07",
  ];

  // Room type options
  const roomTypes = ["Studio", "1PN 1WC", "2PN 1WC", "2PN 2WC", "3PN 2WC"];

  // Utilities options
  const utilitiesOptions = [
    "Trống",
    "Bếp rèm",
    "Máy giặt",
    "Nội thất đầy đủ",
    "Nội thất cơ bản",
  ];

  // Occupant options
  const occupantOptions = [1, 2, 3, 4, 5, 6];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    dispatch(setFormField({ field: name as any, value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    dispatch(setFormField({ field: name as any, value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    dispatch(setAmenity({ name: name as any, value: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
      dispatch(addFiles({ files: newFiles, previewUrls: newPreviewUrls }));
    }
  };

  const handleRemoveFile = (index: number) => {
    // Release object URL to prevent memory leaks
    URL.revokeObjectURL(formData.previewUrls[index]);
    dispatch(removeFile(index));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    } else {
      dispatch(postRoom(formData));
      alert("Bài đăng sẽ được duyệt trong 24h");
    }
  };

  const handlePreviewClick = () => {
    if (onPreview) {
      onPreview();
    } else {
      console.log("Preview requested:", formData);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Building Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Tên tòa</label>
        <Select
          value={formData.building}
          onValueChange={(value) => handleSelectChange("building", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn tòa nhà" />
          </SelectTrigger>
          <SelectContent>
            {buildings.map((building) => (
              <SelectItem key={building} value={building}>
                {building}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Apartment */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Số căn hộ</label>
        <Input
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={handleInputChange}
          placeholder="Nhập số căn hộ (VD: 0511, A0806)"
          className="w-full"
        />
      </div>

      {/* Room Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Loại phòng</label>
        <Select
          value={formData.roomType}
          onValueChange={(value) => handleSelectChange("roomType", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn loại phòng" />
          </SelectTrigger>
          <SelectContent>
            {roomTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Giá thuê/tháng (VNĐ)
        </label>
        <Input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Nhập giá thuê (VD: 3.000.000)"
          className="w-full"
        />
      </div>

      {/* Max Slots */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Số người tối đa</label>
        <Select
          value={formData.maxSlots}
          onValueChange={(value) => handleSelectChange("maxSlots", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn số người tối đa" />
          </SelectTrigger>
          <SelectContent>
            {occupantOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Available Slots */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Số người còn trống</label>
        <Input
          type="number"
          name="availableSlots"
          value={formData.availableSlots}
          onChange={handleInputChange}
          placeholder="Nhập số người còn trống"
          min="0"
          max={formData.maxSlots || "6"}
          className="w-full"
        />
      </div>

      {/* Utilities */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Tiện ích có sẵn</label>
        <Select
          value={formData.utilities}
          onValueChange={(value) => handleSelectChange("utilities", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn tiện ích có sẵn" />
          </SelectTrigger>
          <SelectContent>
            {utilitiesOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Tiện ích bổ sung</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wifi"
              checked={formData.amenities.wifi}
              onCheckedChange={(checked) =>
                handleCheckboxChange("wifi", checked === true)
              }
            />
            <label htmlFor="wifi" className="text-sm">
              Wifi
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="airConditioner"
              checked={formData.amenities.airConditioner}
              onCheckedChange={(checked) =>
                handleCheckboxChange("airConditioner", checked === true)
              }
            />
            <label htmlFor="airConditioner" className="text-sm">
              Điều hòa
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="privateBathroom"
              checked={formData.amenities.privateBathroom}
              onCheckedChange={(checked) =>
                handleCheckboxChange("privateBathroom", checked === true)
              }
            />
            <label htmlFor="privateBathroom" className="text-sm">
              Phòng tắm riêng
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="kitchen"
              checked={formData.amenities.kitchen}
              onCheckedChange={(checked) =>
                handleCheckboxChange("kitchen", checked === true)
              }
            />
            <label htmlFor="kitchen" className="text-sm">
              Bếp
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="washing"
              checked={formData.amenities.washing}
              onCheckedChange={(checked) =>
                handleCheckboxChange("washing", checked === true)
              }
            />
            <label htmlFor="washing" className="text-sm">
              Máy giặt
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="parking"
              checked={formData.amenities.parking}
              onCheckedChange={(checked) =>
                handleCheckboxChange("parking", checked === true)
              }
            />
            <label htmlFor="parking" className="text-sm">
              Chỗ để xe
            </label>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Mô tả</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Mô tả chi tiết về phòng (tối đa 500 từ)"
          className="w-full min-h-[120px]"
          maxLength={2000}
        />
        <p className="text-xs text-gray-500 text-right">
          {formData.description.length}/2000
        </p>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Hình ảnh/Video</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
          <input
            type="file"
            id="fileUpload"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Kéo thả file hoặc click để chọn
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Hỗ trợ: JPG, PNG, MP4 (tối đa 10 file)
            </p>
          </label>
        </div>

        {/* Preview Files */}
        {formData.previewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {formData.previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                  {url.includes("video") ? (
                    <video src={url} className="w-full h-full object-cover" />
                  ) : (
                    <img
                      src={url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handlePreviewClick}
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Xem trước
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Đăng bài
        </Button>
      </div>
    </form>
  );
};

export default PostRoomForm;
