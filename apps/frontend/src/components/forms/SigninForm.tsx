import { Button, Link, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

type SigninFormProps = {
  onSubmit: (data: { email: string; password: string }) => void
  linkLabel: string
  onLinkClick: () => void
}

const SigninForm = ({ onSubmit, linkLabel, onLinkClick }: SigninFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
        <Typography textAlign="center" variant="body2">
          Don’t have an account?{' '}
          <Link component="button" onClick={onLinkClick}>
            {linkLabel}
          </Link>
        </Typography>
      </Stack>
    </form>
  )
}

export default SigninForm
