import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// 1. Definimos la "forma" COMPLETA de nuestro usuario
// ¡La exportamos y añadimos todos los campos!
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  bio: string;
  profilePicUrl: string;
  coverPicUrl: string;
  following: number;
  followers: number;
}

// 2. Definimos lo que nuestro Contexto va a proveer
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean; // Para saber si estamos verificando el localStorage
}

// 3. Creamos el Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Creamos el componente "Proveedor" que envolverá nuestra App
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 5. Revisamos localStorage al cargar la app
  useEffect(() => {
    // Revisa la sesión activa (el usuario logueado)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Terminamos de cargar
  }, []);

  // 6. Definimos la función de login
  const login = (userData: User) => {
    // Guarda al usuario ACTIVO en 'user'
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // 7. Definimos la función de logout
  const logout = () => {
    // Borra al usuario ACTIVO de 'user'
    localStorage.removeItem("user");
    setUser(null);
  };

  // 8. Pasamos los valores al Provider
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 9. Creamos un Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
