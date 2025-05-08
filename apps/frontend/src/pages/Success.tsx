import { useState, useEffect } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useAuth } from '../contexts/AuthContext';

interface OrderDetails {
  idPedido: number;
  preco: number;
  status: string;
  endereco: string;
}

const Success = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cpf, isAuthenticated, isLoading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Aguardar até que o estado de autenticação esteja carregado
      if (authLoading) {
        console.log('Aguardando carregamento do CPF...'); // Debug
        return;
      }

      const sessionId = new URLSearchParams(location.search).get('session_id');
      if (!sessionId) {
        setError('ID da sessão não foi fornecido na URL');
        setLoading(false);
        return;
      }

      console.log('CPF do usuário:', cpf); // Debug
      console.log('isAuthenticated:', isAuthenticated); // Debug
      if (!cpf || !isAuthenticated) {
        setError('CPF do cliente não está disponível. Redirecionando para o login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/pagamentos/order-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, cpfCliente: cpf }),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Resposta do servidor:', text);
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || 'Erro ao buscar detalhes do pedido');
        }

        const data = await response.json();
        if (!data || !data.idPedido) {
          throw new Error('Detalhes do pedido não encontrados na resposta');
        }

        setOrderDetails(data);
      } catch (err: any) {
        console.error('Erro ao buscar detalhes do pedido:', err);
        setError(err.message || 'Erro desconhecido ao buscar detalhes do pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location, cpf, isAuthenticated, authLoading, navigate]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box display="flex" gap={1} alignItems="center" mb={2}>
        <BackButton />
        <Typography variant="h4" fontWeight="bold" ml={2}>
          Pedido Confirmado
        </Typography>
      </Box>

      <Stack spacing={3}>
        {authLoading ? (
          <Typography color="text.secondary">Carregando informações de autenticação...</Typography>
        ) : loading ? (
          <Typography color="text.secondary">Carregando detalhes do pedido...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : orderDetails ? (
          <>
            <Typography variant="h6" color="success.main">
              Pedido #{orderDetails.idPedido} realizado com sucesso!
            </Typography>
            <Box>
              <Typography variant="body1">
                <strong>Número do Pedido:</strong> {orderDetails.idPedido}
              </Typography>
              <Typography variant="body1">
                <strong>Valor Total:</strong> R$ {orderDetails.preco.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {orderDetails.status}
              </Typography>
              <Typography variant="body1">
                <strong>Endereço:</strong> {orderDetails.endereco}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography color="text.secondary">Nenhum detalhe do pedido encontrado.</Typography>
        )}
      </Stack>
    </Container>
  );
};

export default Success;