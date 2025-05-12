
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Check if user is authenticated
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("legalens-user");
    setIsAuthenticated(!!userLoggedIn);
  }, []);

  // Track mouse position for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate 3D transforms based on mouse position
  const getTransform = (factor: number = 1) => {
    const x = mousePosition.x * 20 * factor;
    const y = mousePosition.y * 20 * factor;
    return `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };

  // Smooth scroll function
  const scrollToContent = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-purple-50 to-white" id="hero">
      <div className="container mx-auto px-4 relative">
        {/* Background floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse animation-delay-500"></div>
        <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-purple-400 rounded-full opacity-40 animate-[sparkling_3s_ease-in-out_infinite]"></div>
        <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-pink-400 rounded-full opacity-30 animate-[sparkling_2s_ease-in-out_infinite_500ms]"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-8">
          {/* Hero Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent animate-fade-in">
                AI-Powered
              </span> <br />
              <span className="animate-fade-in animate-delay-100">Legal Document Analysis</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0 animate-fade-in animate-delay-200">
              Understand complex legal documents in seconds. Get plain language explanations, key term highlights, and risk identification with our advanced AI.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-fade-in animate-delay-300">
              {isAuthenticated ? (
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105 group relative"
                  size="lg"
                  asChild
                >
                  <Link to="/try-now">
                    <span className="relative z-10">Analyze Document</span>
                    <span className="absolute inset-0 bg-white rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    <Sparkles className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100" />
                  </Link>
                </Button>
              ) : (
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105 group relative"
                  size="lg"
                  asChild
                >
                  <Link to="/signup">
                    <span className="relative z-10">Get Started</span>
                    <span className="absolute inset-0 bg-white rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    <Sparkles className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100" />
                  </Link>
                </Button>
              )}
              <Button 
                variant="outline" 
                className="border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all"
                size="lg"
                asChild
              >
                <Link to="/learn-more">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          
          {/* 3D Document Illustration */}
          <div className="md:w-1/2 flex justify-center relative">
            <div 
              className="relative w-80 h-80 animate-fade-in animate-delay-400"
              style={{ 
                transform: getTransform(0.6),
                transition: 'transform 0.2s ease-out'
              }}
            >
              {/* Base document */}
              <div className="absolute inset-0 bg-white rounded-lg shadow-lg border border-purple-100 p-6 transform rotate-3 transition-transform duration-300 hover:rotate-6">
                <div className="w-full h-3 bg-purple-100 rounded mb-4"></div>
                <div className="w-3/4 h-3 bg-purple-100 rounded mb-4"></div>
                <div className="w-full h-3 bg-pink-100 rounded mb-4"></div>
                <div className="w-2/3 h-3 bg-purple-100 rounded mb-4"></div>
              </div>
              
              {/* Middle document */}
              <div className="absolute inset-0 bg-white rounded-lg shadow-lg border border-purple-100 p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 hover:translate-y-2" style={{ zIndex: 1 }}>
                <div className="w-full h-3 bg-purple-100 rounded mb-4"></div>
                <div className="w-3/4 h-3 bg-purple-100 rounded mb-4"></div>
                <div className="w-full h-3 bg-pink-100 rounded mb-4"></div>
                <div className="w-2/3 h-3 bg-purple-100 rounded mb-4"></div>
                <div className="w-full h-3 bg-purple-100 rounded mb-4"></div>
                <div className="w-1/2 h-3 bg-pink-100 rounded"></div>
              </div>
              
              {/* Top document with analysis */}
              <div className="absolute inset-0 bg-white rounded-lg shadow-lg border border-purple-100 p-6 transform rotate-1 hover:rotate-4 transition-transform duration-300 hover:translate-y-1" style={{ zIndex: 2 }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-2/3">
                    <div className="w-3/4 h-3 bg-purple-500 rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-purple-300 rounded"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <div className="w-full h-2 bg-green-100 rounded"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-full h-2 bg-yellow-100 rounded"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-full h-2 bg-red-100 rounded"></div>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="w-full h-2 bg-purple-200 rounded mb-2"></div>
                  <div className="w-3/4 h-2 bg-purple-200 rounded"></div>
                </div>
              </div>
              
              {/* Floating analysis elements */}
              <div 
                className="absolute -right-12 top-10 bg-white p-3 rounded-lg shadow-lg border border-purple-100 floating-element"
                style={{ animationDelay: '0.2s', zIndex: 3 }}
              >
                <div className="w-24 h-2 bg-pink-200 rounded mb-2"></div>
                <div className="w-16 h-2 bg-purple-200 rounded"></div>
              </div>
              
              <div 
                className="absolute -left-10 bottom-20 bg-white p-3 rounded-lg shadow-lg border border-purple-100 floating-element"
                style={{ animationDelay: '1s', zIndex: 3 }}
              >
                <div className="w-20 h-2 bg-purple-200 rounded mb-2"></div>
                <div className="w-12 h-2 bg-pink-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in animate-delay-500" style={{ marginBottom: "-50px" }}>
          <button 
            onClick={scrollToContent} 
            className="text-purple-500 hover:text-purple-700 transition-colors focus:outline-none group"
            aria-label="Scroll down"
          >
            <p className="text-sm mb-2 opacity-80">Scroll to learn more</p>
            <ArrowDown className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
