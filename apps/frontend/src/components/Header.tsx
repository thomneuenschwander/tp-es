import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import NavButton from './NavButton';

// ICONS
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          component={RouterLink}
          to="/home"
          variant="h6"
          noWrap
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          PizzaPlanet
        </Typography>
        {/* DESKTOP */}
        <Box
          component="nav"
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <NavButton to="/cart" icon={<ShoppingCartIcon />}>
            Carrinho
          </NavButton>
          <NavButton to="/orders" icon={<LocalPizzaIcon />}>
            Pedidos
          </NavButton>
          <NavButton to="/account" icon={<AccountCircleIcon />}>
            Conta
          </NavButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
