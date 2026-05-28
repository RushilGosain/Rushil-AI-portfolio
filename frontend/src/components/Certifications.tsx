import React from 'react';

const certs = [
  { icon: '💻', title: 'Front End Development', org: 'Great Learning', period: 'July 2024 – Sept 2025', desc: 'Completed frontend certification focused on responsive design, DOM manipulation, and dynamic behavior.' },
  { icon: '🤖', title: 'AI & Machine Learning Training', org: 'Acmegrade', period: 'July 2024 – Aug 2024', desc: 'Gained foundational knowledge in AI & ML, including supervised/unsupervised learning and practical use cases.' },
];

const Certifications: React.FC = () => (
  <section id="certifications" style={{ background: 'linear-gradient(135deg, #050508, #0F1419)' }}>
    <div className="container">
      <h2 className="section-title">Training & Certifications</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: 800, margin: '0 auto' }}>
        {certs.map((c, i) => (
          <div key={i} className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-12px)'; e.currentTarget.style.border = '1px solid #00F5FF'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,245,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #00F5FF, #8B5CF6)' }} />
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{c.icon}</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{c.title}</h3>
            <p style={{ color: '#00F5FF', fontWeight: 600, marginBottom: '0.3rem' }}>{c.org}</p>
            <p style={{ color: 'var(--silver)', fontSize: '0.85rem', marginBottom: '1rem' }}>{c.period}</p>
            <p style={{ color: 'var(--silver)', fontSize: '0.9rem', lineHeight: 1.6 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
