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
  const [isMobile, setIsMobile] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use original video URL with minimal optimization for speed
  const optimizedVideoUrl = videoUrl; // Keep original for best quality and speed

  // Generate a simple poster image
  const posterUrl = poster || (videoUrl.includes('cloudinary.com') 
    ? `${videoUrl.split('/upload/')[0]}/upload/so_0.5/${videoUrl.split('/upload/')[1].replace('.mp4', '.jpg')}`
    : undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      // Video has started loading
    };

    const handleLoadedMetadata = () => {
      // Basic video info is loaded
      setIsLoaded(true);
    };

    const handleCanPlay = () => {
      // Video can start playing
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowPlayButton(false);
          })
          .catch(() => {
            // Autoplay failed, show play button
            setShowPlayButton(true);
          });
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error('Video loading error:', e);
      setShowPlayButton(true);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, [videoUrl]);

  const handleUserInteraction = () => {
    const video = videoRef.current;
    if (video && !hasUserInteracted) {
      setHasUserInteracted(true);
      video.play().then(() => {
        setIsPlaying(true);
        setShowPlayButton(false);
      }).catch(console.error);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      {/* High quality video - original file */}
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded && (isPlaying || (isMobile && isLoaded)) ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterUrl}
        webkit-playsinline="true"
        crossOrigin="anonymous"
      >
        <source src={optimizedVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Simple loading state */}
      {!isLoaded && !showPlayButton && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Play button for when autoplay fails */}
      {showPlayButton && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <button
            onClick={handleUserInteraction}
            className="bg-gold-400 hover:bg-gold-500 text-black rounded-full p-4 transition-all duration-300 transform hover:scale-110"
            aria-label="Play video"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}
      
      {overlay && (
        <div 
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {children && (
        <div className="relative z-20 w-full h-full" onClick={handleUserInteraction}>
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoBackground;