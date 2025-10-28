import React from "react";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <h1 className="text-3xl font-bold text-white">No estás logueado.</h1>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* --- Banner o Foto de Portada --- */}
      <div>
        <img
          src={user.coverPicUrl}
          alt="Foto de portada"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* --- Contenido Principal (Avatar, Info, Stats) --- */}
      <div className="p-6">
        {/* --- Avatar y Botón de Editar (flotantes) --- */}
        <div className="relative">
          <img
            src={user.profilePicUrl}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full border-4 border-gray-900 -mt-20"
          />
        </div>

        {/* --- Información del Usuario --- */}
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-white">{user.name}</h1>
          <p className="text-gray-400 text-sm">@{user.username}</p>

          <p className="text-gray-300 mt-4">{user.bio}</p>

          <p className="text-gray-400 text-sm mt-4">Email: {user.email}</p>
        </div>

        {/* --- Stats (Siguiendo/Seguidores) --- */}
        <div className="flex space-x-6 mt-6 border-t border-gray-700 pt-4">
          <div>
            <span className="font-bold text-white">{user.following}</span>
            <span className="text-gray-400 ml-2">Siguiendo</span>
          </div>
          <div>
            <span className="font-bold text-white">{user.followers}</span>
            <span className="text-gray-400 ml-2">Seguidores</span>
          </div>
        </div>
      </div>

      {/* --- Pestaña de Publicaciones (futuro) --- */}
      <div className="border-t border-gray-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Publicaciones</h2>
      </div>

      {/* --- Feed del Usuario (aquí irían sus posts) --- */}
      <div className="p-6">
        <p className="text-gray-400 text-center">
          Las publicaciones de {user.name} aparecerán aquí.
        </p>
      </div>
    </div>
  );
}
