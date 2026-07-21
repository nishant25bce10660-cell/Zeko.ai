'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, className = '' }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    
    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Limit displacement
      const maxDisplacement = 10;
      const xDisplacement = Math.max(-maxDisplacement, Math.min(maxDisplacement, x * 0.3));
      const yDisplacement = Math.max(-maxDisplacement, Math.min(maxDisplacement, y * 0.3));

      gsap.to(btn, {
        x: xDisplacement,
        y: yDisplacement,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={buttonRef} 
      className={className} 
      data-magnetic 
      style={{ display: 'inline-block', cursor: 'none' }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
