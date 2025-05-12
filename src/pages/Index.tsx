
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import TestimonialSection from "../components/TestimonialSection";
import FAQSection from "../components/FAQSection";
import DocumentUpload from "../components/DocumentUpload";
import CTASection from "../components/CTASection";

const Index = () => {
  useEffect(() => {
    // Add Spline viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.92/build/spline-viewer.js";
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Spline Viewer */}
      <div className="relative">
        <spline-viewer url="undefined" className="absolute inset-0 z-0"></spline-viewer>
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
    </div>
  );
};

export default Index;
