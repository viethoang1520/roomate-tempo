import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Wifi,
  Wind,
  Tv,
  Utensils,
  Bath,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const RoomDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for room details
  const roomData = {
    id: "123",
    title: "Phòng ghép tại S1.05 Vinhomes Grand Park",
    price: 3500000,
    deposit: 1000000,
    building: "S1.05",
    floor: 15,
    area: 70,
    availableSpots: 2,
    totalSpots: 4,
    gender: "Nam",
    description:
      "Phòng rộng rãi, thoáng mát với đầy đủ tiện nghi. Phù hợp cho sinh viên hoặc người đi làm. Gần trường Đại học FPT, siêu thị Vinmart và các tiện ích khác của khu đô thị Vinhomes Grand Park. Ưu tiên người sạch sẽ, không hút thuốc, không nuôi thú cưng.",
    amenities: ["wifi", "aircon", "tv", "kitchen", "bathroom", "washing"],
    distanceToFPT: 1.5,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    ],
    video: "https://example.com/room-video.mp4",
    postedDate: "2023-07-15",
    owner: {
      id: "456",
      name: "Nguyễn Văn A",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nguyen",
      rating: 4.8,
      responseRate: 95,
      responseTime: "2 giờ",
      verified: true,
    },
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? roomData.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === roomData.images.length - 1 ? 0 : prev + 1,
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  // Simulate fetching room data
  useEffect(() => {
    // In a real app, this would be an API call like:
    // fetch(`/api/rooms/${roomId}`).then(res => res.json()).then(data => setRoomData(data))

    // For now, we'll just simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [roomId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-4"
          aria-label={t("roomDetail.back")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold flex-1 truncate">
          {roomData.title}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Image gallery */}
      <div className="relative w-full h-[300px] md:h-[500px] bg-gray-100">
        <img
          src={roomData.images[currentImageIndex]}
          alt={`Room image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Image navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white"
            onClick={handlePrevImage}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white"
            onClick={handleNextImage}
          >
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Button>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {roomData.images.length}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Room details */}
        <div className="md:col-span-2 space-y-6">
          {/* Title and price */}
          <div>
            <h1 className="text-2xl font-bold">{roomData.title}</h1>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-600">
                Tòa {roomData.building}, Tầng {roomData.floor}, Vinhomes Grand
                Park
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {roomData.availableSpots} chỗ trống
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {roomData.gender}
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200"
              >
                {roomData.area}m²
              </Badge>
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200"
              >
                {roomData.distanceToFPT}km đến ĐH FPT
              </Badge>
            </div>
          </div>

          {/* Tabs for details */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">
                {t("roomDetail.details")}
              </TabsTrigger>
              <TabsTrigger value="amenities">
                {t("roomDetail.amenities")}
              </TabsTrigger>
              <TabsTrigger value="rules">{t("roomDetail.rules")}</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">{t("roomDetail.description")}</h3>
                <p className="text-gray-700">{roomData.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">{t("roomDetail.rentalPrice")}</h3>
                  <p className="text-xl font-bold text-green-600">
                    {formatPrice(roomData.price)}/tháng
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">{t("roomDetail.deposit")}</h3>
                  <p className="text-xl font-bold">
                    {formatPrice(roomData.deposit)}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-medium">{t("roomDetail.postedDate")}</h3>
                <p className="text-gray-700">{roomData.postedDate}</p>
              </div>
            </TabsContent>
            <TabsContent value="amenities" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roomData.amenities.includes("wifi") && (
                  <div className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-green-600" />
                    <span>{t("roomDetail.wifiIncluded")}</span>
                  </div>
                )}
                {roomData.amenities.includes("aircon") && (
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-green-600" />
                    <span>{t("roomDetail.aircon")}</span>
                  </div>
                )}
                {roomData.amenities.includes("tv") && (
                  <div className="flex items-center gap-2">
                    <Tv className="h-5 w-5 text-green-600" />
                    <span>{t("roomDetail.tv")}</span>
                  </div>
                )}
                {roomData.amenities.includes("kitchen") && (
                  <div className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-green-600" />
                    <span>{t("roomDetail.kitchen")}</span>
                  </div>
                )}
                {roomData.amenities.includes("bathroom") && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-green-600" />
                    <span>{t("roomDetail.privateBathroom")}</span>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="rules" className="mt-4">
              <ul className="list-disc pl-5 space-y-2">
                <li>Không hút thuốc trong phòng</li>
                <li>Không nuôi thú cưng</li>
                <li>Giờ giới nghiêm: 23:00</li>
                <li>Khách không được ở qua đêm</li>
                <li>Giữ gìn vệ sinh chung</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column - Owner info and actions */}
        <div className="space-y-6">
          {/* Owner card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={roomData.owner.avatar}
                    alt={roomData.owner.name}
                  />
                  <AvatarFallback>
                    {roomData.owner.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {roomData.owner.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      ⭐ {roomData.owner.rating}
                    </span>
                    {roomData.owner.verified && (
                      <Badge
                        variant="outline"
                        className="ml-2 bg-blue-50 text-blue-700 border-blue-200"
                      >
                        Đã xác thực
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tỷ lệ phản hồi:</span>
                  <span className="font-medium">
                    {roomData.owner.responseRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian phản hồi:</span>
                  <span className="font-medium">
                    Trong {roomData.owner.responseTime}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="space-y-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  {t("roomDetail.bookNow")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Đặt cọc phòng</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-700">
                    Số tiền cọc: {formatPrice(roomData.deposit)}
                  </p>
                  <p className="mt-4 text-sm text-gray-500">
                    Tiền cọc sẽ được giữ bởi hệ thống và chỉ chuyển cho chủ
                    phòng sau khi bạn xác nhận đã dọn vào phòng.
                  </p>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full">Thanh toán qua MoMo</Button>
                    <Button variant="outline" className="w-full">
                      Thanh toán qua ZaloPay
                    </Button>
                    <Button variant="outline" className="w-full">
                      Thanh toán qua ngân hàng
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("roomDetail.messageOwner")}
            </Button>
          </div>

          {/* Similar rooms */}
          <div>
            <h3 className="font-semibold mb-3">
              {t("roomDetail.similarRooms")}
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <div className="flex gap-3">
                    <img
                      src={`https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=75`}
                      alt="Similar room"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium text-sm line-clamp-1">
                        Phòng ghép tại S{item}.0{item}
                      </h4>
                      <p className="text-green-600 font-semibold text-sm">
                        {formatPrice(3000000 + item * 200000)}/tháng
                      </p>
                      <p className="text-xs text-gray-500">
                        2 chỗ trống • {item}km đến ĐH FPT
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
