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
import Stores from './pages/Stores';
import Success from './pages/Success';

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
          primary: {
            main: '#e65100',   // Laranja queimado (molho de tomate assado)
            contrastText: '#fff',
          },
          secondary: {
            main: '#ffeb3b',   // Amarelo queijo
            contrastText: '#000',
          },
          background: {
            default: mode === 'light' ? '#fff8f1' : '#1e1e1e',  // Massa clara ou fundo escuro
            paper: mode === 'light' ? '#fff3e0' : '#2c2c2c',
          },
          error: {
            main: '#d32f2f', // Vermelho tomate forte
          },
          warning: {
            main: '#ffa726',
          },
          success: {
            main: '#81c784',
          },
          info: {
            main: '#64b5f6',
          },
        },
        typography: {
          fontFamily: `'Raleway', 'Roboto', sans-serif`,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
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
          <Route path="/stores" element={<Stores />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
