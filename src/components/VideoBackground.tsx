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
  const [currentQuality, setCurrentQuality] = useState<'low' | 'high'>('low');
  const videoRef = useRef<HTMLVideoElement>(null);
  const highQualityVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Detect mobile device and connection
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate optimized video URLs
  const getOptimizedVideoUrl = (url: string, quality: 'low' | 'high') => {
    if (url.includes('cloudinary.com')) {
      const baseUrl = url.split('/upload/')[0];
      const videoPath = url.split('/upload/')[1];
      
      if (quality === 'low') {
        // Lower quality for fast initial load
        return `${baseUrl}/upload/q_auto:low,w_800,br_500k/${videoPath}`;
      } else {
        // High quality for final playback
        return `${baseUrl}/upload/q_auto:good,br_2000k/${videoPath}`;
      }
    }
    return url;
  };

  const lowQualityUrl = getOptimizedVideoUrl(videoUrl, 'low');
  const highQualityUrl = getOptimizedVideoUrl(videoUrl, 'high');

  useEffect(() => {
    const video = videoRef.current;
    const highQualityVideo = highQualityVideoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleCanPlay = () => {
      // Try to play automatically
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowPlayButton(false);
            
            // Start loading high quality version in background
            if (highQualityVideo && currentQuality === 'low') {
              setTimeout(() => {
                highQualityVideo.load();
              }, 1000);
            }
          })
          .catch(() => {
            // Autoplay failed, show play button on mobile
            if (isMobile) {
              setShowPlayButton(true);
            }
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

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // High quality video event listeners
    if (highQualityVideo) {
      const handleHighQualityCanPlay = () => {
        if (isPlaying && currentQuality === 'low') {
          const currentTime = video.currentTime;
          highQualityVideo.currentTime = currentTime;
          highQualityVideo.play().then(() => {
            setCurrentQuality('high');
            video.pause();
          }).catch(console.error);
        }
      };

      highQualityVideo.addEventListener('canplay', handleHighQualityCanPlay);
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        highQualityVideo.removeEventListener('canplay', handleHighQualityCanPlay);
      };
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoUrl, isMobile, isPlaying, currentQuality]);

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

  // Generate a poster image URL from the video if none provided
  const posterUrl = poster || (videoUrl.includes('cloudinary.com') 
    ? `${videoUrl.split('/upload/')[0]}/upload/so_1,q_auto:low/${videoUrl.split('/upload/')[1].replace('.mp4', '.jpg')}`
    : `${videoUrl}#t=1`);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      {/* Low quality video for fast initial load */}
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded && (isPlaying || isMobile) && currentQuality === 'low' ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="auto"
        poster={posterUrl}
        webkit-playsinline="true"
      >
        <source src={lowQualityUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* High quality video for seamless upgrade */}
      <video
        ref={highQualityVideoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          currentQuality === 'high' ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="none"
        webkit-playsinline="true"
      >
        <source src={highQualityUrl} type="video/mp4" />
      </video>
      
      {/* Loading placeholder */}
      {(!isLoaded || (!isPlaying && !isMobile)) && !showPlayButton && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Play button for mobile when autoplay fails */}
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