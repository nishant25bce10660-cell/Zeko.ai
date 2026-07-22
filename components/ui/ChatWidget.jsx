'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * Global helper function to trigger opening the chat modal from anywhere in the app.
 */
export function openChat() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-chat'));
  }
}

/**
 * Premium Fullscreen Chat Widget with Accessible File Attachments & External Trigger
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [messages, setMessages] = useState([]);

  const panelRef = useRef(null);
  const bubbleRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleChat = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.96, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  };

  // Listen for global open-chat event & Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    const onOpenChat = () => {
      setIsOpen(true);
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, scale: 0.96, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
        );
      }
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('open-chat', onOpenChat);

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-chat', onOpenChat);
    };
  }, [isOpen]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newAttachments = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      fileObj: file,
    }));

    setAttachedFiles((prev) => [...prev, ...newAttachments]);
    e.target.value = '';
  };

  const removeFile = (id) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSendMessage = (textToSend = inputText) => {
    const trimmed = textToSend.trim();
    if (!trimmed && attachedFiles.length === 0) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      files: [...attachedFiles],
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setAttachedFiles([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Hidden Real File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Floating Chat Bubble Button */}
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
          border: '1px solid rgba(249, 168, 38, 0.4)',
          background: 'rgba(17, 17, 17, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 8000,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: isOpen
            ? '0 0 30px rgba(249, 168, 38, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
        data-magnetic
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#F9A826" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
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

      {/* Fullscreen Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 7999,
            display: 'flex',
            background: '#090909',
            color: '#fff',
          }}
        >
          {/* Left Sidebar */}
          <div
            style={{
              width: 64,
              height: '100%',
              background: '#0d0d0d',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px 0',
              gap: 16,
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #F9A826, #FFC857)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 20,
                color: '#090909',
                fontFamily: 'var(--font-heading)',
                boxShadow: '0 0 16px rgba(249, 168, 38, 0.3)',
              }}
            >
              Z
            </div>

            {[
              <svg key="home" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              <svg key="hist" width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              <svg key="files" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            ].map((icon, i) => (
              <button
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: 'none',
                  background: i === 0 ? 'rgba(249, 168, 38, 0.12)' : 'transparent',
                  color: i === 0 ? '#F9A826' : '#777',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {icon}
              </button>
            ))}

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
              <button style={{ width: 40, height: 40, borderRadius: 10, border: 'none', background: 'transparent', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5"/></svg>
              </button>
            </div>
          </div>

          {/* Main Panel Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto' }}>
            <div style={{ position: 'absolute', top: 20, right: 24, display: 'flex', alignItems: 'center', gap: 12, zIndex: 10 }}>
              <span style={{ color: '#888', fontSize: 14 }}>Guest User</span>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #F9A826, #FFC857)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#090909' }}>G</div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px 30px', maxWidth: 840, margin: '0 auto', width: '100%' }}>
              {messages.length === 0 ? (
                <>
                  <div style={{ width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, rgba(249,168,38,0.2), rgba(249,168,38,0.02) 60%, transparent)', border: '1px solid rgba(249,168,38,0.12)', marginBottom: 36, position: 'relative', boxShadow: '0 0 40px rgba(249,168,38,0.08)' }}>
                    <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', background: 'radial-gradient(circle at 50% 40%, rgba(249,168,38,0.1), transparent 70%)', border: '1px solid rgba(255,255,255,0.05)' }} />
                  </div>

                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 500, color: '#fff', textAlign: 'center', lineHeight: 1.2, marginBottom: 6 }}>
                    Hey! <span style={{ opacity: 0.6 }}>Welcome</span>
                  </h2>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 500, color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 1.2, marginBottom: 36 }}>
                    What can I help with?
                  </h2>

                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 36 }}>
                    {[
                      { label: 'Content Help', desc: 'Help me create a Presentation', color: '#4ECDC4' },
                      { label: 'Suggestions', desc: 'Help me with ideas', color: '#F9A826' },
                      { label: 'Job Application', desc: 'Help me apply for job application', color: '#E74C3C' },
                    ].map(({ label, desc, color }) => (
                      <button
                        key={label}
                        onClick={() => handleSendMessage(`I need help with ${label}: ${desc}`)}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 16,
                          padding: '16px 20px',
                          minWidth: 200,
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, border: `1px solid ${color}`, color, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{label}</span>
                        <div style={{ color: '#888', fontSize: 13, lineHeight: 1.4 }}>{desc}</div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 30, flex: 1, overflowY: 'auto' }}>
                  {messages.map((m) => (
                    <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <div style={{ background: 'rgba(249, 168, 38, 0.12)', border: '1px solid rgba(249, 168, 38, 0.3)', borderRadius: '16px 16px 4px 16px', padding: '12px 18px', maxWidth: '80%', color: '#fff', fontSize: 15, lineHeight: 1.5 }}>
                        {m.text}
                        {m.files.length > 0 && (
                          <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {m.files.map((f) => (
                              <span key={f.id} style={{ background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: 8, fontSize: 12, color: '#F9A826', border: '1px solid rgba(249,168,38,0.2)' }}>
                                📎 {f.name} ({f.size})
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ width: '100%', maxWidth: 740, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '16px 20px', position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#F9A826' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.09 6.26L18 9.27l-4.91 1.01L12 16.54l-1.09-6.26L6 9.27l4.91-1.01L12 2zm4.5 11l.55 3.15 2.95.5-2.95.51L16.5 20.3l-.55-3.14-2.95-.51 2.95-.5.55-3.15zM5.5 13l.55 3.15 2.95.5-2.95.51L5.5 20.3l-.55-3.14-2.95-.51 2.95-.5L5.5 13z" />
                  </svg>
                </div>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
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

                {attachedFiles.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12, padding: '6px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {attachedFiles.map((file) => (
                      <div
                        key={file.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          background: 'rgba(249, 168, 38, 0.12)',
                          border: '1px solid rgba(249, 168, 38, 0.3)',
                          borderRadius: 8,
                          padding: '4px 10px',
                          fontSize: 12,
                          color: '#F9A826',
                        }}
                      >
                        <span>📎 {file.name} ({file.size})</span>
                        <button
                          onClick={() => removeFile(file.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#F9A826',
                            cursor: 'pointer',
                            padding: 0,
                            lineHeight: 1,
                            fontSize: 14,
                            marginLeft: 4,
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    onClick={handleFileClick}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 999,
                      padding: '8px 16px',
                      color: '#ddd',
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{attachedFiles.length > 0 ? `Attach more (${attachedFiles.length})` : 'Attach file'}</span>
                  </button>

                  <button
                    onClick={() => handleSendMessage()}
                    type="button"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: '#F9A826',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 16px rgba(249, 168, 38, 0.4)',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="#090909" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
