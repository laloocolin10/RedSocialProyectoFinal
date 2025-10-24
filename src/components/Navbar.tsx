import { Link } from "react-router-dom";
// 1. Importamos nuestro hook useAuth para saber quién es el usuario
import { useAuth } from "../contexts/AuthContext.tsx";

export default function Navbar() {
  // 2. Obtenemos el estado del usuario y la función de logout
  const { user, logout } = useAuth();

  return (
    // 3. Añadimos clases de flexbox para alinear los links
    <nav className="p-4 bg-gray-800 rounded-lg mb-6 flex justify-between items-center">
      {/* --- Links de la Izquierda --- */}
      <div>
        <Link
          to="/"
          className="mr-4 text-lg font-semibold text-orange-400 hover:text-orange-300"
        >
          Inicio
        </Link>

        {/* 4. Mostramos "Perfil" SÓLO si el usuario existe */}
        {user && (
          <Link
            to="/profile"
            className="mr-4 text-lg font-semibold text-orange-400 hover:text-orange-300"
          >
            Perfil
          </Link>
        )}
      </div>

      {/* --- Links/Botones de la Derecha --- */}
      <div>
        {/* 5. Usamos un ternario: si 'user' existe, muestra bienvenida y logout... */}
        {user ? (
          <div className="flex items-center">
            <span className="text-white mr-4">Hola, {user.name}</span>
            <button
              onClick={logout} // 6. El botón llama a la función logout del contexto
              className="text-lg font-semibold text-gray-300 hover:text-orange-300"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          /* ...si no, muestra el link de Login */
          <Link
            to="/login"
            className="text-lg font-semibold text-orange-400 hover:text-orange-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
