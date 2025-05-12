
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Logout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Remove user data from localStorage
    localStorage.removeItem("legalens-user");
    
    // Show toast notification
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    
    // Redirect to home page after a short delay to allow toast to be seen
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500);
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <Loader2 className="h-12 w-12 animate-spin text-purple-500 relative z-10 mx-auto" />
        </div>
        <h1 className="text-2xl font-semibold text-purple-900">Logging you out...</h1>
        <p className="text-purple-600 mt-2">Redirecting to home page</p>
      </div>
    </div>
  );
};

export default Logout;
