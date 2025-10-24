import React, { useState } from "react";

// 1. Definimos las props: solo esperamos una función
interface CreatePostFormProps {
  // Esta función recibirá el texto del post y no devolverá nada
  onAddPost: (body: string) => void;
}

export default function CreatePostForm({ onAddPost }: CreatePostFormProps) {
  // 2. Estado local para guardar lo que el usuario escribe en el textarea
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evitamos que la página se recargue

    // 3. Validación simple: no enviar posts vacíos
    if (!body.trim()) {
      return;
    }

    // 4. Llamamos a la función que nos pasaron por props
    onAddPost(body);

    // 5. Limpiamos el textarea después de enviar
    setBody("");
  };

  return (
    // 6. Formulario estilizado con Tailwind
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
    >
      <h2 className="text-2xl font-bold text-white mb-4">
        Crear nueva publicación
      </h2>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        rows={4}
        placeholder="¿Qué estás pensando?"
      />
      <div className="text-right mt-4">
        <button
          type="submit"
          className="bg-orange-500 text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
