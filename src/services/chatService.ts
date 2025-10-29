// src/services/chatService.ts
import type { Chat, Message } from "../types/chat.ts";

const CHAT_STORAGE_KEY = "chats_data";

/** Obtener todos los chats desde localStorage */
export function getAllChats(): Chat[] {
  const raw = localStorage.getItem(CHAT_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

/** Guardar todos los chats en localStorage */
export function saveAllChats(chats: Chat[]): void {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
}

/** Buscar un chat por su id (STRING) */
export function getChatById(chatId: string): Chat | undefined {
  const all = getAllChats();
  return all.find((c) => c.id === chatId);
}

/**
 * Agregar un mensaje a un chat.
 * Firma: addMessage(chatId: string, sender: string, text: string)
 */
export function addMessage(chatId: string, sender: string, text: string): void {
  const all = getAllChats();
  const idx = all.findIndex((c) => c.id === chatId);
  if (idx === -1) {
    console.warn(`[chatService] addMessage: chat ${chatId} no encontrado`);
    return;
  }

  const newMessage: Message = {
    id: "m" + Date.now(),
    sender,
    text,
    timestamp: new Date().toISOString(),
  };

  all[idx].messages.push(newMessage);
  saveAllChats(all);
}

/** Crear un chat nuevo con members (siempre genera id string) */
export function createChat(members: string[]): Chat {
  const newChat: Chat = {
    id: "c" + Date.now().toString(),
    members,
    messages: [],
  };
  const all = getAllChats();
  all.push(newChat);
  saveAllChats(all);
  return newChat;
}

/** Eliminar chat (opcional) */
export function deleteChat(chatId: string): void {
  const all = getAllChats();
  const filtered = all.filter((c) => c.id !== chatId);
  saveAllChats(filtered);
}
