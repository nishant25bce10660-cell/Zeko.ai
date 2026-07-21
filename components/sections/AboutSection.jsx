'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftContentRef.current.children,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      <div className="section-inner" style={{ width: '100%', padding: '6rem 0', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
        
        <div ref={leftContentRef} style={{ flex: '1 1 500px', maxWidth: '60%' }}>
          <h2 className="heading-lg" style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>
            The Minds Behind the <span className="text-gradient">Machine</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.7 }}>
            Founded in 2024, zeko.ai emerged from a simple belief: artificial intelligence should feel natural. Our team of researchers, engineers, and designers work at the intersection of technology and humanity to build AI that people actually love to use.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>50+</div>
              <div className="text-muted">Team Members</div>
            </div>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>12</div>
              <div className="text-muted">Countries</div>
            </div>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>3</div>
              <div className="text-muted">Patents</div>
            </div>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>$10M+</div>
              <div className="text-muted">Processed</div>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <div className="glass-card" style={{ padding: '3rem 2.5rem' }}>
            <div ref={timelineRef} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '6px', width: '1px', background: 'var(--gold)', opacity: 0.3 }}></div>
              
              <div style={{ position: 'relative', paddingLeft: '2rem', marginBottom: '3rem' }}>
                <div style={{ position: 'absolute', left: 0, top: '6px', width: '13px', height: '13px', borderRadius: '50%', background: 'var(--gold)' }}></div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2024</div>
                <div style={{ color: 'var(--text-secondary)' }}>Founded with a vision to humanize AI</div>
              </div>
              
              <div style={{ position: 'relative', paddingLeft: '2rem', marginBottom: '3rem' }}>
                <div style={{ position: 'absolute', left: 0, top: '6px', width: '13px', height: '13px', borderRadius: '50%', background: 'var(--gold)' }}></div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2025</div>
                <div style={{ color: 'var(--text-secondary)' }}>Launched Cognitive Engine v1.0</div>
              </div>
              
              <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                <div style={{ position: 'absolute', left: 0, top: '6px', width: '13px', height: '13px', borderRadius: '50%', background: 'var(--gold)' }}></div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2026</div>
                <div style={{ color: 'var(--text-secondary)' }}>Reached 10,000+ users worldwide</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
      <div style={{ width: '100%', padding: '2rem 0', textAlign: 'center', marginTop: 'auto', borderTop: '1px solid var(--border)' }}>
        <p className="text-muted" style={{ margin: 0 }}>Built with conviction. Powered by intelligence.</p>
      </div>
    </section>
  );
}
