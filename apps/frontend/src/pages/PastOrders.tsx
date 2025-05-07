import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Pizza = {
  idPizza: number
  nome: string
  tamanho: string
  preco: number
  descricao: string
  slug: string
}

type ItemDePedido = {
  idItemPedido: number
  quantidade: number
  idPizza: number
  Pizza: Pizza
}

type Pedido = {
  idPedido: number
  preco: number
  status: string
  endereco: string
  cpfCliente: string
  idRestaurante: number
  ItemDePedidos: ItemDePedido[]
  BebidaDoPedidos: any[] // por enquanto não usamos
}

const PastOrders = () => {
  const cpf = localStorage.getItem('cpf')

  const { data: pedidos, isLoading, error } = useQuery({
    queryKey: ['pedidos', cpf],
    enabled: !!cpf,
    queryFn: async () => {
      const { data } = await axios.get<Pedido[]>(`http://localhost:5000/pedidos/cliente/${cpf}`)
      console.log(data)
      return data
    }
  })

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Meus Pedidos
      </Typography>

      {isLoading && <Typography>Carregando pedidos...</Typography>}
      {error && <Typography color="error">Erro ao carregar pedidos.</Typography>}

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

              <Stack spacing={1}>
                {pedido.ItemDePedidos.map((item) => (
                  <Box key={item.idItemPedido}>
                    <Typography variant="body1">
                      Pizza {item.Pizza.nome} ({item.Pizza.tamanho.trim()})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantidade: {item.quantidade} — R$ {item.Pizza.preco.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Descrição: {item.Pizza.descricao}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1">
                Total: <strong>R$ {pedido.preco.toFixed(2)}</strong>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}

export default PastOrders
