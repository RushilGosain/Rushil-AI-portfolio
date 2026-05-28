import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const [typing, setTyping] = useState('');
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const fullText = "I'm Rushil — a B.Tech CS student who turns ideas into interactive digital experiences. I live at the intersection of clean code and creative design, with a strong grip on Full Stack Development, DSA, and AI-powered tools.";

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setTyping(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <section id="about" ref={sectionRef} style={{ background: 'linear-gradient(135deg, #050508, #0F1419)' }}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Left - typing + description */}
          <div>
            <div style={{
              fontSize: '1.05rem', fontWeight: 600, color: 'var(--light)',
              minHeight: 80, marginBottom: '2rem', lineHeight: 1.7,
              background: 'linear-gradient(135deg, #E6F1FF, #00F5FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {typing}
              <span style={{ display: 'inline-block', width: 2, height: '1rem', background: '#00F5FF', marginLeft: 3, verticalAlign: 'middle', animation: typing.length < fullText.length ? 'blink 1s infinite' : 'none' }} />
            </div>
            <p style={{ color: 'var(--silver)', lineHeight: 1.8, fontSize: '1rem' }}>
               Whether it's building a expert-booking platform or a quiz app, I bring both technical precision and creative energy to every project. 
            </p>
            <p style={{ color: 'var(--silver)', lineHeight: 1.8, fontSize: '1rem', marginTop: '1rem' }}>
              Off the screen, football sharpens the same qualities I bring to coding —<span style={{ color: '#00F5FF' }}>discipline</span>, <span style={{ color: '#00F5FF' }}>strategy</span>, and <span style={{ color: '#00F5FF' }}>the drive to keep pushing.</span>
            </p>
          </div>

          {/* Right - Education */}
          <div className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #00F5FF, #8B5CF6)' }} />
            <h3 style={{ color: 'var(--teal)', marginBottom: '1.5rem', fontSize: '1.3rem' }}>🎓 Education</h3>

            {[
              { degree: 'B.Tech, Computer Science', school: 'Dr. Akhilesh Das Gupta Institute (GGSIPU)', year: '2022–2026' },
              { degree: 'CBSE Class 12 (Science)', school: 'Army Public School', year: '2022' },
              { degree: 'CBSE Class 10', school: 'Army Public School' , year: '2020' },
            ].map((e, i) => (
              <div key={i} style={{ marginBottom: '1.2rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(0,245,255,0.3)' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>{e.degree}</h4>
                {e.school && <p style={{ color: 'var(--silver)', fontSize: '0.85rem' }}>{e.school}</p>}
                <p style={{ color: 'var(--purple)', fontSize: '0.8rem', fontWeight: 600 }}>{e.year}</p>
              </div>
            ))}

            <a href="/rushil-resume.pdf" target="_blank"
   className="btn"
   style={{
     marginTop: '1rem',
     width: '100%',
     justifyContent: 'center',
     background: 'linear-gradient(135deg, #0066FF, #8B5CF6)',
     color: 'white',
     borderRadius: 15
   }}>
   📄 View My CV
</a>
      </div>
      </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
