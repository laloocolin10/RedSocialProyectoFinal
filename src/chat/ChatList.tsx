// src/chat/ChatList.tsx
import React from "react";
import type { Chat } from "../types/chat";

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (id: string) => void;
}

export default function ChatList({ chats, onSelectChat }: ChatListProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-2">Tus Chats</h2>

      {chats.length === 0 ? (
        <p className="text-gray-400 text-sm">No tienes chats aún.</p>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition"
          >
            <div className="font-semibold text-orange-400">
              {chat.members.join(", ")}
            </div>
            <div className="text-gray-300 text-sm">
              {chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].text
                : "Sin mensajes"}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
