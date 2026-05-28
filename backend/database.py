import sqlite3
import os
from typing import List, Dict, Any

DB_PATH = os.getenv("DB_PATH", "chat_history.db")

class Database:
    def __init__(self):
        self._init_db()

    def _get_conn(self):
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        with self._get_conn() as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS chat_messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_message TEXT NOT NULL,
                    ai_response TEXT NOT NULL,
                    timestamp TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)
            conn.commit()

    def save_message(self, user_msg: str, ai_response: str, timestamp: str):
        with self._get_conn() as conn:
            conn.execute(
                "INSERT INTO chat_messages (user_message, ai_response, timestamp) VALUES (?, ?, ?)",
                (user_msg, ai_response, timestamp)
            )
            conn.commit()

    def get_recent(self, limit: int = 50) -> List[Dict[str, Any]]:
        with self._get_conn() as conn:
            rows = conn.execute(
                "SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT ?",
                (limit,)
            ).fetchall()
            return [dict(r) for r in rows]
