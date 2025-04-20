import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { ReactNode } from 'react'

type NavButtonProps = {
  to: string
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
}

const NavButton = ({ to, children, icon, iconPosition = 'start' }: NavButtonProps) => {
  return (
    <Button
      component={NavLink}
      to={to}
      color="inherit"
      startIcon={iconPosition === 'start' ? icon : undefined}
      endIcon={iconPosition === 'end' ? icon : undefined}
      sx={{
        textDecoration: 'none',
        '&.active': {
          fontWeight: 'bold',
          borderBottom: '2px solid',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
    >
      {children}
    </Button>
  )
}

export default NavButton
