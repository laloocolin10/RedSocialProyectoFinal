import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

// Imports de tu equipo
import chatsData from "./data/chats.json";
import ChatPage from "./pages/ChatPage.tsx";

// Componentes del Layout
import Sidebar from "./components/Sidebar.tsx";
import Widgets from "./components/Widgets.tsx";

export default function App() {
  useEffect(() => {
    const storedChats = localStorage.getItem("chats_db");
    if (!storedChats) {
      localStorage.setItem("chats_db", JSON.stringify(chatsData));
      console.log("✅ chats_db inicializado en localStorage");
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Layout de Grid con Sidebar delgada */}
        <div className="container mx-auto max-w-7xl grid grid-cols-12 gap-x-4">
          {/* --- Sidebar (ahora col-span-2) --- */}
          <div className="col-span-2">
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          </div>

          {/* --- Contenido Principal (ahora col-span-7) --- */}
          <main className="col-span-10 lg:col-span-7 border-x border-gray-700 min-h-screen">
            <Routes>
                          <Route path="/login" element={<LoginPage />} />
                         {" "}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
                         {" "}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
                         {" "}
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
                       {" "}
            </Routes>
          </main>

          {/* --- Widgets (ahora col-span-3) --- */}
          <div className="hidden lg:block col-span-3">
            <ProtectedRoute>
              <Widgets />
            </ProtectedRoute>
          </div>
        </div>
      </div>
         {" "}
    </BrowserRouter>
  );
}
