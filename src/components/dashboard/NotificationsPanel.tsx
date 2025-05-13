
import { useState } from 'react';
import { Check, X, Bell, AlertTriangle, FileText, Calendar, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'document' | 'alert' | 'calendar' | 'message';
  read: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      title: 'Document Analysis Complete',
      message: 'Your "Service Contract - Marketing Services" analysis is ready for review.',
      time: '2 minutes ago',
      type: 'document',
      read: false
    },
    {
      id: 'notif-2',
      title: 'High Risk Alert',
      message: 'A critical risk has been identified in your "Non-Disclosure Agreement".',
      time: '1 hour ago',
      type: 'alert',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Upcoming Meeting',
      message: 'Client consultation scheduled tomorrow at 2:00 PM.',
      time: '3 hours ago',
      type: 'calendar',
      read: true
    },
    {
      id: 'notif-4',
      title: 'New Message',
      message: 'Jane Smith from Legal Department sent you a message regarding case #45872.',
      time: '1 day ago',
      type: 'message',
      read: true
    }
  ]);
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({
      ...notif,
      read: true
    })));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'document': return <FileText className="h-5 w-5 text-[#4A00E0]" />;
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'calendar': return <Calendar className="h-5 w-5 text-green-500" />;
      case 'message': return <MessageSquare className="h-5 w-5 text-blue-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-16 right-4 w-80 bg-white dark:bg-[#1E293B] rounded-xl shadow-2xl overflow-hidden z-50 border border-[#8E2DE2]/20"
          >
            <div className="p-4 border-b border-[#8E2DE2]/10 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {unreadCount > 0 ? `${unreadCount} unread messages` : 'No new notifications'}
                </p>
              </div>
              <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                <span className="text-xs">Mark all read</span>
              </Button>
            </div>
            
            <div className="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-[#8E2DE2]/20 scrollbar-track-transparent">
              {notifications.length > 0 ? (
                <div className="divide-y divide-[#8E2DE2]/10">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className={cn(
                        "p-4 hover:bg-[#8E2DE2]/5 transition-colors relative",
                        notification.read ? "" : "bg-[#4A00E0]/5"
                      )}
                    >
                      <div className="flex">
                        <div className="mr-3 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className={cn(
                            "text-sm font-medium",
                            notification.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"
                          )}>
                            {notification.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="rounded-full p-1 hover:bg-[#8E2DE2]/10 text-[#8E2DE2]"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="rounded-full p-1 hover:bg-red-100 text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Bell className="mx-auto h-10 w-10 text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[#8E2DE2]/10 text-center">
              <Button variant="link" className="text-[#8E2DE2] hover:text-[#4A00E0]" size="sm">
                View all notifications
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
