'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

/**
 * Cinematic Hero Section
 * Features the original hero-bg.png image with parallax float,
 * gradient overlays, and staggered text reveal animations.
 */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialRef = useRef(null);
  const countersRef = useRef(null);
  const scrollHintRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.4 }); // Wait for loading screen

      // Hero image — fade in with subtle scale
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
        0
      );

      // Heading characters — staggered reveal
      const h1Chars = heading1Ref.current?.querySelectorAll('.char') || [];
      const h2Chars = heading2Ref.current?.querySelectorAll('.char') || [];

      tl.fromTo(
        [...h1Chars, ...h2Chars],
        { opacity: 0, y: 50, filter: 'blur(8px)', rotateX: 5 },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          rotateX: 0,
          stagger: 0.025,
          duration: 0.9,
          ease: 'power4.out',
        },
        0.3
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.5'
      );

      // Buttons
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Social proof
      tl.fromTo(
        socialRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Counters
      if (countersRef.current) {
        tl.fromTo(
          countersRef.current.children,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }

      // Scroll hint — gentle bounce
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.5 },
        '-=0.3'
      );

      // Continuous subtle float on the hero image (idle animation)
      gsap.to(imageRef.current, {
        y: -12,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="char"
        style={{
          display: 'inline-block',
          whiteSpace: char === ' ' ? 'pre' : 'normal',
          willChange: 'transform, opacity, filter',
        }}
      >
        {char}
      </span>
    ));

  return (
    <section
      id="home"
      className="section"
      ref={sectionRef}
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
    >
      {/* ── Hero Background Image ── */}
      <div
        ref={imageRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0,
        }}
      >
        <Image
          src="/hero-bg.png"
          alt="Two hands reaching toward each other in celestial light"
          fill
          priority
          quality={90}
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          draggable={false}
        />
        {/* Top gradient fade */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, #090909 0%, transparent 30%, transparent 60%, #090909 100%)',
            zIndex: 1,
          }}
        />
        {/* Bottom gradient fade */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 20%, #090909 75%)',
            zIndex: 2,
          }}
        />
      </div>

      {/* ── Ambient Orbs ── */}
      <div
        className="ambient-orb"
        style={{
          width: 400,
          height: 400,
          top: '10%',
          right: '10%',
          opacity: 0.12,
          background: 'var(--gold)',
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(120px)',
          zIndex: 0,
        }}
      />
      <div
        className="ambient-orb"
        style={{
          width: 300,
          height: 300,
          bottom: '10%',
          left: '5%',
          opacity: 0.06,
          background: '#4a90e2',
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div
        className="section-inner"
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        {/* Heading */}
        <h1 className="heading-xl" style={{ margin: 0, lineHeight: 1.08 }}>
          <div ref={heading1Ref}>{splitText('AI That Understands.')}</div>
          <div ref={heading2Ref}>
            {splitText('Built for ')}
            <span className="text-gradient">{splitText('Humans.')}</span>
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className="body-lg"
          ref={subtitleRef}
          style={{ maxWidth: 600, color: 'var(--text-secondary)', margin: 0, opacity: 0 }}
        >
          We build AI that listens, learns, and collaborates—enhancing human
          potential while strengthening the connections that matter most.
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: '0.5rem', opacity: 0 }}>
          <button className="btn-premium" data-magnetic>
            <span>Explore Solutions</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="btn-ghost" data-magnetic>
            <span>Our Philosophy</span>
          </button>
        </div>

        {/* Social Proof */}
        <div ref={socialRef} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', opacity: 0 }}>
          <div style={{ display: 'flex', color: 'var(--gold)', gap: 2 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 1.5l2.47 5.01L18 7.27l-4 3.9.94 5.5L10 14.27l-4.94 2.4.94-5.5-4-3.9 5.53-.76z" />
              </svg>
            ))}
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Loved by 10,000+ users · 4.9/5 Excellent
          </span>
        </div>

        {/* Stat Counters */}
        <div ref={countersRef} style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
          {[
            { value: '10,000+', label: 'Users' },
            { value: '4.9/5', label: 'Rating' },
            { value: '99.9%', label: 'Uptime' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="glass-card"
              style={{
                padding: '1.25rem 1.75rem',
                flex: 1,
                minWidth: 160,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {value}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll Hint ── */}
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0,
          zIndex: 3,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ animation: 'floatY 2s ease-in-out infinite' }}>
          <path d="M12 5v14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 12l7 7 7-7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Inline keyframes for scroll hint */}
      <style jsx>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
