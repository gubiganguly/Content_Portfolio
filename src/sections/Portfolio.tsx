import React from 'react';
import ProjectCard from '../components/ProjectCard';
import AnimatedSection from '../components/AnimatedSection';

const portfolioData = [
  {
    title: 'Coastal Luxury Retreat',
    category: 'Resort',
    imageUrl: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    videoUrl: 'https://cdn.videvo.net/videvo_files/video/premium/video0042/large_watermarked/903_903-0100_preview.mp4',
    isLarge: true,
  },
  {
    title: 'Urban Penthouse',
    category: 'Real Estate',
    imageUrl: 'https://images.pexels.com/photos/2404046/pexels-photo-2404046.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    videoUrl: 'https://cdn.videvo.net/videvo_files/video/premium/video0029/large_watermarked/100_downtown_aerial_0004_preview.mp4',
  },
  {
    title: 'Mountain Chalet',
    category: 'Real Estate',
    imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    videoUrl: 'https://cdn.videvo.net/videvo_files/video/premium/video0029/large_watermarked/100_aerial_mountain_0011_preview.mp4',
  },
  {
    title: 'Luxury Yacht Showcase',
    category: 'Branded Content',
    imageUrl: 'https://images.pexels.com/photos/2572854/pexels-photo-2572854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    videoUrl: 'https://cdn.videvo.net/videvo_files/video/premium/video0029/large_watermarked/100_yachts_0003_preview.mp4',
  },
  {
    title: 'Desert Resort',
    category: 'Resort',
    imageUrl: 'https://images.pexels.com/photos/60217/pexels-photo-60217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    videoUrl: 'https://cdn.videvo.net/videvo_files/video/premium/video0042/large_watermarked/903_903-0031_preview.mp4',
    isLarge: true,
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-gray-950">
      <div className="container mx-auto px-4 md:px-8">
        <AnimatedSection className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Featured Projects</h2>
          <div className="h-px w-24 bg-gold-400 mb-8"></div>
          <p className="text-gray-300 max-w-2xl">
            Hover over our projects to preview aerial footage. Each project showcases our 
            commitment to cinematic excellence and visual storytelling.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px]">
          {portfolioData.map((project, index) => (
            <AnimatedSection
              key={index}
              delay={index * 150}
              className={project.isLarge ? 'col-span-1 md:col-span-2 row-span-2' : ''}
            >
              <ProjectCard
                title={project.title}
                category={project.category}
                imageUrl={project.imageUrl}
                videoUrl={project.videoUrl}
                isLarge={project.isLarge}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;