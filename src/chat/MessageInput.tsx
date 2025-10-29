import React, { useState } from "react";

interface MessageInputProps {
  chatId: string;
  onSendMessage: (chatId: string, text: string) => void;
}

export default function MessageInput({
  chatId,
  onSendMessage,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(chatId, message.trim());
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-900 border-t border-gray-700 flex"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none"
        placeholder="Escribe un mensaje..."
      />
      <button
        type="submit"
        className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
      >
        Enviar
      </button>
    </form>
  );
}
