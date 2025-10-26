import React, { useState } from "react";

// --- ¡ESTAS LÍNEAS FALTABAN! ---
import Post from "../components/Post.tsx";
import CreatePostForm from "../components/CreatePostForm.tsx";
import mockPosts from "../data/post.json"; // 1. Importa los datos
import { useAuth } from "../contexts/AuthContext.tsx"; // 2. Importa el hook de Auth

export default function HomePage() {
  // --- ¡ESTA LÍNEA FALTABA! ---
  // 3. Define 'posts' y 'setPosts' usando el JSON importado
  const [posts, setPosts] = useState(mockPosts);

  // 4. Obtiene el usuario actual para saber quién publica
  const { user } = useAuth();

  // --- ¡ESTA FUNCIÓN ESTABA VACÍA! ---
  // 5. Define la lógica para crear un nuevo post
  const handleNewPost = (newPostText: string) => {
    if (!user) {
      alert("Necesitas iniciar sesión para publicar.");
      return;
    }

    // 6. Crea el objeto del nuevo post
    const newPost = {
      id: "p" + Date.now(),
      authorUsername: user.username,
      authorName: user.name,
      authorPic: user.profilePicUrl,
      text: newPostText,
      timestamp: new Date().toISOString(),
    };

    // 7. Actualiza el estado, poniendo el nuevo post al inicio
    setPosts([newPost, ...posts]);
  };

  // --- TU CÓDIGO (ESTO YA LO TENÍAS) ---
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">Inicio</h1>

      {/* 3. Añadan el formulario para crear posts */}
      <CreatePostForm onSubmit={handleNewPost} />

      {/* 4. Muestren la lista de posts */}
      <div className="space-y-4 mt-8">
        {/* 'posts.map' ya no dará error porque 'posts' existe */}
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </div>
    </div>
  );
}
