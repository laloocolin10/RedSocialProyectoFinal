// src/chat/ChatList.tsx
import React from "react";
import type { Chat } from "../types/chat";

interface Props {
  chats: Chat[];
  onSelectChat: (id: number) => void;
}

export default function ChatList({ chats, onSelectChat }: Props) {
  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className="p-3 hover:bg-gray-700 cursor-pointer"
        >
          <div className="font-semibold">{chat.members.join(", ")}</div>
          <div className="text-sm text-gray-400">
            {chat.messages[chat.messages.length - 1]?.text ?? "Sin mensajes"}
          </div>
        </div>
      ))}
    </div>
  );
}
