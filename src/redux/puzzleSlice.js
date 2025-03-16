import { createSlice } from '@reduxjs/toolkit';

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: {
    pieces: [],
    isSolved: false,
  },
  reducers: {
    setPieces: (state, action) => {
      state.pieces = action.payload;
    },
    shufflePieces: (state) => {
      state.pieces = state.pieces
        .map(piece => ({ ...piece, currentPosition: piece.correctPosition }))
        .sort(() => Math.random() - 0.5);
    },
    resetPieces: (state) => {
      state.pieces = state.pieces.map((piece, index) => ({
        ...piece,
        currentPosition: index,
      }));
    },
    checkSolved: (state) => {
      state.isSolved = state.pieces.every(
        (piece) => piece.currentPosition === piece.correctPosition
      );
    },
  },
});

export const { setPieces, shufflePieces, resetPieces, checkSolved } = puzzleSlice.actions;
export default puzzleSlice.reducer;
