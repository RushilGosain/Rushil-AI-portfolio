import React, { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 600);
  }, []);

  return (
    <>
      {/* Loading */}
      {!loaded && (
        <div style={{
          position: 'fixed', inset: 0, background: '#050508',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999, flexDirection: 'column', gap: '1rem',
        }}>
          <div style={{ width: 50, height: 50, border: '3px solid rgba(0,245,255,0.2)', borderTopColor: '#00F5FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ color: '#00F5FF', fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: 3 }}>RG.</p>
        </div>
      )}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        {/* Scroll Progress */}
        <div className="scroll-progress" style={{ width: `${progress}%` }} />

        <Cursor />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  );
};

export default App;
