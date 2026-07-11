/* ═══════════════════════════════════════════════════════════════════════
   ZEKO.AI — Shared Interactions & Animations
   ═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── INTERSECTION OBSERVER: Fade-in on scroll ───
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }


    // ─── NAV SCROLL EFFECT ───
    const nav = document.getElementById('main-nav');
    if (nav) {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                nav.classList.add('nav--scrolled');
            } else {
                nav.classList.remove('nav--scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
    }


    // ─── PARALLAX: Subtle background shift on mouse move (Home only) ───
    const hero = document.getElementById('hero');
    const bgImage = document.querySelector('.hero__bg-image');

    if (hero && bgImage) {
        let ticking = false;
        hero.addEventListener('mousemove', (e) => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const rect = hero.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                bgImage.style.transform = `translate(${x * 8}px, ${y * 8}px) scale(1.02)`;
                ticking = false;
            });
        });

        hero.addEventListener('mouseleave', () => {
            bgImage.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            bgImage.style.transform = 'translate(0, 0) scale(1)';
            setTimeout(() => { bgImage.style.transition = ''; }, 800);
        });
    }


    // ─── MAGNETIC HOVER: Primary CTA buttons ───
    const magneticButtons = document.querySelectorAll('.btn--primary, .hero__explore-btn');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => { btn.style.transition = ''; }, 400);
        });
    });


    // ─── CURSOR GLOW: Ambient radial light ───
    const cursorGlow = document.createElement('div');
    Object.assign(cursorGlow.style, {
        position: 'fixed',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(216,148,71,0.035) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: '1',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.4s ease',
        opacity: '0'
    });
    document.body.appendChild(cursorGlow);

    let glowTicking = false;
    document.addEventListener('mousemove', (e) => {
        if (glowTicking) return;
        glowTicking = true;
        requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.opacity = '1';
            glowTicking = false;
        });
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });


    // ─── SMOOTH SCROLL: Scroll hint button ───
    const scrollHint = document.getElementById('btn-scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', () => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        });
    }


    // ─── ACTIVE NAV HIGHLIGHT ───
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');
    const pageMap = {
        'index.html': 'nav-home',
        '': 'nav-home',
        'solutions.html': 'nav-solutions',
        'philosophy.html': 'nav-philosophy',
        'technology.html': 'nav-technology',
        'about.html': 'nav-about'
    };

    const activeId = pageMap[currentPage];
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        if (link.id === activeId) {
            link.classList.add('nav__link--active');
        }
    });


    // ─── CARD TILT: Subtle 3D tilt on hover ───
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-2px) perspective(800px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(800px) rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });
    });


    // ─── COUNTER ANIMATION: Animate stats numbers ───
    const statNumbers = document.querySelectorAll('.stat__number');
    if (statNumbers.length) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => countObserver.observe(el));
    }

    function animateCounter(el) {
        const text = el.textContent;
        const match = text.match(/([\d.]+)/);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = text.replace(match[1], '');
        const isDecimal = text.includes('.');
        const duration = 1500;
        const start = performance.now();

        function step(timestamp) {
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            const current = target * eased;

            if (isDecimal) {
                el.textContent = current.toFixed(1) + suffix.replace(match[1], '');
            } else {
                el.textContent = Math.floor(current) + suffix.replace(match[1], '');
            }

            // Restore the original HTML structure for the span color
            if (el.dataset.suffix) {
                el.innerHTML = (isDecimal ? current.toFixed(1) : Math.floor(current)) + el.dataset.suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.innerHTML = el.dataset.original || text;
            }
        }

        el.dataset.original = el.innerHTML;
        // Extract suffix for reconstruction
        const spanMatch = el.innerHTML.match(/<span>([^<]*)<\/span>/);
        if (spanMatch) {
            el.dataset.suffix = '<span>' + spanMatch[1] + '</span>';
        }

        requestAnimationFrame(step);
    }

    // ─── MOBILE NAV TOGGLE ───
    const hamburger = document.getElementById('nav-hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('mobile-nav--open');
            
            if (isOpen) {
                // Close menu
                mobileNav.classList.remove('mobile-nav--open');
                hamburger.classList.remove('nav-hamburger--active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else {
                // Open menu
                mobileNav.classList.add('mobile-nav--open');
                hamburger.classList.add('nav-hamburger--active');
                hamburger.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
        
        // Close on link click
        const mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('mobile-nav--open');
                hamburger.classList.remove('nav-hamburger--active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }


    // ─── CHAT WIDGET ───
    const chatBubble = document.getElementById('chat-bubble');
    const chatPanel = document.getElementById('chat-panel');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if (chatBubble && chatPanel) {
        let chatHistory = [];

        // Toggle chat panel
        function toggleChat() {
            const isOpen = chatPanel.classList.contains('chat-panel--open');
            if (isOpen) {
                chatPanel.classList.remove('chat-panel--open');
                chatBubble.classList.remove('chat-bubble--open');
            } else {
                chatPanel.classList.add('chat-panel--open');
                chatBubble.classList.add('chat-bubble--open');
                setTimeout(() => chatInput.focus(), 400);
            }
        }

        chatBubble.addEventListener('click', toggleChat);
        if (chatClose) chatClose.addEventListener('click', toggleChat);

        // Enable/disable send button based on input
        chatInput.addEventListener('input', () => {
            if (chatInput.value.trim()) {
                chatSend.classList.add('chat-input__send--active');
            } else {
                chatSend.classList.remove('chat-input__send--active');
            }
        });

        // Send message
        async function sendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            // Add user message to UI
            appendMessage('user', text);
            chatInput.value = '';
            chatSend.classList.remove('chat-input__send--active');

            // Add to history
            chatHistory.push({ role: 'user', content: text });

            // Show typing indicator
            const typingEl = showTyping();

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: chatHistory })
                });

                const data = await response.json();

                // Remove typing indicator
                if (typingEl) typingEl.remove();

                if (response.ok && data.reply) {
                    appendMessage('ai', data.reply);
                    chatHistory.push({ role: 'assistant', content: data.reply });
                } else {
                    appendMessage('ai', 'I apologize, I\'m having trouble connecting right now. Please try again in a moment.');
                }
            } catch (error) {
                if (typingEl) typingEl.remove();
                appendMessage('ai', 'I apologize, I\'m having trouble connecting right now. Please try again in a moment.');
            }
        }

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Append a message bubble
        function appendMessage(type, text) {
            // Remove welcome message if present
            const welcome = chatMessages.querySelector('.chat-welcome');
            if (welcome) welcome.remove();

            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-msg chat-msg--${type}`;

            const bubble = document.createElement('div');
            bubble.className = 'chat-msg__bubble';
            bubble.textContent = text;

            msgDiv.appendChild(bubble);
            chatMessages.appendChild(msgDiv);

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Show typing indicator
        function showTyping() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-typing';
            typingDiv.innerHTML = `
                <div class="chat-typing__dots">
                    <span class="chat-typing__dot"></span>
                    <span class="chat-typing__dot"></span>
                    <span class="chat-typing__dot"></span>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return typingDiv;
        }
    }
});
