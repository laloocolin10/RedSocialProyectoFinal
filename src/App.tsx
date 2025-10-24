import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import Navbar from "./components/Navbar.tsx";

// 1. Importamos nuestro nuevo componente de protección
import ProtectedRoute from "./components/ProtectedRoute.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <Navbar />
        <Routes>
          {/* --- RUTAS PROTEGIDAS --- */}
          {/* Envolvemos HomePage con ProtectedRoute */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          {/* Envolvemos ProfilePage con ProtectedRoute */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* --- RUTA PÚBLICA --- */}
          {/* Dejamos LoginPage como estaba, ya que debe ser pública */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
