
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DocumentUpload from "../components/DocumentUpload";
import { Loader2 } from "lucide-react";

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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500 mb-4" />
        <p className="text-lg text-purple-700">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent animate-fade-in">
          Analyze Your Legal Document
        </h1>
        <p className="text-center text-gray-700 mb-8 animate-fade-in animate-delay-100">
          Upload your contract, NDA, or legal agreement to get instant AI-powered analysis
        </p>
        
        <div className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-purple-100 animate-fade-in animate-delay-200">
          <DocumentUpload />
        </div>
      </div>
    </div>
  ) : null;
};

export default TryNow;
