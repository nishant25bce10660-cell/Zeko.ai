'use client';

import { useRef } from 'react';
import { openChat } from '../ui/ChatWidget';

/**
 * 02. Solutions Widget — Video Showcase Card Style
 */
export default function SolutionsSection() {
  const sectionRef = useRef(null);

  const solutions = [
    {
      num: '01',
      category: 'NLP ENGINE',
      title: 'Cognitive Engine',
      description: 'Natural language processing that understands context, nuance, and intent—just like a human colleague.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"/>
          <path d="M12 8v4l3 3"/>
        </svg>
      )
    },
    {
      num: '02',
      category: 'DATA MODELS',
      title: 'Predictive Analytics',
      description: 'Transform raw data into actionable intelligence with models that learn and adapt to your business.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    {
      num: '03',
      category: 'AI GOVERNANCE',
      title: 'Ethical AI Framework',
      description: 'Built-in bias detection and transparency tools that ensure your AI operates responsibly.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      num: '04',
      category: 'INFRASTRUCTURE',
      title: 'Global Deployment',
      description: 'Edge-optimized infrastructure that delivers sub-100ms responses anywhere in the world.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    }
  ];

  return (
    <section
      id="solutions"
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
              02
            </span>
            <div>
              <div data-stagger="label" style={{ fontSize: 12, fontWeight: 700, color: '#F9A826', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                SOLUTIONS SUITE
              </div>
              <div data-stagger="title" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#fff' }}>
                Intelligent Platform Capabilities
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
            <span>LIVE SUITE</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Showcase Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {solutions.map((sol, i) => (
            <div
              key={i}
              data-stagger="card"
              onClick={openChat}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 20,
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ color: '#F9A826', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(249, 168, 38, 0.12)', borderRadius: 12 }}>
                  {sol.icon}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255, 255, 255, 0.4)' }}>{sol.category}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>{sol.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{sol.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
