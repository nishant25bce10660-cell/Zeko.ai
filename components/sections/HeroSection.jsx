'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { openChat } from '../ui/ChatWidget';

/**
 * 01. Hero / Overview Widget — Video Showcase Card Style
 */
export default function HeroSection() {
  const sectionRef = useRef(null);

  return (
    <section
      id="home"
      className="section widget-container"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        willChange: 'transform, opacity',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: 1240,
          background: 'rgba(18, 18, 18, 0.92)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 28,
          padding: 'clamp(2rem, 4vw, 3rem)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1.5rem', position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span data-stagger="number" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1, fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              01
            </span>
            <div>
              <div data-stagger="label" style={{ fontSize: 12, fontWeight: 700, color: '#F9A826', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                ZEKO AI STUDIO
              </div>
              <div data-stagger="title" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#fff' }}>
                Nextlevel Intelligent Platform
              </div>
            </div>
          </div>

          <button
            onClick={openChat}
            aria-label="Open AI Chat Window"
            data-stagger="btn"
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: '1px solid rgba(249, 168, 38, 0.4)',
              background: 'rgba(249, 168, 38, 0.1)',
              color: '#F9A826',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            data-magnetic
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(249, 168, 38, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(249, 168, 38, 0.7)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(249, 168, 38, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(249, 168, 38, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(249, 168, 38, 0.4)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>LIVE PROJECT</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Content Showcase Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center', position: 'relative', zIndex: 3 }}>
          {/* Left Hero Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h1 data-stagger="title" className="heading-xl" style={{ margin: 0, fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', lineHeight: 1.1 }}>
              <div>AI That Understands.</div>
              <div>
                Built for <span className="text-gradient">Humans.</span>
              </div>
            </h1>

            <p data-stagger="desc" className="body-lg" style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1rem', lineHeight: 1.6 }}>
              We build AI that listens, learns, and collaborates—enhancing human potential while strengthening the connections that matter most.
            </p>

            <div data-stagger="btn" style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: '0.5rem' }}>
              <button onClick={openChat} className="btn-premium" data-magnetic style={{ padding: '0.85rem 2rem' }}>
                <span>Explore Solutions</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Stat Cards */}
            <div data-stagger="card" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {[
                { value: '10,000+', label: 'Users' },
                { value: '4.9/5', label: 'Rating' },
                { value: '99.9%', label: 'Uptime' },
              ].map(({ value, label }) => (
                <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '0.85rem 1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Showcase Card */}
          <div data-stagger="card" onClick={openChat} style={{ position: 'relative', height: 340, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
            <Image
              src="/hero-bg.png"
              alt="Celestial hands reaching toward each other"
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
              draggable={false}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,9,9,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, color: '#fff' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F9A826', textTransform: 'uppercase', marginBottom: 4 }}>Cognitive Engine v1.0</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Click to launch AI Workspace →</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
