import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";

interface CreatePostFormProps {
  onAddPost: (body: string) => void;
}

export default function CreatePostForm({ onAddPost }: CreatePostFormProps) {
  const [body, setBody] = useState("");
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    onAddPost(body);
    setBody("");
  };

  if (!user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex space-x-4 border-b border-gray-700"
    >
      <img
        src={user.profilePicUrl}
        alt="Tu perfil"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full bg-transparent text-xl text-white placeholder-gray-500 focus:outline-none"
          rows={3}
          placeholder="¿Qué estás pensando?"
        />
        <div className="text-right mt-2">
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-hover transition duration-300 disabled:opacity-50"
            disabled={!body.trim()}
          >
            Publicar
          </button>
        </div>
      </div>
    </form>
  );
}
