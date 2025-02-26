import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Car, Menu, X, User } from 'lucide-react';
import { RentContext } from '../Context/Context';

const Navbar = () => {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    setlogin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
 
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md bg-white shadow-lg py-2' 
          : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center relative">
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
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
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
                  <span className="flex items-center space-x-1 px-3 py-2 rounded-full transition-colors text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 font-medium">
                    {item.name}
                  </span>
                </ScrollLink>
              ))}
            </div>

            {/* Desktop Cart and Login */}
            <div className="hidden md:flex items-center space-x-6">
              <RouterLink to="/details">
                <div className="relative hover:scale-110 transition-transform">
                  <Car className="w-6 h-6 text-blue-600" />
                  {cartotal > 0 && (
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                      {cartotal}
                    </div>
                  )}
                </div>
              </RouterLink>

              {login ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <RouterLink
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </RouterLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <RouterLink to="/details" className="mr-4">
                <div className="relative">
                  <Car className="w-6 h-6 text-blue-600" />
                  {cartotal > 0 && (
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                      {cartotal}
                    </div>
                  )}
                </div>
              </RouterLink>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-blue-50"
              >
                {isMenuOpen ? (
                  <X className="text-blue-600 w-6 h-6" />
                ) : (
                  <Menu className="text-blue-600 w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[55] md:hidden" 
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[60] md:hidden">
              <div className="px-4 py-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-6 right-4 p-2 rounded-lg hover:bg-blue-50"
                >
                  <X className="text-blue-600 w-6 h-6" />
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
                      className="block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2 cursor-pointer">
                        <span className="text-lg font-medium">{item.name}</span>
                      </div>
                    </ScrollLink>
                  ))}
                  
                  <div className="pt-6 border-t border-blue-100">
                    <RouterLink
                      to="/details"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Car className="w-5 h-5" />
                      <span className="text-lg font-medium">Cart ({cartotal})</span>
                    </RouterLink>
                    
                    {login ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 shadow-md"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-lg">Logout</span>
                      </button>
                    ) : (
                      <RouterLink
                        to="/login"
                        className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-lg">Login</span>
                      </RouterLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
      <div className="h-20" />
    </>
  );
};

export default Navbar;