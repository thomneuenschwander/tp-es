import { Box, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import Header from './Header'
import BottomNav from './BottomNav'

const AppLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isMobile && <Header />}
      <Box component="main" sx={{ flexGrow: 1, pb: isMobile ? '56px' : 0, display: 'flex'}}>
        {children}
      </Box>
      {isMobile && <BottomNav />}
    </Box>
  )
}

export default AppLayout
