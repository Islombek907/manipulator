import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box } from '@mui/material';
import { optimizeCommand } from '../features/auth/manipulator/optimization';

export const CommandInput: React.FC<{ onRun: (raw: string, optimized: string) => void }> = ({ onRun }) => {
  const { register, handleSubmit, setValue } = useForm<{ cmd: string }>();

  const onSubmit = (data: { cmd: string }) => {
    const raw = data.cmd.replace(/\s+/g, '').toUpperCase();
    if (!/^[ЛПВНОБ]+$/.test(raw)) return alert('Недопустимые символы');
    const opt = optimizeCommand(raw);
    onRun(raw, opt);
    setValue('cmd', '');
  };

  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField {...register('cmd')} label="Введите команды" fullWidth />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Запустить
      </Button>
    </Box>
  );
};
