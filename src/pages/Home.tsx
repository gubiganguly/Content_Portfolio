import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import About from '../sections/About';
import Portfolio from '../sections/Portfolio';
import CallToAction from '../sections/CallToAction';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

const Home: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <CallToAction />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home; 