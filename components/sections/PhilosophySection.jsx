'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PhilosophySection() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        pillarsRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: '01',
      title: 'Human First',
      text: 'Every algorithm begins with empathy. We design AI that enhances human decision-making, never overrides it.'
    },
    {
      num: '02',
      title: 'Radical Transparency',
      text: 'No black boxes. Our AI explains its reasoning, building trust through understanding.'
    },
    {
      num: '03',
      title: 'Continuous Evolution',
      text: 'Our systems learn alongside your team, growing more intelligent and aligned with each interaction.'
    }
  ];

  return (
    <section id="philosophy" className="section" ref={sectionRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="section-inner" style={{ width: '100%', padding: '6rem 0' }}>
        <div ref={quoteRef} style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 className="heading-lg text-center max-w-[900px] mx-auto mb-4" style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            &quot;Technology should amplify humanity, not replace it.&quot;
          </h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>— The Zeko Principle</p>
        </div>

        <div ref={pillarsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {pillars.map((pillar, i) => (
            <div key={i} style={{ 
              position: 'relative', 
              padding: '0 2rem',
              borderLeft: i !== 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' 
            }}>
              <div style={{ color: 'var(--gold)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                {pillar.num}
              </div>
              <h3 className="heading-md" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{pillar.title}</h3>
              <p className="body-md" style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
