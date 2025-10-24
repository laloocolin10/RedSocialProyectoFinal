import React from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <h1 className="text-2xl font-bold text-white text-center">
        Verificando...
      </h1>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
