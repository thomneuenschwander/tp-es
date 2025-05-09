import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const apiPort = import.meta.env.VITE_PORT;

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; senha: string }) => {
      const res = await axios.post(`http://localhost:${apiPort}/clientes/login`, data);
      return res.data;
    },
  });
};
