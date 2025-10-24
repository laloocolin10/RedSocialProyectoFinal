import React from "react";
import { useAuth } from "../contexts/AuthContext.tsx"; // Importamos useAuth

export default function ProfilePage() {
  // Obtenemos al usuario del contexto
  const { user } = useAuth();

  // Verificación por si acaso (aunque la ruta está protegida)
  if (!user) {
    return (
      <h1 className="text-3xl font-bold text-white">No estás logueado.</h1>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Perfil de Usuario
      </h1>
      <div className="text-gray-300">
        <p className="mb-4">
          <span className="font-semibold text-orange-400">Nombre:</span>{" "}
          {user.name}
        </p>
        <p>
          <span className="font-semibold text-orange-400">Email:</span>{" "}
          {user.email}
        </p>
      </div>
    </div>
  );
}
