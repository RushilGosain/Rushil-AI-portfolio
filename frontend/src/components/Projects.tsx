import React from 'react';

const projects = [
  {
    title: 'NeuroTrack – AI Mental Health Platform',
    desc: 'AI-based platform to monitor and analyze mental health trends for students and professionals, providing personalized insights through sentiment analysis and text summarization.',
    tags: ['HTML/CSS/JS', 'Flask', 'OpenAI API', 'MySQL'],
    github: 'https://github.com/RushilGosain/NEUROTRACK.git',
    icon: '🧠',
    color: '#EC4899',
  },
  {
    title: 'Expert-Booking Platform',
    desc: 'Expert Booking is a full-stack MERN application that allows users to browse experts, book appointments, and manage their bookings in a simple and secure way. This project demonstrates real world full stack development with authentication, REST APIs, and clean frontend architecture.',
    tags: [ 'MongoDB', 'Express.js', 'React', 'Node.js'],
    github: 'https://github.com/RushilGosain/EXPERT-BOOKING.git',
    icon: '🌟',
    color: '#00F5FF',
  },
  {
    title: 'Blittz-Quiz',
    desc: 'Interactive quiz application with Next.js 13 App Router, TypeScript, and Tailwind CSS. Users can sign in, choose categories, and attempt quizzes with a clean, responsive UI.',
    tags: ['Next.js', 'TypeScript', 'NextAuth.js', 'API'],
    github: 'https://github.com/RushilGosain/blittz-quiz',
    icon: '⚡',
    color: '#8B5CF6',
  },
];

const Projects: React.FC = () => (
  <section id="projects" style={{ background: 'var(--black)' }}>
    <div className="container">
      <h2 className="section-title">My Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {projects.map((p, i) => (
          <div key={i} className="glass-card project-card" style={{
            padding: '2rem', display: 'flex', flexDirection: 'column',
            transition: 'all 0.4s ease', cursor: 'pointer',
            position: 'relative', overflow: 'hidden',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-16px)';
              e.currentTarget.style.border = `1px solid ${p.color}`;
              e.currentTarget.style.boxShadow = `0 25px 50px ${p.color}30`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
            {/* Top accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, #8B5CF6)` }} />

            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{p.icon}</div>
            <h3 style={{ color: p.color, fontSize: '1.1rem', marginBottom: '0.8rem', lineHeight: 1.3 }}>{p.title}</h3>
            <p style={{ color: 'var(--silver)', fontSize: '0.88rem', lineHeight: 1.7, flex: 1, marginBottom: '1.2rem' }}>{p.desc}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
              {p.tags.map(t => <span key={t} className="tech-tag" style={{ borderColor: `${p.color}40`, color: p.color, background: `${p.color}15` }}>{t}</span>)}
            </div>

            <a href={p.github} target="_blank" rel="noreferrer"
              className="btn" style={{ background: `linear-gradient(135deg, ${p.color}40, #8B5CF640)`, color: p.color, border: `1px solid ${p.color}60`, borderRadius: 12, justifyContent: 'center' }}>
              <span>⌥</span> View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 1024px) { #projects .container > div:last-child { grid-template-columns: repeat(2,1fr) !important; } }
      @media (max-width: 768px) { #projects .container > div:last-child { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

export default Projects;
