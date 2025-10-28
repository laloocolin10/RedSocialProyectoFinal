import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

// --- Iconos SVG (w-6 h-6) ---
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6">
    <g>
      <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.391L.6 8.325l1.414 1.414L4 7.926V20h16V7.926l1.986 1.813 1.414-1.414L12 .609zM18 18H6V6.91l6-5.455 6 5.455V18z"></path>
    </g>
  </svg>
);
const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6">
    <g>
      <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-2.672 0-8 1.336-8 4v2h16v-2c0-2.664-5.328-4-8-4z"></path>
    </g>
  </svg>
);
// ¡NUEVO ICONO DE CHAT (MENSAJES)!
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6">
    <g>
      <path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H2V8l10 7 10-7v8zM2 6l10 7L22 6H2z"></path>
    </g>
  </svg>
);
// --- Fin de Iconos ---

export default function Sidebar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    // Contenedor principal (padding reducido y centrado)
    <header className="h-screen sticky top-0 flex flex-col justify-between items-center xl:items-stretch p-1 xl:p-2">
      {/* Sección Superior (Links) */}
      <div className="flex flex-col items-center xl:items-start space-y-1">
        {/* Div para espacio del logo */}
        <div className="h-14"></div>

        {/* Link a Inicio (texto ahora 'xl') */}
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
          <HomeIcon />
          <span className="text-lg font-bold text-white hidden xl:inline">
            Inicio
          </span>
        </Link>

        {/* Link a Perfil (texto ahora 'xl') */}
        <Link
          to="/profile"
          className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
          <ProfileIcon />
          <span className="text-lg font-bold text-white hidden xl:inline">
            Perfil
          </span>
        </Link>

        {/* Link a Chat (texto ahora 'xl' y nuevo icono) */}
        <Link
          to="/chat"
          className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
          <ChatIcon />
          <span className="text-lg font-bold text-white hidden xl:inline">
            Mensajes
          </span>
        </Link>

        {/* Botón de Publicar (azul y 'xl') */}
        <button className="mt-4 bg-primary text-white font-bold text-base w-full py-3 rounded-full hover:bg-primary-hover transition duration-300 hidden xl:block">
          Publicar
        </button>
        {/* Botón de publicar solo ícono */}
        <button className="mt-4 bg-primary text-white font-bold text-base w-12 h-12 py-3 rounded-full hover:bg-primary-hover transition duration-300 xl:hidden flex items-center justify-center">
          +
        </button>
      </div>

      {/* Sección Inferior (Perfil y Logout) */}
      <div
        onClick={logout}
        className="flex items-center justify-center xl:justify-start space-x-3 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
      >
        <img
          src={user.profilePicUrl}
          alt="Tu perfil"
          className="w-10 h-10 rounded-full"
        />
        <div className="hidden xl:inline">
          <p className="text-white font-bold text-sm">{user.name}</p>
          <p className="text-gray-500 text-sm">@{user.username}</p>
        </div>
      </div>
    </header>
  );
}
