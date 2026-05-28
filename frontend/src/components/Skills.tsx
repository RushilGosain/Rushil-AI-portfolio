import React from 'react';

const skills = [
  { name: 'C++', icon: '⚙️', level: 90, desc: 'Strong OOP, problem-solving, and optimized code' },
  { name: 'HTML', icon: '🌐', level: 85, desc: 'Structured, semantic, accessible web pages' },
  { name: 'CSS', icon: '🎨', level: 80, desc: 'Responsive, visually appealing UI design' },
  { name: 'JavaScript', icon: '⚡', level: 70, desc: 'Dynamic interactions and DOM manipulation' },
  { name: 'DSA', icon: '📊', level: 60, desc: 'Efficient algorithms and data structures' },
  { name: 'AI Tools', icon: '🧠', level: 75, desc: 'ChatGPT, automation, intelligent workflows' },
  { name: 'React', icon: '⚛️', level: 65, desc: 'Component-based modern web applications' },
  { name: 'Python', icon: '🐍', level: 70, desc: 'Backend development and AI integration' },
];

const Skills: React.FC = () => (
  <section id="skills" style={{ background: 'var(--black)' }}>
    <div className="container">
      <h2 className="section-title">Skills & Expertise</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {skills.map((s, i) => (
          <div key={s.name} className="glass-card skill-card" style={{
            padding: '1.8rem', textAlign: 'center',
            transition: 'all 0.4s ease',
            animationDelay: `${i * 0.1}s`,
          }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-12px) scale(1.03)';
              el.style.border = '1px solid #00F5FF';
              el.style.boxShadow = '0 20px 40px rgba(0,245,255,0.2)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0) scale(1)';
              el.style.border = '1px solid rgba(255,255,255,0.12)';
              el.style.boxShadow = 'none';
            }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{s.icon}</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--light)' }}>{s.name}</h3>
            <p style={{ color: 'var(--silver)', fontSize: '0.85rem', marginBottom: '1.2rem', lineHeight: 1.5 }}>{s.desc}</p>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                width: `${s.level}%`, height: '100%',
                background: 'linear-gradient(90deg, #00F5FF, #8B5CF6)',
                borderRadius: 3,
                boxShadow: '0 0 10px rgba(0,245,255,0.4)',
                transition: 'width 1.5s ease',
              }} />
            </div>
            <p style={{ color: 'var(--teal)', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600 }}>{s.level}%</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
