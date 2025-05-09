import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiPort = import.meta.env.VITE_PORT;

export const usePizzas = () =>
  useQuery({
    queryKey: ['pizzas'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:${apiPort}/pizzas`);
      return res.data;
    },
  });
