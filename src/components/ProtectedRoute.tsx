import React from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Navigate } from "react-router-dom";

// Este componente recibe "children", que es la página que queremos proteger
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  // 1. Si estamos "cargando" (verificando localStorage),
  // mostramos un mensaje para evitar un parpadeo
  if (loading) {
    return (
      <h1 className="text-2xl font-bold text-white text-center">
        Verificando...
      </h1>
    );
  }

  // 2. Si no estamos cargando Y no hay usuario,
  // redirigimos a la página de login.
  if (!user) {
    // "replace" evita que el usuario pueda presionar "atrás" y volver a la pág. protegida
    return <Navigate to="/login" replace />;
  }

  // 3. Si hay un usuario, simplemente mostramos la página
  // que el componente está protegiendo (los "children").
  return <>{children}</>;
}
