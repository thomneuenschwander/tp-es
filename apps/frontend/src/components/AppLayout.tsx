import { Box, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import Header from './Header'
import BottomNav from './BottomNav'
import { useAuth } from '../contexts/AuthContext'

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, logout } = useAuth();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  console.log(isAuthenticated)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isMobile && isAuthenticated && <Header />}
      <Box component="main" sx={{ flexGrow: 1, pb: isMobile ? '56px' : 0, display: 'flex'}}>
        {children}
      </Box>
      {isMobile && isAuthenticated && <BottomNav />}
    </Box>
  )
}

export default AppLayout
