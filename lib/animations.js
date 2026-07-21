/**
 * GSAP Animation Utilities for Zeko.ai
 * Reusable animation factories and ScrollTrigger presets
 */

/**
 * Creates a cinematic section transition timeline.
 * Used by the main scroll orchestrator to transition between sections.
 * 
 * @param {HTMLElement} leaving - The section being scrolled away
 * @param {HTMLElement} entering - The section being scrolled into
 * @param {object} gsap - The GSAP instance
 * @returns {gsap.core.Timeline} The transition timeline
 */
export function createSectionTransition(gsap, leaving, entering) {
  const tl = gsap.timeline({
    defaults: { ease: 'power4.inOut' }
  });

  // Phase 1: Current section dissolves backward
  tl.to(leaving, {
    scale: 0.92,
    filter: 'blur(12px) brightness(0.6)',
    y: -120,
    opacity: 0,
    duration: 1.4,
  }, 0);

  // Phase 2: Next section emerges from the fog
  tl.fromTo(entering, {
    scale: 1.1,
    filter: 'blur(20px) brightness(1.2)',
    y: 80,
    opacity: 0,
  }, {
    scale: 1,
    filter: 'blur(0px) brightness(1)',
    y: 0,
    opacity: 1,
    duration: 1.4,
  }, 0.2);

  return tl;
}

/**
 * Splits text into individual character spans for GSAP animation.
 * 
 * @param {HTMLElement} element - The text element to split
 * @returns {HTMLElement[]} Array of character span elements
 */
export function splitTextIntoChars(element) {
  const text = element.textContent;
  element.textContent = '';
  element.style.display = 'inline-block';
  
  const chars = [];
  for (let i = 0; i < text.length; i++) {
    const charSpan = document.createElement('span');
    charSpan.textContent = text[i] === ' ' ? '\u00A0' : text[i];
    charSpan.style.display = 'inline-block';
    charSpan.style.willChange = 'transform, opacity, filter';
    element.appendChild(charSpan);
    chars.push(charSpan);
  }
  
  return chars;
}

/**
 * Animates text characters with the signature zeko.ai reveal effect.
 * Characters appear bottom-to-top with blur and rotation.
 * 
 * @param {gsap} gsap - GSAP instance
 * @param {HTMLElement[]} chars - Array of character elements
 * @param {object} options - Animation options
 */
export function animateTextReveal(gsap, chars, options = {}) {
  const {
    delay = 0,
    stagger = 0.02,
    duration = 1,
    y = 40,
    scrollTrigger = null,
  } = options;

  return gsap.from(chars, {
    y,
    opacity: 0,
    filter: 'blur(10px)',
    rotation: 5,
    stagger,
    duration,
    delay,
    ease: 'power4.out',
    scrollTrigger,
  });
}

/**
 * Creates a fade-and-slide-up animation for general elements.
 * 
 * @param {gsap} gsap - GSAP instance
 * @param {HTMLElement|string} targets - Target elements
 * @param {object} options - Animation options
 */
export function animateFadeUp(gsap, targets, options = {}) {
  const {
    delay = 0,
    duration = 1,
    y = 60,
    stagger = 0,
    scrollTrigger = null,
  } = options;

  return gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: 'power4.out',
    scrollTrigger,
  });
}

/**
 * Creates a scale-in animation for cards.
 * 
 * @param {gsap} gsap - GSAP instance  
 * @param {HTMLElement|string} targets - Target card elements
 * @param {object} options - Animation options
 */
export function animateCardsIn(gsap, targets, options = {}) {
  const {
    delay = 0,
    stagger = 0.15,
    scrollTrigger = null,
  } = options;

  return gsap.from(targets, {
    y: 80,
    opacity: 0,
    scale: 0.95,
    duration: 1,
    delay,
    stagger,
    ease: 'power4.out',
    scrollTrigger,
  });
}

/**
 * Premium easing curves for consistent motion design.
 */
export const EASING = {
  premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  expo: 'expo.inOut',
  power4: 'power4.inOut',
};

/**
 * Standard animation durations in seconds.
 */
export const TIMING = {
  hover: 0.3,
  click: 0.18,
  textReveal: 1,
  imageReveal: 1.3,
  sectionTransition: 1.4,
  navTransition: 0.45,
  pageLoad: 2.2,
};
