
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Smooth scroll function for HashLink
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };
  
  return (
    <footer className="bg-legal-navy text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">L</span>
              </div>
              <span className="font-serif text-xl font-bold text-white">
                Lega<span className="text-pink-400">Lens</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm">
              LegaLens uses advanced AI to analyze legal documents, making complex legal language accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <HashLink 
                  to="/#document-upload" 
                  scroll={scrollWithOffset}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Document Analysis
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/features#risk-identification" 
                  scroll={scrollWithOffset}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Risk Identification
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/features#legal-summaries" 
                  scroll={scrollWithOffset}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Legal Summaries
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/features#key-terms" 
                  scroll={scrollWithOffset}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Key Term Extraction
                </HashLink>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:info@legalens.ai" className="text-gray-300 hover:text-white transition-colors">info@legalens.ai</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} LegaLens. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
