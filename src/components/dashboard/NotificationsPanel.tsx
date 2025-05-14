
import React from 'react';
import { Bell, X, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 'notif-1',
      title: 'Document Analysis Complete',
      message: 'Your employment contract analysis is ready to view.',
      type: 'success',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Risk Alert',
      message: 'High risk identified in contract section 5.3 regarding liability.',
      type: 'warning',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Document Shared',
      message: 'Jane Smith shared a document with you: "NDA - Project Apollo"',
      type: 'info',
      time: '1 day ago',
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-white dark:bg-[#1E293B] shadow-xl"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-[#8E2DE2]" />
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {notifications.length > 0 ? (
              <>
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#0F172A]">
                  <span className="text-sm text-gray-500">
                    {notifications.filter((n) => !n.read).length} unread
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-[#8E2DE2] hover:text-[#4A00E0]"
                  >
                    Mark all as read
                  </Button>
                </div>

                <div className="flex-grow overflow-y-auto">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1A1F2C] transition-colors cursor-pointer",
                        !notification.read && "bg-blue-50 dark:bg-[#1E1E1E]"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex">
                        <div className="mr-3 mt-0.5">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={cn(
                              "text-sm font-medium",
                              !notification.read && "font-semibold text-[#8E2DE2]"
                            )}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="absolute top-1/2 left-2 -translate-y-1/2 w-1.5 h-1.5 bg-[#8E2DE2] rounded-full"></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No notifications</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  When you have new notifications, they'll appear here.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
