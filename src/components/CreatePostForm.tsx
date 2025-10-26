import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx"; // Importa useAuth

// 1. Define las 'props' que este componente recibirá
interface CreatePostFormProps {
  // Recibe una función 'onSubmit' que toma un string (el texto del post)
  onSubmit: (newPostText: string) => void;
}

export default function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  // 2. Estado local para guardar lo que el usuario está escribiendo
  const [postText, setPostText] = useState("");
  const { user } = useAuth(); // Obtiene el usuario para mostrar su foto

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    if (postText.trim() === "") return; // No enviar posts vacíos

    onSubmit(postText); // 3. Llama a la función 'handleNewPost' de HomePage
    setPostText(""); // 4. Limpia el cuadro de texto
  };

  // Si no hay usuario, no se debe poder postear
  if (!user) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-center text-gray-400">
        Inicia sesión para poder publicar.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-lg shadow-md flex space-x-4"
    >
      {/* Foto de perfil del usuario */}
      <img
        src={user.profilePicUrl}
        alt="Tu perfil"
        className="w-12 h-12 rounded-full"
      />

      {/* Input de texto */}
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="¿Qué estás pensando?"
        className="flex-1 bg-gray-700 p-3 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        rows={3}
      />

      {/* Botón de enviar */}
      <button
        type="submit"
        className="bg-orange-500 text-white font-bold px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 self-end"
      >
        Publicar
      </button>
    </form>
  );
}
