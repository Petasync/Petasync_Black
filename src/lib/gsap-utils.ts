import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade In on Scroll
export const fadeInOnScroll = (element: string | Element, options: ScrollTrigger.Vars = {}) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    }
  );
};

// Slide In from Left
export const slideInLeft = (element: string | Element, options: ScrollTrigger.Vars = {}) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    }
  );
};

// Slide In from Right
export const slideInRight = (element: string | Element, options: ScrollTrigger.Vars = {}) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    }
  );
};

// Scale In
export const scaleIn = (element: string | Element, options: ScrollTrigger.Vars = {}) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    }
  );
};

// Parallax Effect
export const parallaxScroll = (element: string | Element, speed: number = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Text Reveal (word by word)
export const textReveal = (element: string | Element, options: ScrollTrigger.Vars = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const text = el.textContent || '';
  const words = text.split(' ');
  el.innerHTML = words
    .map((word) => `<span class="word" style="display: inline-block; opacity: 0;">${word}&nbsp;</span>`)
    .join('');

  return gsap.to(el.querySelectorAll('.word'), {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options,
    },
  });
};

// Counter Animation
export const animateCounter = (
  element: string | Element,
  endValue: number,
  duration: number = 2,
  options: ScrollTrigger.Vars = {}
) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options,
    },
    onUpdate: () => {
      el.textContent = Math.round(obj.value).toString();
    },
  });
};

// Pin Section
export const pinSection = (element: string | Element, duration: string | number = '100%') => {
  return ScrollTrigger.create({
    trigger: element,
    start: 'top top',
    end: `+=${duration}`,
    pin: true,
    anticipatePin: 1,
  });
};

// Stagger Animation
export const staggerFadeIn = (elements: string, options: ScrollTrigger.Vars = {}) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    }
  );
};

// Progress Bar Animation
export const progressBar = (element: string | Element, percentage: number) => {
  return gsap.fromTo(
    element,
    { width: '0%' },
    {
      width: `${percentage}%`,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Rotate on Scroll
export const rotateOnScroll = (element: string | Element, rotation: number = 360) => {
  return gsap.to(element, {
    rotation,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
};

// Cleanup all ScrollTriggers
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
