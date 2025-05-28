import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, imageUrl }) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="relative h-64 w-64 md:h-80 md:w-80 mb-6 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
      <h3 className="text-xl md:text-2xl font-light mb-1">{name}</h3>
      <p className="text-gold-400 text-sm uppercase tracking-wider mb-4">{role}</p>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">{bio}</p>
    </div>
  );
};

export default TeamMember;