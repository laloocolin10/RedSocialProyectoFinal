import React, { useState, useEffect } from "react";
// 1. Importamos nuestro nuevo componente Post y su "forma" (interface)
import Post, { PostData } from "../components/Post.tsx";

export default function HomePage() {
  // 2. Estado para guardar la lista de posts
  const [posts, setPosts] = useState<PostData[]>([]);
  // 3. Estado para saber si estamos cargando
  const [loading, setLoading] = useState(true);

  // 4. useEffect se ejecuta una vez, cuando el componente se monta
  useEffect(() => {
    // 5. Definimos una función asíncrona para cargar los datos
    const fetchPosts = async () => {
      try {
        // 6. Usamos la API falsa sugerida  (limitamos a 10 posts)
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        const data = await response.json();

        // 7. Guardamos los posts en el estado
        setPosts(data);
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      } finally {
        // 8. Dejamos de cargar (incluso si hubo un error)
        setLoading(false);
      }
    };

    fetchPosts(); // 9. Llamamos a la función
  }, []); // El array vacío [] asegura que solo se ejecute una vez

  // 10. Mostramos un mensaje de carga
  if (loading) {
    return (
      <h1 className="text-3xl font-bold text-white text-center">
        Cargando publicaciones...
      </h1>
    );
  }

  // 11. Una vez cargado, mostramos el feed
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        Feed de Publicaciones
      </h1>

      {/* 12. Mapeamos (recorremos) el array de posts y renderizamos un componente <Post> por cada uno */}
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
