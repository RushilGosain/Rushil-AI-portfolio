import React, { useEffect, useRef, useState } from 'react';

const roles = ['Creative Developer 💻', 'Tech Explorer 🚀', 'Game Builder 🎮', 'Problem Solver 🧠'];

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typing animation
  useEffect(() => {
    const current = roles[roleIdx];
    const speed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setText(current.substring(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIdx]);

  // Particle constellation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number }[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${(1 - dist / 120) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Glow orbs */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,255,0.08), transparent)', top: '10%', left: '10%', zIndex: 0 }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent)', bottom: '20%', right: '10%', zIndex: 0 }} />

      <div style={{ textAlign: 'center', zIndex: 1, maxWidth: 700, padding: '0 24px' }}>
        <p style={{ color: 'var(--teal)', fontSize: '1rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem', opacity: 0.8 }}>
          Welcome to my portfolio
        </p>

        <h1 style={{
          fontSize: 'clamp(2.8rem, 8vw, 5rem)',
          marginBottom: '1.5rem',
          lineHeight: 1.1,
          background: 'linear-gradient(135deg, #E6F1FF, #00F5FF, #0066FF)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px rgba(0,245,255,0.2))',
        }}>Rushil Gosain</h1>

        <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: 'var(--teal)', marginBottom: '2.5rem', minHeight: '2.5rem', fontWeight: 600 }}>
          {text}<span style={{ animation: 'blink 1s infinite', display: 'inline-block', width: 3, height: '1.4em', background: 'var(--teal)', marginLeft: 4, verticalAlign: 'middle' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-outline">Get In Touch</a>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/RushilGosain', icon: '⌥' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushil-gosain-434b57285/', icon: '◈' },
            { label: 'Email', href: 'mailto:rushilgosain10@gmail.com', icon: '✉' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{ color: 'var(--silver)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00F5FF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--silver)')}>
              <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--silver)', fontSize: '0.8rem' }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(var(--teal), transparent)' }} />
      </div>
    </section>
  );
};

export default Hero;
