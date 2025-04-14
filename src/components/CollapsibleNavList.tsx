import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  MessageSquare,
  Users,
  ChevronRight,
  Menu,
} from "lucide-react";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Quản lý bài đăng",
    href: "#posts",
  },
  {
    icon: <BarChart2 className="h-5 w-5" />,
    label: "Thống kê",
    href: "#statistics",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    label: "Phản hồi",
    href: "#feedback",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Quản lý người dùng",
    href: "#users",
  },
];

interface CollapsibleNavListProps {
  className?: string;
}

const CollapsibleNavList = ({ className }: CollapsibleNavListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("#posts");

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16",
        className,
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {isExpanded && (
          <h2 className="text-lg font-semibold text-primary">Admin Panel</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleExpanded}
          className="ml-auto"
        >
          {isExpanded ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={activeItem === item.href ? "secondary" : "ghost"}
            className={cn(
              "justify-start gap-3 transition-all duration-200 ease-in-out",
              isExpanded ? "px-4" : "px-3",
            )}
            onClick={() => setActiveItem(item.href)}
          >
            <span>{item.icon}</span>
            {isExpanded && <span>{item.label}</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CollapsibleNavList;
