import {
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    Stack,
    Typography,
  } from '@mui/material';
  
  type Order = {
    id: number;
    totalPrice: number;
    status: string;
    deliveryAddress: string;
    date: string;
    pizzas: { name: string; size: string; price: number }[];
    drinks: { name: string; price: number }[];
    addons: { name: string; price: number }[];
    paymentMethod: string;
  };
  
  const mockOrders: Order[] = [
    {
      id: 1,
      totalPrice: 89.9,
      status: 'Delivered',
      deliveryAddress: '123 Margherita Street',
      date: '2024-04-18T20:30:00',
      pizzas: [
        { name: 'Margherita', size: 'Medium', price: 35.9 },
        { name: 'Pepperoni', size: 'Large', price: 45 },
      ],
      drinks: [{ name: 'Coca-Cola 1L', price: 9 }],
      addons: [{ name: 'Stuffed Crust', price: 6 }],
      paymentMethod: 'Credit Card',
    },
  ];
  
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
                  Order #{order.id} — {new Date(order.date).toLocaleString()}
                </Typography>
  
                <Typography>Status: {order.status}</Typography>
                <Typography>Address: {order.deliveryAddress}</Typography>
  
                <Divider sx={{ my: 2 }} />
  
                <Typography variant="subtitle2">Pizzas</Typography>
                <ul>
                  {order.pizzas.map((p, i) => (
                    <li key={i}>
                      {p.name} ({p.size}) — ${p.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
  
                {order.addons.length > 0 && (
                  <>
                    <Typography variant="subtitle2">Add-ons</Typography>
                    <ul>
                      {order.addons.map((a, i) => (
                        <li key={i}>
                          {a.name} — ${a.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
  
                {order.drinks.length > 0 && (
                  <>
                    <Typography variant="subtitle2">Drinks</Typography>
                    <ul>
                      {order.drinks.map((d, i) => (
                        <li key={i}>
                          {d.name} — ${d.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
  
                <Divider sx={{ my: 2 }} />
  
                <Typography variant="body1">
                  Total: <strong>${order.totalPrice.toFixed(2)}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Payment: {order.paymentMethod}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    );
  };
  
  export default PastOrders;
  