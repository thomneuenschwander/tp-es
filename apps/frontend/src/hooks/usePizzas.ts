import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usePizzas = () =>
  useQuery({
    queryKey: ['pizzas'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/pizzas');
      return res.data;
    },
  });
