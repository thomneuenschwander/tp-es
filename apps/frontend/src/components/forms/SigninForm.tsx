import { Button, Link, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

type SigninFormProps = {
  onSubmit: (data: { email: string; senha: string }) => void
  onLinkClick: () => void
}

const SigninForm = ({ onSubmit, onLinkClick }: SigninFormProps) => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, senha })
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
          label="Senha"
          type="password"
          fullWidth
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth>
          Entrar
        </Button>
        <Typography textAlign="center" variant="body2">
          Ainda não tem uma conta?{' '}
          <Link component="button" type="button" onClick={onLinkClick}>
            Cadastre-se
          </Link>
        </Typography>
      </Stack>
    </form>
  )
}

export default SigninForm
