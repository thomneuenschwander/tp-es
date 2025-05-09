// hooks/useCreatePedido.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const apiPort = import.meta.env.VITE_PORT;

export function useCreatePedido() {
  return useMutation({
    mutationFn: async (pedido: any) => {
      const res = await axios.post(`http://localhost:${apiPort}/pedidos/completo`, pedido);
      return res.data;
    },
  });
}
