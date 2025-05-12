
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

const Logo = ({ size = 'md', variant = 'dark' }: LogoProps) => {
  const [sparkle, setSparkle] = useState(false);
  
  useEffect(() => {
    // Random sparkle effect
    const interval = setInterval(() => {
      setSparkle(true);
      setTimeout(() => setSparkle(false), 600);
    }, Math.random() * 10000 + 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Size configurations
  const sizes = {
    sm: {
      container: 'w-8 h-8',
      text: 'text-lg',
      sparkles: 'h-3 w-3'
    },
    md: {
      container: 'w-10 h-10',
      text: 'text-xl',
      sparkles: 'h-3.5 w-3.5'
    },
    lg: {
      container: 'w-14 h-14',
      text: 'text-3xl',
      sparkles: 'h-4 w-4'
    }
  };

  // Text colors based on variant
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-800';
  const spanColor = variant === 'light' ? 'text-pink-200' : 'bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent';

  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <div className={`${sizes[size].container} rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          {sparkle && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="text-white animate-pulse" size={sizes[size].sparkles === 'h-3 w-3' ? 12 : sizes[size].sparkles === 'h-3.5 w-3.5' ? 14 : 16} />
            </div>
          )}
          <span className="text-white font-serif font-bold relative z-10">L</span>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 blur-md opacity-0 group-hover:opacity-40 transform scale-110 transition-all duration-300"></div>
      </div>
      <span className={`font-serif ${sizes[size].text} font-bold ${textColor}`}>
        Lega<span className={spanColor}>Lens</span>
      </span>
    </Link>
  );
};

export default Logo;
