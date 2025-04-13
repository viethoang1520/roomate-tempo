import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Menu,
  User,
  Bell,
  Home as HomeIcon,
  MapPin,
  Upload,
  HelpCircle,
  Globe,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthModal from "./AuthModal";
import Notification from "./Notification";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center">
          <button
            className="md:hidden mr-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <Link to="/" className="flex items-center">
            <div className="text-xl font-bold text-green-600">
              Ở Ghép Vinhomes
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center ${isActive("/") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600 transition-colors"}`}
          >
            <HomeIcon className="h-4 w-4 mr-1" />
            {t("header.home")}
          </Link>
          <Link
            to="/search"
            className={`flex items-center ${isActive("/search") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600 transition-colors"}`}
          >
            <MapPin className="h-4 w-4 mr-1" />
            {t("header.findRoom")}
          </Link>
          <Link
            to="/post-room"
            className={`flex items-center ${isActive("/post-room") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600 transition-colors"}`}
          >
            <Upload className="h-4 w-4 mr-1" />
            {t("header.postRoom")}
          </Link>
          <Link
            to="/support"
            className={`flex items-center ${isActive("/support") ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600 transition-colors"}`}
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            {t("header.support")}
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 px-2">
                <img
                  src={
                    i18n.language === "vi"
                      ? "https://flagcdn.com/w20/vn.png"
                      : "https://flagcdn.com/w20/us.png"
                  }
                  alt={i18n.language === "vi" ? "Vietnamese flag" : "US flag"}
                  className="w-5 h-3.5"
                />
                <span className="text-xs font-medium">
                  {i18n.language === "vi" ? "VI" : "EN"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => changeLanguage("vi")}
                className="flex items-center"
              >
                <img
                  src="https://flagcdn.com/w20/vn.png"
                  alt="Vietnamese flag"
                  className="w-5 h-3.5 mr-2"
                />{" "}
                VI
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeLanguage("en")}
                className="flex items-center"
              >
                <img
                  src="https://flagcdn.com/w20/us.png"
                  alt="US flag"
                  className="w-5 h-3.5 mr-2"
                />{" "}
                EN
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700 hover:text-green-600 transition-colors relative">
                <Bell className="h-5 w-5" />
                {/* Notification indicator - can be conditionally rendered based on unread notifications */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-0 overflow-hidden"
            >
              <Notification />
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <User className="h-4 w-4 mr-2" />
                {t("header.login")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0">
              <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 space-y-2">
            <Link to="/" className="block py-2 text-green-600 font-medium">
              <div className="flex items-center">
                <HomeIcon className="h-4 w-4 mr-2" />
                {t("header.home")}
              </div>
            </Link>
            <Link
              to="/search"
              className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {t("header.findRoom")}
              </div>
            </Link>
            <Link
              to="/post-room"
              className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <div className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                {t("header.postRoom")}
              </div>
            </Link>
            <Link
              to="/support"
              className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <div className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                {t("header.support")}
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
