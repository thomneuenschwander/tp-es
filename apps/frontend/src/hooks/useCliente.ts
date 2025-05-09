// src/hooks/useCliente.ts ----------------------------------------------------
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const apiPort = import.meta.env.VITE_PORT;

const api = axios.create({ baseURL: `http://localhost:${apiPort}` });

export const useCliente = (cpf: string | null) => {
  const qc = useQueryClient();

  /* GET /clientes/:cpf */
  const query = useQuery({
    enabled: !!cpf,
    queryKey: ['cliente', cpf],
    queryFn: async () => {
      const { data } = await api.get(`/clientes/${cpf}`);
      return data;            // { cpf, nome, email, telefone, endereco? }
    },
  });

  /* PUT /clientes/:cpf */
  const update = useMutation({
    mutationFn: async (payload: any) => {
      await api.put(`/clientes/${cpf}`, payload);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cliente', cpf] }),
  });

  /* DELETE /clientes/:cpf */
  const remove = useMutation({
    mutationFn: async () => {
      await api.delete(`/clientes/${cpf}`);
    },
  });

  return { ...query, update, remove };
};
