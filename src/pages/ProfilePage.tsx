import React from "react";
import { useAuth } from "../contexts/AuthContext.tsx"; // 1. Importa tu hook
import { useNavigate } from "react-router-dom"; // 2. Para redirigir al salir

export default function ProfilePage() {
  // 3. Obtén el usuario y la función 'logout' del contexto
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama a la función del contexto
    navigate("/login"); // Redirige al login
  };

  // 4. 'ProtectedRoute' ya evita esto, pero es buena práctica
  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  // 5. Muestra los datos del usuario
  return (
    <div className="max-w-2xl mx-auto">
      {/* --- Banner --- */}
      <img
        src={user.coverPicUrl}
        alt="Foto de portada"
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* --- Contenedor de Info --- */}
      <div className="bg-gray-800 p-6 rounded-b-lg shadow-lg">
        {/* --- Foto y Botón de Salir --- */}
        <div className="flex justify-between items-start -mt-20">
          <img
            src={user.profilePicUrl}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full border-4 border-gray-900"
          />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 mt-20"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* --- Datos del Usuario --- */}
        <h1 className="text-3xl font-bold text-white mt-4">{user.name}</h1>
        <p className="text-lg text-orange-400">@{user.username}</p>

        <p className="text-gray-300 mt-4">{user.bio}</p>

        {/* --- Estadísticas --- */}
        <div className="flex space-x-6 mt-6 text-gray-400">
          <div>
            <span className="font-bold text-white">{user.following}</span>
            <span className="ml-1">Siguiendo</span>
          </div>
          <div>
            <span className="font-bold text-white">{user.followers}</span>
            <span className="ml-1">Seguidores</span>
          </div>
        </div>
      </div>

      {/* --- Feed de Posts del Usuario (Opcional) --- */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white">Mis Publicaciones</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-4">
          <p className="text-gray-400">
            (Aquí podrías filtrar los posts del JSON y mostrar solo los que
            tengan el username: "{user.username}")
          </p>
        </div>
      </div>
    </div>
  );
}
