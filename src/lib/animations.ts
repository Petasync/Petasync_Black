// Animation utilities for GSAP and Framer Motion
import { gsap } from 'gsap';

// Common GSAP animation configurations
export const fadeInUp = {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power3.out',
};

export const fadeIn = {
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
};

export const slideInLeft = {
  opacity: 0,
  x: -50,
  duration: 0.8,
  ease: 'power3.out',
};

export const slideInRight = {
  opacity: 0,
  x: 50,
  duration: 0.8,
  ease: 'power3.out',
};

export const scaleIn = {
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  ease: 'power3.out',
};

// Framer Motion variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const cardHoverVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

// GSAP ScrollTrigger helper
export const createScrollTrigger = (
  element: string | Element,
  animation: gsap.TweenVars,
  options: ScrollTrigger.Vars = {}
) => {
  return gsap.from(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...options,
    },
  });
};

// Number counter animation
export const animateCounter = (
  element: Element,
  target: number,
  duration: number = 2,
  suffix: string = ''
) => {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration,
    ease: 'power1.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value) + suffix;
    },
  });
};

// Particle effect helper
export const createParticleAnimation = (
  container: HTMLElement,
  particleCount: number = 50
) => {
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle absolute rounded-full bg-white/30';
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    container.appendChild(particle);
    particles.push(particle);

    gsap.to(particle, {
      y: `-=${Math.random() * 100 + 50}`,
      x: `+=${Math.random() * 60 - 30}`,
      opacity: 0,
      duration: Math.random() * 2 + 1,
      repeat: -1,
      delay: Math.random() * 2,
      ease: 'power1.out',
    });
  }

  return particles;
};
