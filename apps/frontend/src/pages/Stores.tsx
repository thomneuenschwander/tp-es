import { Container, Typography, Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiPort = import.meta.env.VITE_PORT;

// Interface para o tipo Restaurante
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
  iconAnchor: [12, 41]
});

const Stores = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [center, setCenter] = useState<[number, number]>([-19.9167, -43.9345]); // Centro de BH

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await axios.get<Restaurante[]>(`http://localhost:${apiPort}/restaurantes`);
        setRestaurantes(response.data);
        
        // Atualiza o centro do mapa para o primeiro restaurante, se existir
        if (response.data.length > 0) {
          setCenter([response.data[0].latitude, response.data[0].longitude]);
        }
      } catch (error) {
        console.error('Erro ao buscar restaurantes:', error);
      }
    };

    fetchRestaurantes();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Nossas Lojas
      </Typography>
      
      <Box sx={{ 
        height: '400px', 
        width: '100%', 
        borderRadius: '8px', 
        overflow: 'hidden' 
      }}>
        <MapContainer 
          center={center}
          zoom={12} // Visão mais ampla da cidade
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {restaurantes.map((restaurante) => (
            <Marker
              key={restaurante.idRestaurante}
              position={[restaurante.latitude, restaurante.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                <Typography variant="subtitle2" fontWeight="bold">
                  {restaurante.nome}
                </Typography>
                <Typography variant="body2">
                  {restaurante.descricao}
                </Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

      <Box sx={{ mt: 4 }}>
        {restaurantes.map((restaurante) => (
          <Box key={restaurante.idRestaurante} sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {restaurante.nome}
            </Typography>
            <Typography color="text.secondary">
              {restaurante.descricao}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Stores;