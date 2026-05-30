import React from 'react';

const projects = [
  {
    title: 'Live Chat App ',
    desc: 'Developed a real-time chat platform with direct messaging, group chats, live typing indicators, and online presence tracking. Implemented secure authentication using Clerk and built scalable real-time backend features with Convex.',
    tags: ['Next.js', 'Convex', 'Clerk', 'TailwindCSS'],
    github: 'https://github.com/RushilGosain/livechat-app',
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
    title: 'DocChat – AI-Powered Document Chatbot',
    desc: 'Developed a full-stack Retrieval-Augmented Generation (RAG) application that enables users to upload documents and interact with them through natural language conversations. Implemented semantic document retrieval using vector embeddings and LangChain, delivering context-aware responses with source attribution through a responsive and modern user interface.',
    tags: ['Next.js', 'FastAPI', 'LangChain', 'Hugging Face', 'ChromaDB', 'TypeScript'],
    github: 'https://github.com/RushilGosain/DocChat-AI-Powered-Document-Chatbot',
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
