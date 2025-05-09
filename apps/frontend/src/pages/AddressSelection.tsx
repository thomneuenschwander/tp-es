import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { useCallback, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon, Map as LeafletMap, LeafletMouseEvent } from 'leaflet'

// Definindo o ícone padrão para os marcadores
const defaultIcon = new Icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

// Coordenadas iniciais (centro de São Paulo)
const centerDefault = {
  lat: -23.55052,
  lng: -46.633308,
}

// Definindo a interface para o componente MapEvents
interface MapEventsProps {
  onMapClick: (e: LeafletMouseEvent) => void
}

// Componente para lidar com os eventos do mapa e posicionamento do marcador
const MapEvents: React.FC<MapEventsProps> = ({ onMapClick }) => {
  const map = useMapEvents({
    click: (e) => {
      onMapClick(e)
    },
  })
  return null
}

const AddressSelection = () => {
  const navigate = useNavigate()
  const [markerPosition, setMarkerPosition] = useState(centerDefault)
  const mapRef = useRef<LeafletMap | null>(null)

  const handleMapClick = useCallback((e: LeafletMouseEvent) => {
    setMarkerPosition({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    })
  }, [])

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setMarkerPosition(newPosition)

        // Se o mapa estiver carregado, centralize na nova posição
        if (mapRef.current) {
          mapRef.current.setView([newPosition.lat, newPosition.lng], 15)
        }
      },
      (error) => {
        alert('Não foi possível obter sua localização.')
      },
      {
        enableHighAccuracy: true, // Habilita a precisão maior da localização, se disponível
        timeout: 5000, // Timeout de 5 segundos para pegar a localização
        maximumAge: 0, // Força a pegar a localização atual, sem usar valores antigos
      },
    )
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <IconButton onClick={() => navigate('/account')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Selecionar endereço</Typography>
      </Stack>

      <Box
        sx={{
          height: '400px',
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <MapContainer
          center={[markerPosition.lat, markerPosition.lng]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[markerPosition.lat, markerPosition.lng]} icon={defaultIcon} />
          <MapEvents onMapClick={handleMapClick} />
        </MapContainer>
      </Box>

      <Stack spacing={2} mt={3}>
        <Button
          variant="outlined"
          startIcon={<MyLocationIcon />}
          onClick={handleUseCurrentLocation}
        >
          Usar minha localização atual
        </Button>

        <Button
          variant="contained"
          onClick={() => alert(`Endereço salvo em: ${markerPosition.lat}, ${markerPosition.lng}`)}
        >
          Salvar endereço
        </Button>
      </Stack>
    </Container>
  )
}

export default AddressSelection
