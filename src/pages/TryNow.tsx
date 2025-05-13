
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DocumentUpload from "../components/DocumentUpload";
import { Loader2, FileText, ArrowRight } from "lucide-react";

const TryNow = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication status
  useEffect(() => {
    // Simulate auth check - replace with actual auth logic when integrated
    const checkAuth = () => {
      const userLoggedIn = localStorage.getItem("legalens-user");
      setIsAuthenticated(!!userLoggedIn);
      setIsLoading(false);
      
      if (!userLoggedIn) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access this feature",
          variant: "destructive",
        });
        // Redirect with a slight delay to allow toast to be seen
        setTimeout(() => navigate("/login"), 1500);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F4F6] to-[#EDEDED] dark:from-[#0F0F0F] dark:to-[#1E1E1E]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] blur-xl opacity-30 animate-pulse"></div>
          <Loader2 className="h-12 w-12 animate-spin text-[#8E2DE2] relative z-10" />
        </div>
        <p className="text-lg text-[#4A00E0] mt-4 font-medium">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent animate-fade-in">
          Analyze Your Legal Document
        </h1>
        <p className="text-center text-gray-700 mb-8 animate-fade-in animate-delay-100">
          Upload your contract, NDA, or legal agreement to get instant AI-powered analysis
        </p>
        
        <div className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#8E2DE2]/20 animate-fade-in animate-delay-200 hover-glow">
          <DocumentUpload />
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F4F6] to-[#EDEDED] dark:from-[#0F0F0F] dark:to-[#1E1E1E]">
      <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-xl border border-[#8E2DE2]/20">
        <div className="text-center mb-6">
          <FileText className="h-16 w-16 mx-auto text-[#8E2DE2]" />
          <h2 className="text-2xl font-bold mt-4 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">
            Document Analysis
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign in to access our AI-powered legal document analysis tool
          </p>
        </div>
        <Button
          onClick={() => navigate('/login')}
          className="w-full bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:opacity-90 text-white py-2 rounded-lg flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(74,0,224,0.3)] transition-all transform hover:scale-[1.02]"
        >
          <span>Continue to Sign In</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TryNow;
