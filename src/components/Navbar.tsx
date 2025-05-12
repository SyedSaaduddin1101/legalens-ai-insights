
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-legal-blue to-legal-electric-blue flex items-center justify-center">
            <span className="text-white font-serif font-bold text-lg">L</span>
          </div>
          <span className="font-serif text-xl font-bold text-legal-navy">
            Lega<span className="text-legal-light-blue">Lens</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-legal-light-blue transition-colors">Home</Link>
          <Link to="/features" className="text-gray-700 hover:text-legal-light-blue transition-colors">Features</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-legal-light-blue transition-colors">Pricing</Link>
          <Link to="/contact" className="text-gray-700 hover:text-legal-light-blue transition-colors">Contact</Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex space-x-4">
          <Button variant="outline" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-legal-light-blue transition-colors py-2 border-b"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="text-gray-700 hover:text-legal-light-blue transition-colors py-2 border-b"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-700 hover:text-legal-light-blue transition-colors py-2 border-b"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-legal-light-blue transition-colors py-2 border-b"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={toggleMenu}>Log in</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup" onClick={toggleMenu}>Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
