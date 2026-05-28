import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import axios from 'axios';

const SUGGESTED = [
  'Tell me about your projects',
  'What skills do you have?',
  'What are your qualifications?',
  'How can I contact you?',
];

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm Rushil's AI assistant 👋 Ask me anything about his resume, skills, projects, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
     const res = await axios.post('/chat',{
        message: msg,
        session_id: sessionId,
      });
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.data.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again!",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Toggle Button */}
      <button onClick={() => setOpen(!open)} style={{
        position: 'fixed', bottom: 28, right: 28, width: 60, height: 60,
        borderRadius: '50%', border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg, #00F5FF, #0066FF)',
        color: 'white', fontSize: '1.5rem', zIndex: 1000,
        boxShadow: '0 8px 30px rgba(0,245,255,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease',
        transform: open ? 'rotate(45deg)' : 'rotate(0)',
      }}>
        {open ? '✕' : '💬'}
      </button>

      {/* Pulse ring when closed */}
      {!open && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, width: 60, height: 60,
          borderRadius: '50%', border: '2px solid rgba(0,245,255,0.4)',
          zIndex: 999, pointerEvents: 'none',
          animation: 'glow-pulse 2s infinite',
        }} />
      )}

      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 100, right: 28, width: 380, height: 520,
          borderRadius: 20, zIndex: 1000, display: 'flex', flexDirection: 'column',
          background: 'rgba(5,5,8,0.95)', backdropFilter: 'blur(30px)',
          border: '1px solid rgba(0,245,255,0.3)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,245,255,0.1)',
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s ease',
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem 1.2rem',
            background: 'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(0,102,255,0.1))',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, #00F5FF, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
            }}>🤖</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#E6F1FF' }}>Rushil's AI Assistant</p>
              <p style={{ fontSize: '0.75rem', color: '#00F5FF' }}>● Online</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {messages.map(m => (
              <div key={m.id} style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '80%', padding: '0.7rem 1rem', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg, #00F5FF, #0066FF)'
                    : 'rgba(255,255,255,0.07)',
                  color: m.role === 'user' ? '#000' : '#E6F1FF',
                  fontSize: '0.88rem', lineHeight: 1.5,
                  border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 6, padding: '0.5rem 0.8rem' }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#00F5FF',
                    animation: `bounce 0.8s ${d}s infinite alternate`,
                  }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div style={{ padding: '0 1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
              {SUGGESTED.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  background: 'rgba(0,245,255,0.08)', color: '#00F5FF',
                  border: '1px solid rgba(0,245,255,0.2)', borderRadius: 20,
                  padding: '4px 12px', fontSize: '0.75rem', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '0.8rem 1rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', gap: '0.6rem', alignItems: 'center',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Rushil..."
              disabled={loading}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12, padding: '0.6rem 1rem', color: '#E6F1FF', fontSize: '0.88rem',
                outline: 'none', fontFamily: 'Space Grotesk, sans-serif',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#00F5FF'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
            />
            <button onClick={() => send()} disabled={loading || !input.trim()}
              style={{
                width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: input.trim() ? 'linear-gradient(135deg, #00F5FF, #0066FF)' : 'rgba(255,255,255,0.1)',
                color: input.trim() ? '#000' : 'var(--silver)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', transition: 'all 0.3s ease', flexShrink: 0,
              }}>➤</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          from { transform: translateY(0); opacity: 0.4; }
          to { transform: translateY(-6px); opacity: 1; }
        }
        @media (max-width: 480px) {
          div[style*="width: 380px"] { width: calc(100vw - 20px) !important; right: 10px !important; }
        }
      `}</style>
    </>
  );
};

export default ChatWidget;
