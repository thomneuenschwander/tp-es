import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
