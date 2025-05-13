
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Home, Settings, Users, BarChart, LogOut, 
  Menu, X, ChevronRight, Shield, Bell 
} from 'lucide-react';
import Logo from '../Logo';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isMobile } = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { toast } = useToast();
  
  // Check if user is admin - in a real app this would come from auth state
  const isAdmin = localStorage.getItem("legalens-user-role") === "admin";

  const handleLogout = () => {
    localStorage.removeItem("legalens-user");
    window.location.href = "/logout";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const notificationCount = 2; // This would come from a real notification system

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white shadow-md rounded-full"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 flex-shrink-0 w-64 flex flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out transform",
        isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
      )}>
        <div className="flex-shrink-0 px-4 py-6 flex items-center justify-between">
          <Logo size="md" />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-full"
            >
              <X size={20} />
            </Button>
          )}
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-4 py-4 space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors group"
            >
              <Home className="mr-3 h-5 w-5 text-gray-500 group-hover:text-purple-500" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/dashboard/documents"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors group"
            >
              <FileText className="mr-3 h-5 w-5 text-gray-500 group-hover:text-purple-500" />
              <span>My Documents</span>
            </Link>
            <Link
              to="/dashboard/account"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors group"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-500 group-hover:text-purple-500" />
              <span>Account Settings</span>
            </Link>
            
            {/* Admin section - only visible to admins */}
            {isAdmin && (
              <>
                <div className="mt-8 mb-2 px-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Administration
                  </p>
                </div>
                <Link
                  to="/admin"
                  className="flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors group"
                >
                  <Shield className="mr-3 h-5 w-5 text-gray-500 group-hover:text-purple-500" />
                  <span>Admin Panel</span>
                </Link>
                <Link
                  to="/admin/users"
                  className="flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors group"
                >
                  <Users className="mr-3 h-5 w-5 text-gray-500 group-hover:text-purple-500" />
                  <span>User Management</span>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors group"
                >
                  <BarChart className="mr-3 h-5 w-5 text-gray-500 group-hover:text-purple-500" />
                  <span>Analytics</span>
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex-shrink-0 px-4 py-6 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Log out</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col overflow-y-auto transition-all duration-300",
        sidebarOpen && !isMobile ? "ml-64" : "ml-0"
      )}>
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-4 rounded-full"
                  onClick={toggleSidebar}
                >
                  <Menu size={20} />
                </Button>
              )}
              <h1 className="text-xl font-serif font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center">
              {/* Notifications */}
              <div className="relative mr-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </div>
              
              {/* User dropdown would go here */}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <nav className="mb-6 flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600">
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
          </nav>
          
          {/* Page content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
