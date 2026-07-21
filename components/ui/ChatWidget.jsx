'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * Premium Chat Widget
 *
 * Bottom-right floating chat bubble that opens a fullscreen chat panel.
 * Styled to match the zeko.ai dark premium theme with golden accents.
 * Features: sidebar with "Z" logo, suggestion chips, input area.
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const bubbleRef = useRef(null);

  const toggleChat = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <>
      {/* ── Floating Chat Bubble ── */}
      <button
        ref={bubbleRef}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: '1px solid rgba(249, 168, 38, 0.3)',
          background: 'rgba(17, 17, 17, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'none',
          zIndex: 8000,
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: isOpen
            ? '0 0 30px rgba(249, 168, 38, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
        data-magnetic
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.borderColor = 'rgba(249, 168, 38, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'rgba(249, 168, 38, 0.3)';
        }}
      >
        {isOpen ? (
          // Close icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#F9A826" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          // Chat icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
              stroke="#F9A826"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* ── Fullscreen Chat Panel ── */}
      {isOpen && (
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 7999,
            display: 'flex',
            background: '#0a0a0a',
          }}
        >
          {/* ── Left Sidebar ── */}
          <div
            style={{
              width: 60,
              height: '100%',
              background: '#0d0d0d',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px 0',
              gap: 16,
            }}
          >
            {/* Z Logo */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #F9A826, #FFC857)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 18,
                color: '#090909',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Z
            </div>

            {/* Sidebar icons */}
            {[
              // Home
              <svg key="home" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              // History
              <svg key="hist" width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              // Files
              <svg key="files" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              // Trash
              <svg key="trash" width="20" height="20" viewBox="0 0 24 24" fill="none"><polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            ].map((icon, i) => (
              <button
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: 'none',
                  background: i === 0 ? 'rgba(249, 168, 38, 0.1)' : 'transparent',
                  color: i === 0 ? '#F9A826' : '#777',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {icon}
              </button>
            ))}

            {/* Bottom icons (settings, team) */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
              <button style={{ width: 40, height: 40, borderRadius: 10, border: 'none', background: 'transparent', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5"/></svg>
              </button>
              <button style={{ width: 40, height: 40, borderRadius: 10, border: 'none', background: 'transparent', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* ── Main Chat Area ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Header area with user info */}
            <div style={{ position: 'absolute', top: 20, right: 24, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
              <span style={{ color: '#777', fontSize: 14 }}>Guest User</span>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #F9A826, #FFC857)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#090909' }}>G</div>
            </div>

            {/* Center content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', maxWidth: 800, margin: '0 auto', width: '100%' }}>
              {/* Decorative sphere (CSS gradient) */}
              <div style={{ width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, rgba(249,168,38,0.15), rgba(249,168,38,0.03) 60%, transparent)', border: '1px solid rgba(249,168,38,0.08)', marginBottom: 40, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: 'radial-gradient(circle at 50% 40%, rgba(249,168,38,0.08), transparent 70%)', border: '1px solid rgba(255,255,255,0.04)' }} />
              </div>

              {/* Greeting */}
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 400, color: '#fff', textAlign: 'center', lineHeight: 1.3, marginBottom: 8, letterSpacing: '-0.01em' }}>
                Hey! <span style={{ opacity: 0.6 }}>Welcome</span>
              </h2>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 400, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.3, marginBottom: 40 }}>
                What can I help with?
              </h2>

              {/* Suggestion Chips */}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
                {[
                  { label: 'Content Help', desc: 'Help me create a Presentation', color: '#4ECDC4' },
                  { label: 'Suggestions', desc: 'Help me with ideas', color: '#F9A826' },
                  { label: 'Job Application', desc: 'Help me apply for job application', color: '#E74C3C' },
                ].map(({ label, desc, color }) => (
                  <button
                    key={label}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                      padding: '16px 24px',
                      minWidth: 180,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: `1px solid ${color}`, color, fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{label}</span>
                    <div style={{ color: '#777', fontSize: 13, lineHeight: 1.4 }}>{desc}</div>
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div style={{ width: '100%', maxWidth: 700, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '16px 20px', position: 'relative' }}>
                {/* Sparkle icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#F9A826' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.09 6.26L18 9.27l-4.91 1.01L12 16.54l-1.09-6.26L6 9.27l4.91-1.01L12 2zm4.5 11l.55 3.15 2.95.5-2.95.51L16.5 20.3l-.55-3.14-2.95-.51 2.95-.5.55-3.15zM5.5 13l.55 3.15 2.95.5-2.95.51L5.5 20.3l-.55-3.14-2.95-.51 2.95-.5L5.5 13z" /></svg>
                </div>
                <input
                  type="text"
                  placeholder="Ask me anything......."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'var(--font-body)',
                    marginBottom: 12,
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Attach file button */}
                  <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 14px', color: '#aaa', fontSize: 13, cursor: 'pointer' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Attach file
                  </button>
                  {/* Send button */}
                  <button style={{ width: 36, height: 36, borderRadius: 10, background: '#F9A826', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="#090909" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
