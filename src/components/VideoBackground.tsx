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

  // Optimize video URL for high quality with fast loading
  const getOptimizedVideoUrl = (url: string) => {
    if (url.includes('cloudinary.com')) {
      const baseUrl = url.split('/upload/')[0];
      const videoPath = url.split('/upload/')[1];
      
      // High quality with optimized delivery
      // f_auto: automatic format selection (webm for Chrome, mp4 for others)
      // q_auto:best: best quality with smart compression
      // vc_h265: use H.265 codec when supported for better compression
      return `${baseUrl}/upload/f_auto,q_auto:best,vc_h265/${videoPath}`;
    }
    return url;
  };

  const optimizedVideoUrl = getOptimizedVideoUrl(videoUrl);

  // Generate a high-quality poster image
  const posterUrl = poster || (videoUrl.includes('cloudinary.com') 
    ? `${videoUrl.split('/upload/')[0]}/upload/f_auto,q_auto:best,so_0/${videoUrl.split('/upload/')[1].replace('.mp4', '.jpg')}`
    : `${videoUrl}#t=0.1`);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      // Preload more of the video for smoother playback
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (bufferedEnd / duration > 0.5) {
          // If more than 50% is buffered, we're good to go
          video.play().catch(() => {
            if (isMobile) {
              setShowPlayButton(true);
            }
          });
        }
      }
    };

    const handleCanPlay = () => {
      // Try to play automatically
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowPlayButton(false);
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

    // Start loading immediately with higher priority
    video.load();

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoUrl, isMobile]);

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
      {/* High quality video with optimized loading */}
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded && (isPlaying || isMobile) ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="auto"
        poster={posterUrl}
        webkit-playsinline="true"
        crossOrigin="anonymous"
      >
        <source src={optimizedVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* High quality poster image while loading */}
      {!isLoaded && !showPlayButton && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${posterUrl})` }}
        >
          <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Play button for mobile when autoplay fails */}
      {showPlayButton && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${posterUrl})` }}
        >
          <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
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