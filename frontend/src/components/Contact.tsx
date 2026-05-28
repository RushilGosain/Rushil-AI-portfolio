import React from 'react';

const contacts = [
  { icon: '✉️', label: 'Email', value: 'rushilgosain10@gmail.com', href: 'mailto:rushilgosain10@gmail.com' },
  { icon: '📱', label: 'Phone', value: '+91 8860816875', href: 'tel:+918860816875' },
  { icon: '◈', label: 'LinkedIn', value: 'Connect with me', href: 'https://www.linkedin.com/in/rushil-gosain-434b57285/' },
  { icon: '⌥', label: 'GitHub', value: 'View my code', href: 'https://github.com/RushilGosain' },
];

const Contact: React.FC = () => (
  <section id="contact" style={{ background: 'var(--black)' }}>
    <div className="container">
      <h2 className="section-title">Let's Connect</h2>
      <p style={{ textAlign: 'center', color: 'var(--silver)', fontSize: '1.1rem', marginBottom: '3rem' }}>
        Ready to create the next big thing? Connect with me!
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
        {contacts.map((c, i) => (
          <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
            className="glass-card" style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem',
              transition: 'all 0.4s ease', textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.border = '1px solid #00F5FF'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,245,255,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ fontSize: '1.5rem', minWidth: 40, textAlign: 'center' }}>{c.icon}</div>
            <div>
              <p style={{ color: 'var(--silver)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>{c.label}</p>
              <p style={{ color: 'var(--light)', fontWeight: 600, fontSize: '0.9rem' }}>{c.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;
