import React, { useState, useEffect } from "react";
import Post, { PostData } from "../components/Post.tsx";
import CreatePostForm from "../components/CreatePostForm.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function HomePage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Cargar posts iniciales
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Función para añadir un post
  const handleAddPost = (body: string) => {
    const newPost: PostData = {
      id: Date.now(),
      userId: user ? parseInt(user.id.replace("u", "")) : 0,
      title: "Mi Nueva Publicación",
      body: body,
    };
    setPosts([newPost, ...posts]);
  };

  // Función para eliminar un post
  const handleDeletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  // --- ¡NUEVA FUNCIÓN! ---
  // Función para actualizar un post
  const handleUpdatePost = (id: number, newBody: string) => {
    // 1. Mapeamos el array de posts
    const updatedPosts = posts.map((post) => {
      // 2. Si el ID no coincide, devolvemos el post original
      if (post.id !== id) {
        return post;
      }
      // 3. Si el ID coincide, devolvemos un NUEVO objeto post
      // con el 'body' actualizado.
      return {
        ...post, // Copia todas las propiedades (id, title, etc.)
        body: newBody, // Sobrescribe solo el 'body'
      };
    });
    // 4. Actualizamos el estado con el nuevo array
    setPosts(updatedPosts);
    // NOTA: En un proyecto real, aquí harías una llamada "PUT" o "PATCH" a tu API.
  };

  if (loading) {
    return (
      <h1 className="text-3xl font-bold text-white text-center">
        Cargando publicaciones...
      </h1>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        Feed de Publicaciones
      </h1>

      <CreatePostForm onAddPost={handleAddPost} />

      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDeletePost={handleDeletePost}
            // 5. ¡Pasamos la nueva prop de actualizar!
            onUpdatePost={handleUpdatePost}
          />
        ))}
      </div>
    </div>
  );
}
