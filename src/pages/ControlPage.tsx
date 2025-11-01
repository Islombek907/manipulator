import React, { useState } from 'react';
import { CommandInput } from '../components/CommandInput';
import { HistoryTable } from '../components/HistoryTable';
import { GridVisualizer } from '../components/GridVisualizer';
import { Container, Typography } from '@mui/material';

export const ControlPage = () => {
  const [history, setHistory] = useState<{ raw: string; optimized: string }[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');

  const handleRun = (raw: string, optimized: string) => {
    setHistory(prev => [{ raw, optimized }, ...prev]);
    setCurrentCommand(raw);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        Управление манипулятором
      </Typography>
      <CommandInput onRun={handleRun} />
      <GridVisualizer commandString={currentCommand} />
      <HistoryTable history={history} />
    </Container>
  );
};
