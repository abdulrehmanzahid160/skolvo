'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * A live canvas radar — the literal instrument the product is.
 *
 * A beam sweeps continuously; each FDA record sits at a fixed bearing and
 * *lights up when the beam crosses it*, then decays. Signals also stream
 * inward from the edge. Nothing here is a looped video: every frame is drawn
 * from the clock, so the sweep never desynchronises from the detections.
 *
 * Perf + a11y:
 *   - pauses entirely when scrolled out of view (IntersectionObserver)
 *   - honours prefers-reduced-motion by drawing one settled frame
 *   - device-pixel-ratio aware so it stays crisp on retina
 */

type Kind = 'clearance' | 'mdr' | 'recall';

const PALETTE: Record<Kind, string> = {
  clearance: '#2FA98A',
  mdr: '#ECD9A8',
  recall: '#E4607A',
};

const LABEL: Record<Kind, string> = {
  clearance: '510(k)',
  mdr: 'MDR',
  recall: 'RECALL',
};

// Fixed bearings so detections always arrive in a deliberate rhythm.
const TARGETS: { angle: number; radius: number; kind: Kind; code: string }[] = [
  { angle: 0.35, radius: 0.54, kind: 'clearance', code: 'K243918' },
  { angle: 1.42, radius: 0.78, kind: 'mdr', code: 'MDR-8842301' },
  { angle: 2.63, radius: 0.44, kind: 'clearance', code: 'K244077' },
  { angle: 3.66, radius: 0.83, kind: 'recall', code: 'Z-1187-2026' },
  { angle: 4.71, radius: 0.62, kind: 'mdr', code: 'MDR-8843117' },
  { angle: 5.6, radius: 0.36, kind: 'clearance', code: 'K244310' },
];

const TAU = Math.PI * 2;
const SWEEP_PERIOD = 7.5; // seconds per revolution — slow enough to read

