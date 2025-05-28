import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageUrl, index }) => {
  const isFPVCard = title === 'Cinematic FPV';
  
  const cardContent = (
    <div 
      className={`relative group w-full h-80 md:h-96 overflow-hidden ${isFPVCard ? 'cursor-pointer' : ''}`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-light mb-2 text-gold-400 flex items-center">
          {title}
          {isFPVCard && (
            <ArrowRight 
              size={20} 
              className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-2 group-hover:opacity-100 transition-all duration-300" 
            />
          )}
        </h3>
        <p className="text-sm md:text-base font-light text-gray-300 max-w-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          {description}
          {isFPVCard && (
            <span className="block mt-2 text-gold-400 text-xs uppercase tracking-wider">
              View Our FPV Collection →
            </span>
          )}
        </p>
      </div>
    </div>
  );

  if (isFPVCard) {
    return (
      <Link to="/fpv-videos" className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default ServiceCard;