import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check credentials against default values
    if (username === "admin" && password === "123456") {
      // Successful login
      navigate("/admin");
    } else {
      // Failed login
      setError(t("Invalid username or password"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
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
            {t("Admin Login")}
          </h2>
          <p className="text-sm text-center text-gray-600">
            {t("Log in to access the admin dashboard")}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">{t("Username")}</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">{t("Password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-6">
            {t("Login")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
