import React from 'react';
import { Instagram, VideoIcon as VimeoIcon, Youtube, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-black border-t border-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-xl md:text-2xl font-light tracking-wider mb-2">
              <span className="font-medium">SKY</span>MOTION
            </div>
            <p className="text-gray-500 text-sm">
              Premium Aerial Cinematography
            </p>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
              <VimeoIcon size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-900 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SkyMotion. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;