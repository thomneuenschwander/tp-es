import { useState } from 'react';
import { Box, Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useCart } from '../contexts/CartContext';
import BackButton from '../components/BackButton';
import { loadStripe } from '@stripe/stripe-js';

// Inicializa o Stripe com sua chave pública
const stripePromise = loadStripe('pk_test_51RL9yzKpWMtTtEtQLH7xuo81i0fdXC9HFU7scb8u6XGdSg5mCAKpvwYAN2vwhTWIDVfqNCXwsEDWwZKBwYUS3VNH00HGCMTeZg');

// Interface para os itens do carrinho
interface CartItem {
  id: string;
  type: string;
  flavor?: string;
  name?: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const { items, removeItem, addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    const item = items.find((i: CartItem) => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      removeItem(id);
      addItem({ ...item, quantity: newQuantity });
    }
  };

  const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/pagamentos/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao criar sessão de checkout: ${JSON.stringify(errorData)}`);
      }

      const { url, transacaoId } = await response.json();

      if (!url) {
        throw new Error('URL de checkout não recebida');
      }

      localStorage.setItem('transacaoId', transacaoId);
      window.location.href = url;
    } catch (error: any) {
      console.error('Erro ao iniciar o checkout:', error);
      alert(`Erro ao iniciar o checkout: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box display="flex" gap={1} alignItems="center" mb={2}>
        <BackButton />
        <Typography variant="h4" fontWeight="bold" ml={2}>
          Seu Carrinho
        </Typography>
      </Box>

      <Stack spacing={3}>
        {items.length === 0 ? (
          <Typography color="text.secondary">Seu carrinho está vazio.</Typography>
        ) : (
          items.map((item: CartItem) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.type === 'pizza' ? item.flavor : item.name}
                sx={{ width: 64, height: 64, borderRadius: 1 }}
              />
              <Box flexGrow={1}>
                <Typography fontWeight="bold">
                  {item.type === 'pizza' ? item.flavor : item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  R$ {item.price.toFixed(2)}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <IconButton onClick={() => updateQuantity(item.id, -1)} size="small">
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton onClick={() => updateQuantity(item.id, 1)} size="small">
                    <AddIcon />
                  </IconButton>
                </Stack>
              </Box>
              <IconButton onClick={() => removeItem(item.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Stack>

      {items.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">R$ {total.toFixed(2)}</Typography>
          </Stack>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<ShoppingCartCheckoutIcon />}
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Ir para o Pagamento'}
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;