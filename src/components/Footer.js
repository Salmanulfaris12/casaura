import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* About Section */}
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-bold">About CasaAura</h4>
            <p className="text-sm mt-2 max-w-sm">
              CasaAura is your go-to platform for elegant and affordable home furniture. Our mission is to provide beautiful, functional furniture to fit every lifestyle.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex space-x-8 mb-4 md:mb-0">
            <div>
              <h4 className="text-lg font-bold">Explore</h4>
              <ul className="mt-2 space-y-2">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Shop</a></li>
                <li><a href="#category-section" className="hover:underline">Category</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold">Help</h4>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
                <li><a href="#" className="hover:underline">Returns</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t border-teal-100 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} CasaAura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
