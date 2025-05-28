import React from 'react';
import VideoBackground from '../components/VideoBackground';
import Button from '../components/Button';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { firebaseVideoUrls } from '../data/videoUrls';

const Hero: React.FC = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen">
      <VideoBackground
        videoUrl={firebaseVideoUrls.hero}
        overlayOpacity={0.5}
      >
        <div className="flex flex-col justify-center items-center h-full px-4 text-center">
          <AnimatedSection delay={300} animation="fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
              CINEMATIC <span className="text-gold-400">AERIAL</span> STORYTELLING
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={600} animation="fade-up">
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light mb-8">
              Capturing breathtaking moments from perspectives never before possible. 
              Premium drone videography for luxury brands and properties.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={900}>
            <Button 
              variant="outlined" 
              size="lg"
              onClick={scrollToServices}
            >
              Explore Our Work
            </Button>
          </AnimatedSection>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToServices} className="text-white focus:outline-none">
            <ChevronDown size={32} />
          </button>
        </div>
      </VideoBackground>
    </div>
  );
};

export default Hero;