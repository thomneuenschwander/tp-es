import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiPort = import.meta.env.VITE_PORT;

export const useAdicionais = () =>
  useQuery({
    queryKey: ['adicionais'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:${apiPort}/adicionais`);
      return res.data;
    },
  });
