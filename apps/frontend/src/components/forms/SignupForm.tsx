import { Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type SignupFormProps = {
  onSubmit: (data: {
    cpf: string;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
  }) => void;
  buttonLabel: string;
  onLinkClick: () => void;
};

const SignupForm = ({ onSubmit, buttonLabel, onLinkClick }: SignupFormProps) => {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ cpf, nome, email, senha, telefone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="CPF" fullWidth value={cpf} onChange={(e) => setCpf(e.target.value)} />
        <TextField label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
        <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Senha" type="password" fullWidth value={senha} onChange={(e) => setSenha(e.target.value)} />
        <TextField label="Telefone" fullWidth value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth>
          {buttonLabel}
        </Button>
        <Typography textAlign="center" variant="body2">
  Já tem uma conta?{' '}
  <Link component="button" type="button" onClick={onLinkClick}>
    Entrar
  </Link>
</Typography>

      </Stack>
    </form>
  );
};

export default SignupForm;
