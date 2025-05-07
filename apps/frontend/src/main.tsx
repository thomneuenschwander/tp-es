import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <CartProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
