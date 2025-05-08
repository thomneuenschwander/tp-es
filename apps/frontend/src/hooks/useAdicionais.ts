import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAdicionais = () =>
  useQuery({
    queryKey: ['adicionais'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/adicionais');
      return res.data;
    },
  });
