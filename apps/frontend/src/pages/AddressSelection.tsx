import {
    Box,
    Button,
    Container,
    IconButton,
    Stack,
    Typography,
  } from '@mui/material'
  import ArrowBackIcon from '@mui/icons-material/ArrowBack'
  import MyLocationIcon from '@mui/icons-material/MyLocation'
  import { useCallback, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import {
    GoogleMap,
    Marker,
    useJsApiLoader,
  } from '@react-google-maps/api'
  
  const centerDefault = {
    lat: -23.55052, 
    lng: -46.633308,
  }
  
  const containerStyle = {
    width: '100%',
    height: '400px',
  }
  
  const AddressSelection = () => {
    const navigate = useNavigate()
    const [markerPosition, setMarkerPosition] = useState(centerDefault)
  
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, 
    })
  
    const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        setMarkerPosition({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        })
      }
    }, [])
  
    const handleUseCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMarkerPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          alert('Não foi possível obter sua localização.')
        }
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
  
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={15}
            onClick={handleMapClick}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        ) : (
          <Typography>Carregando mapa...</Typography>
        )}
  
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
            onClick={() =>
              alert(`Endereço salvo em: ${markerPosition.lat}, ${markerPosition.lng}`)
            }
          >
            Salvar endereço
          </Button>
        </Stack>
      </Container>
    )
  }
  
  export default AddressSelection
  