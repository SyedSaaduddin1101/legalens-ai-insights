
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyDocuments from "./pages/MyDocuments";
import AccountSettings from "./pages/AccountSettings";
import NotFound from "./pages/NotFound";
import TryNow from "./pages/TryNow";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import LearnMore from "./pages/LearnMore";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ProfessionalTools from "./pages/ProfessionalTools";
import Admin from "./pages/Admin";
import Logout from "./pages/Logout";
import DocumentDetails from "./pages/DocumentDetails";
import { useEffect } from "react";

// For demo purposes - in a real app, this would be handled by an admin system
const setupDemo = () => {
  // Set admin role for demo if user is logged in
  const loggedInUser = localStorage.getItem("legalens-user");
  if (loggedInUser && !localStorage.getItem("legalens-user-role")) {
    localStorage.setItem("legalens-user-role", "admin");
  }
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Setup demo data and roles
    setupDemo();
    
    // Enforce smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/documents" 
              element={
                <ProtectedRoute>
                  <MyDocuments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/documents/:id" 
              element={
                <ProtectedRoute>
                  <DocumentDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/account" 
              element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/tools" 
              element={
                <ProtectedRoute>
                  <ProfessionalTools />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/try-now" 
              element={
                <ProtectedRoute>
                  <TryNow />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route path="/logout" element={<Logout />} />
            
            {/* Common misspellings or legacy paths - redirect to avoid 404s */}
            <Route path="/dashboard/tool" element={<ProtectedRoute><ProfessionalTools /></ProtectedRoute>} />
            <Route path="/dashboard/document" element={<ProtectedRoute><MyDocuments /></ProtectedRoute>} />
            <Route path="/dashboard/setting" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
            
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
