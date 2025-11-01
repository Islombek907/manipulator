import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type Props = { history: { raw: string; optimized: string }[] };

export const HistoryTable: React.FC<Props> = ({ history }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Команда</TableCell>
            <TableCell>Оптимизированная</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((h, i) => (
            <TableRow key={i}>
              <TableCell>{h.raw}</TableCell>
              <TableCell>{h.optimized}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
