import React from 'react';

interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  isLarge?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  category, 
  imageUrl, 
  videoUrl,
  isLarge = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      className={`relative overflow-hidden ${isLarge ? 'col-span-2 row-span-2' : 'col-span-1'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full overflow-hidden group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {videoUrl && isHovered && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-gold-400 text-xs uppercase tracking-wider mb-2">{category}</p>
            <h3 className="text-lg md:text-xl font-light">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;