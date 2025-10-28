// ¡Añadimos useCallback!
import React, { useState, useEffect, useCallback } from "react";
import Post from "../components/Post.tsx";
import CreatePostForm from "../components/CreatePostForm.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import postsData from "../data/post.json"; // Usando tu archivo 'post.json'

interface PostData {
  id: string;
  authorId: string;
  authorUsername: string;
  authorName: string;
  authorPic: string;
  text: string;
  timestamp: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const { user } = useAuth();

  // Este useEffect está correcto con '[]'
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts_db");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      localStorage.setItem("posts_db", JSON.stringify(postsData));
      setPosts(postsData);
    }
  }, []); // <-- ¡Asegúrate de que este array esté VACÍO!

  // --- ¡CORRECCIÓN! ---
  // Envolvemos 'updatePosts' en useCallback.
  // Se re-creará solo si 'posts' (el estado) cambia.
  const updatePosts = useCallback((newPosts: PostData[]) => {
    const sortedPosts = newPosts.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setPosts(sortedPosts);
    localStorage.setItem("posts_db", JSON.stringify(sortedPosts));
  }, []); // Depende del 'setPosts' que es estable, pero lo dejamos vacío.

  // Envolvemos 'handleAddPost' en useCallback
  const handleAddPost = useCallback(
    (text: string) => {
      if (!user) return;

      const newPost: PostData = {
        id: crypto.randomUUID(),
        authorId: user.id,
        authorName: user.name,
        authorUsername: user.username,
        authorPic: user.profilePicUrl,
        text: text,
        timestamp: new Date().toISOString(),
      };

      // Pasamos el array actual a updatePosts para evitar la dependencia de 'posts'
      setPosts((currentPosts) => {
        const newPosts = [newPost, ...currentPosts];
        const sortedPosts = newPosts.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        localStorage.setItem("posts_db", JSON.stringify(sortedPosts));
        return sortedPosts;
      });
    },
    [user]
  ); // Depende de 'user'

  // Envolvemos 'handleDeletePost' en useCallback
  const handleDeletePost = useCallback((id: string) => {
    setPosts((currentPosts) => {
      const newPosts = currentPosts.filter((post) => post.id !== id);
      localStorage.setItem("posts_db", JSON.stringify(newPosts));
      return newPosts;
    });
  }, []);

  // Envolvemos 'handleUpdatePost' en useCallback
  const handleUpdatePost = useCallback((id: string, newText: string) => {
    setPosts((currentPosts) => {
      const newPosts = currentPosts.map((post) =>
        post.id === id ? { ...post, text: newText } : post
      );
      localStorage.setItem("posts_db", JSON.stringify(newPosts));
      return newPosts;
    });
  }, []);

  if (!user) {
    return (
      <div className="sticky top-0 z-10 ...">
        <h1 className="text-xl font-bold text-white">Cargando...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-10 backdrop-blur-md bg-gray-900 bg-opacity-80 border-b border-gray-700 px-4 py-3">
        <h1 className="text-xl font-bold text-white">Inicio</h1>
      </div>

      <CreatePostForm onAddPost={handleAddPost} />

      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            postData={post}
            currentUserId={user.id}
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
          />
        ))}
      </div>
    </div>
  );
}
