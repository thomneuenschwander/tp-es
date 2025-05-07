import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  cpf: string | null;
  isAuthenticated: boolean;
  login: (cpf: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cpf, setCpf] = useState<string | null>(null);

  useEffect(() => {
    const storedCpf = localStorage.getItem('cpf');
    if (storedCpf && storedCpf.trim() !== '') setCpf(storedCpf);
  }, []);

  const login = (cpf: string) => {
    if (!cpf || cpf.trim() === '') return;
    localStorage.setItem('cpf', cpf);
    setCpf(cpf);
  };
  

  const logout = () => {
    localStorage.removeItem('cpf');
    setCpf(null);
  };

  return (
    <AuthContext.Provider value={{ cpf, isAuthenticated: !!cpf, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
