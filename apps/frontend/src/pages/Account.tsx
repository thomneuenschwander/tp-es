// src/pages/Account.tsx ------------------------------------------------------
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  LocationOn as LocationIcon,
  CreditCard as CardIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAuth } from '../contexts/AuthContext'
import { useCliente } from '../hooks/useCliente'

type AccountProps = { toggleTheme: () => void; themeMode: 'light' | 'dark' }

const Account = ({ toggleTheme, themeMode }: AccountProps) => {
  const { cpf, logout } = useAuth() // ← auth context
  const navigate = useNavigate()
  const { data, isLoading, update } = useCliente(cpf)

  /* estados controlados */
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' })

  /* quando chegar o usuário → preencher formulário */
  useEffect(() => {
    if (data) setForm({ nome: data.nome, email: data.email, telefone: data.telefone })
  }, [data])

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => setIsEditing(false),
      onError: () => alert('Erro ao salvar'),
    })
  }

  if (isLoading) return <Container sx={{ py: 4 }}>Carregando…</Container>

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 5 } }}>
      {/* ——— Preferências de tema ——— */}
      <Stack spacing={2} pb={2}>
  <Stack direction="row" alignItems="center" justifyContent="space-between">
    <Box>
      <Typography variant="subtitle1">
        Bem-vindo, {data?.nome || 'Usuário'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Gerencie sua conta.
      </Typography>
    </Box>
  </Stack>
</Stack>


      <Divider />

      {/* ——— Dados do cliente ——— */}
      <Stack spacing={2} py={2} alignItems="center">
        <Avatar sx={{ width: 80, height: 80 }}>{form.nome[0]}</Avatar>

        <TextField
          label="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          fullWidth
          InputProps={{ readOnly: !isEditing }}
        />
        <TextField
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          fullWidth
          InputProps={{ readOnly: !isEditing }}
        />
        <TextField
          label="Telefone"
          value={form.telefone}
          onChange={(e) => setForm({ ...form, telefone: e.target.value })}
          fullWidth
          InputProps={{ readOnly: !isEditing }}
        />

        <Button
          variant={isEditing ? 'contained' : 'outlined'}
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          sx={{ alignSelf: 'stretch' }}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={update.isPending}
        >
          {isEditing ? 'Salvar alterações' : 'Editar informações'}
        </Button>
      </Stack>

      {/* ——— Endereço (placeholder para detalhe/futuro) ——— */}
      <Paper variant="outlined" sx={{ p: 2, display: 'flex', gap: 2, mb: 2 }}>
        <LocationIcon color="primary" sx={{ mt: 0.5 }} />
        <Box flexGrow={1}>
          <Typography variant="subtitle1">Endereço atual</Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.endereco || 'Nenhum endereço cadastrado'}
          </Typography>
        </Box>
        <Button size="small" onClick={() => navigate('/address')}>
          Alterar
        </Button>
      </Paper>

      <Divider sx={{ my: 2 }} />

      {/* ——— Logout ——— */}
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={() => {
          logout()
          navigate('/')
        }}
      >
        Sair da conta
      </Button>
    </Container>
  )
}

export default Account
