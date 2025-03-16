import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    isStarted: false,
    moves: 0,
    difficulty: 'medium',
    startTime: null,
    endTime: null,
  },
  reducers: {
    startGame: (state) => {
      state.isStarted = true;
      state.startTime = Date.now();
      state.moves = 0;
    },
    resetGame: (state) => {
      state.isStarted = false;
      state.moves = 0;
      state.startTime = null;
      state.endTime = null;
    },
    endGame: (state) => {
      state.isStarted = false;
      state.endTime = Date.now();
    },
    incrementMoves: (state) => {
      state.moves += 1;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    resumeGame: (state, action) => {
      state.startTime += action.payload;
    },
  },
});

export const { startGame, resetGame, endGame, incrementMoves, setDifficulty, resumeGame } = gameSlice.actions;
export default gameSlice.reducer;
