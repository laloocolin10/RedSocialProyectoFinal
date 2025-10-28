// src/chat/MessageInput.tsx
import React, { useState } from "react";

interface Props {
  chatId: number;
}

export default function MessageInput({ chatId }: Props) {
  const [text, setText] = useState("");
  const handleSend = () => {
    if (!text.trim()) return;
    // aquí guardarías en localStorage o mandar a backend
    setText("");
  };

  return (
    <div className="p-3 border-t border-gray-700">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-700"
        />
        <button onClick={handleSend} className="px-4 bg-orange-500 rounded">
          Enviar
        </button>
      </div>
    </div>
  );
}
