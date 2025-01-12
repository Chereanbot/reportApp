"use client";

import { useState } from "react";
import { Bell, AlertCircle, CheckCircle2, Clock, Trash2 } from "lucide-react";

type NotificationType = "EMERGENCY" | "UPDATE" | "INFO";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "EMERGENCY",
      title: "New Emergency Report",
      message: "A new emergency report has been submitted in Dilla City Center",
      timestamp: new Date(),
      read: false,
    },
    {
      id: 2,
      type: "UPDATE",
      title: "Report Status Updated",
      message: "Report #REP001 has been marked as resolved",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: 3,
      type: "INFO",
      title: "New User Registration",
      message: "A new user has registered to the system",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
  ]);

  const getNotificationIcon = (type: NotificationType) => {
    const icons = {
      EMERGENCY: AlertCircle,
      UPDATE: CheckCircle2,
      INFO: Bell,
    };
    return icons[type];
  };

  const getNotificationColor = (type: NotificationType) => {
    const colors = {
      EMERGENCY: "text-red-500 bg-red-500/10",
      UPDATE: "text-green-500 bg-green-500/10",
      INFO: "text-blue-500 bg-blue-500/10",
    };
    return colors[type];
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <button className="text-sm text-neutral-400 hover:text-neutral-200">
          Mark all as read
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <Bell className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Total Notifications</p>
              <p className="text-2xl font-semibold text-white">
                {notifications.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Unread</p>
              <p className="text-2xl font-semibold text-white">
                {notifications.filter(n => !n.read).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Read</p>
              <p className="text-2xl font-semibold text-white">
                {notifications.filter(n => n.read).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const colorClass = getNotificationColor(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`
                bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border 
                ${notification.read ? 'border-neutral-800' : 'border-blue-500/20'}
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${colorClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-neutral-200">
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm text-neutral-400">
                        <Clock className="h-4 w-4" />
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-neutral-400 hover:text-neutral-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-neutral-400">
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mt-3 text-sm text-blue-500 hover:text-blue-400"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 