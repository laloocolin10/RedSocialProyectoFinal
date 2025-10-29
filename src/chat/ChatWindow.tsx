import React from "react";
import type { Chat } from "../types/chat";

interface Props {
  chat: Chat;
}

export default function ChatWindow({ chat }: Props) {
  return (
    <div className="flex-1 p-4 overflow-auto bg-gray-900">
      <h2 className="text-lg font-bold mb-4 text-orange-400">
        {chat.members.join(", ")}
      </h2>
      <div className="space-y-3">
        {chat.messages.length > 0 ? (
          chat.messages.map((m, i) => (
            <div key={m.id ?? i} className="p-2 bg-gray-700 rounded-md">
              <div className="text-sm text-orange-400 font-semibold">
                {m.sender}
              </div>
              <div className="text-white">{m.text}</div>
              <div className="text-xs text-gray-400">{m.timestamp}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center mt-10">
            No hay mensajes todavía. ¡Envía el primero!
          </div>
        )}
      </div>
    </div>
  );
}
