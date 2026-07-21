'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = () => {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true)
    });

    // Text fade in
    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Glow effect
    tl.to(glowRef.current, {
      opacity: 0.5,
      scale: 1.2,
      duration: 1,
      ease: "power1.inOut"
    }, "-=0.4");

    // Progress bar animation
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2.2,
      ease: "power3.inOut"
    }, "-=0.8");

    // Exit animation
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.2
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#090909',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Ambient Glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(249,168,38,0.3) 0%, rgba(9,9,9,0) 70%)',
          borderRadius: '50%',
          opacity: 0,
          pointerEvents: 'none',
          transform: 'scale(0.8)'
        }}
      />

      {/* Logo Text */}
      <div
        ref={textRef}
        style={{
          fontSize: '3rem',
          fontWeight: 700,
          color: '#FFFFFF',
          opacity: 0,
          marginBottom: '2rem',
          zIndex: 1,
          fontFamily: '"General Sans", sans-serif',
          background: 'linear-gradient(90deg, #F9A826, #FCEABB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        zeko.ai
      </div>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '200px',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        {/* Progress Bar Fill */}
        <div
          ref={progressRef}
          style={{
            width: '0%',
            height: '100%',
            background: 'linear-gradient(90deg, #F9A826, #FCEABB)',
            borderRadius: '2px'
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
