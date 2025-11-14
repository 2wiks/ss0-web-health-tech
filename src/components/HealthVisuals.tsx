import { useEffect, useRef } from 'react';

const HealthVisuals = () => {
  const heartCanvasRef = useRef<HTMLCanvasElement>(null);
  const circadianCanvasRef = useRef<HTMLCanvasElement>(null);
  const recoveryCanvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Holographic Heart & Rhythm Field
  useEffect(() => {
    const canvas = heartCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    let animationFrame: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 4;

      // Fondo suave
      const bgGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.2,
        centerX,
        centerY,
        radius * 1.4
      );
      bgGradient.addColorStop(0, 'rgba(0, 163, 255, 0.08)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Anillos holográficos
      for (let i = 0; i < 3; i++) {
        const phase = time * 0.25 + i * 0.8;
        const r = radius + Math.sin(phase) * 4 * (i + 1);
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 163, 255, ${0.18 - i * 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Heart-like core (simple stylized shape)
      ctx.save();
      ctx.translate(centerX, centerY - radius * 0.3);
      ctx.scale(1.1, 1.1 + Math.sin(time * 0.6) * 0.02);
      ctx.beginPath();
      const heartSize = radius * 0.6;
      ctx.moveTo(0, heartSize * 0.2);
      ctx.bezierCurveTo(
        heartSize * 0.6, -heartSize * 0.4,
        heartSize * 1.2, heartSize * 0.3,
        0, heartSize
      );
      ctx.bezierCurveTo(
        -heartSize * 1.2, heartSize * 0.3,
        -heartSize * 0.6, -heartSize * 0.4,
        0, heartSize * 0.2
      );
      ctx.strokeStyle = 'rgba(0, 163, 255, 0.7)';
      ctx.lineWidth = 1.4;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0, 163, 255, 0.6)';
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Wave de coherencia (ECG-like) bajo el corazón
      const waveWidth = canvas.width * 0.8;
      const waveStartX = (canvas.width - waveWidth) / 2;
      const waveY = centerY + radius * 0.9;
      const amplitude = 16;
      const baseFreq = 0.025;

      ctx.beginPath();
      ctx.lineWidth = 1.2;
      const waveGradient = ctx.createLinearGradient(
        waveStartX,
        waveY,
        waveStartX + waveWidth,
        waveY
      );
      waveGradient.addColorStop(0, 'rgba(0,163,255,0.0)');
      waveGradient.addColorStop(0.2, 'rgba(0,163,255,0.5)');
      waveGradient.addColorStop(0.8, 'rgba(0,163,255,0.5)');
      waveGradient.addColorStop(1, 'rgba(0,163,255,0.0)');
      ctx.strokeStyle = waveGradient;

      for (let x = 0; x <= waveWidth; x += 2) {
        const t = (x / waveWidth) * Math.PI * 4;
        const y =
          waveY +
          Math.sin(t + time * 1.5) *
            amplitude *
            (0.6 + 0.3 * Math.sin(time * 0.4));
        if (x === 0) ctx.moveTo(waveStartX + x, y);
        else ctx.lineTo(waveStartX + x, y);
      }
      ctx.stroke();

      time += 0.02;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  // 2. Circadian Orbit Hologram
  useEffect(() => {
    const canvas = circadianCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    let animationFrame: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) / 3;

      // Background glow
      const bgGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        baseRadius * 0.2,
        centerX,
        centerY,
        baseRadius * 1.4
      );
      bgGradient.addColorStop(0, 'rgba(0, 163, 255, 0.1)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Day/Night orbit rings
      for (let i = 0; i < 2; i++) {
        const r = baseRadius * (0.7 + i * 0.25);
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 163, 255, ${0.25 - i * 0.08})`;
        ctx.lineWidth = 1;
        ctx.setLineDash(i === 0 ? [4, 4] : [2, 6]);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Small "planet" orbiting (signal representing circadian phase)
      const orbitR = baseRadius * 0.9;
      const angle = time * 0.4;
      const planetX = centerX + Math.cos(angle) * orbitR;
      const planetY = centerY + Math.sin(angle) * orbitR;

      ctx.beginPath();
      ctx.arc(planetX, planetY, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,163,255,0.85)';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0,163,255,0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner "clock" tick marks
      const tickRadius = baseRadius * 0.45;
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        const inner = tickRadius * 0.92;
        const outer = tickRadius * 1.05;
        const x1 = centerX + Math.cos(a) * inner;
        const y1 = centerY + Math.sin(a) * inner;
        const x2 = centerX + Math.cos(a) * outer;
        const y2 = centerY + Math.sin(a) * outer;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        const alpha = i % 6 === 0 ? 0.6 : 0.25;
        ctx.strokeStyle = `rgba(0,163,255,${alpha})`;
        ctx.lineWidth = i % 6 === 0 ? 1.5 : 0.8;
        ctx.stroke();
      }

      // Circadian "wave belt" around center
      ctx.beginPath();
      const beltRadius = baseRadius * 0.3;
      for (let i = 0; i <= 64; i++) {
        const t = (i / 64) * Math.PI * 2;
        const offset =
          Math.sin(t * 2 + time * 1.2) * beltRadius * 0.15 *
          (0.8 + 0.2 * Math.sin(time * 0.5));
        const r = beltRadius + offset;
        const x = centerX + Math.cos(t) * r;
        const y = centerY + Math.sin(t) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(0,163,255,0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      time += 0.015;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  // 3. Recovery & Regeneration Sphere (más holográfico)
  useEffect(() => {
    const canvas = recoveryCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    let animationFrame: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) / 2.2;

      // Soft field background
      const grad = ctx.createRadialGradient(
        centerX,
        centerY,
        maxRadius * 0.1,
        centerX,
        centerY,
        maxRadius * 1.4
      );
      grad.addColorStop(0, 'rgba(0,163,255,0.14)');
      grad.addColorStop(0.4, 'rgba(0,163,255,0.05)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Concentric rings pulsing
      for (let i = 0; i < 4; i++) {
        const base = (i + 1) / 4;
        const r =
          maxRadius * (0.35 + base * 0.5) +
          Math.sin(time * 0.5 + i) * 4;
        const alpha = 0.18 - i * 0.03;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,163,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Inner core (regeneration nucleus)
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,163,255,0.9)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 18;
      ctx.shadowColor = 'rgba(0,163,255,0.9)';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Small particles circulating
      const particleCount = 24;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time * 0.4;
        const radialOffset = Math.sin(time * 0.7 + i) * 6;
        const r = maxRadius * 0.6 + radialOffset;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,163,255,0.7)';
        ctx.fill();
      }

      time += 0.015;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="py-24 px-6 bg-white dark:bg-background text-foreground relative overflow-hidden">
      {/* Subtle background gradient - only in dark mode */}
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-[#06080D]/50 via-background to-[#06080D]/50" />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(11, 28, 63, 0.18) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-light mb-16 tracking-tight text-center text-foreground">
          Explaining the Invisible
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Holographic Heart & Rhythm Field */}
          <div className="bg-white dark:bg-card/40 backdrop-blur-sm border border-border dark:border-[rgba(0,163,255,0.16)] rounded-xl p-8 hover:border-primary/40 dark:hover:border-[rgba(0,163,255,0.4)] transition-all duration-700">
            <div className="h-36 mb-6 relative">
              <canvas
                ref={heartCanvasRef}
                className="w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <p className="text-sm leading-relaxed text-card-foreground/90">
              We visualize your cardiac rhythm as a holographic field — coherence reflects how resilient your system can become over time.
            </p>
          </div>

          {/* 2. Circadian Orbit Hologram */}
          <div className="bg-white dark:bg-card/40 backdrop-blur-sm border border-border dark:border-[rgba(0,163,255,0.16)] rounded-xl p-8 hover:border-primary/40 dark:hover:border-[rgba(0,163,255,0.4)] transition-all duration-700">
            <div className="h-36 mb-6 relative">
              <canvas
                ref={circadianCanvasRef}
                className="w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <p className="text-sm leading-relaxed text-card-foreground/90">
              Your internal clocks orbit around a stable rhythm. Misalignment is visible long before symptoms — we track that drift in real time.
            </p>
          </div>

          {/* 3. Recovery & Regeneration Sphere */}
          <div className="bg-white dark:bg-card/40 backdrop-blur-sm border border-border dark:border-[rgba(0,163,255,0.16)] rounded-xl p-8 hover:border-primary/40 dark:hover:border-[rgba(0,163,255,0.4)] transition-all duration-700">
            <div className="h-36 mb-6 relative">
              <canvas
                ref={recoveryCanvasRef}
                className="w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <p className="text-sm leading-relaxed text-card-foreground/90">
              Every day your body repairs itself. The regeneration sphere shows how consistently that process unfolds across days and weeks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthVisuals;
