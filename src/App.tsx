import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// 1. Importa las páginas que acabamos de crear
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
export default function App() {
  return (
    // 2. BrowserRouter activa la navegación en toda la app
    <BrowserRouter>
      {/* 3. Damos el estilo elegante base a toda la app */}
      <div className="min-h-screen bg-gray-900 text-white p-8">
        {/* 4. Esta es nuestra barra de navegación */}
        <nav className="p-4 bg-gray-800 rounded-lg mb-6">
          <Link
            to="/"
            className="mr-4 text-lg font-semibold text-orange-400 hover:text-orange-300"
          >
            Inicio
          </Link>
          <Link
            to="/profile"
            className="mr-4 text-lg font-semibold text-orange-400 hover:text-orange-300"
          >
            Perfil
          </Link>
          <Link
            to="/login"
            className="text-lg font-semibold text-orange-400 hover:text-orange-300"
          >
            Login
          </Link>
        </nav>

        {/* 5. Aquí es donde React Router decide qué página mostrar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
