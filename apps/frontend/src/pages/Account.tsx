import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type AccountProps = {
  toggleTheme: () => void;
  themeMode: 'light' | 'dark';
};

const Account = ({ toggleTheme, themeMode }: AccountProps) => {
  const navigate = useNavigate();

  const initialUser = {
    name: 'João Pizza',
    email: 'joao.pizza@example.com',
    phone: '31 998161699',
    address: 'Rua Margherita, 123 - São Paulo, SP',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [phone, setPhone] = useState(initialUser.phone);

  const handleToggleEdit = () => {
    if (isEditing) {
      console.log('Saving...', { name, email, phone });
    }
    setIsEditing(!isEditing);
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={2} pt={{xs: 2, sm: 5}} pb={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle1">
              Modo {themeMode === 'light' ? 'claro' : 'escuro'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Alterar tema do aplicativo
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Brightness7Icon />
            <Switch
              checked={themeMode === 'dark'}
              onChange={toggleTheme}
              inputProps={{ 'aria-label': 'toggle theme' }}
            />
            <Brightness4Icon />
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={2} py={2}>
        <Stack spacing={2} alignItems="center" width="100%">
          <Avatar sx={{ width: 80, height: 80 }}>{name[0]}</Avatar>
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            InputProps={{ readOnly: !isEditing }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputProps={{ readOnly: !isEditing }}
          />
          <TextField
            label="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            InputProps={{ readOnly: !isEditing }}
          />

          <Button
            variant={isEditing ? 'contained' : 'outlined'}
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            sx={{ alignSelf: 'stretch' }}
            onClick={handleToggleEdit}
          >
            {isEditing ? 'Salvar alterações' : 'Editar informações'}
          </Button>
        </Stack>

        {/* Endereço atual */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <LocationOnIcon color="primary" sx={{ mt: 0.5 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Endereço atual</Typography>
            <Typography variant="body2" color="text.secondary">
              {initialUser.address}
            </Typography>
          </Box>
          <Button size="small" onClick={() => navigate('/address')} sx={{ mt: 0.5 }}>
            Alterar
          </Button>
        </Paper>

        {/* Forma de pagamento */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <CreditCardIcon color="action" sx={{ mt: 0.5 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Forma de pagamento</Typography>
            <Typography variant="body2" color="text.secondary">
              Nenhuma forma cadastrada
            </Typography>
          </Box>
          <Button size="small" onClick={() => navigate('/payment-method')} sx={{ mt: 0.5 }}>
            Alterar
          </Button>
        </Paper>

        <Divider />
        <Button variant="contained" color="error" fullWidth>
          Sair da conta
        </Button>
      </Stack>
    </Container>
  );
};

export default Account;
