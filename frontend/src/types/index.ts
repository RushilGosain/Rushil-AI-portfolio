export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
}

export interface Skill {
  name: string;
  level: number;
  description: string;
}
