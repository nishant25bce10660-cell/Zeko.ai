'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechnologySection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techs = [
    {
      title: 'Neural Networks',
      description: 'Deep learning architectures modeled for complex reasoning.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16M4 12h16M7 7l10 10M17 7L7 17"/></svg>
    },
    {
      title: 'Edge Computing',
      description: 'Distributed infrastructure for ultra-low latency processing.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
    },
    {
      title: 'Natural Language',
      description: 'Advanced NLP models for seamless human-AI conversation.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    },
    {
      title: 'Computer Vision',
      description: 'Real-time image and video processing capabilities.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    },
    {
      title: 'Reinforcement Learning',
      description: 'Systems that continuously improve through interaction.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
    },
    {
      title: 'Federated Systems',
      description: 'Privacy-preserving distributed model training.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="5" cy="19" r="2"/><path d="M6.5 6.5L10.5 10.5M17.5 6.5L13.5 10.5M6.5 17.5L10.5 13.5M17.5 17.5L13.5 13.5"/></svg>
    }
  ];

  return (
    <section id="technology" className="section" ref={sectionRef} style={{ background: 'var(--bg-section)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <style>{`
        .tech-card {
          transition: all 0.3s ease;
        }
        .tech-card:hover {
          transform: scale(1.03);
        }
        .tech-card:hover .tech-icon {
          box-shadow: 0 0 15px var(--gold);
        }
        .tech-grid {
          position: relative;
        }
        .tech-grid::before {
          content: '';
          position: absolute;
          top: 0; left: 33%; bottom: 0; width: 1px;
          background: rgba(249,168,38,0.1);
          z-index: 0;
        }
        .tech-grid::after {
          content: '';
          position: absolute;
          top: 0; right: 33%; bottom: 0; width: 1px;
          background: rgba(249,168,38,0.1);
          z-index: 0;
        }
        .tech-row-line {
          position: absolute;
          left: 0; right: 0; height: 1px;
          background: rgba(249,168,38,0.1);
          z-index: 0;
        }
        @media (max-width: 768px) {
          .tech-grid::before, .tech-grid::after, .tech-row-line { display: none; }
        }
      `}</style>
      
      <div className="section-inner" style={{ width: '100%', padding: '6rem 0' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h2 className="heading-xl mb-4" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Built on <span className="text-gradient">Tomorrow&apos;s Stack</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            We leverage cutting-edge technology to deliver solutions that are fast, reliable, and future-proof.
          </p>
        </div>

        <div className="tech-grid" style={{ position: 'relative' }}>
          <div className="tech-row-line" style={{ top: '50%' }}></div>
          <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', position: 'relative', zIndex: 1 }}>
            {techs.map((tech, i) => (
              <div key={i} className="glass-card tech-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div className="tech-icon" style={{ color: 'var(--gold)', marginBottom: '1.5rem', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                  {tech.icon}
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{tech.title}</h3>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
