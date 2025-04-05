import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  Lock,
  User,
  Upload,
  Facebook,
  Github,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AuthModal = ({ open = false, onOpenChange }: AuthModalProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("login");
  const [otpSent, setOtpSent] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isCountdownActive && countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCountdownActive, countdown]);

  useEffect(() => {
    // Validate phone number format: +84xxxxxxxxxx
    const phoneRegex = /^\+84\d{9,10}$/;
    setIsPhoneValid(phoneRegex.test(phoneNumber));
  }, [phoneNumber]);

  const handleSendOtp = async () => {
    if (!isPhoneValid) return;

    try {
      // In a real implementation, this would be an actual API call
      // const response = await fetch('/api/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // For now, we'll simulate a successful response
      setOtpSent(true);
      setCountdown(180);
      setIsCountdownActive(true);
      setOtpError("");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      // In a real implementation, this would be an actual API call
      // const response = await fetch('/api/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber, otp }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // For now, we'll simulate a successful response
      if (otp === "123456") {
        // Simulating correct OTP
        // In a real app, we would redirect to profile page or next step
        // window.location.href = "/profile";
        handleNextStep();
        setOtpError("");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Failed to verify OTP. Please try again.");
    }
  };

  const handleNextStep = () => {
    if (registrationStep < 3) {
      setRegistrationStep(registrationStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-600">
            {activeTab === "login" ? "Đăng Nhập" : "Đăng Ký"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Đăng Nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng Ký</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email hoặc Số điện thoại</Label>
                <div className="relative">
                  <Input
                    id="email"
                    placeholder="Email hoặc số điện thoại"
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {otpSent ? (
                <div className="space-y-2">
                  <Label htmlFor="otp">Mã OTP</Label>
                  <Input id="otp" placeholder="Nhập mã OTP" />
                  <p className="text-sm text-gray-500">
                    Mã OTP đã được gửi đến email/số điện thoại của bạn
                  </p>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button variant="outline" onClick={handleSendOtp}>
                    Gửi mã OTP
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mật khẩu"
                    className="pl-10"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="text-sm text-right">
                  <a href="#" className="text-green-600 hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                Đăng Nhập
              </Button>

              <div className="relative my-6">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-2 text-gray-500 text-sm">
                    Hoặc đăng nhập với
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="w-full">
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            {registrationStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-phone">Số điện thoại</Label>
                  <div className="relative">
                    <Input
                      id="reg-phone"
                      placeholder="+84xxxxxxxxxx"
                      className="pl-10"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {phoneNumber && !isPhoneValid && (
                    <p className="text-sm text-red-500">
                      Số điện thoại phải có định dạng +84xxxxxxxxxx
                    </p>
                  )}
                </div>

                {otpSent ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="reg-otp">Mã OTP</Label>
                      <div className="flex items-center text-sm text-amber-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {Math.floor(countdown / 60)}:
                          {(countdown % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                    <Input
                      id="reg-otp"
                      placeholder="Nhập mã OTP 6 số"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                    />
                    <p className="text-sm text-gray-500">
                      Mã OTP đã được gửi đến số điện thoại của bạn
                    </p>

                    {countdown === 0 && (
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="outline"
                          onClick={handleSendOtp}
                          disabled={!isPhoneValid}
                        >
                          Gửi lại mã OTP
                        </Button>
                      </div>
                    )}

                    {otpError && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{otpError}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 mt-4"
                      onClick={handleVerifyOtp}
                      disabled={otp.length !== 6}
                    >
                      Xác nhận
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={handleSendOtp}
                      disabled={!isPhoneValid}
                    >
                      Gửi mã OTP
                    </Button>
                  </div>
                )}

                {!otpSent && (
                  <div className="space-y-2 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Mật khẩu</Label>
                      <div className="relative">
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Mật khẩu"
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Xác nhận mật khẩu
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Xác nhận mật khẩu"
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handleNextStep}
                    >
                      Tiếp tục
                    </Button>
                  </div>
                )}
              </div>
            )}

            {registrationStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Họ và tên</Label>
                  <div className="relative">
                    <Input
                      id="fullname"
                      placeholder="Họ và tên"
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Tuổi</Label>
                  <Input id="age" type="number" placeholder="Tuổi" />
                </div>

                <div className="space-y-2">
                  <Label>Giới tính</Label>
                  <RadioGroup defaultValue="male" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Nam</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Nữ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Khác</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">Trường đại học</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trường đại học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fpt">Đại học FPT</SelectItem>
                      <SelectItem value="rmit">RMIT</SelectItem>
                      <SelectItem value="hcmut">
                        Đại học Bách Khoa TP.HCM
                      </SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Quay lại
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleNextStep}
                  >
                    Tiếp tục
                  </Button>
                </div>
              </div>
            )}

            {registrationStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Sở thích</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="reading" />
                      <Label htmlFor="reading">Đọc sách</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="music" />
                      <Label htmlFor="music">Nghe nhạc</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sports" />
                      <Label htmlFor="sports">Thể thao</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cooking" />
                      <Label htmlFor="cooking">Nấu ăn</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gaming" />
                      <Label htmlFor="gaming">Chơi game</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="movies" />
                      <Label htmlFor="movies">Xem phim</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Thói quen sống</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="early-riser" />
                      <Label htmlFor="early-riser">Dậy sớm</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="night-owl" />
                      <Label htmlFor="night-owl">Thức khuya</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="clean" />
                      <Label htmlFor="clean">Ngăn nắp, sạch sẽ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="quiet" />
                      <Label htmlFor="quiet">Yên tĩnh</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="social" />
                      <Label htmlFor="social">Thích giao tiếp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="smoking" />
                      <Label htmlFor="smoking">Hút thuốc</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Giấy tờ xác minh</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Kéo thả hoặc click để tải lên CMND/CCCD/Thẻ sinh viên
                    </p>
                    <Button variant="outline" className="mt-2">
                      Chọn tệp
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Hỗ trợ định dạng: JPG, PNG, PDF. Kích thước tối đa: 5MB
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    Tôi đồng ý với{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Điều khoản sử dụng
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Chính sách bảo mật
                    </a>
                  </Label>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Quay lại
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Hoàn tất đăng ký
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
