
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const suggestPage = (path: string): string => {
    if (path.includes("document")) return "/dashboard/documents";
    if (path.includes("account")) return "/dashboard/account";
    if (path.includes("legal") || path.includes("advice")) return "/";
    if (path.includes("login") || path.includes("signin")) return "/login";
    if (path.includes("register") || path.includes("signup")) return "/signup";
    return "/";
  };

  const suggestedPath = suggestPage(location.pathname);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F4F6] to-[#EEE] dark:from-[#1E1E1E] dark:to-[#0F0F0F] p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md w-full bg-white dark:bg-[#1E1E1E] p-8 rounded-2xl shadow-xl border border-[#8E2DE2]/20"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#8E2DE2]/10 to-[#4A00E0]/10 flex items-center justify-center">
          <span className="text-4xl font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">404</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">Page Not Found</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-3">
          <Link to={suggestedPath}>
            <Button variant="default" className="w-full bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:opacity-90 transition-all">
              <Search className="mr-2 h-4 w-4" />
              Did you mean: {suggestedPath}?
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="w-full border-[#8E2DE2]/30">
              <Home className="mr-2 h-4 w-4 text-[#8E2DE2]" />
              Return to Home
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="w-full text-gray-500" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-6">
          If you believe this is an error, please contact support
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
