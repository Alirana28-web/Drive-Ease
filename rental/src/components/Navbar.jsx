import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Car, Menu, X, User } from 'lucide-react';
import { RentContext } from '../Context/Context';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartotal = 0, login, setlogin } = useContext(RentContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Listings', to: 'listings' },
    { name: 'Pricing', to: 'pricing' },
    { name: 'Testimonials', to: 'testimonials' },
    { name: 'Contact', to: 'contact' }
  ];

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 1500,
      smooth: true,
      easing: 'easeInOutQuart'
    });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-lg bg-white/70 shadow-lg py-2' 
          : 'bg-gradient-to-r from-blue-100 to-blue-200 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              onClick={scrollToTop}
              className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <img 
                src="/Logo.png" 
                alt="Logo" 
                className="h-10 sm:h-12 object-contain"
              />
              <span className="font-bold text-xl text-black">
                DriveEase
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  duration={1500}
                  offset={-80}
                  easing="easeInOutQuart"
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center space-x-1 px-3 py-2 rounded-full transition-colors text-black hover:text-blue-600 hover:bg-blue-50 font-medium">
                    {item.name}
                  </span>
                </ScrollLink>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {/* Cart */}
              <RouterLink to="/details">
                <div className="relative hover:scale-110 transition-transform">
                  <Car className="w-6 h-6 text-black" />
                  {cartotal > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                      {cartotal}
                    </div>
                  )}
                </div>
              </RouterLink>

              {/* Login Button */}
              <button
                onClick={() => setlogin(!login)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors hover:scale-105"
              >
                <User className="w-4 h-4" />
                <RouterLink to="/login" className="text-white">
                  {login ? "Logout" : "Login"}
                </RouterLink>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="text-black w-6 h-6" />
              ) : (
                <Menu className="text-black w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[55] md:hidden" onClick={() => setIsMenuOpen(false)} />
        )}

        {/* Mobile Menu */}
        <div 
          className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[60] md:hidden transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } shadow-xl`}
        >
          <div className="px-4 py-20 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-4 p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <X className="text-black w-6 h-6" />
            </button>
            
            <div className="space-y-6">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  duration={1500}
                  offset={-80}
                  easing="easeOut"
                  className="block transform hover:translate-x-2 transition-transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2 text-black hover:text-blue-600 py-2 cursor-pointer">
                    <span className="text-lg font-medium">{item.name}</span>
                  </div>
                </ScrollLink>
              ))}
              <div className="pt-6 border-t border-blue-200">
                <RouterLink
                  to="/details"
                  className="flex items-center space-x-2 text-black hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Car className="w-5 h-5" />
                  <span className="text-lg font-medium">Cart ({cartotal})</span>
                </RouterLink>
                <button
                  onClick={() => {
                    setlogin(!login);
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <RouterLink to="/login" className="text-white text-lg">
                    {login ? "Logout" : "Login"}
                  </RouterLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-20" />
    </>
  );
};

export default Navbar;