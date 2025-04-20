import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

type Order = {
  id: string
  createdAt: string
  status: 'delivered' | 'cancelled' | 'in_progress'
  deliveryAddress: string
  paymentMethod: 'credit_card' | 'pix' | 'cash'
  items: {
    id: string
    type: 'pizza' | 'drink'
    name: string
    size?: string
    extras?: string[]
    quantity: number
    price: number
    image: string
  }[]
  total: number
}

const mockOrders: Order[] = [
  {
    id: 'order_001',
    createdAt: '2025-04-20T18:45:00Z',
    status: 'delivered',
    deliveryAddress: 'Rua das Pizzas, 456',
    paymentMethod: 'credit_card',
    total: 98.5,
    items: [
      {
        id: '1',
        type: 'pizza',
        name: 'Pepperoni',
        size: 'Grande',
        extras: ['Queijo extra', 'Borda recheada'],
        quantity: 1,
        price: 45,
        image: '/images/pepperoni.png',
      },
      {
        id: '2',
        type: 'pizza',
        name: 'Margherita',
        size: 'Média',
        extras: [],
        quantity: 1,
        price: 35.5,
        image: '/images/margherita.png',
      },
      {
        id: '3',
        type: 'drink',
        name: 'Coca-Cola 1L',
        quantity: 1,
        price: 9,
        image: '/images/coca.png',
      },
      {
        id: '4',
        type: 'drink',
        name: 'Água Mineral',
        quantity: 1,
        price: 9,
        image: '/images/water.png',
      },
    ],
  },
]

const PastOrders = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Meus Pedidos
      </Typography>

      <Stack spacing={3}>
        {mockOrders.map((order) => (
          <Card key={order.id} variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Pedido #{order.id} — {new Date(order.createdAt).toLocaleString()}
              </Typography>

              <Typography>Status: {order.status}</Typography>
              <Typography>Endereço: {order.deliveryAddress}</Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                {order.items.map((item) => (
                  <Box key={item.id}>
                    <Typography variant="body1">
                      {item.type === 'pizza'
                        ? `Pizza ${item.name} (${item.size})`
                        : `Bebida: ${item.name}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantidade: {item.quantity} — R$ {item.price.toFixed(2)}
                    </Typography>
                    {item.extras && item.extras.length > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        Extras: {item.extras.join(', ')}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1">
                Total: <strong>R$ {order.total.toFixed(2)}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pagamento: {order.paymentMethod === 'credit_card'
                  ? 'Cartão de crédito'
                  : order.paymentMethod === 'pix'
                  ? 'Pix'
                  : 'Dinheiro'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}

export default PastOrders
