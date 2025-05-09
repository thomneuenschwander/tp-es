import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useCart, CartItem } from '../contexts/CartContext';
import BackButton from '../components/BackButton';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const apiPort = import.meta.env.VITE_PORT;

interface NominatimResponse {
  lat: string;
  lon: string;
}

interface Restaurante {
  idRestaurante: number;
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
}

// Correção para o ícone do marcador
const defaultIcon = new Icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component to update map center dynamically
const MapCenterUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const Cart = () => {
  const { items, removeItem, addItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { cpf } = useAuth();
  const [address, setAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState<boolean | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [validatingAddress, setValidatingAddress] = useState(false);
  const [closestRestaurant, setClosestRestaurant] = useState<Restaurante | null>(null);

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

  const validateAddress = async (address: string) => {
    if (!address || address.trim() === '') {
      setIsAddressValid(null);
      setCoordinates(null);
      setClosestRestaurant(null);
      return;
    }

    setValidatingAddress(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );

      if (!response.ok) {
        throw new Error('Falha ao validar endereço');
      }

      const data: NominatimResponse[] = await response.json();

      const isValid = data && data.length > 0;
      setIsAddressValid(isValid);

      if (isValid && data[0]) {
        const coords = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
        setCoordinates(coords);
        console.log('Coordenadas do endereço:', coords);

        // Fetch restaurants to find the closest
        const restaurantResponse = await axios.get<Restaurante[]>(`http://localhost:${apiPort}/restaurantes`);
        const restaurants = restaurantResponse.data;

        let minDistance = Infinity;
        let closest: Restaurante | null = null;

        if (restaurants.length > 0) {
          restaurants.forEach((restaurant) => {
            const distance = Math.sqrt(
              Math.pow(coords.lat - restaurant.latitude, 2) +
              Math.pow(coords.lon - restaurant.longitude, 2)
            );
            if (distance < minDistance) {
              minDistance = distance;
              closest = restaurant;
            }
          });
          setClosestRestaurant(closest);
        }
      } else {
        setCoordinates(null);
        setClosestRestaurant(null);
      }
    } catch (error: unknown) {
      console.error('Erro ao validar endereço:', error);
      setIsAddressValid(false);
      setCoordinates(null);
      setClosestRestaurant(null);
    } finally {
      setValidatingAddress(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      validateAddress(address);
    }, 1000);

    return () => clearTimeout(timer);
  }, [address]);

  const handleOrderSubmit = async () => {
    if (items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    if (!isAddressValid) {
      alert('Por favor, insira um endereço válido para continuar.');
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
          tamanho: pizza.size,
          extras: pizza.extras || [],
        }));

      const bebidas = items
        .filter((i) => i.type === 'drink' && i.idBack != null)
        .map((bebida) => ({
          quantidade: bebida.quantity,
          idBebida: bebida.idBack,
        }));

      const idRestaurante = closestRestaurant?.idRestaurante ?? 1;

      const payload = {
        items: items.map((item) => ({
          type: item.type,
          flavor: item.type === 'pizza' ? item.flavor : undefined,
          name: item.type === 'drink' ? item.name : undefined,
          size: item.type === 'pizza' ? item.size : undefined,
          price: item.price,
          quantity: item.quantity,
          idBack: item.idBack,
          extras: item.type === 'pizza' ? item.extras : undefined,
        })),
        total,
        cpfCliente,
        endereco: address,
        coordenadas: coordinates,
        idRestaurante: idRestaurante,
      };

      const responsePayment = await fetch(`http://localhost:${apiPort}/pagamentos/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!responsePayment.ok) {
        const error = await responsePayment.json();
        throw new Error(`Erro ao criar sessão de pagamento: ${error.error}`);
      }

      const { url } = await responsePayment.json();
      window.location.href = url;
    } catch (error: unknown) {
      console.error('❌ Erro ao criar sessão de pagamento:', error);
      alert(`Erro ao criar sessão de pagamento: ${error}`);
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

          <Box mb={3}>
            <Typography variant="subtitle1" mb={1}>Endereço de entrega:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                fullWidth
                label="Digite seu endereço completo"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={isAddressValid === false}
                helperText={isAddressValid === false ? 'Endereço inválido' : ''}
                sx={{ mb: 1 }}
              />
              {validatingAddress ? (
                <CircularProgress size={24} />
              ) : isAddressValid === true ? (
                <CheckCircleIcon color="success" />
              ) : isAddressValid === false ? (
                <CancelIcon color="error" />
              ) : null}
            </Box>
            {coordinates !== null && (
              <Typography variant="body2" color="text.secondary">
                Coordenadas do seu endereço: Lat {coordinates.lat.toFixed(6)}, Lon {coordinates.lon.toFixed(6)}
              </Typography>
            )}
            {isAddressValid && coordinates && closestRestaurant && (
              <>
                <Typography variant="subtitle1" mb={1}>
                  Localização da loja que irá preparar seu pedido:
                </Typography>
                <Box sx={{ mt: 2, height: '300px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                  <MapContainer
                    center={[closestRestaurant.latitude, closestRestaurant.longitude]} // Initial center (will be updated by MapCenterUpdater)
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapCenterUpdater center={[closestRestaurant.latitude, closestRestaurant.longitude]} />
                    <Marker
                      position={[closestRestaurant.latitude, closestRestaurant.longitude]}
                      icon={defaultIcon}
                    >
                      <Popup>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {closestRestaurant.nome}
                        </Typography>
                        <Typography variant="body2">
                          {closestRestaurant.descricao}
                        </Typography>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </Box>
              </>
            )}
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<ShoppingCartCheckoutIcon />}
            onClick={handleOrderSubmit}
            disabled={loading || !isAddressValid}
          >
            {loading ? 'Enviando...' : 'Finalizar Pedido'}
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;