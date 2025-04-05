import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Search,
  Menu,
  User,
  Bell,
  Home as HomeIcon,
  MapPin,
  Upload,
  HelpCircle,
} from "lucide-react";
import SearchFilters from "./SearchFilters";
import RoomCard from "./RoomCard";
import AuthModal from "./AuthModal";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Mock data for featured rooms
  const featuredRooms = [
    {
      id: 1,
      title: "Cozy Room in S1.01",
      price: 3500000,
      building: "S1.01",
      availableSpots: 2,
      totalSpots: 4,
      amenities: ["wifi", "ac", "fridge", "washing-machine"],
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      distance: 1.2,
    },
    {
      id: 2,
      title: "Modern Room in S2.05",
      price: 4200000,
      building: "S2.05",
      availableSpots: 1,
      totalSpots: 3,
      amenities: ["wifi", "ac", "kitchen", "balcony"],
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      distance: 0.8,
    },
    {
      id: 3,
      title: "Spacious Room in S3.02",
      price: 5000000,
      building: "S3.02",
      availableSpots: 2,
      totalSpots: 2,
      amenities: ["wifi", "ac", "fridge", "gym"],
      image:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
      distance: 1.5,
    },
    {
      id: 4,
      title: "Luxury Room in S5.07",
      price: 6500000,
      building: "S5.07",
      availableSpots: 1,
      totalSpots: 2,
      amenities: ["wifi", "ac", "kitchen", "pool"],
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      distance: 2.0,
    },
    {
      id: 5,
      title: "Student Room in S1.03",
      price: 2800000,
      building: "S1.03",
      availableSpots: 3,
      totalSpots: 4,
      amenities: ["wifi", "fridge", "washing-machine"],
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      distance: 0.5,
    },
    {
      id: 6,
      title: "Shared Room in S2.10",
      price: 3000000,
      building: "S2.10",
      availableSpots: 2,
      totalSpots: 6,
      amenities: ["wifi", "ac", "kitchen"],
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      distance: 1.0,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tìm người ghép phòng tại{" "}
            <span className="text-green-600">Vinhomes Grand Park</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nền tảng kết nối sinh viên tìm kiếm và ghép phòng trọ an toàn, tiện
            lợi với quy trình xác thực người dùng
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex">
              <Input
                placeholder="Nhập tên tòa (VD: S1.01)"
                className="rounded-r-none border-r-0 focus-visible:ring-green-500 focus-visible:border-green-500"
              />
              <Button className="rounded-l-none bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="mr-4 border-green-600 text-green-600 hover:bg-green-50"
            >
              Tìm phòng
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Đăng phòng
            </Button>
          </div>
        </div>
      </section>
      {/* Search Filters */}
      <section className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <SearchFilters />
        </div>
      </section>
      {/* Featured Rooms */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Phòng nổi bật</h2>
            <a href="/find-room" className="text-green-600 hover:underline">
              Xem tất cả
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">
            Cách thức hoạt động
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tìm kiếm</h3>
              <p className="text-gray-600">
                Tìm kiếm phòng phù hợp với nhu cầu của bạn thông qua bộ lọc đa
                tiêu chí
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kết nối</h3>
              <p className="text-gray-600">
                Liên hệ trực tiếp với chủ phòng hoặc người ghép thông qua hệ
                thống chat nội bộ
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chuyển vào</h3>
              <p className="text-gray-600">
                Đặt cọc an toàn và chuyển vào phòng mới của bạn một cách thuận
                tiện
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">
            Người dùng nói gì về chúng tôi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1"
                      alt="Avatar"
                    />
                    <AvatarFallback>TH</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Trần Hương</div>
                    <div className="text-sm text-gray-500">Sinh viên FPT</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Tôi đã tìm được người ghép phòng phù hợp chỉ sau 2 ngày đăng
                  ký. Giao diện dễ sử dụng và hệ thống xác thực giúp tôi an tâm
                  hơn khi tìm người ở ghép."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2"
                      alt="Avatar"
                    />
                    <AvatarFallback>NM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Nguyễn Minh</div>
                    <div className="text-sm text-gray-500">Sinh viên UEF</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Hệ thống đặt cọc an toàn giúp tôi yên tâm khi chuyển vào
                  phòng mới. Tôi đã giới thiệu nền tảng này cho nhiều bạn bè
                  cùng trường."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user3"
                      alt="Avatar"
                    />
                    <AvatarFallback>LT</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Lê Thảo</div>
                    <div className="text-sm text-gray-500">Chủ phòng</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Việc tìm người ghép phòng trở nên dễ dàng hơn rất nhiều. Tôi
                  có thể xem hồ sơ chi tiết và lựa chọn người phù hợp với tiêu
                  chí của mình."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ở Ghép Vinhomes</h3>
              <p className="text-gray-300 mb-4">
                Nền tảng kết nối người ghép phòng tại Vinhomes Grand Park
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
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
                  <a
                    href="/find-room"
                    className="text-gray-300 hover:text-white"
                  >
                    Tìm phòng
                  </a>
                </li>
                <li>
                  <a
                    href="/post-room"
                    className="text-gray-300 hover:text-white"
                  >
                    Đăng phòng
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-300 hover:text-white">
                    Về chúng tôi
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
                <li>
                  <a href="/privacy" className="text-gray-300 hover:text-white">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-white">
                    Liên hệ
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

export default Home;
