import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import Navbar from '../components/Navbar';

interface VideoData {
  id: string;
  videoUrl: string;
  size: 'small' | 'medium' | 'large' | 'wide';
}

const fpvVideos: VideoData[] = [
  {
    id: 'boat-2',
    videoUrl: 'fwEfvkIsnpY',
    size: 'medium'
  },
  {
    id: 'boat-1',
    videoUrl: '8j0MWVc_Pf4',
    size: 'wide'
  },
  {
    id: 'jetski-1',
    videoUrl: '04mvwDnG3pA',
    size: 'large'
  },
  {
    id: 'barge-1',
    videoUrl: 'JjrgBsMgGhU',
    size: 'small'
  },
  {
    id: 'barge-2',
    videoUrl: 'QVoSs7BYnq0',
    size: 'medium'
  }
];

const VideoTile: React.FC<{ video: VideoData; index: number }> = ({ video, index }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // YouTube thumbnail URL for poster
  const posterUrl = `https://img.youtube.com/vi/${video.videoUrl}/maxresdefault.jpg`;

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
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    // Control playback through YouTube iframe API
    const playVideo = () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        );
      }
    };

    const pauseVideo = () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      }
    };

    // Mobile: play when in view
    if (isMobile && isInView && isLoaded) {
      playVideo();
    } else if (isMobile && !isInView) {
      pauseVideo();
    }

    // Desktop: play on hover
    if (!isMobile && isHovered && isLoaded) {
      playVideo();
    } else if (!isMobile && !isHovered) {
      pauseVideo();
    }
  }, [isHovered, isMobile, isInView, isLoaded]);

  useEffect(() => {
    if (!iframeRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(iframeRef.current);
    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, []);

  const handleVideoClick = () => {
    // Open YouTube video in fullscreen mode
    window.open(`https://www.youtube.com/watch?v=${video.videoUrl}`, '_blank');
  };

  return (
    <AnimatedSection
      delay={index * 100}
      className="group relative overflow-hidden rounded-2xl bg-gray-950 cursor-pointer"
    >
      <div 
        className="relative w-full h-full"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleVideoClick}
      >
        {/* YouTube iframe */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full transition-all duration-700 group-hover:scale-105"
            src={`https://www.youtube.com/embed/${video.videoUrl}?enablejsapi=1&autoplay=0&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${video.videoUrl}&modestbranding=1&playsinline=1&disablekb=1&fs=0`}
            title={`Video ${video.id}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        
        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <img src={posterUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="w-6 h-6 border-2 border-gold-400 border-t-transparent rounded-full animate-spin relative z-10"></div>
          </div>
        )}
        
        {/* Fullscreen hint on hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
            Click to watch on YouTube
          </div>
        </div>
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 ring-1 ring-gold-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${fpvVideos[1].videoUrl}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${fpvVideos[1].videoUrl}&modestbranding=1&playsinline=1&disablekb=1`}
                    title="Floating video left"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen={false}
                  />
                </div>
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
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${fpvVideos[3].videoUrl}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${fpvVideos[3].videoUrl}&modestbranding=1&playsinline=1&disablekb=1`}
                    title="Floating video right"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen={false}
                  />
                </div>
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
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${fpvVideos[0].videoUrl}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${fpvVideos[0].videoUrl}&modestbranding=1&playsinline=1&disablekb=1`}
                  title="Full width cinematic video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen={false}
                />
              </div>
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