import React from "react";

// 1. Definimos la "forma" de los datos que esperamos
export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 2. Definimos las props que recibirá nuestro componente
interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  return (
    // 3. Esta es la tarjeta de la publicación con estilos de Tailwind
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
      {/* Título (con la primera letra en mayúscula) */}
      <h2 className="text-2xl font-bold text-orange-400 mb-2 capitalize">
        {post.title}
      </h2>

      {/* Cuerpo del post */}
      <p className="text-gray-300 mb-4">{post.body}</p>

      {/* 4. Espacio para los botones de CRUD que pondremos más adelante */}
      <div className="flex justify-end space-x-3">
        {/* Próximamente: botones de Editar y Eliminar */}
      </div>
    </div>
  );
}
