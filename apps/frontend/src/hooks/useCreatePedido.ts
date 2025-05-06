// hooks/useCreatePedido.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useCreatePedido() {
  return useMutation({
    mutationFn: async (pedido: any) => {
      const res = await axios.post('http://localhost:5000/pedidos/completo', pedido);
      return res.data;
    },
  });
}
