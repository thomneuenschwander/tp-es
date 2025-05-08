import { useState } from 'react';
import { Box, Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useCart, CartItem } from '../contexts/CartContext';
import BackButton from '../components/BackButton';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../contexts/AuthContext';

// Inicializa o Stripe com sua chave pública
const stripePromise = loadStripe(
  'pk_test_51RL9yzKpWMtTtEtQLH7xuo81i0fdXC9HFU7scb8u6XGdSg5mCAKpvwYAN2vwhTWIDVfqNCXwsEDWwZKBwYUS3VNH00HGCMTeZg',
);

const Cart = () => {
  const { items, removeItem, addItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { cpf } = useAuth();

  const updateQuantity = (id: string, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      removeItem(id);
      addItem({ ...item, quantity: newQuantity });
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSubmit = async () => {
    if (items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    setLoading(true);

    try {
      const cpfCliente = cpf;

      const itens = items
        .filter((i) => i.type === 'pizza')
        .map((pizza) => ({
          quantidade: pizza.quantity,
          idPizza: pizza.idBack,
        }));

      const bebidas = items
        .filter((i) => i.type === 'drink' && i.idBack != null)
        .map((bebida) => ({
          quantidade: bebida.quantity,
          idBebida: bebida.idBack,
        }));

      const adicionais = items
        .filter((i) => i.type === 'pizza' && i.extras && i.extras.length > 0)
        .flatMap((pizza) =>
          (pizza.extras || []).map((extra) => ({
            quantidade: pizza.quantity,
            idAdicional: extra.idAdicional,
          }))
        );

      const payload = {
        cpfCliente,
        preco: total,
        status: 'pendente',
        endereco: 'Rua das Pizzas, 123',
        idRestaurante: 1,
        itens,
        bebidas,
        adicionais,
      };

      const response = await fetch('http://localhost:5000/pedidos/completo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Erro ao criar pedido: ${JSON.stringify(error)}`);
      }

      const pedidoCriado = await response.json();
      console.log('✅ Pedido criado:', pedidoCriado);
      alert('Pedido realizado com sucesso!');
      clearCart();
    } catch (error: any) {
      console.error('❌ Erro ao criar pedido:', error);
      alert(`Erro ao criar pedido: ${error.message}`);
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
          items.map((item) => (
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
                  {item.type === 'pizza' ? `${item.flavor} (${item.size})` : item.name}
                </Typography>
                {item.type === 'pizza' && item.extras && item.extras.length > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Adicionais: {item.extras.map((extra) => extra.nome).join(', ')}
                  </Typography>
                )}
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
            onClick={handleOrderSubmit}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Finalizar Pedido'}
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;