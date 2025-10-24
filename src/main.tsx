import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 1. Importa nuestro AuthProvider
import { AuthProvider } from "./contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 2. Envuelve <App /> con <AuthProvider /> */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
