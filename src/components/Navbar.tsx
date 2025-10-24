import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 rounded-lg mb-6 flex justify-between items-center">
      {/* --- Links de la Izquierda --- */}
      <div>
        <Link
          to="/"
          className="mr-4 text-lg font-semibold text-orange-400 hover:text-orange-300"
        >
          Inicio
        </Link>

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
        {user ? (
          <div className="flex items-center">
            <span className="text-white mr-4">Hola, {user.name}</span>
            <button
              onClick={logout}
              className="text-lg font-semibold text-gray-300 hover:text-orange-300"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
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
