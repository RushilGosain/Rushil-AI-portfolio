import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED = [
  "Tell me about Rushil's skills",
  "What projects has he built?",
  "Is he available for internships?",
  "What's his tech stack?",
  "Tell me about NeuroTrack",
];

const API_URL = "https://rushil-ai-portfolio.onrender.com";

export default function ChatBot({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Hi! 👋 I'm Rushil's AI assistant. I can answer questions about his skills, projects, experience, and background. What would you like to know?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      console.log("Sending request to:", API_URL);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text.trim(),
          history,
        }),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const data = await res.json();

      setMessages((m) => [
        ...m,
        {
          id: Date.now().toString() + "r",
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("CHATBOT ERROR:", error);

      setMessages((m) => [
        ...m,
        {
          id: Date.now().toString() + "e",
          role: "assistant",
          content:
            "⚠️ Server is waking up or temporarily unavailable. Please try again in a few seconds.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chatbot-overlay ${isOpen ? "open" : ""}`}>
      <div className="chatbot-window glass">

        {/* Header */}
        <div className="chat-header">
          <div className="chat-avatar">RG</div>

          <div className="chat-header-info">
            <h4>Rushil's AI Assistant</h4>

            <span className="chat-status">
              <span className="status-dot" />
              Online
            </span>
          </div>

          <button className="chat-close" onClick={onClose}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              width="18"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((m) => (
            <div key={m.id} className={`message-wrap ${m.role}`}>
              {m.role === "assistant" && (
                <div className="msg-avatar">🤖</div>
              )}

              <div className="message-bubble">
                <p>{m.content}</p>

                <span className="msg-time">
                  {m.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Loading animation */}
          {loading && (
            <div className="message-wrap assistant">
              <div className="msg-avatar">🤖</div>

              <div className="message-bubble typing-bubble">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        {messages.length <= 1 && (
          <div className="chat-suggestions">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                className="suggestion-chip"
                onClick={() => send(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row">
          <input
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                send(input);
              }
            }}
            placeholder="Ask me anything about Rushil..."
            disabled={loading}
          />

          <button
            className="chat-send"
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="20"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}