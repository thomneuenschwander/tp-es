  import { alpha, Box, Container, Typography, useTheme } from '@mui/material'
  import { Outlet, useNavigate } from 'react-router-dom'
  import SignupForm from '../components/forms/SignupForm'
  import SigninForm from '../components/forms/SigninForm'
  import { useSignup } from '../hooks/useSingup'
  import { useLogin } from '../hooks/useLogin'
  import { useAuth } from '../contexts/AuthContext'

  export const Landing = () => {
    const theme = useTheme()
    return (
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/images/pizza-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          px: 1,
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            py: 8,
            backgroundColor: alpha(theme.palette.background.paper, 0.95),
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="center">
            Bem-vindo à Pizza Planet
          </Typography>
          <Outlet />
        </Container>
      </Box>
    )
  }

  export const SignupWrapper = () => {
    const navigate = useNavigate()
    const signup = useSignup()

    const handleSignup = async (data: {
      cpf: string
      nome: string
      email: string
      senha: string
      telefone: string
    }) => {
      console.log('Payload enviado para API:', data) 
      signup.mutate(data, {
        onSuccess: () => {
          alert('Cadastro realizado com sucesso!')
          navigate('/login')
        },
        onError: (error: any) => {
          alert('Erro ao cadastrar: ' + error.response?.data?.error || 'erro desconhecido')
        },
      })
    }

    return (
      <SignupForm
        buttonLabel="Cadastrar"
        onSubmit={handleSignup}
        onLinkClick={() => navigate('/login')}
      />
    )
  }

  export const SigninWrapper = () => {
    const navigate = useNavigate()
    const loginMutation = useLogin()
    const { login } = useAuth()

    const handleSignin = async (data: { email: string; senha: string }) => {
      loginMutation.mutate(data, {
        onSuccess: (res) => {
          if (res.logado && res.cpf) {
            login(res.cpf) // salva no contexto + localStorage
            navigate('/home')
          } else {
            alert('Credenciais inválidas')
          }
        },
        onError: (error: any) => {
          alert('Erro ao logar: ' + error.response?.data?.error || 'erro desconhecido')
        },
      })
    }

    return <SigninForm onSubmit={handleSignin} onLinkClick={() => navigate('/signup')} />
  }
