
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth scroll function for HashLink
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  // Check if user is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check authentication
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("legalens-user");
    setIsAuthenticated(!!userLoggedIn);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-lg bg-white/70 border-b border-purple-100 shadow-sm' 
          : 'backdrop-blur-md bg-white/40'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo size="md" variant={isScrolled ? 'dark' : 'dark'} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <HashLink 
            to="/#hero" 
            scroll={scrollWithOffset}
            className="text-gray-700 hover:text-purple-500 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            Home
          </HashLink>
          <HashLink 
            to="/#features" 
            scroll={scrollWithOffset}
            className="text-gray-700 hover:text-purple-500 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            Features
          </HashLink>
          <Link 
            to="/pricing" 
            className="text-gray-700 hover:text-purple-500 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            Pricing
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-700 hover:text-purple-500 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  localStorage.removeItem("legalens-user");
                  window.location.href = "/";
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-purple-500 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-slide-in-right">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <HashLink 
              to="/#hero" 
              scroll={scrollWithOffset}
              className="text-gray-700 hover:text-purple-500 transition-colors py-2 border-b border-purple-100"
              onClick={toggleMenu}
            >
              Home
            </HashLink>
            <HashLink 
              to="/#features" 
              scroll={scrollWithOffset}
              className="text-gray-700 hover:text-purple-500 transition-colors py-2 border-b border-purple-100"
              onClick={toggleMenu}
            >
              Features
            </HashLink>
            <Link 
              to="/pricing" 
              className="text-gray-700 hover:text-purple-500 transition-colors py-2 border-b border-purple-100"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-purple-500 transition-colors py-2 border-b border-purple-100"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            
            <div className="flex flex-col space-y-3 pt-2">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" className="w-full border-purple-200" asChild>
                    <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90" 
                    onClick={() => {
                      localStorage.removeItem("legalens-user");
                      window.location.href = "/";
                      setIsMenuOpen(false);
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full border-purple-200" asChild>
                    <Link to="/login" onClick={toggleMenu}>Log in</Link>
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90" asChild>
                    <Link to="/signup" onClick={toggleMenu}>Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
