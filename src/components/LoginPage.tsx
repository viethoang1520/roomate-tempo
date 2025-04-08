import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const handleZaloLogin = () => {
    // Implement Zalo authentication logic here
    console.log("Zalo login clicked");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-gray-800">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 8L56 20V44L32 56L8 44V20L32 8Z"
                stroke="#333"
                strokeWidth="2"
              />
              <path
                d="M32 8V32M32 56V32M8 20L32 32M56 20L32 32"
                stroke="#333"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">
            {t("Welcome")}
          </h2>
          <p className="text-sm text-center text-gray-600">
            {t("Log in to tempolabs to continue to Tempo Web.")}
          </p>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleZaloLogin}
            className="w-full flex items-center justify-center space-x-2 py-6"
            variant="outline"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                fill="#0068FF"
              />
              <path
                d="M16.249 15.4217H14.5391V11.4957H13.6841V15.4217H12.0001V9.36172H13.6841V10.6417H13.7241C13.9001 9.87172 14.5391 9.21172 15.3941 9.21172C16.7941 9.21172 16.2491 10.6417 16.2491 10.6417V15.4217H16.249Z"
                fill="white"
              />
              <path
                d="M9.23009 12.3917C10.0851 12.3917 10.7801 11.6967 10.7801 10.8417C10.7801 9.98672 10.0851 9.29172 9.23009 9.29172C8.37509 9.29172 7.68009 9.98672 7.68009 10.8417C7.68009 11.6967 8.37509 12.3917 9.23009 12.3917Z"
                fill="white"
              />
              <path
                d="M10.1701 15.4217H8.28008V13.0217H7.00008V15.4217H5.11008V13.0217C5.11008 12.0217 5.92008 11.2117 6.92008 11.2117H8.36008C9.36008 11.2117 10.1701 12.0217 10.1701 13.0217V15.4217Z"
                fill="white"
              />
            </svg>
            <span>{t("Continue with Zalo")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
