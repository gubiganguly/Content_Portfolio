import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import Navbar from '../components/Navbar';
import { firebaseVideoUrls } from '../data/videoUrls';

interface VideoData {
  id: string;
  videoUrl: string;
  size: 'small' | 'medium' | 'large' | 'wide';
}

const fpvVideos: VideoData[] = [
  {
    id: 'boat-2',
    videoUrl: firebaseVideoUrls.fpv.boat2,
    size: 'medium'
  },
  {
    id: 'boat-1',
    videoUrl: firebaseVideoUrls.fpv.boat1,
    size: 'wide'
  },
  {
    id: 'jetski-1',
    videoUrl: firebaseVideoUrls.fpv.jetski1,
    size: 'large'
  },
  {
    id: 'barge-1',
    videoUrl: firebaseVideoUrls.fpv.barge1,
    size: 'small'
  },
  {
    id: 'barge-2',
    videoUrl: firebaseVideoUrls.fpv.barge2,
    size: 'medium'
  }
];

const VideoTile: React.FC<{ video: VideoData; index: number }> = ({ video, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (!isLoaded && !hasError) {
        console.log('Video loading timeout for:', video.id);
        setIsLoaded(true); // Show the video anyway
      }
    }, 10000); // 10 second timeout

    const handleCanPlay = () => {
      console.log('Video can play:', video.id);
      setIsLoaded(true);
      clearTimeout(loadingTimeout);
      // Set to a good frame for preview after a short delay
      setTimeout(() => {
        if (videoElement && !isHovered) {
          videoElement.currentTime = 2 + (index * 1.5);
        }
      }, 200);
    };

    const handleError = (e: any) => {
      console.error('Video loading error for:', video.id, e);
      setHasError(true);
      setIsLoaded(false);
      clearTimeout(loadingTimeout);
    };

    const handleLoadedData = () => {
      console.log('Video loaded data:', video.id);
      setIsLoaded(true);
      clearTimeout(loadingTimeout);
    };

    // Add event listeners
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    // Desktop hover functionality
    if (!isMobile && isLoaded) {
      if (isHovered) {
        videoElement.currentTime = 0;
        videoElement.play().catch(console.error);
      } else {
        videoElement.pause();
      }
    }

    return () => {
      clearTimeout(loadingTimeout);
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, [isHovered, isMobile, isLoaded, index, video.id, hasError]);

  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement && !hasError) {
      if (isMobile) {
        // Mobile: Play and go fullscreen
        videoElement.currentTime = 0;
        videoElement.play().then(() => {
          if ((videoElement as any).webkitEnterFullscreen) {
            (videoElement as any).webkitEnterFullscreen();
          } else if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen().catch(() => {});
          }
        }).catch(() => {
          if ((videoElement as any).webkitEnterFullscreen) {
            (videoElement as any).webkitEnterFullscreen();
          }
        });
      } else {
        // Desktop: Just fullscreen
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if ((videoElement as any).webkitRequestFullscreen) {
          (videoElement as any).webkitRequestFullscreen();
        }
      }
    }
  };

  // Generate a simple poster image URL
  const posterUrl = `https://via.placeholder.com/800x450/1a1a1a/d4af37?text=${encodeURIComponent(video.id.toUpperCase())}`;

  return (
    <AnimatedSection
      delay={index * 100}
      className="group relative overflow-hidden rounded-2xl bg-gray-950 cursor-pointer"
    >
      <div 
        className="relative w-full aspect-video"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleVideoClick}
      >
        {/* Static poster image for immediate preview */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ 
            backgroundImage: `url(${posterUrl})`,
            backgroundColor: '#1a1a1a'
          }}
        />

        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="metadata"
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>

        {/* Loading state - only show if not loaded and no error */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mb-2"></div>
              <span className="text-xs text-gray-400">Loading {video.id}...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="text-red-400 mb-2">⚠</div>
              <span className="text-xs text-gray-400">Failed to load</span>
            </div>
          </div>
        )}
        
        {/* Fullscreen hint on hover */}
        {isLoaded && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
              Click for fullscreen
            </div>
          </div>
        )}
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 ring-1 ring-gold-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </AnimatedSection>
  );
};

const FPVVideos: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Minimal Header */}
      <div className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-gold-400 hover:text-gold-500 transition-colors mb-12 group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wider">Back</span>
          </Link>
          
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-extralight mb-4 tracking-tight">
              Cinematic <span className="text-gold-400 font-light">FPV</span>
            </h1>
            <div className="h-px w-20 bg-gold-400/60 mb-12"></div>
          </AnimatedSection>
        </div>
      </div>

      {/* Video Mosaic Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {fpvVideos.map((video, index) => (
              <VideoTile key={video.id} video={video} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Video Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left floating video */}
            <AnimatedSection delay={200} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 bg-gray-950">
                <video
                  className="w-full h-auto object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                  webkit-playsinline="true"
                  preload="metadata"
                >
                  <source src={fpvVideos[1].videoUrl} type="video/mp4" />
                </video>
              </div>
            </AnimatedSection>

            {/* Center content */}
            <AnimatedSection delay={400} className="text-center lg:px-8">
              <h2 className="text-3xl md:text-4xl font-light mb-6 leading-tight">
                Immersive <br />
                <span className="text-gold-400">Perspectives</span>
              </h2>
              <div className="h-px w-16 bg-gold-400/60 mx-auto mb-6"></div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every frame captures the essence of motion and emotion
              </p>
            </AnimatedSection>

            {/* Right floating video */}
            <AnimatedSection delay={600} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-700 bg-gray-950">
                <video
                  className="w-full h-auto object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                  webkit-playsinline="true"
                  preload="metadata"
                >
                  <source src={fpvVideos[3].videoUrl} type="video/mp4" />
                </video>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Full Width Cinematic Video */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-950">
              <video
                className="w-full h-auto object-cover"
                muted
                loop
                playsInline
                autoPlay
                webkit-playsinline="true"
                preload="metadata"
              >
                <source src={fpvVideos[0].videoUrl} type="video/mp4" />
              </video>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Minimal Call to Action */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-light mb-8">
              Ready to capture your vision?
            </h2>
            <Link
              to="/#contact"
              className="inline-block px-8 py-3 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black transition-all duration-300 text-sm uppercase tracking-wider rounded-full"
            >
              Let's Create
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default FPVVideos; 