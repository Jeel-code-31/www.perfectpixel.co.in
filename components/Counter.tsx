'use client';

import { useState, useEffect, useRef } from 'react';

const Counter = ({ end, duration = 1000 }: { end: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Memoize these so they don't trigger effects unnecessarily 
  const numericEnd = parseInt(end.replace(/\D/g, ''));
  const suffix = end.replace(/[0-9]/g, '');

  // 1. Intersection Observer Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      },
      { threshold: 0.1 } 
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * numericEnd));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);

 
    return () => window.cancelAnimationFrame(frameId);
  }, [isVisible, numericEnd, duration]);

  return (
    <span ref={containerRef} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

export default Counter;