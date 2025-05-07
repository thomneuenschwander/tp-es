import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; senha: string }) => {
      const res = await axios.post('http://localhost:5000/clientes/login', data);
      return res.data;
    },
  });
};
