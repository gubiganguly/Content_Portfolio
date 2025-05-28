import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-light tracking-wider">
          <span className="font-medium">SKY</span>MOTION
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('services')}
            className="text-sm uppercase tracking-wider hover:text-gold-400 transition-colors"
          >
            What We Capture
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-sm uppercase tracking-wider hover:text-gold-400 transition-colors"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm uppercase tracking-wider hover:text-gold-400 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black transition-all text-sm uppercase tracking-wider"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black z-40 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 md:hidden flex flex-col pt-24`}
      >
        <div className="flex flex-col items-center space-y-8 p-8">
          <button
            onClick={() => scrollToSection('services')}
            className="text-lg uppercase tracking-wider"
          >
            What We Capture
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-lg uppercase tracking-wider"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-lg uppercase tracking-wider"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 border border-gold-400 text-gold-400 text-lg uppercase tracking-wider mt-4"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;