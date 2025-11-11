import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar se já está autenticado ao carregar
  useEffect(() => {
    const authStatus = localStorage.getItem('facilita_auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (_username: string, _password: string): boolean => {
    setError(null);
    
    // MODO TESTE: Login automático sem verificação
    setIsAuthenticated(true);
    localStorage.setItem('facilita_auth', 'authenticated');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('facilita_auth');
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
