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
} from '@mui/material';
import { useMemo, useState } from 'react';
import PizzaTypeCard from '../components/PizzaTypeCard';
import { NewPizzaItem, useCart } from '../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import CartSnackbar from '../components/CartSnackbar';
import { usePizzas } from '../hooks/usePizzas';
import { useAdicionais } from '../hooks/useAdicionais';

const sizes = [
  { value: 'small', label: 'Pequena', price: 20 },
  { value: 'medium', label: 'Média', price: 30 },
  { value: 'large', label: 'Grande', price: 40 },
  { value: 'brutal', label: 'Brutal', price: 50 },
] as const;

type PizzaSize = 'small' | 'medium' | 'large' | 'brutal';

interface Adicional {
  idAdicional: string;
  nome: string;
  preco: number;
}

interface Pizza {
  idPizza: string;
  slug: string;
  nome: string;
  descricao: string;
  preco: number;
}

const SelectPizza = () => {
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const { addItem, removeItem } = useCart();
  const [size, setSize] = useState<PizzaSize | string>('small');
  const [type, setType] = useState<string>('');
  const [customizations, setCustomizations] = useState<string[]>([]);
  const { data: pizzas = [] } = usePizzas();
  const { data: adicionais = [] } = useAdicionais();

  const toggleOption = (value: string) => {
    setCustomizations((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const selectedSize = sizes.find((s) => s.value === size);
  const selectedFlavor = pizzas.find((f: Pizza) => f.slug === type);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastPizza, setLastPizza] = useState<{
    size: string;
    type: string;
    extras: string[];
  } | null>(null);

  const totalPrice = useMemo(() => {
    const base = selectedSize?.price || 0;
    const flavor = selectedFlavor?.preco || 0;
    const extrasTotal = customizations.reduce((sum, extraKey) => {
      const extra = adicionais.find((e: Adicional) => e.idAdicional === extraKey);
      return sum + (extra?.preco || 0);
    }, 0);
    return base + flavor + extrasTotal;
  }, [size, type, customizations, selectedFlavor, adicionais]);

  const navigate = useNavigate();

  const getImage = (slug: string) => `/images/${slug}.png`;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 10 } }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: { xs: 2, sm: 5 } }}>
        Escolha seus sabores de Pizza
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={{ xs: 2, sm: 4 }}>
            <FormControl>
              <FormLabel>Selecione o Tamanho da sua pizza</FormLabel>
              <RadioGroup
                value={size}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSize(e.target.value)
                }
              >
                {sizes.map(({ value, label, price }) => (
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
                {adicionais.map(({ idAdicional, nome, preco }: Adicional) => (
                  <Box
                    key={idAdicional}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>{nome}</Typography>
                      {customizations.includes(idAdicional) && (
                        <Typography variant="caption" color="text.secondary">
                          (+R$ {preco.toFixed(2)})
                        </Typography>
                      )}
                    </Box>
                    <Checkbox
                      checked={customizations.includes(idAdicional)}
                      onChange={() => toggleOption(idAdicional)}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
        >
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 'calc(100% - 32px)' } }}>
            <Typography fontWeight={500} gutterBottom color="text.secondary">
              Escolha seu sabor de Pizza
            </Typography>
            <Stack spacing={2}>
              {pizzas.map((pizza: Pizza) => (
                <Box key={pizza.slug} onClick={() => setType(pizza.slug)}>
                  <PizzaTypeCard
                    flavor={pizza.nome}
                    description={pizza.descricao}
                    imageUrl={getImage(pizza.slug)}
                    selected={type === pizza.slug}
                    price={pizza.preco}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
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
            if (!selectedSize || !selectedFlavor) return;

            const extras = customizations.map((id) => {
              const extra = adicionais.find((e: Adicional) => e.idAdicional === id);
              return extra ? { idAdicional: extra.idAdicional, nome: extra.nome } : null;
            }).filter((e): e is { idAdicional: string; nome: string } => e !== null);

            const pizzaItem: NewPizzaItem = {
              type: 'pizza',
              flavor: selectedFlavor.nome,
              size: selectedSize.label,
              extras,
              price: totalPrice, // Inclui preço da pizza + adicionais
              image: getImage(selectedFlavor.slug),
              quantity: 1,
              idBack: selectedFlavor.idPizza,
            };

            const id = addItem(pizzaItem);
            setLastAddedId(id);
            setLastPizza({ size, type, extras: customizations });
            setSnackbarOpen(false);
            setTimeout(() => setSnackbarOpen(true), 100);
          }}
        >
          Adicionar no Carrinho - R$ {totalPrice.toFixed(2)}
        </Button>
      </Box>
      <CartSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        itemName={selectedFlavor?.nome || 'Pizza'}
        onUndo={
          lastAddedId
            ? () => {
                removeItem(lastAddedId);
                setSnackbarOpen(false);
              }
            : undefined
        }
      />
    </Container>
  );
};

export default SelectPizza;