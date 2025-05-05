import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Typography,
  Stack,
  Container,
  Grid,
} from '@mui/material'
import { useMemo, useState } from 'react'
import PizzaTypeCard from '../components/PizzaTypeCard'
import { NewPizzaItem, useCart } from '../contexts/CartContext'

// ICONS
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import CartSnackbar from '../components/CartSnackbar'

const pizzaData = {
  sizes: [
    { value: 'small', label: 'Pequena', price: 20 },
    { value: 'medium', label: 'Média', price: 30 },
    { value: 'large', label: 'Grande', price: 40 },
    { value: 'brutal', label: 'Brutal', price: 50 },
  ],
  flavors: [
    {
      value: 'margherita',
      label: 'Margherita',
      description: 'Molho de tomate, muçarela e manjericão.',
      image: '/images/margherita.png',
      price: 0,
    },
    {
      value: 'pepperoni',
      label: 'Pepperoni',
      description: 'Pepperoni crocante sobre queijo derretido.',
      image: '/images/pepperoni.png',
      price: 6,
    },
    {
      value: 'vegetarian',
      label: 'Vegetarian',
      description: 'Mix de legumes frescos com muçarela.',
      image: '/images/vegetarian.png',
      price: 4,
    },
  ],
  extras: [
    { value: 'cheese', label: 'Queijo Extra', price: 5 },
    { value: 'glutenFree', label: 'Borda Gluten-Free', price: 4 },
  ],
} as const

type PizzaSize = 'small' | 'medium' | 'large' | 'brutal'
type PizzaType = 'margherita' | 'pepperoni' | 'vegetarian'

const SelectPizza = () => {
  const [lastAddedId, setLastAddedId] = useState<string | null>(null)

  const { addItem, removeItem } = useCart()

  const [size, setSize] = useState<PizzaSize | string>('small')
  const [type, setType] = useState<PizzaType>('margherita')

  const [customizations, setCustomizations] = useState<string[]>([])

  const toggleOption = (value: string) => {
    setCustomizations((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const selectedSize = pizzaData.sizes.find((s) => s.value === size)
  const selectedFlavor = pizzaData.flavors.find((f) => f.value === type)

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [lastPizza, setLastPizza] = useState<{
    size: string
    type: string
    extras: string[]
  } | null>(null)

  const totalPrice = useMemo(() => {
    const base = selectedSize?.price || 0
    const flavor = selectedFlavor?.price || 0
    const extras = customizations.reduce((sum, extraKey) => {
      const extra = pizzaData.extras.find((e) => e.value === extraKey)
      return sum + (extra?.price || 0)
    }, 0)
    return base + flavor + extras
  }, [size, type, customizations])

  const navigate = useNavigate()

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 10 } }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: { xs: 2, sm: 5 } }}>
        Escolha seus sabores de Pizza
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={{ xs: 2, sm: 4 }}>
            <FormControl>
              <FormLabel>Selecione o Tamanho da sua pizza</FormLabel>
              <RadioGroup value={size} onChange={(e) => setSize(e.target.value)}>
                {pizzaData.sizes.map(({ value, label, price }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography>{label}</Typography>
                        {size === value && (
                          <Typography variant="caption" color="text.secondary">
                            (+R$ {price.toFixed(2)})
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box>
              <Typography fontWeight={500} gutterBottom color="text.secondary">
                Customize sua Pizza
              </Typography>
              <Stack spacing={2}>
                {pizzaData.extras.map(({ value, label, price }) => (
                  <Box
                    key={value}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>{label}</Typography>
                      {customizations.includes(value) && (
                        <Typography variant="caption" color="text.secondary">
                          (+R$ {price.toFixed(2)})
                        </Typography>
                      )}
                    </Box>
                    <Checkbox
                      checked={customizations.includes(value)}
                      onChange={() => toggleOption(value)}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography fontWeight={500} gutterBottom color="text.secondary">
            Escolha seu sabor de Pizza
          </Typography>
          <Stack spacing={2}>
            {pizzaData.flavors.map(({ value, label, description, image, price }) => (
              <Box key={value} onClick={() => setType(value)}>
                <PizzaTypeCard
                  flavor={label}
                  description={description}
                  imageUrl={image}
                  selected={type === value}
                  price={price}
                />
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Box
        mt={4}
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button variant="outlined" size="large" onClick={() => navigate('/cart')}>
          <ShoppingCartIcon />
        </Button>
        <Button variant="outlined" size="large" fullWidth onClick={() => navigate('/drinks')}>
          Escolher Bebidas
        </Button>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => {
            if (!selectedSize || !selectedFlavor) return

            const pizzaItem: NewPizzaItem = {
              type: 'pizza',
              flavor: selectedFlavor.label,
              size: selectedSize.label,
              extras: customizations,
              price: totalPrice,
              image: selectedFlavor.image,
              quantity: 1,
            }

            const id = addItem(pizzaItem)
            setLastAddedId(id)
            setLastPizza({ size, type, extras: customizations })
            setSnackbarOpen(false)
            setTimeout(() => setSnackbarOpen(true), 100)
          }}
        >
          Adicionar no Carrinho - R$ {totalPrice.toFixed(2)}
        </Button>
      </Box>
      <CartSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        itemName={selectedFlavor?.label || 'Pizza'}
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

export default SelectPizza
