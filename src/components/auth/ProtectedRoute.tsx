
import { useState, useEffect, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const userLoggedIn = localStorage.getItem("legalens-user");
    setIsAuthenticated(!!userLoggedIn);
    
    if (!userLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this feature",
        variant: "destructive",
      });
    }
  }, [location.pathname, toast]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <Loader2 className="h-12 w-12 animate-spin text-purple-500 mb-4 relative z-10" />
        </div>
        <p className="text-lg text-purple-700 relative z-10">Verifying authentication...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <div className="animate-fade-in">{children}</div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
