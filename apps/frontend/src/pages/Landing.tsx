import { alpha, Box, Container, Typography, useTheme } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import SignupForm from '../components/forms/SignupForm';
import SigninForm from '../components/forms/SigninForm';

export const Landing = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/images/pizza-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        px: 1
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          py: 8,
          backgroundColor: alpha(theme.palette.background.paper, 0.95), 
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Bem-vindo à Pizza App
        </Typography>
        <Outlet />
      </Container>
    </Box>
  );
};

export const SignupWrapper = () => {
  const navigate = useNavigate();
  return (
    <SignupForm
      buttonLabel="Sign Up"
      linkLabel="Log In"
      onSubmit={(data) => console.log('signup', data)}
      onLinkClick={() => navigate('/login')}
    />
  );
};

export const SigninWrapper = () => {
  const navigate = useNavigate();
  return (
    <SigninForm
      linkLabel="Sign Up"
      onSubmit={(data) => console.log('signin', data)}
      onLinkClick={() => navigate('/signup')}
    />
  );
};
