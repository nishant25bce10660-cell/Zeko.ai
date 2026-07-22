'use client';

import { useRef } from 'react';
import { openChat } from '../ui/ChatWidget';

/**
 * 03. Philosophy Widget — Video Showcase Card Style
 */
export default function PhilosophySection() {
  const sectionRef = useRef(null);

  const pillars = [
    {
      num: '01',
      category: 'EMPATHY',
      title: 'Human First',
      text: 'Every algorithm begins with empathy. We design AI that enhances human decision-making, never overrides it.'
    },
    {
      num: '02',
      category: 'OPEN AI',
      title: 'Radical Transparency',
      text: 'No black boxes. Our AI explains its reasoning, building trust through understanding.'
    },
    {
      num: '03',
      category: 'ALIGNMENT',
      title: 'Continuous Evolution',
      text: 'Our systems learn alongside your team, growing more intelligent and aligned with each interaction.'
    }
  ];

  return (
    <section
      id="philosophy"
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
              03
            </span>
            <div>
              <div data-stagger="label" style={{ fontSize: 12, fontWeight: 700, color: '#F9A826', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                OUR PHILOSOPHY
              </div>
              <div data-stagger="title" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#fff' }}>
                Human-Centered Core Principles
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
            <span>PRINCIPLES</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Quote & Pillars Grid */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 data-stagger="desc" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, color: '#fff', maxWidth: 900, margin: '0 auto 0.75rem', lineHeight: 1.3 }}>
            &quot;Technology should amplify humanity, not replace it.&quot;
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>— The Zeko Principle</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {pillars.map((pillar, i) => (
            <div
              key={i}
              data-stagger="card"
              onClick={openChat}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 20,
                padding: '1.75rem',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(249, 168, 38, 0.4)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#F9A826', fontSize: '1.1rem', fontWeight: 800 }}>{pillar.num}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255, 255, 255, 0.4)' }}>{pillar.category}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>{pillar.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
