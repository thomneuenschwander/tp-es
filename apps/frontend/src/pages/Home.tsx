import { Container, Grid, Box, Typography, Stack, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Home = () => {
  const navigate = useNavigate();

const blocks = [
    { label: 'Escolha sua Pizza', image: '/images/pizzas.png', route: '/pizzas' },
    { label: 'Escolha sua Bebida', image: '/images/drinks.png', route: '/drinks' },
    { label: 'Nossas Lojas', image: '/images/stores.png', route: '/stores' },
    { label: 'Disponível em Breve...', image: '/images/placeholder.jpg', route: '#' },
];

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <Stack spacing={1} textAlign="center">
        <Typography variant="h4" fontWeight="bold">
          Pizza App
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Escolha sua pizza, selecione suas bebidas e finalize seu pedido com poucos cliques.
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {blocks.map((block, index) => (
          <Grid key={index} size={{xs: 12, sm: 6}}>
            <Box
              onClick={() => block.route !== '#' && navigate(block.route)}
              sx={{
                height: 180,
                borderRadius: 2,
                overflow: 'hidden',
                cursor: block.route !== '#' ? 'pointer' : 'default',
                position: 'relative',
                backgroundImage: `url(${block.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: block.route !== '#' ? 'scale(1.03)' : 'none',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  textAlign: 'center',
                }}
              >
                {block.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" alignItems="center" spacing={2} pt={4}>
        <StorefrontIcon color="action" fontSize='large' />
        <Box>
          <Typography fontWeight="bold">Localização do Restaurante</Typography>
          <Link
            href="https://www.google.com/maps/place/R.+Cl%C3%A1udio+Manoel,+1162+-+Savassi,+Belo+Horizonte+-+MG,+30140-100"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="inherit"
          >
            R. Cláudio Manoel, 1162 - Savassi, Belo Horizonte - MG, 30140-100
          </Link>
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
