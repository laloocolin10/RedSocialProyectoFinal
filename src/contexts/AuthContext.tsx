import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// 1. Definimos la "forma" de nuestro usuario
interface User {
  id: string;
  email: string;
  name: string;
}

// 2. Definimos lo que nuestro Contexto va a proveer
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean; // Para saber si estamos verificando el localStorage
}

// 3. Creamos el Contexto
const AuthContext = createContext<AuthContextType | null>(null);

// 4. Creamos el "Proveedor" del Contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Empezamos cargando

  // 5. Efecto para verificar localStorage cuando la app carga
  useEffect(() => {
    const storedUser = localStorage.getItem("social-app-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Si hay un usuario, lo ponemos en el estado
    }
    setLoading(false); // Terminamos de cargar
  }, []);

  // 6. Función de Login
  const login = (userData: User) => {
    localStorage.setItem("social-app-user", JSON.stringify(userData));
    setUser(userData);
  };

  // 7. Función de Logout
  const logout = () => {
    localStorage.removeItem("social-app-user");
    setUser(null);
  };

  // 8. Proveemos el valor a todos los componentes "hijos"
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 9. Creamos un "hook" personalizado para usar el contexto fácilmente
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
