import { Badge, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

// ICONS
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../contexts/CartContext';

const BottomNav = () => {
  const { items } = useCart();
  const location = useLocation();

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels value={location.pathname}>
        <BottomNavigationAction
          label="Home"
          value="/home"
          icon={<HomeIcon />}
          component={NavLink}
          to="/home"
        />
        <BottomNavigationAction
          label="Carrinho"
          value="/cart"
          icon={
            <Badge badgeContent={items.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          }
          component={NavLink}
          to="/cart"
        />
        <BottomNavigationAction
          label="Pedidos"
          value="/orders"
          icon={<LocalPizzaIcon />}
          component={NavLink}
          to="/orders"
        />
        <BottomNavigationAction
          label="Conta"
          value="/account"
          icon={<AccountCircleIcon />}
          component={NavLink}
          to="/account"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
