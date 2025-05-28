import React, { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  poster?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
  poster,
  overlay = true,
  overlayOpacity = 0.4,
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleCanPlay = () => {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoUrl]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded && isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Loading placeholder */}
      {(!isLoaded || !isPlaying) && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {overlay && (
        <div 
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {children && (
        <div className="relative z-20 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoBackground;