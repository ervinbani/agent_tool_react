import { api } from './api';
import type { ChatRequest, ChatResponse } from '../types/chat';

export const chatService = {
  async sendMessage(query: string, botId: string, indexName: string): Promise<ChatResponse> {
    const request: ChatRequest = {
      query,
      bot_id: botId,
      index_name: indexName,
    };

    const response = await api.post<ChatResponse>('/chatbot-agent', request);
    return response.data;
  },
};
