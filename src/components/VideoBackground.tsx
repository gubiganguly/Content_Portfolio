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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : url;
  };

  const videoId = getYouTubeId(videoUrl);
  const youtubePoster = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  useEffect(() => {
    // Start playing when loaded
    if (isLoaded && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
    }
  }, [isLoaded]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      {/* YouTube iframe with autoplay */}
      <iframe
        ref={iframeRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&enablejsapi=1`}
        title="Background video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* High quality poster image while loading */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${poster || youtubePoster})` }}
        >
          <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
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
        <div className="relative z-20 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoBackground;