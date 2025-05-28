import React from 'react';
import TeamMember from '../components/TeamMember';
import AnimatedSection from '../components/AnimatedSection';

const teamData = [
  {
    name: 'Alex Rivera',
    role: 'Lead Cinematographer',
    bio: 'With over a decade of experience in aerial cinematography, Alex has worked with luxury brands worldwide to create breathtaking visual stories.',
    imageUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    name: 'Sofia Chen',
    role: 'FPV Specialist',
    bio: 'Sofia is a pioneer in FPV drone cinematography, known for her ability to capture impossible shots that immerse viewers in the experience.',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    name: 'Marcus Johnson',
    role: 'Creative Director',
    bio: 'Marcus brings a wealth of filmmaking expertise to every project, ensuring that each frame tells a compelling part of the story.',
    imageUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <AnimatedSection className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-light mb-4">About the Crew</h2>
          <div className="h-px w-24 bg-gold-400 mb-8"></div>
          <p className="text-gray-300 max-w-2xl">
            We're a team of passionate aerial cinematographers dedicated to 
            pushing the boundaries of what's possible with drone videography.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
          {teamData.map((member, index) => (
            <AnimatedSection key={index} delay={index * 200}>
              <TeamMember
                name={member.name}
                role={member.role}
                bio={member.bio}
                imageUrl={member.imageUrl}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;