'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionsSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const solutions = [
    {
      title: 'Cognitive Engine',
      description: 'Natural language processing that understands context, nuance, and intent—just like a human colleague.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"/>
          <path d="M12 8v4l3 3"/>
        </svg>
      )
    },
    {
      title: 'Predictive Analytics',
      description: 'Transform raw data into actionable intelligence with models that learn and adapt to your business.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    {
      title: 'Ethical AI Framework',
      description: 'Built-in bias detection and transparency tools that ensure your AI operates responsibly.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      title: 'Global Deployment',
      description: 'Edge-optimized infrastructure that delivers sub-100ms responses anywhere in the world.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    }
  ];

  return (
    <section id="solutions" className="section" ref={sectionRef} style={{ background: 'var(--bg-section)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="section-inner" style={{ width: '100%', padding: '6rem 0' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            <span className="text-gradient">Intelligent</span> Solutions
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Purpose-built AI tools that transform how businesses operate.
          </p>
        </div>

        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {solutions.map((sol, i) => (
            <div key={i} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'all 0.3s ease', transformStyle: 'preserve-3d' }} 
                 onMouseEnter={(e) => { e.currentTarget.style.transform = 'perspective(600px) rotateY(2deg) translateY(-5px)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(249,168,38,0.1)'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.transform = 'perspective(600px) rotateY(0deg) translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ height: '2px', width: '40px', background: 'var(--gold)', position: 'absolute', top: 0, left: '2.5rem' }}></div>
              <div style={{ color: 'var(--gold)', marginBottom: '1.5rem', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(249,168,38,0.1)', borderRadius: '12px' }}>
                {sol.icon}
              </div>
              <h3 className="heading-md" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{sol.title}</h3>
              <p className="body-md" style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{sol.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
