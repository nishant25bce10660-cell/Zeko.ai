'use client';

import { useRef } from 'react';
import { openChat } from '../ui/ChatWidget';

/**
 * 04. Technology Widget — Video Showcase Card Style
 */
export default function TechnologySection() {
  const sectionRef = useRef(null);

  const techs = [
    {
      title: 'Neural Networks',
      description: 'Deep learning architectures modeled for complex reasoning.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16M4 12h16M7 7l10 10M17 7L7 17"/></svg>
    },
    {
      title: 'Edge Computing',
      description: 'Distributed infrastructure for ultra-low latency processing.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
    },
    {
      title: 'Natural Language',
      description: 'Advanced NLP models for seamless human-AI conversation.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    },
    {
      title: 'Computer Vision',
      description: 'Real-time image and video processing capabilities.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    },
    {
      title: 'Reinforcement Learning',
      description: 'Systems that continuously improve through interaction.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
    },
    {
      title: 'Federated Systems',
      description: 'Privacy-preserving distributed model training.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="5" cy="19" r="2"/><path d="M6.5 6.5L10.5 10.5M17.5 6.5L13.5 10.5M6.5 17.5L10.5 13.5M17.5 17.5L13.5 13.5"/></svg>
    }
  ];

  return (
    <section
      id="technology"
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
              04
            </span>
            <div>
              <div data-stagger="label" style={{ fontSize: 12, fontWeight: 700, color: '#F9A826', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                TECHNOLOGY STACK
              </div>
              <div data-stagger="title" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#fff' }}>
                Built on Tomorrow&apos;s Infrastructure
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
            <span>ARCHITECTURE</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* 3x2 Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {techs.map((t, i) => (
            <div
              key={i}
              data-stagger="card"
              onClick={openChat}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 20,
                padding: '1.5rem',
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
              <div style={{ color: '#F9A826', marginBottom: '1rem', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(249, 168, 38, 0.12)', borderRadius: 10 }}>
                {t.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>{t.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
