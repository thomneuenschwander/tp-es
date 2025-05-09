import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const apiPort = import.meta.env.VITE_PORT;

type Cliente = {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
};

export function useSignup() {
  return useMutation({
    mutationFn: async (cliente: Cliente) => {
      const response = await axios.post(`http://localhost:${apiPort}/clientes`, cliente);
      return response.data;
    },
  });
}
