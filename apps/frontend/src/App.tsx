import { Navigate, Route, Routes } from 'react-router-dom';
import { Landing, SigninWrapper, SignupWrapper } from './pages/Landing';
import AppLayout from './components/AppLayout';
import Account from './pages/Account';
import AddressSelection from './pages/AddressSelection';
import { useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import PastOrders from './pages/PastOrders';
import Home from './pages/Home';
import Cart from './pages/Cart';
import SelectPizza from './pages/SelectPizza';
import Drinks from './pages/Drinks';
import PaymentMethod from './pages/PaymentMethod';
import Stores from './pages/Stores';

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | null;
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="signup" element={<SignupWrapper />} />
            <Route path="login" element={<SigninWrapper />} />
          </Route>
          <Route path='/home' element={<Home />} />
          <Route path="/account" element={<Account toggleTheme={toggleTheme} themeMode={mode}/>} />
          <Route path="/address" element={<AddressSelection />} />
          <Route path='/orders' element={<PastOrders />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/pizzas' element={<SelectPizza />} />
          <Route path='/drinks' element={<Drinks />} />
          <Route path='/payment-method' element={<PaymentMethod />} />
          <Route path="/stores" element={<Stores />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
