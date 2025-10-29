// src/chat/NewChatForm.tsx
// src/chat/NewChatForm.tsx
import React, { useState } from "react";
import {
  createChat,
  getAllChats,
  saveAllChats,
} from "../services/chatService.ts";
import { useAuth } from "../contexts/AuthContext.tsx";

interface NewChatFormProps {
  onChatCreated: () => void;
}

export default function NewChatForm({ onChatCreated }: NewChatFormProps) {
  const { user } = useAuth();
  const [participant, setParticipant] = useState("");

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUser = participant.trim();

    if (!targetUser)
      return alert("Ingresa el nombre de usuario del otro participante.");
    if (targetUser === user.username)
      return alert("No puedes crear un chat contigo mismo.");

    const all = getAllChats();

    // Evitar duplicados (mismo par de usuarios)
    const exists = all.some(
      (chat) =>
        chat.members.includes(user.username) &&
        chat.members.includes(targetUser)
    );

    if (exists) {
      alert("Ya existe un chat con este usuario.");
      return;
    }

    // Crear chat nuevo
    createChat([user.username, targetUser]);
    onChatCreated();
    setParticipant("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-3 bg-gray-700 rounded-md flex items-center"
    >
      <input
        type="text"
        value={participant}
        onChange={(e) => setParticipant(e.target.value)}
        placeholder="Nombre del usuario"
        className="flex-1 bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
      >
        Nuevo Chat
      </button>
    </form>
  );
}
