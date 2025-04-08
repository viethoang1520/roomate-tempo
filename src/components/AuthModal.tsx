import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icon } from "@iconify/react";

interface AuthModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// PIN Input component
const PinInput = ({ length = 6, onChange, value = "" }) => {
  const inputRefs = React.useRef([]);

  const handleChange = (index, e) => {
    const newValue = e.target.value.slice(-1);
    if (newValue === "" || /^\d+$/.test(newValue)) {
      const newOtp = value.split("");
      newOtp[index] = newValue;
      const nextOtp = newOtp.join("");
      onChange(nextOtp);

      // Auto-focus next input
      if (newValue !== "" && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move focus to previous input on backspace
    if (e.key === "Backspace" && index > 0 && value[index] === "") {
      inputRefs.current[index - 1].focus();
    }
    // Move focus with arrow keys
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();
    if (!pasteData || !/^\d+$/.test(pasteData)) return;

    const digits = pasteData.slice(0, length).split("");
    const newOtp = Array(length).fill("");

    digits.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });

    onChange(newOtp.join(""));

    if (digits.length < length) {
      inputRefs.current[digits.length].focus();
    } else {
      inputRefs.current[length - 1].focus();
    }
  };

  return (
    <div className="flex justify-between gap-2 w-full">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-10 h-12 text-center p-0 text-xl font-bold rounded-md border-2 focus:border-green-500 focus:ring-green-500"
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : null}
        />
      ))}
    </div>
  );
};

const AuthModal = ({ open = false, onOpenChange }: AuthModalProps) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
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
      setOtpError("Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.");
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCountdownActive, countdown]);

  useEffect(() => {
    // Validate phone number format: either +84xxxxxxxxxx or 0xxxxxxxxx
    const phoneRegex = /^(\+84|0)\d{9,10}$/;
    setIsPhoneValid(phoneRegex.test(phoneNumber));
  }, [phoneNumber]);

  const handleSendOtp = async () => {
    if (!isPhoneValid) return;

    try {
      // In a real implementation, this would be an actual API call
      // For now, we'll simulate a successful response
      setOtpSent(true);
      setCountdown(180);
      setIsCountdownActive(true);
      setOtpError("");
      setOtp("");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError("Không thể gửi mã OTP. Vui lòng thử lại.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Vui lòng nhập mã OTP 6 chữ số");
      return;
    }

    try {
      // In a real implementation, this would be an actual API call
      // For now, we'll simulate a successful response
      if (otp === "123456") {
        // Simulating correct OTP
        onOpenChange?.(false);
        // Handle successful login/registration here
      } else {
        setOtpError("Mã OTP không đúng. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Không thể xác thực mã OTP. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white shadow-lg border-0 z-50">
        <style jsx global>{`
          .bg-background\/80 {
            background-color: rgba(0, 0, 0, 0.5) !important;
          }
          [data-radix-popper-content-wrapper] {
            z-index: 50 !important;
          }
          [data-state="open"][data-radix-dialog-overlay] {
            background-color: rgba(0, 0, 0, 0.5) !important;
            backdrop-filter: blur(2px);
          }
        `}</style>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-600">
            Đăng ký/đăng nhập vào ứng dụng<></>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <div className="relative">
                <Input
                  id="phone"
                  placeholder="+84xxxxxxxxxx"
                  className="pl-10"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Icon
                  icon="tabler:phone"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                />
              </div>
              {phoneNumber && !isPhoneValid && (
                <p className="text-sm text-red-500">
                  Số điện thoại phải có định dạng +84xxxxxxxxxx hoặc 0xxxxxxxxx
                </p>
              )}
            </div>

            {!otpSent ? (
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                onClick={handleSendOtp}
                disabled={!isPhoneValid}
              >
                Gửi mã OTP
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="otp">Mã OTP</Label>
                    <div className="flex items-center text-sm text-amber-600 font-medium">
                      <Icon icon="mdi:clock-outline" className="h-4 w-4 mr-1" />
                      <span>
                        {Math.floor(countdown / 60)}:
                        {(countdown % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <PinInput length={6} value={otp} onChange={setOtp} />

                  <p className="text-sm text-gray-500">
                    Mã OTP đã được gửi đến số điện thoại của bạn
                  </p>
                </div>

                {otpError && (
                  <Alert variant="destructive" className="mt-2">
                    <Icon icon="mdi:alert-circle" className="h-4 w-4 mr-2" />
                    <AlertDescription>{otpError}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  {countdown === 0 && (
                    <Button
                      variant="outline"
                      onClick={handleSendOtp}
                      className="flex-1"
                    >
                      Gửi lại mã OTP
                    </Button>
                  )}
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium"
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6}
                  >
                    Xác nhận
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="relative my-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-gray-500 text-sm">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="w-full border-gray-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              <Icon icon="logos:facebook" className="mr-2 h-5 w-5" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50"
            >
              <Icon icon="flat-color-icons:google" className="mr-2 h-5 w-5" />
              Google
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
