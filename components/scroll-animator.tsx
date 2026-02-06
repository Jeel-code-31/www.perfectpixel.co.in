'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollAnimatorProps {
  children: ReactNode;
}

export default function ScrollAnimator({ children }: ScrollAnimatorProps) {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const animateElements = document.querySelectorAll('[data-scroll-animate]');
    animateElements.forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
