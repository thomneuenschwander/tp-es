import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
