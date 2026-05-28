import React, { useState, useEffect } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Trainings' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(s => {
        const top = (s as HTMLElement).offsetTop - 120;
        const height = (s as HTMLElement).offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          setActive(s.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      background: scrolled ? 'rgba(5,5,8,0.95)' : 'rgba(5,5,8,0.7)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      transition: 'all 0.4s ease',
      padding: scrolled ? '14px 0' : '20px 0',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#hero" style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800, fontSize: '1.6rem',
          background: 'linear-gradient(135deg, #00F5FF, #0066FF, #8B5CF6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>RG</a>

        <ul style={{ display: 'flex', listStyle: 'none', gap: '0.3rem' }} className="nav-desktop">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                padding: '8px 16px', borderRadius: '25px', fontWeight: 500,
                fontSize: '0.9rem', transition: 'all 0.3s ease',
                color: active === l.href.slice(1) ? '#00F5FF' : '#E6F1FF',
                background: active === l.href.slice(1) ? 'rgba(0,245,255,0.1)' : 'transparent',
              }}>{l.label}</a>
            </li>
          ))}
        </ul>

        <button onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', color: '#00F5FF', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
          className="mobile-toggle">☰</button>
      </div>

      {mobileOpen && (
        <div style={{
          background: 'rgba(5,5,8,0.98)', backdropFilter: 'blur(20px)',
          padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '12px 20px', color: '#E6F1FF', fontWeight: 500 }}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
