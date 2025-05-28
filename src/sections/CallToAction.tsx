import React from 'react';
import VideoBackground from '../components/VideoBackground';
import EmailSubscribe from '../components/EmailSubscribe';
import AnimatedSection from '../components/AnimatedSection';

const CallToAction: React.FC = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh]">
      <VideoBackground
        videoUrl="https://cdn.videvo.net/videvo_files/video/premium/video0042/large_watermarked/903_903-0098_preview.mp4"
        overlayOpacity={0.7}
      >
        <div className="flex flex-col justify-center items-center h-full px-4 text-center">
          <AnimatedSection animation="fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6">
              Ready to Elevate Your <span className="text-gold-400">Visual Story?</span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={300} animation="fade-up">
            <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light mb-10">
              Subscribe to receive our portfolio updates and exclusive aerial cinematography insights.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={500}>
            <EmailSubscribe />
          </AnimatedSection>
        </div>
      </VideoBackground>
    </section>
  );
};

export default CallToAction;