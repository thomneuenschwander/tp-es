import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { NewDrinkItem, useCart } from '../contexts/CartContext'
import CartSnackbar from '../components/CartSnackbar'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import { useDrinks } from '../hooks/useDrinks'

const Drinks = () => {
  const { addItem, removeItem } = useCart()
  const navigate = useNavigate()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [addedDrink, setAddedDrink] = useState<string | null>(null)
  const [lastAddedId, setLastAddedId] = useState<string | null>(null)

  const { data: drinks = [], isLoading } = useDrinks()

  const handleAddDrink = (drink: any) => {
    const drinkItem: NewDrinkItem = {
      type: 'drink',
      name: drink.nome,
      description: drink.descricao,
      price: drink.preco,
      image: drink.image,
      quantity: 1,
      idBack: undefined,
    }

    const id = addItem(drinkItem)
    setLastAddedId(id)
    setAddedDrink(drink.nome)

    setSnackbarOpen(false)
    setTimeout(() => setSnackbarOpen(true), 100)
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 8 } }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Escolha sua Bebida
      </Typography>

      <Stack spacing={4}>
        {drinks.map((drink: any) => (
          <Card key={drink.idBebida} sx={{ display: 'flex' }}>
            <CardMedia component="img" sx={{ width: 140 }} image={drink.image} alt={drink.nome} />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <CardContent>
                <Typography variant="h6">{drink.nome}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {drink.descricao}
                </Typography>
                <Typography variant="subtitle2" mt={1}>
                  R$ {drink.preco.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button variant="contained" size="small" onClick={() => handleAddDrink(drink)}>
                  Adicionar ao Carrinho
                </Button>
              </CardActions>
            </Box>
          </Card>
        ))}
      </Stack>

      <Stack mt={4}>
        <Button variant="outlined" size="large" onClick={() => navigate('/cart')}>
          <ShoppingCartIcon />
        </Button>
        <Button variant="outlined" size="large" onClick={() => navigate('/pizzas')}>
          Escolher Pizzas
        </Button>
      </Stack>

      <CartSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        itemName={addedDrink || 'Bebida'}
        onUndo={
          lastAddedId
            ? () => {
                removeItem(lastAddedId)
                setSnackbarOpen(false)
              }
            : undefined
        }
      />
    </Container>
  )
}

export default Drinks
