
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gradient';
  animated?: boolean;
}

const LawyerLogo = ({ size = 'md', variant = 'dark', animated = true }: LogoProps) => {
  const [sparkle, setSparkle] = useState(false);

  useEffect(() => {
    if (!animated) return;

    // Random sparkle effect
    const interval = setInterval(() => {
      setSparkle(true);
      setTimeout(() => setSparkle(false), 800);
    }, Math.random() * 8000 + 4000);

    return () => clearInterval(interval);
  }, [animated]);

  // Size configurations
  const sizes = {
    xs: {
      container: 'w-6 h-6',
      iconSize: 'h-2.5 w-2.5',
      text: 'text-base',
    },
    sm: {
      container: 'w-8 h-8',
      iconSize: 'h-3 w-3',
      text: 'text-lg',
    },
    md: {
      container: 'w-10 h-10',
      iconSize: 'h-4 w-4',
      text: 'text-xl',
    },
    lg: {
      container: 'w-12 h-12',
      iconSize: 'h-5 w-5',
      text: 'text-2xl',
    },
    xl: {
      container: 'w-16 h-16',
      iconSize: 'h-6 w-6',
      text: 'text-3xl',
    },
  };

  // Style based on variant
  const getStyles = () => {
    switch (variant) {
      case 'light':
        return {
          textColor: 'text-white',
          highlight: 'text-purple-200',
          iconColor: 'text-white',
          bgColor: 'bg-gradient-to-r from-[#8E2DE2]/80 to-[#4A00E0]/80',
        };
      case 'gradient':
        return {
          textColor: 'bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent',
          highlight: 'bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent',
          iconColor: 'text-white',
          bgColor: 'bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]',
        };
      default: // dark
        return {
          textColor: 'text-gray-800 dark:text-white',
          highlight: 'bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent',
          iconColor: 'text-white',
          bgColor: 'bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]',
        };
    }
  };

  const styles = getStyles();

  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <motion.div 
          className={`${sizes[size].container} rounded-lg ${styles.bgColor} flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300 relative overflow-hidden`}
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          {sparkle && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="text-white/80" size={sizes[size].iconSize === 'h-3 w-3' ? 12 : sizes[size].iconSize === 'h-4 w-4' ? 16 : 20} />
            </motion.div>
          )}
          <Scale className={`${sizes[size].iconSize} ${styles.iconColor} relative z-10`} />
        </motion.div>
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 blur-md opacity-0 group-hover:opacity-40 transform scale-110 transition-all duration-300"></div>
      </div>
      <span className={`font-serif ${sizes[size].text} font-bold ${styles.textColor}`}>
        Lega<span className={styles.highlight}>Lens</span>
      </span>
    </Link>
  );
};

export default LawyerLogo;
