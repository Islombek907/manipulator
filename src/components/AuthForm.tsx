import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';

type Form = { login: string; password: string };

export const AuthForm = () => {
  const { register, handleSubmit } = useForm<Form>();
  const navigate = useNavigate();

  const onSubmit = (data: Form) => {
    if (data.login === 'admin' && data.password === 'admin') {
      navigate('/control');
    } else {
      alert('Неверные данные');
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width={300} mx="auto" mt={10}>
      <Typography variant="h5">Авторизация</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Логин" {...register('login', { required: true })} fullWidth margin="normal" />
        <TextField label="Пароль" type="password" {...register('password', { required: true })} fullWidth margin="normal" />
        <Button type="submit" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Box>
  );
};
