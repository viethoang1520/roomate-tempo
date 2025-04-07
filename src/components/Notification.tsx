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
    <div className="bg-white">
      <DialogHeader className="border-b pb-3">
        <DialogTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-green-600" />
          {t("notification.title")}
        </DialogTitle>
      </DialogHeader>

      <ScrollArea className="h-[400px] py-2">
        {notifications.length > 0 ? (
          <div className="space-y-2 px-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg ${notification.read ? "bg-gray-50" : "bg-green-50 border-l-4 border-green-600"}`}
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
    </div>
  );
};

export default Notification;
