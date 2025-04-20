import { Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type SignupFormProps = {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
  buttonLabel: string;
  linkLabel: string;
  onLinkClick: () => void;
};

const SignupForm = ({ onSubmit, buttonLabel, linkLabel, onLinkClick }: SignupFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
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
          {buttonLabel}
        </Button>
        <Typography textAlign="center" variant="body2">
          Already have an account?{' '}
          <Link component="button" onClick={onLinkClick}>
            {linkLabel}
          </Link>
        </Typography>
      </Stack>
    </form>
  );
};

export default SignupForm;
