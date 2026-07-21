'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text, tag: Tag = 'h2', className = '', delay = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    const chars = element.querySelectorAll('.char');

    gsap.from(chars, {
      y: 40,
      opacity: 0,
      filter: 'blur(10px)',
      rotation: 5,
      stagger: 0.02,
      duration: 1,
      ease: 'power4.out',
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  }, [delay]);

  // Split text into words then characters to preserve word breaking
  const words = text.split(' ');

  return (
    <Tag ref={containerRef} className={className} style={{ margin: 0 }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className="char" 
              style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedText;
