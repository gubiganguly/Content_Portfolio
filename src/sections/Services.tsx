import React from 'react';
import ServiceCard from '../components/ServiceCard';
import AnimatedSection from '../components/AnimatedSection';

const servicesData = [
  {
    title: 'Cinematic FPV',
    description: 'Immersive, dynamic shots that fly through spaces with unparalleled fluidity. Perfect for creating unforgettable brand moments and emotional connections.',
    imageUrl: 'https://images.pexels.com/photos/442589/pexels-photo-442589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    title: 'Luxury Real Estate',
    description: 'Showcase properties with breathtaking aerial perspectives. From sweeping estate views to dynamic property reveals that highlight architectural features and landscape design.',
    imageUrl: 'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    title: 'Resort Showcases',
    description: 'Capture the full experience of luxury resorts with stunning flyovers and immersive property tours that transport viewers into the heart of paradise.',
    imageUrl: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    title: 'Branded Content',
    description: 'Create compelling visual stories for brands that demand excellence. Our aerial cinematography elevates commercial projects with unique perspectives and dynamic movement.',
    imageUrl: 'https://images.pexels.com/photos/3617770/pexels-photo-3617770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <AnimatedSection className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-light mb-4">What We Capture</h2>
          <div className="h-px w-24 bg-gold-400 mb-8"></div>
          <p className="text-gray-300 max-w-2xl">
            We specialize in premium aerial cinematography, delivering breathtaking visuals 
            that elevate brands and properties to new heights.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {servicesData.map((service, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <ServiceCard
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                index={index}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;