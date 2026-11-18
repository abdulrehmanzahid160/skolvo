'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage motion: Lenis smooth scrolling driven by GSAP's ticker, plus the scroll animations.
 * Everything runs only when the visitor hasn't asked their device to reduce motion,
 * and is undone when they leave the page.
 */
export default function HomeMotion() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -80 } });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const random = gsap.utils.random;

      // Hero: the headline's letters fly in from all sides and settle into place.
      gsap.fromTo('.skh-hero h1 .skh-char',
        { opacity: 0, x: () => random(-140, 140), y: () => random(-90, 90), rotate: () => random(-60, 60), filter: 'blur(12px)' },
        { opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', stagger: { each: 0.03, from: 'random' }, delay: 0.1 });
      gsap.from('.skh-hero [data-rise]', { y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.7 });
      gsap.from('.skh-chip', { scale: 0.6, opacity: 0, duration: 0.8, ease: 'back.out(2)', stagger: 0.12, delay: 0.9 });

      // Floating cards bob gently, and drift at different speeds as the hero scrolls away.
      gsap.utils.toArray<HTMLElement>('.skh-chip').forEach((chip, i) => {
        gsap.to(chip, { y: i % 2 ? 12 : -12, duration: 2.2 + i * 0.35, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.to(chip, { yPercent: -80 - i * 40, ease: 'none', scrollTrigger: { trigger: '.skh-hero', start: 'top top', end: 'bottom top', scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>('.skh-blob').forEach((blob, i) => {
        gsap.to(blob, { x: random(-40, 40), y: random(-30, 30), scale: random(0.9, 1.15), duration: 6 + i * 2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
      gsap.to('.skh-sticker__ring', { rotate: 360, duration: 16, ease: 'none', repeat: -1 });

      // Marquee: loops on its own and speeds up while the page is being scrolled.
      const loop = gsap.to('.skh-marquee__track', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(self.getVelocity()) / 250);
          gsap.to(loop, { timeScale: boost, duration: 0.25, overwrite: true, onComplete: () => { gsap.to(loop, { timeScale: 1, duration: 1.2 }); } });
        },
      });

      // Section headings: letters rise one by one as they come into view.
      gsap.utils.toArray<HTMLElement>('.skh-split').forEach((heading) => {
        gsap.from(heading.querySelectorAll('.skh-char'), {
          yPercent: 110, rotate: 12, opacity: 0, duration: 0.8, ease: 'power4.out', stagger: 0.022,
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        });
      });

      // Anything marked data-reveal fades up when it enters the screen.
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });

      // "What we build": each card sticks, and shrinks back a little as the next one slides over it.
      const worlds = gsap.utils.toArray<HTMLElement>('.skh-world');
      worlds.forEach((card, i) => {
        const next = worlds[i + 1];
        if (!next) return;
        // Explicit start values: tweening a filter from "none" starts at brightness 0 (a black card).
        gsap.fromTo(card, { scale: 1, filter: 'brightness(1)' },
          { scale: 0.9, filter: 'brightness(0.93)', ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true } });
      });

      // Statement: words light up one after another while scrolling past.
      gsap.fromTo('.skh-statement .skh-word', { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: '.skh-statement', start: 'top 75%', end: 'bottom 45%', scrub: true },
      });

      // Products and steps arrive with a small tilt, one after another.
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.from(group.children, {
          y: 60, rotate: () => random(-4, 4), opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: group, start: 'top 85%' },
        });
      });

      // Closing headline assembles like the hero once it comes into view.
      gsap.fromTo('.skh-close h2 .skh-char',
        { opacity: 0, x: () => random(-90, 90), y: () => random(-60, 60), rotate: () => random(-40, 40), filter: 'blur(10px)' },
        { opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out', stagger: { each: 0.025, from: 'random' },
          scrollTrigger: { trigger: '.skh-close', start: 'top 70%' } });

      // Web fonts change text sizes, so measure again once they've loaded.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
