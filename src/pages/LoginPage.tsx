import React, { useState } from "react";
// 1. Importamos useAuth Y la interfaz User
import { useAuth, User } from "../contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  // --- Estados ---
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate(); // --- Handler de Login ---

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email, password); // 1. Obtenemos la "base de datos" y especificamos su TIPO

    const usersDB: User[] = JSON.parse(
      localStorage.getItem("users_db") || "[]"
    ); // 2. Buscamos al usuario especificando el TIPO del parámetro

    const foundUser = usersDB.find((user: User) => user.email === email); // (En un app real, también validarías el password aquí)

    if (foundUser) {
      // 3. ¡Éxito!
      login(foundUser);
      navigate("/");
    } else {
      // 4. Fracaso.
      console.error("Usuario no encontrado");
      alert("Correo o contraseña incorrectos.");
    }
  }; // --- Handler de Registro ---

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registrando con:", name, username, email, password); // 1. Obtenemos la "base de datos" y especificamos su TIPO

    const usersDB: User[] = JSON.parse(
      localStorage.getItem("users_db") || "[]"
    ); // 2. Revisamos si el email ya existe (especificando TIPO)

    const emailExists = usersDB.some((user: User) => user.email === email);
    if (emailExists) {
      alert("Ese correo electrónico ya está registrado.");
      return;
    } // 3. Revisamos si el username ya existe (especificando TIPO)

    const usernameExists = usersDB.some(
      (user: User) => user.username === username
    );
    if (usernameExists) {
      alert("Ese nombre de usuario ya está en uso.");
      return;
    } // 4. Creamos el nuevo usuario especificando su TIPO

    const newUser: User = {
      id: "u" + Date.now(),
      email: email,
      name: name,
      username: username,
      bio: "¡Hola! Soy nuevo en esta red social.",
      profilePicUrl: `https://i.pravatar.cc/150?u=${username}`,
      coverPicUrl: "https://picsum.photos/seed/newuser/1000/300",
      following: 0,
      followers: 0,
    }; // 5. Agregamos el nuevo usuario a la "base de datos"

    usersDB.push(newUser); // 6. Guardamos la "base de datos" ACTUALIZADA

    localStorage.setItem("users_db", JSON.stringify(usersDB)); // 7. Iniciamos sesión con el usuario recién creado

    login(newUser);
    navigate("/");
  }; // --- JSX (Con colores cambiados a 'primary') ---

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gray-800 rounded-lg shadow-lg">
           {" "}
      <h1 className="text-3xl font-bold text-white text-center mb-6">
                {isRegistering ? "Crear Cuenta" : "Inicio de Sesión"}     {" "}
      </h1>
           {" "}
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
               {" "}
        {isRegistering && (
          <>
                       {" "}
            <div className="mb-4">
                           {" "}
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                                Nombre Completo              {" "}
              </label>
                           {" "}
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu Nombre"
                required
              />
                         {" "}
            </div>
                       {" "}
            <div className="mb-4">
                           {" "}
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                                Nombre de Usuario              {" "}
              </label>
                           {" "}
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="@tuusuario"
                required
              />
                         {" "}
            </div>
                     {" "}
          </>
        )}
               {" "}
        <div className="mb-4">
                   {" "}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
                        Correo Electrónico          {" "}
          </label>
                   {" "}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="tu@correo.com"
            required
          />
                 {" "}
        </div>
               {" "}
        <div className="mb-6">
                   {" "}
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
                        Contraseña          {" "}
          </label>
                   {" "}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="********"
            required
          />
                 {" "}
        </div>
               {" "}
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-hover transition duration-300"
        >
                    {isRegistering ? "Registrarse" : "Iniciar Sesión"}       {" "}
        </button>
             {" "}
      </form>
           {" "}
      <div className="text-center mt-6">
               {" "}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm text-primary hover:text-primary-hover hover:underline"
        >
                   {" "}
          {isRegistering
            ? "¿Ya tienes una cuenta? Inicia Sesión"
            : "¿No tienes cuenta? Regístrate"}
                 {" "}
        </button>
             {" "}
      </div>
         {" "}
    </div>
  );
}
