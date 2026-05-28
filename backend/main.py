from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import httpx
import os
from datetime import datetime
from dotenv import load_dotenv
from database import Database

# Load environment variables
load_dotenv()

app = FastAPI(title="Rushil Portfolio AI Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database
db = Database()

# -------------------- AI CONTEXT --------------------

RUSHIL_CONTEXT = """
You are an AI assistant representing Rushil Gosain's portfolio.

Answer questions about Rushil professionally, naturally, and concisely.

=== PERSONAL INFO ===
Name: Rushil Gosain
Email: rushilgosain10@gmail.com
Phone: (+91) 8860816875
LinkedIn: https://www.linkedin.com/in/rushil-gosain-434b57285/
GitHub: https://github.com/RushilGosain

=== EDUCATION ===
- B.Tech Computer Science (2022–2026)
- Dr. Akhilesh Das Gupta Institute Of Professional Studies (GGSIPU)

=== SKILLS ===
- C++
- Python
- React
- TypeScript
- JavaScript
- HTML5
- CSS3
- FastAPI
- Flask
- DSA
- AI Tools
- OpenAI APIs

=== EXPERIENCE ===

1. Full Stack Web Development Intern
Global Next Consulting India Pvt. Ltd.
(Aug 2025 – Sep 2025)

2. Software Engineering Virtual Experience
Commonwealth Bank (Forage)

=== PROJECTS ===

1. NeuroTrack
AI-powered mental health tracking platform

2. Expert Booking Platform
Full-stack booking system with authentication

3. Portfolio Website
Interactive portfolio with animations

4. Blittz Quiz
Quiz application built with Next.js

=== PERSONALITY ===
- Passionate about coding
- Loves web development
- Football enthusiast
- Focused on clean code and problem solving

=== RULES ===
- Keep responses concise
- Be friendly and professional
- Answer like a portfolio assistant
- If information is unavailable, politely say so
"""

# -------------------- MODELS --------------------

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    timestamp: str

# -------------------- GROQ API FUNCTION --------------------

async def call_ai(messages: list) -> str:

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        return "⚠️ GROQ_API_KEY missing in .env file"

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:

            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "llama-3.1-8b-instant",
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 400,
                }
            )

            if response.status_code != 200:
                print("GROQ ERROR:")
                print(response.text)
                return f"Groq Error: {response.text}"

            data = response.json()

            return data["choices"][0]["message"]["content"]

    except Exception as e:
        print("SERVER ERROR:", str(e))
        return f"Server Error: {str(e)}"

# -------------------- ROUTES --------------------

@app.get("/")
def root():
    return {
        "message": "Rushil Portfolio Backend Running ✅"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):

    # Build conversation
    messages = [
        {
            "role": "system",
            "content": RUSHIL_CONTEXT
        }
    ]

    # Add previous history
    for msg in (req.history or [])[-6:]:
        messages.append({
            "role": msg.role,
            "content": msg.content
        })

    # Current user message
    messages.append({
        "role": "user",
        "content": req.message
    })

    # Get AI response
    ai_response = await call_ai(messages)

    # Save chat in DB
    timestamp = datetime.utcnow().isoformat()

    try:
        db.save_message(
            req.message,
            ai_response,
            timestamp
        )
    except Exception as e:
        print("DATABASE ERROR:", str(e))

    return ChatResponse(
        response=ai_response,
        timestamp=timestamp
    )

@app.get("/chat/history")
def get_history(limit: int = 50):

    try:
        return {
            "history": db.get_recent(limit)
        }

    except Exception as e:
        return {
            "error": str(e)
        }

# -------------------- RUN SERVER --------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )