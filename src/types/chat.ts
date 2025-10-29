// src/types/chat.ts
export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp?: string;
}

export interface Chat {
  id: string; // ahora STRING en todo el proyecto
  members: string[];
  messages: Message[];
}
