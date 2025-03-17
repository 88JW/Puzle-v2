import { createSlice } from '@reduxjs/toolkit';
import { endGame } from './gameSlice';

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
      state.isSolved = false; // Reset isSolved when setting new pieces
    },
    shufflePieces: (state) => {
      console.log('Shuffling pieces...');
      state.pieces = state.pieces
        .map(piece => ({ ...piece, currentPosition: piece.correctPosition }))
        .sort(() => Math.random() - 0.5);
      state.isSolved = false; // Reset isSolved when shuffling pieces
    },
    resetPieces: (state) => {
      console.log('Resetting pieces...');
      state.pieces = state.pieces.map((piece, index) => ({
        ...piece,
        currentPosition: index,
      }));
      state.isSolved = false; // Reset isSolved when resetting pieces
    },
    checkSolved: (state) => {
      console.log('Checking if puzzle is solved...');
      state.isSolved = state.pieces.every(
        (piece) => piece.currentPosition === piece.correctPosition
      );
      if (state.isSolved) {
        console.log('Puzzle is solved!');
      }
    },
    movePiece: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const pieceToMove = state.pieces[fromIndex];
      const targetPiece = state.pieces[toIndex];
      pieceToMove.currentPosition = toIndex;
      targetPiece.currentPosition = fromIndex;
      state.pieces[fromIndex] = targetPiece;
      state.pieces[toIndex] = pieceToMove;
      state.isSolved = state.pieces.every(
        (piece) => piece.currentPosition === piece.correctPosition
      );
      if (state.isSolved) {
        console.log('Puzzle is solved!');
        state.dispatch(endGame()); // End the game when puzzle is solved
      }
    },
  },
});

export const { setPieces, shufflePieces, resetPieces, checkSolved, movePiece } = puzzleSlice.actions;
export default puzzleSlice.reducer;
