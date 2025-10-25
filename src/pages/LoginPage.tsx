import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email, password);

    // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
    // Creamos el objeto de usuario más completo
    const fakeUser = {
      id: "u1",
      email: email, // Usa el email del formulario
      name: "Lalo Colin", // Tu nombre
      // --- DATOS SIMULADOS PARA EL PERFIL ---
      username: "lalocolin10",
      bio: "Desarrollador React creando una red social con Gemini. 🚀",
      profilePicUrl: "https://i.pravatar.cc/150?u=lalocolin10", // Una foto de perfil aleatoria
      coverPicUrl: "https://picsum.photos/seed/reactproject/1000/300", // Un banner aleatorio
      following: 142,
      followers: 87,
    };

    login(fakeUser);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Inicio de Sesión
      </h1>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="tu@correo.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
