import React, { useState } from "react";

// 1. La "forma" del post (sigue igual)
export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 2. Actualizamos las props que esperamos
interface PostProps {
  post: PostData;
  onDeletePost: (id: number) => void;
  onUpdatePost: (id: number, newBody: string) => void; // ¡Añadimos la nueva prop!
}

export default function Post({ post, onDeletePost, onUpdatePost }: PostProps) {
  // 3. ¡NUEVO ESTADO! Para saber si estamos en "modo edición"
  const [isEditing, setIsEditing] = useState(false);
  // 4. ¡NUEVO ESTADO! Para guardar el texto del textarea mientras editamos
  const [editedBody, setEditedBody] = useState(post.body);

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
      onDeletePost(post.id);
    }
  };

  // 5. Función para el botón "Guardar"
  const handleSave = () => {
    // Validación simple
    if (!editedBody.trim()) {
      return;
    }
    // Llama a la función del padre (HomePage)
    onUpdatePost(post.id, editedBody);
    // Salimos del modo edición
    setIsEditing(false);
  };

  // 6. Función para el botón "Cancelar"
  const handleCancel = () => {
    // Salimos del modo edición
    setIsEditing(false);
    // Reseteamos el texto al original del post
    setEditedBody(post.body);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold text-orange-400 mb-2 capitalize">
        {post.title}
      </h2>

      {/* --- RENDERIZADO CONDICIONAL --- */}
      {isEditing ? (
        // 7. Si estamos en modo edición, mostramos un textarea
        <div>
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={4}
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white font-semibold py-1 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white font-semibold py-1 px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              Guardar
            </button>
          </div>
        </div>
      ) : (
        // 8. Si NO estamos en modo edición, mostramos el texto normal
        <div>
          <p className="text-gray-300 mb-4">{post.body}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(true)} // 9. El botón "Editar" activa el modo edición
              className="bg-blue-600 text-white font-semibold py-1 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white font-semibold py-1 px-4 rounded-md hover:bg-red-700 transition duration-300"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
      {/* --- FIN RENDERIZADO CONDICIONAL --- */}
    </div>
  );
}
