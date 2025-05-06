import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5000/clientes', cliente);
      return response.data;
    },
  });
}
