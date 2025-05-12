
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const element = document.getElementById('cta-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section 
      id="cta-section" 
      className="relative overflow-hidden py-16 md:py-20"
    >
      {/* Gradient background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 -z-10"></div>
      
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white opacity-10 blur-2xl"></div>
        <div className="absolute top-10 right-10 w-60 h-60 rounded-full bg-purple-300 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-40 w-40 h-40 rounded-full bg-pink-300 opacity-10 blur-2xl"></div>
        <div className="absolute bottom-40 left-20 w-60 h-60 rounded-full bg-white opacity-10 blur-3xl"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/3 w-16 h-16 rounded bg-white opacity-20 animate-float" style={{animationDuration: '6s'}}></div>
        <div className="absolute top-3/4 left-2/3 w-12 h-12 rounded-full bg-white opacity-20 animate-float" style={{animationDuration: '8s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-10 h-10 rounded-lg bg-white opacity-20 animate-float" style={{animationDuration: '7s', animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Simplify Legal Documents?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Join thousands of professionals who trust LegaLens to analyze, simplify, and summarize their legal documents.
            </p>
          </div>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 hover:shadow-lg hover:shadow-purple-600/25 transition-all duration-300 transform hover:scale-105" 
              asChild
            >
              <Link to="/signup" className="flex items-center">
                Get Started <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105" 
              asChild
            >
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
          
          {/* Floating badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className={`py-2 px-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center transition-all duration-1000 delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-white/90 text-sm font-medium">⭐️ 4.9/5 Rating</span>
            </div>
            <div className={`py-2 px-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-white/90 text-sm font-medium">🔒 SOC 2 Compliant</span>
            </div>
            <div className={`py-2 px-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center transition-all duration-1000 delay-600 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-white/90 text-sm font-medium">🚀 10,000+ Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
