import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Pizza {
  idPizza: number;
  nome: string;
  tamanho: string;
  preco: number;
  descricao: string;
  slug: string;
}

interface ItemDePedido {
  idItemPedido: number;
  quantidade: number;
  idPizza: number;
  tamanho: string; // Tamanho do item de pedido
  Pizza: Pizza;
}

interface Bebida {
  idBebida: number;
  nome: string;
  preco: number;
}

interface BebidaDoPedido {
  idBebidaPedido: number;
  quantidade: number;
  idBebida: number;
  Bebida: Bebida;
}

interface Adicional {
  idAdicional: number;
  descricao: string;
  preco: number;
}

interface AdicionalDePedido {
  idAdicionalPedido: number;
  quantidade: number;
  adicionalIdAdicional: number;
  pedidoIdPedido: number;
  Adicional: Adicional;
}

interface Pedido {
  idPedido: number;
  preco: number;
  status: string;
  endereco: string;
  cpfCliente: string;
  idRestaurante: number;
  ItemDePedidos: ItemDePedido[];
  BebidaDoPedidos: BebidaDoPedido[];
  AdicionalDePedidos: AdicionalDePedido[];
}

const apiPort = import.meta.env.VITE_PORT;

const PastOrders = () => {
  const cpf = localStorage.getItem('cpf');

  const { data: pedidos, isLoading, error } = useQuery({
    queryKey: ['pedidos', cpf],
    enabled: !!cpf,
    queryFn: async () => {
      const { data } = await axios.get<Pedido[]>(`http://localhost:${apiPort}/pedidos/cliente/${cpf}`);
      console.log('Pedidos retornados:', data);
      return data;
    },
  });

  // Função para calcular o preço adicional com base no tamanho
  const getSizePrice = (tamanho: string): number => {
    switch (tamanho.trim().toLowerCase()) {
      case 'pequena':
        return 20;
      case 'média':
        return 30;
      case 'grande':
        return 40;
      case 'brutal':
        return 50;
      default:
        return 0; // Caso o tamanho seja desconhecido
    }
  };

  // Função para calcular o preço total do item (pizza + tamanho)
  const calculateItemPrice = (item: ItemDePedido): number => {
    const basePrice = item.Pizza.preco;
    const sizePrice = getSizePrice(item.tamanho);
    return basePrice + sizePrice;
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Meus Pedidos
      </Typography>

      {isLoading && <Typography>Carregando pedidos...</Typography>}
      {error && <Typography color="error">Erro ao carregar pedidos: {error.message}</Typography>}

      <Stack spacing={3}>
        {pedidos?.map((pedido) => (
          <Card key={pedido.idPedido} variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Pedido #{pedido.idPedido}
              </Typography>

              <Typography>Status: {pedido.status}</Typography>
              <Typography>Endereço: {pedido.endereco}</Typography>

              <Divider sx={{ my: 2 }} />

              {/* Itens (Pizzas) */}
              <Typography variant="subtitle1" fontWeight="bold">
                Pizzas:
              </Typography>
              <Stack spacing={1}>
                {pedido.ItemDePedidos.map((item) => (
                  <Box key={item.idItemPedido}>
                    <Typography variant="body1">
                      Pizza {item.Pizza.nome} ({item.tamanho.trim()})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantidade: {item.quantidade} — R$ {calculateItemPrice(item).toFixed(2)} (
                      Base: R$ {item.Pizza.preco.toFixed(2)} + Tamanho: R$ {getSizePrice(item.tamanho).toFixed(2)})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Descrição: {item.Pizza.descricao}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* Bebidas */}
              {pedido.BebidaDoPedidos.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Bebidas:
                  </Typography>
                  <Stack spacing={1}>
                    {pedido.BebidaDoPedidos.map((bebida) => (
                      <Box key={bebida.idBebidaPedido}>
                        <Typography variant="body1">
                          {bebida.Bebida.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantidade: {bebida.quantidade} — R$ {bebida.Bebida.preco.toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </>
              )}

              {/* Adicionais */}
              {pedido.AdicionalDePedidos.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Adicionais:
                  </Typography>
                  <Stack spacing={1}>
                    {pedido.AdicionalDePedidos.map((adicional) => (
                      <Box key={adicional.idAdicionalPedido}>
                        <Typography variant="body1">
                          {adicional.Adicional.descricao}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantidade: {adicional.quantidade} — R$ {adicional.Adicional.preco.toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1">
                Total: <strong>R$ {pedido.preco.toFixed(2)}</strong>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default PastOrders;