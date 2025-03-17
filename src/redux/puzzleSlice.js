import { createSlice } from '@reduxjs/toolkit';

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: {
    pieces: [],
    isSolved: false,
  },
  reducers: {
    setPieces: (state, action) => {
      console.log('Setting pieces:', action.payload);
      state.pieces = action.payload;
    },
    shufflePieces: (state) => {
      console.log('Shuffling pieces...');
      state.pieces = state.pieces
        .map(piece => ({ ...piece, currentPosition: piece.correctPosition }))
        .sort(() => Math.random() - 0.5);
    },
    resetPieces: (state) => {
      console.log('Resetting pieces...');
      state.pieces = state.pieces.map((piece, index) => ({
        ...piece,
        currentPosition: index,
      }));
    },
    checkSolved: (state) => {
      console.log('Checking if puzzle is solved...');
      state.isSolved = state.pieces.every(
        (piece) => piece.currentPosition === piece.correctPosition
      );
    },
  },
});

export const { setPieces, shufflePieces, resetPieces, checkSolved } = puzzleSlice.actions;
export default puzzleSlice.reducer;