export default function WatchdogRadar({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [detected, setDetected] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.width; // square
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Inbound signal particles — traffic arriving from the public feeds.
    const particles = Array.from({ length: 26 }, () => ({
      a: Math.random() * TAU,
      r: 0.35 + Math.random() * 0.75,
      speed: 0.03 + Math.random() * 0.07,
      size: 0.6 + Math.random() * 1.3,
    }));

    // Detection state per target.
    const hits = TARGETS.map(() => ({ at: -99, seen: false }));
    let lastSweep = 0;
    let running = true;
    let raf = 0;
    const start = performance.now();

    const draw = (nowMs: number) => {
      const t = (nowMs - start) / 1000;
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) / 2 - 6;

      const sweep = reduce ? Math.PI * 1.15 : (t / SWEEP_PERIOD) * TAU;
      const sweepMod = sweep % TAU;

      ctx.clearRect(0, 0, width, height);

      // ── Scope face ────────────────────────────────────────────
      const face = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      face.addColorStop(0, '#12241E');
      face.addColorStop(1, '#0B1714');
      ctx.fillStyle = face;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TAU);
      ctx.fill();

      // ── Range rings ───────────────────────────────────────────
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.strokeStyle = `rgba(47,169,138,${i === 4 ? 0.34 : 0.16})`;
        ctx.beginPath();
        ctx.arc(cx, cy, (R * i) / 4, 0, TAU);
        ctx.stroke();
      }

      // ── Bearing spokes ────────────────────────────────────────
      ctx.strokeStyle = 'rgba(47,169,138,0.12)';
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.stroke();
      }

      // ── Inbound signal traffic ────────────────────────────────
      if (!reduce) {
        for (const p of particles) {
          p.r -= p.speed * 0.016;
          if (p.r < 0.06) {
            p.r = 1.02;
            p.a = Math.random() * TAU;
          }
          const px = cx + Math.cos(p.a) * p.r * R;
          const py = cy + Math.sin(p.a) * p.r * R;
          ctx.fillStyle = `rgba(47,169,138,${0.1 + (1 - p.r) * 0.4})`;
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, TAU);
          ctx.fill();
        }
      }

      // ── The sweep: a decaying wedge trailing the beam ─────────
      const TRAIL = 1.05;
      const segments = 42;
      for (let i = 0; i < segments; i++) {
        const f = i / segments;
        const a0 = sweepMod - TRAIL * f - TRAIL / segments;
        const a1 = sweepMod - TRAIL * f;
        ctx.fillStyle = `rgba(233,196,106,${0.16 * (1 - f) ** 1.7})`;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, a0, a1);
        ctx.closePath();
        ctx.fill();
      }

      // Leading edge of the beam
      ctx.strokeStyle = 'rgba(245,220,150,0.9)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepMod) * R, cy + Math.sin(sweepMod) * R);
      ctx.stroke();

      // ── Targets: light up as the beam crosses them ────────────
      let seenCount = 0;
      TARGETS.forEach((target, i) => {
        const h = hits[i];

        if (reduce) {
          h.at = t - 0.6;
          h.seen = true;
        } else {
          // Detect a crossing, including the wrap from 2π back to 0.
          const crossed =
            (lastSweep < target.angle && sweepMod >= target.angle) ||
            (sweepMod < lastSweep && (target.angle > lastSweep || target.angle <= sweepMod));
          if (crossed) {
            h.at = t;
            h.seen = true;
          }
        }

        const age = t - h.at;
        if (h.seen) seenCount++;
        // Hold bright, then decay — never fully vanish once found.
        const intensity = h.seen ? Math.max(0.22, Math.exp(-age / 2.4)) : 0;
        if (intensity <= 0) return;

        const tx = cx + Math.cos(target.angle) * target.radius * R;
        const ty = cy + Math.sin(target.angle) * target.radius * R;
        const color = PALETTE[target.kind];

        // expanding ping
        if (age < 1.5 && !reduce) {
          ctx.strokeStyle = `${color}${Math.round((1 - age / 1.5) * 150)
            .toString(16)
            .padStart(2, '0')}`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(tx, ty, 5 + age * 26, 0, TAU);
          ctx.stroke();
        }

        // blip
        ctx.shadowColor = color;
        ctx.shadowBlur = 12 * intensity;
        ctx.fillStyle = color;
        ctx.globalAlpha = intensity;
        ctx.beginPath();
        ctx.arc(tx, ty, target.kind === 'recall' ? 4.6 : 3.4, 0, TAU);
        ctx.fill();
        ctx.shadowBlur = 0;

        // label — only while the detection is fresh
        if (intensity > 0.5) {
          ctx.globalAlpha = (intensity - 0.5) * 2;
          ctx.font = '600 9px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.fillStyle = color;
          ctx.textBaseline = 'middle';
          const flip = Math.cos(target.angle) < 0;
          ctx.textAlign = flip ? 'right' : 'left';
          ctx.fillText(LABEL[target.kind], tx + (flip ? -9 : 9), ty - 5);
          ctx.fillStyle = 'rgba(255,255,255,0.55)';
          ctx.fillText(target.code, tx + (flip ? -9 : 9), ty + 6);
        }
        ctx.globalAlpha = 1;
      });

      lastSweep = sweepMod;
      setDetected((prev) => (prev === seenCount ? prev : seenCount));

      // ── Centre hub ────────────────────────────────────────────
      ctx.fillStyle = 'rgba(47,169,138,0.9)';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.6, 0, TAU);
      ctx.fill();

      // ── Rim ───────────────────────────────────────────────────
      ctx.strokeStyle = 'rgba(47,169,138,0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TAU);
      ctx.stroke();

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    // Stop the loop entirely while off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!running) {
            running = true;
            if (!reduce) raf = requestAnimationFrame(draw);
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className="absolute -inset-6 rounded-full bg-[#0F6B54]/15 blur-3xl"
      />

      <div
        ref={wrapRef}
        className="relative aspect-square w-full overflow-hidden rounded-full border border-[#0F6B54]/30 shadow-2xl"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Live radar sweeping public FDA feeds, detecting 510(k) clearances, adverse-event reports and recalls in the monitored product category."
          className="block h-full w-full"
        />

        {/* Readouts layered over the scope */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-4 -translate-x-1/2">
            <span className="font-data text-data font-bold tracking-[0.22em] text-[#ECD9A8]/90">
              OPENFDA · LIVE
            </span>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#0F6B54]/30 bg-[#0B1714]/80 px-3 py-1 backdrop-blur-sm">
            <span className="font-data text-data font-bold text-white/70">
              {String(detected).padStart(2, '0')} DETECTED
            </span>
            <span className="h-2.5 w-px bg-white/20" />
            <span className="font-data text-data font-bold text-[#2FA98A]">SWEEPING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
