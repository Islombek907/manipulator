import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

type Cell = { x: number; y: number };
type Command = 'Л' | 'П' | 'В' | 'Н' | 'О' | 'Б';

interface Props {
  commandString: string;
  gridSize?: number;
  speed?: number; 
}

export const GridVisualizer: React.FC<Props> = ({ commandString, gridSize = 10, speed = 300 }) => {
  const [position, setPosition] = useState<Cell>({ x: 0, y: 0 });
  const [samples, setSamples] = useState<Cell[]>([{ x: 4, y: 4 }]);
  const [carrying, setCarrying] = useState<Cell | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!commandString || running) return;
    setRunning(true);

    const commands = commandString.split('') as Command[];
    let step = 0;
    let x = 0;
    let y = 0;
    let localSamples = [...samples];
    let carryingSample: Cell | null = null;

    const interval = setInterval(() => {
      const cmd = commands[step];
      if (!cmd) {
        clearInterval(interval);
        setRunning(false);
        return;
      }

      if (cmd === 'Л') x = Math.max(0, x - 1);
      if (cmd === 'П') x = Math.min(gridSize - 1, x + 1);
      if (cmd === 'В') y = Math.max(0, y - 1);
      if (cmd === 'Н') y = Math.min(gridSize - 1, y + 1);

      if (cmd === 'О') {
        const sampleIndex = localSamples.findIndex(s => s.x === x && s.y === y);
        if (sampleIndex !== -1) {
          carryingSample = localSamples[sampleIndex];
          localSamples.splice(sampleIndex, 1);
        }
      }

      if (cmd === 'Б' && carryingSample) {
        localSamples.push({ x, y });
        carryingSample = null;
      }

      setPosition({ x, y });
      setSamples([...localSamples]);
      setCarrying(carryingSample);
      step++;
    }, speed);

    return () => clearInterval(interval);
  }, [commandString]);

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${gridSize}, 30px)`}
      gridTemplateRows={`repeat(${gridSize}, 30px)`}
      gap="2px"
      justifyContent="center"
      mt={3}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, i) => {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);
        const isManipulator = position.x === x && position.y === y;
        const isSample = samples.some(s => s.x === x && s.y === y);
        const isCarrying = carrying && isManipulator;

        return (
          <Box
            key={i}
            width={30}
            height={30}
            bgcolor="#eee"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid #ccc"
          >
            {isManipulator && (
              <Box
                width={20}
                height={20}
                borderRadius="50%"
                bgcolor={isCarrying ? 'orange' : 'red'}
              />
            )}
            {!isManipulator && isSample && (
              <Box width={14} height={14} borderRadius="50%" bgcolor="blue" />
            )}
          </Box>
        );
      })}
    </Box>
  );
};
