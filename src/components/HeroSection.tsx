
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-5rem)] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-pink-300/20 to-purple-300/20 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-40 left-10 w-56 h-56 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 animate-pulse" style={{animationDuration: '12s'}}></div>
        
        {/* 3D-like geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-br from-purple-400/10 to-transparent animate-spin-slow" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 transform -translate-y-1/2 rounded-lg bg-gradient-to-br from-pink-400/10 to-purple-400/10 animate-float"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxIDAgMS0yIDAtMnMtMSAyIDAgMm0tMTIgNGMxIDAgMS0yIDAtMnMtMSAyIDAgMm0tMTIgNGMxIDAgMS0yIDAtMnMtMSAyIDAgMiIgZmlsbD0iI0JGOTRGRiIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 
            className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500">
              Understand Legal Documents
            </span>{' '}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                with AI
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 blur-xl"></span>
            </span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-gray-700 mb-8 transition-all duration-1000 delay-100 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            LegaLens instantly analyzes contracts, NDAs, and legal agreements, highlighting key terms, identifying risks, and providing summaries in plain English — powered by advanced AI technology.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105" 
              asChild
            >
              <Link to="/try-now" className="flex items-center">
                Try Now Free <ArrowRight size={16} className="ml-2 animate-bounce-x" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-200 hover:bg-purple-50 hover:text-purple-500 hover:border-purple-300 transition-all duration-300 transform hover:scale-105" 
              asChild
            >
              <Link to="/learn-more">Learn More</Link>
            </Button>
          </div>

          {/* 3D-like floating card */}
          <div className="absolute bottom-0 right-0 transform translate-y-1/2 lg:translate-y-0 translate-x-1/4 lg:translate-x-0 w-32 h-32 lg:w-64 lg:h-64 rounded-lg opacity-70 lg:opacity-80 shadow-2xl blur-sm lg:blur-none transition-all duration-300 hover:blur-none hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-md rounded-lg transform rotate-6 transition-transform duration-300 group-hover:rotate-3"></div>
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-lg transform -rotate-3 transition-transform duration-300 group-hover:rotate-0"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-lg lg:text-2xl font-bold">AI</div>
                <span className="text-sm lg:text-base font-medium text-gray-700">Powered Analysis</span>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className={`mt-12 md:mt-28 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-purple-100 max-w-4xl mx-auto transition-all duration-1000 delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></div>
              Analysis Preview
            </h3>
            <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Live Demo</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center border-b border-gray-200 pb-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center">
                  <span className="text-purple-600 text-xs font-bold">§1</span>
                </div>
                <div className="ml-3 flex-grow">
                  <span className="block text-sm font-semibold text-gray-700">Confidentiality Clause</span>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Moderate Risk</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Requires Action</span>
                  </div>
                </div>
                <div className="flex-shrink-0 animate-pulse">
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              <div className="flex space-y-2 flex-col">
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              </div>
              
              <div className="flex justify-between mt-3">
                <div className="flex space-x-2">
                  <div className="h-8 w-20 bg-purple-100 rounded-full animate-pulse flex items-center justify-center">
                    <span className="text-xs text-purple-700">AI Insights</span>
                  </div>
                  <div className="h-8 w-24 bg-pink-100 rounded-full animate-pulse flex items-center justify-center">
                    <span className="text-xs text-pink-700">Risk Analysis</span>
                  </div>
                </div>
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blur elements */}
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 filter blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-r from-pink-400/30 to-purple-400/30 filter blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
