import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

// 1. Importamos nuestro nuevo componente Navbar
import Navbar from "./components/Navbar.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        {/* 2. Reemplazamos todo el <nav> de antes por nuestro componente */}
        <Navbar />

        {/* 3. Las rutas quedan igual */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
