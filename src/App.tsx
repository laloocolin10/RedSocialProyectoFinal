import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import Navbar from "./components/Navbar.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

// Importa los datos iniciales de chats
import chatsData from "./data/chats.json";
import ChatPage from "./pages/ChatPage.tsx";

export default function App() {
  // Este useEffect se ejecuta una sola vez al cargar la app
  useEffect(() => {
    const storedChats = localStorage.getItem("chats_db");

    // Si no existen chats guardados, se cargan desde chats.json
    if (!storedChats) {
      localStorage.setItem("chats_db", JSON.stringify(chatsData));
      console.log("✅ chats_db inicializado en localStorage");
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <Navbar />

        <Routes>
          {/* --- RUTAS PROTEGIDAS --- */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* --- RUTA PÚBLICA --- */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
