
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import TestimonialSection from "../components/TestimonialSection";
import FAQSection from "../components/FAQSection";
import DocumentUpload from "../components/DocumentUpload";
import CTASection from "../components/CTASection";
import ChatBot from "../components/lawyer/ChatBot";

// Declare the custom spline-viewer element type
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
      };
    }
  }
}

const Index = () => {
  // Add script for Spline viewer
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@splinetool/viewer@0.9.490/build/spline-viewer.js";
    script.type = "module";
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Spline Viewer */}
      <div className="relative">
        <spline-viewer url="https://prod.spline.design/mXHlgCDOERC7GHsS/scene.splinecode" className="absolute inset-0 z-0"></spline-viewer>
        <div className="relative z-10">
          <HeroSection />
        </div>
      </div>
      
      <FeatureSection />
      <DocumentUpload />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
      
      {/* Chatbot - available on all pages */}
      <ChatBot />
    </div>
  );
};

export default Index;
