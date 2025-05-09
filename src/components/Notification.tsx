import React from "react";
import { useTranslation } from "react-i18next";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Notification: React.FC = () => {
  const { t } = useTranslation();

  // Mock notifications data
  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: t("notification.newRoom"),
      message: t("notification.newRoomMessage"),
      time: "2 giờ trước",
      read: false,
    },
    {
      id: "2",
      title: t("notification.matchFound"),
      message: t("notification.matchFoundMessage"),
      time: "1 ngày trước",
      read: true,
    },
    {
      id: "3",
      title: t("notification.depositConfirmed"),
      message: t("notification.depositConfirmedMessage"),
      time: "3 ngày trước",
      read: true,
    },
  ];

  return (
    <div className="bg-white rounded-md overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
      <div className="border-b pb-3 pt-3 px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Bell className="h-5 w-5 text-green-600" />
          {t("notification.title")}
        </div>
      </div>

      <ScrollArea className="h-[350px]">
        {notifications.length > 0 ? (
          <div className="space-y-1 p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer ${notification.read ? "" : "bg-green-50 border-l-4 border-green-600"}`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-8 px-4 text-center">
            <Bell className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500">{t("notification.empty")}</p>
          </div>
        )}
      </ScrollArea>
      <div className="border-t p-2 text-center">
        <button className="text-sm text-green-600 hover:text-green-700 font-medium">
          {t("notification.seeAll") || "See all notifications"}
        </button>
      </div>
    </div>
  );
};

export default Notification;
