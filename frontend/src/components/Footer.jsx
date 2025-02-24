import React from 'react';
import { Link } from 'react-scroll';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCar, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <FaCar className="text-4xl text-blue-400" />
              <span className="text-2xl font-bold ml-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Car Rental Service
              </span>
            </div>
            <p className="text-gray-300 max-w-md mx-auto">
              Your trusted partner for premium car rental services in Lahore, Pakistan.
              Experience luxury and comfort at affordable prices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              We provide reliable and affordable car rental services in Lahore,
              Pakistan. Experience comfort and convenience with our wide range of
              vehicles.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaFacebookF className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaTwitter className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaInstagram className="text-white" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400" />
                <a href="mailto:alimahmoodrana82@gmail.com" 
                   className="text-gray-300 hover:text-blue-400 transition-colors">
                  alimahmoodrana82@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-blue-400" />
                <a href="tel:03174104283" 
                   className="text-gray-300 hover:text-blue-400 transition-colors">
                  0317-4104283
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1" />
                <span className="text-gray-300">
                  Lahore, Pakistan
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" 
                   className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <span>→</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <Link to="about" 
                      className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer flex items-center space-x-2">
                  <span>→</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="contact" 
                      className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer flex items-center space-x-2">
                  <span>→</span>
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Car Rental Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;