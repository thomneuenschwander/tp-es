import { Box, Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { useCart } from '../contexts/CartContext'
import BackButton from '../components/BackButton'

const Cart = () => {
  const { items, removeItem, addItem } = useCart()

  const updateQuantity = (id: string, delta: number) => {
    const item = items.find((i) => i.id === id)
    if (!item) return

    const newQuantity = item.quantity + delta
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      removeItem(id)
      addItem({ ...item, quantity: newQuantity })
    }
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box display='flex' gap={1} alignItems="center" mb={2}>
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
              <IconButton onClick={() => removeItem(item.id)} color='error'>
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
            onClick={() => alert('Finalizar compra')}
          >
            Ir para o Pagamento
          </Button>
        </>
      )}
    </Container>
  )
}

export default Cart
