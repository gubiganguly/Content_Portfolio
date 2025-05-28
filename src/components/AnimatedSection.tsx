import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  animation?: 'fade-up' | 'fade-in' | 'slide-in-right' | 'slide-in-left';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  animation = 'fade-up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return 'opacity-0 translate-y-16';
      case 'fade-in':
        return 'opacity-0';
      case 'slide-in-right':
        return 'opacity-0 translate-x-16';
      case 'slide-in-left':
        return 'opacity-0 -translate-x-16';
      default:
        return 'opacity-0 translate-y-16';
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ${className} ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0'
          : getAnimationClass()
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;