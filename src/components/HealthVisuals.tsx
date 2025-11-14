import { useEffect, useRef } from 'react';

const HealthVisuals = () => {
  const heartCanvasRef = useRef<HTMLCanvasElement>(null);
  const circadianCanvasRef = useRef<HTMLCanvasElement>(null);
  const stressCanvasRef = useRef<HTMLCanvasElement>(null);
  const ageCanvasRef = useRef<HTMLCanvasElement>(null);
  const recoveryCanvasRef = useRef<HTMLCanvasElement>(null);

  // Heart Rhythm Coherence Visual
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
      
      const centerY = canvas.height / 2;
      const amplitude = 30;
      const frequency = 0.02;
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 163, 255, 0.4)';
      ctx.lineWidth = 1.5;
      
      for (let x = 0; x < canvas.width; x += 2) {
        const y = centerY + Math.sin((x * frequency) + time) * amplitude * 
                  (0.7 + 0.3 * Math.sin(time * 0.5));
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Add subtle glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 163, 255, 0.3)';
      ctx.stroke();
      ctx.shadowBlur = 0;
      
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
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Circadian Alignment Wave
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
      
      const centerY = canvas.height / 2;
      const amplitude = 40;
      
      ctx.beginPath();
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, 'rgba(11, 28, 63, 0.6)');
      gradient.addColorStop(0.5, 'rgba(15, 60, 138, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 163, 255, 0.4)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      
      for (let x = 0; x < canvas.width; x += 1) {
        const y = centerY + Math.sin((x * 0.01) + time) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
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
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Stress Load Visualization
  useEffect(() => {
    const canvas = stressCanvasRef.current;
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
    const particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    
    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const stressLevel = Math.sin(time * 0.3) * 0.5 + 0.5; // 0 to 1
      
      particles.forEach((particle, i) => {
        // Attract to center when recovery is strong, scatter when stress is high
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const attraction = (1 - stressLevel) * 0.01;
        particle.vx += dx * attraction;
        particle.vy += dy * attraction;
        
        // Add some random movement for stress
        particle.vx += (Math.random() - 0.5) * stressLevel * 0.1;
        particle.vy += (Math.random() - 0.5) * stressLevel * 0.1;
        
        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 163, 255, ${0.3 + (1 - stressLevel) * 0.3})`;
        ctx.fill();
      });
      
      time += 0.02;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Biological Age Trajectory
  useEffect(() => {
    const canvas = ageCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    let animationFrame: number;
    let progress = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const startY = canvas.height - 40;
      const endY = 40;
      const nodeCount = 5;
      
      // Draw vertical line
      ctx.beginPath();
      ctx.moveTo(centerX, startY);
      ctx.lineTo(centerX, endY);
      ctx.strokeStyle = 'rgba(0, 163, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw nodes
      for (let i = 0; i < nodeCount; i++) {
        const y = startY - (i / (nodeCount - 1)) * (startY - endY);
        const nodeProgress = i / (nodeCount - 1);
        const isActive = nodeProgress <= progress;
        
        ctx.beginPath();
        ctx.arc(centerX, y, isActive ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isActive 
          ? 'rgba(0, 163, 255, 0.6)' 
          : 'rgba(0, 163, 255, 0.2)';
        ctx.fill();
        
        if (isActive) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(0, 163, 255, 0.4)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      
      progress += 0.005;
      if (progress > 1) progress = 0;
      
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Recovery & Regeneration Field
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
      const maxRadius = Math.min(canvas.width, canvas.height) / 2;
      
      // Draw concentric rings
      for (let i = 3; i >= 0; i--) {
        const radius = (maxRadius * 0.3) + (i * maxRadius * 0.2) + 
                      Math.sin(time + i) * 5;
        const opacity = (0.1 - i * 0.02) * (0.7 + 0.3 * Math.sin(time * 0.5));
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 163, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      time += 0.01;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
      {/* Subtle blue background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080D] via-black to-[#06080D] opacity-50" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(11, 28, 63, 0.1) 0%, transparent 70%)'
      }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-light mb-16 tracking-tight text-center" style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          Explaining the Invisible
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. Heart Rhythm Coherence */}
          <div className="bg-black/40 backdrop-blur-sm border border-[rgba(0,163,255,0.1)] rounded-lg p-8 hover:border-[rgba(0,163,255,0.3)] transition-all duration-800">
            <div className="h-32 mb-6 relative">
              <canvas
                ref={heartCanvasRef}
                className="w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <p className="text-sm leading-relaxed" style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300
            }}>
              We analyze your underlying rhythm — the signal of long-term resilience.
            </p>
          </div>

          {/* 2. Circadian Alignment Wave */}
          <div className="bg-black/40 backdrop-blur-sm border border-[rgba(0,163,255,0.1)] rounded-lg p-8 hover:border-[rgba(0,163,255,0.3)] transition-all duration-800">
            <div className="h-32 mb-6 relative">
              <canvas
                ref={circadianCanvasRef}
                className="w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <p className="text-sm leading-relaxed" style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300
            }}>
              A stable circadian rhythm is a foundation for cellular longevity.
            </p>
          </div>

          {/* 3. Stress Load Visualization */}
          <div className="bg-black/40 backdrop-blur-sm border border-[rgba(0,163,255,0.1)] rounded-lg p-8 hover:border-[rgba(0,163,255,0.3)] transition-all duration-800">
            <div className="h-32 mb-6 relative">
              <canvas
                ref={stressCanvasRef}
                className="w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <p className="text-sm leading-relaxed" style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300
            }}>
              Your nervous system tells a story — we translate it into clarity.
            </p>
          </div>

          {/* 4. Biological Age Trajectory */}
          <div className="bg-black/40 backdrop-blur-sm border border-[rgba(0,163,255,0.1)] rounded-lg p-8 hover:border-[rgba(0,163,255,0.3)] transition-all duration-800">
            <div className="h-32 mb-6 relative flex items-center justify-center">
              <canvas
                ref={ageCanvasRef}
                className="w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <p className="text-sm leading-relaxed" style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300
            }}>
              Your biological age is dynamic. We help it move in the right direction.
            </p>
          </div>

          {/* 5. Recovery & Regeneration Field */}
          <div className="bg-black/40 backdrop-blur-sm border border-[rgba(0,163,255,0.1)] rounded-lg p-8 hover:border-[rgba(0,163,255,0.3)] transition-all duration-800 md:col-span-2 lg:col-span-1">
            <div className="h-32 mb-6 relative">
              <canvas
                ref={recoveryCanvasRef}
                className="w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <p className="text-sm leading-relaxed" style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300
            }}>
              Every day your body repairs itself. We measure how effectively it happens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthVisuals;

