
import React, { ReactNode, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Home, Settings, Users, BarChart, LogOut, 
  Menu, X, ChevronRight, Shield, Bell, Upload
} from 'lucide-react';
import LawyerLogo from '../LawyerLogo';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import NotificationsPanel from './NotificationsPanel';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { toast } = useToast();
  
  // Check if user is admin - in a real app this would come from auth state
  const isAdmin = localStorage.getItem("legalens-user-role") === "admin";
  const isLoggedIn = !!localStorage.getItem("legalens-user");

  // Check if user is logged in and redirect if not
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("legalens-user");
    localStorage.removeItem("legalens-user-role");
    window.location.href = "/logout";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: Home },
    { path: '/dashboard/documents', name: 'My Documents', icon: FileText },
    { path: '/try-now', name: 'Upload Document', icon: Upload },
    { path: '/dashboard/account', name: 'Account Settings', icon: Settings },
  ];

  const adminItems = [
    { path: '/admin', name: 'Admin Panel', icon: Shield },
    { path: '/admin/users', name: 'User Management', icon: Users },
    { path: '/admin/analytics', name: 'Analytics', icon: BarChart },
  ];

  const notificationCount = 2; // This would come from a real notification system

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const navItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  const staggerChildren = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-[#F8FAFC] dark:bg-[#0F0F0F]">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <motion.div 
          className="fixed top-4 left-4 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-full"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? 
              <X size={20} className="text-[#4A00E0]" /> : 
              <Menu size={20} className="text-[#4A00E0]" />
            }
          </Button>
        </motion.div>
      )}

      {/* Sidebar */}
      <motion.div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex-shrink-0 w-64 flex flex-col bg-white dark:bg-[#1E293B] shadow-lg",
          isMobile ? "transition-none" : "transition-transform duration-300 ease-in-out transform"
        )}
        variants={isMobile ? sidebarVariants : {}}
        initial={isMobile ? "closed" : false}
        animate={isMobile ? (sidebarOpen ? "open" : "closed") : false}
      >
        <div className="flex-shrink-0 px-4 py-6 flex items-center justify-between">
          <LawyerLogo size="md" />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-full text-[#4A00E0] hover:bg-[#4A00E0]/10"
            >
              <X size={20} />
            </Button>
          )}
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <motion.nav 
            className="flex-1 px-4 py-4 space-y-1"
            variants={staggerChildren}
            initial="closed"
            animate="open"
          >
            {navItems.map((item) => (
              <motion.div key={item.path} variants={navItemVariants}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-800 dark:text-[#F8FAFC] hover:bg-[#8E2DE2]/10 hover:text-[#8E2DE2] dark:hover:text-[#8E2DE2] rounded-md transition-colors group"
                >
                  <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-[#8E2DE2]" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
            
            {/* Admin section - only visible to admins */}
            {isAdmin && (
              <>
                <motion.div 
                  className="mt-8 mb-2 px-4"
                  variants={navItemVariants}
                >
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Administration
                  </p>
                </motion.div>
                {adminItems.map((item) => (
                  <motion.div key={item.path} variants={navItemVariants}>
                    <Link
                      to={item.path}
                      className="flex items-center px-4 py-3 text-gray-800 dark:text-[#F8FAFC] hover:bg-[#8E2DE2]/10 hover:text-[#8E2DE2] dark:hover:text-[#8E2DE2] rounded-md transition-colors group"
                    >
                      <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-[#8E2DE2]" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </>
            )}
          </motion.nav>
        </div>

        <div className="flex-shrink-0 px-4 py-6 border-t border-gray-200 dark:border-[#1E293B]/80">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Log out</span>
          </Button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col overflow-y-auto transition-all duration-500",
        sidebarOpen && !isMobile ? "ml-64" : "ml-0"
      )}>
        {/* Header */}
        <motion.header 
          className="bg-white dark:bg-[#1E293B] shadow-sm z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-4 rounded-full text-[#4A00E0] hover:bg-[#4A00E0]/10"
                  onClick={toggleSidebar}
                >
                  <Menu size={20} />
                </Button>
              )}
              <motion.h1 
                className="text-xl font-serif font-bold text-gray-900 dark:text-[#F8FAFC]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Dashboard
              </motion.h1>
            </div>
            
            <div className="flex items-center">
              {/* Notifications */}
              <div className="relative mr-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full text-[#4A00E0] hover:bg-[#4A00E0]/10"
                  onClick={toggleNotifications}
                >
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <motion.span 
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      {notificationCount}
                    </motion.span>
                  )}
                </Button>
              </div>
              
              {/* User avatar would go here */}
              <motion.div 
                className="h-8 w-8 rounded-full bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] flex items-center justify-center text-white font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoggedIn ? "J" : "?"}
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Notifications Panel */}
        <NotificationsPanel isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />

        {/* Page content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <motion.nav 
            className="mb-6 flex" 
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#8E2DE2]">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Current Page</span>
                </div>
              </li>
            </ol>
          </motion.nav>
          
          {/* Page content - Wrapped with motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
