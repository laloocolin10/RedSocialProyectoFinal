// src/types/chat.ts
export interface ChatMessage {
  id?: string; // opcional si no tienes id por mensaje
  sender: string;
  text: string;
  timestamp?: string;
}

export interface Chat {
  id: number; // acorde a la Opción A (número)
  members: string[]; // antes "participants"
  messages: ChatMessage[];
}
