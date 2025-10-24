import React, { useState } from "react";

export default function LoginPage() {
  // 1. Estados para guardar lo que el usuario escribe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Función que se ejecuta al enviar el formulario
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue

    // --- Simulación de Autenticación ---
    // En un proyecto real, aquí llamarías a tu API.
    // Para este proyecto, creamos un usuario falso.
    console.log("Iniciando sesión con:", email, password);

    const fakeUser = {
      id: "u1",
      email: email,
      name: "Lalo Colin", // Puedes poner un nombre de prueba
    };

    // 3. Guardamos el usuario en localStorage
    // localStorage es un pequeño almacén en el navegador.
    // Lo guardamos como texto (JSON.stringify)
    localStorage.setItem("social-app-user", JSON.stringify(fakeUser));

    alert("¡Inicio de sesión exitoso! (Simulado)");
    // Más adelante, aquí redirigiremos al usuario al inicio.
  };

  return (
    // --- Formulario Estilizado con Tailwind ---
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
