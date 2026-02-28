export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface ChatRequest {
  query: string;
  bot_id: string;
  index_name: string;
}

export interface ChatResponse {
  succeeded: boolean;
  response: string;
  bot_id: string;
}
