// ¡Añadimos useMemo y useCallback!
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

// ... (la interface User sigue igual)
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

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("social-app-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []); // El '[]' es correcto, se ejecuta una vez

  // --- ¡CORRECCIÓN! ---
  // Envolvemos 'login' en useCallback para que no se re-cree
  const login = useCallback((userData: User) => {
    localStorage.setItem("social-app-user", JSON.stringify(userData));
    setUser(userData);
  }, []); // No depende de nada, así que '[]'

  // Envolvemos 'logout' en useCallback
  const logout = useCallback(() => {
    localStorage.removeItem("social-app-user");
    setUser(null);
  }, []); // No depende de nada

  // --- ¡CORRECCIÓN! ---
  // Memorizamos el 'value' del provider.
  // Solo se recalculará si 'user' o 'loading' cambian.
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
    }),
    [user, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// El hook 'useAuth' sigue igual
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
