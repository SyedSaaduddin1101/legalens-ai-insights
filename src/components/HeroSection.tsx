
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after the component mounts
  useState(() => {
    setIsLoaded(true);
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 min-h-[calc(100vh-5rem)]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-100 filter blur-3xl opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col h-full justify-center py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-legal-navy mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Understand Legal Documents with <span className="text-legal-light-blue">AI-Powered</span> Analysis
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-gray-700 mb-8 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            LegaLens instantly analyzes contracts, NDAs, and legal agreements, highlighting key terms, identifying risks, and providing summaries in plain English — all powered by advanced AI.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Button size="lg" className="bg-legal-light-blue hover:bg-legal-blue" asChild>
              <Link to="/try-now">
                Try Now Free <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
        
        <div 
          className={`mt-12 md:mt-16 bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Sample Analysis Preview</h3>
            <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Live Demo</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex flex-col space-y-3">
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            </div>
            <div className="flex justify-between mt-6">
              <div className="flex space-x-3">
                <div className="h-6 w-24 bg-blue-100 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-yellow-100 rounded animate-pulse"></div>
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
