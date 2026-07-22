'use client';

import { useRef } from 'react';
import { openChat } from '../ui/ChatWidget';

/**
 * 05. About Widget — Video Showcase Card Style
 */
export default function AboutSection() {
  const sectionRef = useRef(null);

  return (
    <section
      id="about"
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
        }}
      >
        {/* Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span data-stagger="number" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1, fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              05
            </span>
            <div>
              <div data-stagger="label" style={{ fontSize: 12, fontWeight: 700, color: '#F9A826', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                COMPANY & ECOSYSTEM
              </div>
              <div data-stagger="title" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#fff' }}>
                The Minds Behind the Machine
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
            <span>OUR STORY</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Content Split */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 450px' }}>
            <p data-stagger="desc" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Founded in 2024, zeko.ai emerged from a simple belief: artificial intelligence should feel natural. Our team of researchers, engineers, and designers work at the intersection of technology and humanity.
            </p>

            <div data-stagger="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {[
                { val: '50+', lbl: 'Team Members' },
                { val: '12', lbl: 'Countries' },
                { val: '3', lbl: 'Patents' },
                { val: '$10M+', lbl: 'Processed' },
              ].map(({ val, lbl }) => (
                <div key={lbl} onClick={openChat} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '1.25rem', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>{val}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: '1 1 320px' }}>
            <div data-stagger="card" onClick={openChat} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2rem', cursor: 'pointer' }}>
              <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                <div style={{ position: 'absolute', top: 6, bottom: 6, left: '5px', width: '2px', background: 'rgba(249, 168, 38, 0.3)' }} />
                
                {[
                  { yr: '2024', desc: 'Founded with a vision to humanize AI' },
                  { yr: '2025', desc: 'Launched Cognitive Engine v1.0' },
                  { yr: '2026', desc: 'Reached 10,000+ users worldwide' },
                ].map(({ yr, desc }, idx) => (
                  <div key={yr} style={{ position: 'relative', marginBottom: idx !== 2 ? '2rem' : 0 }}>
                    <div style={{ position: 'absolute', left: '-1.5rem', top: '5px', width: '12px', height: '12px', borderRadius: '50%', background: '#F9A826', boxShadow: '0 0 10px #F9A826' }} />
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{yr}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
