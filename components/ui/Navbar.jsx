'use client';

import { useState, useEffect } from 'react';
import { scrollToSection } from '../../lib/useLenis';

const NAV_ITEMS = [
  { id: 'home', num: '01', label: 'Home' },
  { id: 'solutions', num: '02', label: 'Solutions' },
  { id: 'philosophy', num: '03', label: 'Philosophy' },
  { id: 'technology', num: '04', label: 'Tech' },
  { id: 'about', num: '05', label: 'About' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [clickedId, setClickedId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id) => {
    setClickedId(id);
    scrollToSection(id);
    setTimeout(() => setClickedId(null), 300);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'auto',
        maxWidth: '94vw',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.4rem, 1.5vw, 1.25rem)',
          height: scrolled ? 54 : 60,
          padding: '0 1.25rem',
          borderRadius: 999,
          background: scrolled ? 'rgba(14, 14, 14, 0.88)' : 'rgba(18, 18, 18, 0.7)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: scrolled
            ? '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(249, 168, 38, 0.12)'
            : '0 10px 35px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleClick('home')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            fontWeight: 800,
            cursor: 'pointer',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            paddingRight: 12,
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          }}
          data-magnetic
        >
          <span style={{ color: '#F9A826', textShadow: '0 0 12px rgba(249, 168, 38, 0.5)' }}>zeko</span>
          <span style={{ opacity: 0.6 }}>.ai</span>
        </button>

        {/* Navigation Items with Glowing Pill Hover Effect */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {NAV_ITEMS.map(({ id, num, label }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredId === id;
            const isClicked = clickedId === id;

            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: 'relative',
                  background: isClicked
                    ? 'rgba(249, 168, 38, 0.4)'
                    : isHovered
                    ? 'linear-gradient(135deg, rgba(249, 168, 38, 0.25), rgba(255, 200, 87, 0.15))'
                    : isActive
                    ? 'rgba(249, 168, 38, 0.12)'
                    : 'transparent',
                  border: isHovered || isClicked
                    ? '1px solid rgba(249, 168, 38, 0.6)'
                    : isActive
                    ? '1px solid rgba(249, 168, 38, 0.3)'
                    : '1px solid transparent',
                  borderRadius: 999,
                  padding: '7px 16px',
                  color: isHovered || isActive ? '#FFFFFF' : '#B5B5B5',
                  fontSize: 13,
                  fontWeight: isActive || isHovered ? 600 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transform: isClicked
                    ? 'scale(0.94)'
                    : isHovered
                    ? 'scale(1.05) translateY(-1px)'
                    : 'scale(1)',
                  boxShadow: isClicked
                    ? '0 0 25px rgba(249, 168, 38, 0.6), inset 0 0 15px rgba(249, 168, 38, 0.3)'
                    : isHovered
                    ? '0 0 20px rgba(249, 168, 38, 0.35), inset 0 0 10px rgba(249, 168, 38, 0.15)'
                    : isActive
                    ? '0 0 12px rgba(249, 168, 38, 0.15)'
                    : 'none',
                  transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                data-magnetic
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: isHovered || isActive ? '#F9A826' : '#777',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {num}
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
