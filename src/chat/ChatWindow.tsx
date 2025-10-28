// src/chat/ChatWindow.tsx
import React from "react";
import type { Chat } from "../types/chat";

interface Props {
  chat: Chat;
}

export default function ChatWindow({ chat }: Props) {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <h2 className="text-lg font-bold mb-4">{chat.members.join(", ")}</h2>
      <div className="space-y-3">
        {chat.messages.map((m, i) => (
          <div key={m.id ?? i} className="p-2 bg-gray-700 rounded">
            <div className="text-sm text-orange-400">{m.sender}</div>
            <div>{m.text}</div>
            <div className="text-xs text-gray-400">{m.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
