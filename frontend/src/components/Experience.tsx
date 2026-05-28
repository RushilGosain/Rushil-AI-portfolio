import React from 'react';

const experiences = [
  {
    role: 'Software Engineering Virtual Experience Trainee',
    company: 'Commonwealth Bank – Forage',
    period: 'May 2025',
    points: [
      'Built a responsive web page using HTML & CSS following branding guidelines.',
      'Applied cybersecurity principles to recommend stronger client security measures.',
      'Drafted a proposal on secure web hosting practices for scalable, protected expansion.',
    ],
  },
  {
    role: 'Full Stack Web Development Intern',
    company: 'Global Next Consulting India Pvt. Ltd.',
    period: 'Aug 2025 – Sep 2025',
    points: [
      'Developed and styled responsive web applications using frontend and backend technologies.',
      'Gained exposure to client interaction and maintained high standards of professionalism.',
      'Drafted and submitted a final project, demonstrating technical and collaborative skills.',
    ],
  },
];

const Experience: React.FC = () => (
  <section id="experience" style={{ background: 'linear-gradient(135deg, #0F1419, #050508)' }}>
    <div className="container">
      <h2 className="section-title">Trainings</h2>
      <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          width: 3, height: '100%',
          background: 'linear-gradient(#00F5FF, #8B5CF6)',
          borderRadius: 2,
        }} />

        {experiences.map((exp, i) => (
          <div key={i} style={{
            position: 'relative',
            width: '45%',
            marginBottom: '3rem',
            marginLeft: i % 2 === 0 ? 0 : '55%',
          }}>
            {/* Dot */}
            <div style={{
              position: 'absolute',
              width: 16, height: 16,
              background: 'linear-gradient(#00F5FF, #8B5CF6)',
              borderRadius: '50%',
              top: '50%', transform: 'translateY(-50%)',
              ...(i % 2 === 0 ? { right: -42 } : { left: -42 }),
              border: '3px solid #050508',
            }} />

            <div className="glass-card" style={{ padding: '1.8rem', position: 'relative', overflow: 'hidden',
              transition: 'all 0.4s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,245,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #00F5FF, #8B5CF6)' }} />
              <h3 style={{ color: '#00F5FF', fontSize: '1rem', marginBottom: '0.4rem' }}>{exp.role}</h3>
              <p style={{ color: '#8B5CF6', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{exp.company}</p>
              <p style={{ color: 'var(--silver)', fontSize: '0.8rem', marginBottom: '1rem' }}>{exp.period}</p>
              <ul style={{ paddingLeft: '1rem' }}>
                {exp.points.map((p, j) => (
                  <li key={j} style={{ color: 'var(--light)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.3rem' }}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 768px) {
        #experience .container > div > div { width: calc(100% - 40px) !important; margin-left: 40px !important; }
        #experience .container > div > div:nth-child(odd) > div:last-child { left: -30px !important; right: auto !important; }
      }
    `}</style>
  </section>
);

export default Experience;
