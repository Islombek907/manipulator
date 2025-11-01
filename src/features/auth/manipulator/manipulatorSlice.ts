import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CommandHistoryItem = {
  id: string;
  raw: string;
  optimized: string;
  date: string;
  samplesBefore: string;
  samplesAfter: string;
};

type Sample = { x: number; y: number; id: string };

type ManipulatorState = {
  gridSize: number;
  position: { x: number; y: number };
  samples: Sample[];
  carrying?: Sample | null;
  history: CommandHistoryItem[];
};

const initialState: ManipulatorState = {
  gridSize: 10,
  position: { x: 0, y: 0 },
  samples: [],
  carrying: null,
  history: [],
};

const manipulatorSlice = createSlice({
  name: 'manipulator',
  initialState,
  reducers: {
    setPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.position = action.payload;
    },
    pushHistory(state, action: PayloadAction<CommandHistoryItem>) {
      state.history.unshift(action.payload);
    },
    clearHistory(state) {
      state.history = [];
    },
  },
});

export const { setPosition, pushHistory, clearHistory } = manipulatorSlice.actions;
export default manipulatorSlice.reducer;
