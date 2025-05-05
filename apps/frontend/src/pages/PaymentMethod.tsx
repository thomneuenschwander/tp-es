import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Stack,
    Typography,
    useTheme,
  } from '@mui/material'
  import CreditCardIcon from '@mui/icons-material/CreditCard'
  import AddCardIcon from '@mui/icons-material/AddCard'
  import { useNavigate } from 'react-router-dom'
  
  // mock para cartão salvo
  const savedCard = {
    brand: 'Visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2026,
  }
  
  const PaymentMethod = () => {
    const navigate = useNavigate()
    const theme = useTheme()
  
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 } }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold">
            Forma de pagamento
          </Typography>
  
          {savedCard ? (
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <CreditCardIcon fontSize="large" color="action" />
                  <Box>
                    <Typography variant="subtitle1">
                      Cartão {savedCard.brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      **** **** **** {savedCard.last4}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Expira em {savedCard.expMonth}/{savedCard.expYear}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => alert('Remover cartão (simulação)')}
                >
                  Remover cartão
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Typography color="text.secondary">
              Nenhum cartão cadastrado.
            </Typography>
          )}
  
          <Button
            variant="contained"
            startIcon={<AddCardIcon />}
            size="large"
            onClick={() => {
              // Aqui você deve redirecionar para uma rota ou endpoint do Stripe
              // Ex: window.location.href = '/api/stripe/setup-intent'
              alert('Redirecionar para Stripe...')
            }}
          >
            Adicionar novo cartão
          </Button>
  
          <Button variant="text" onClick={() => navigate('/account')}>
            Voltar
          </Button>
        </Stack>
      </Container>
    )
  }
  
  export default PaymentMethod
  