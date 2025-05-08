// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  cpf: string | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Adicionado para indicar carregamento
  login: (cpf: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cpf, setCpf] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const storedCpf = localStorage.getItem('cpf');
    console.log('Carregando CPF do localStorage:', storedCpf); // Debug
    if (storedCpf && storedCpf.trim() !== '') {
      setCpf(storedCpf);
    } else {
      console.log('Nenhum CPF encontrado no localStorage ou CPF vazio');
    }
    setIsLoading(false); // Carregamento concluído
  }, []);

  const login = (cpf: string) => {
    if (!cpf || cpf.trim() === '') {
      console.log('Tentativa de login com CPF inválido:', cpf);
      return;
    }
    console.log('Logando com CPF:', cpf);
    localStorage.setItem('cpf', cpf);
    setCpf(cpf);
  };

  const logout = () => {
    console.log('Logout chamado, removendo CPF');
    localStorage.removeItem('cpf');
    setCpf(null);
  };

  console.log('Estado atual do CPF:', cpf);
  return (
    <AuthContext.Provider value={{ cpf, isAuthenticated: !!cpf, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};