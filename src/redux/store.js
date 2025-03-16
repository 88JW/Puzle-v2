import { configureStore } from '@reduxjs/toolkit';
import puzzleReducer from './puzzleSlice';
import imageReducer from './imageSlice';
import gameReducer from './gameSlice';

const store = configureStore({
  reducer: {
    puzzle: puzzleReducer,
    image: imageReducer,
    game: gameReducer
  }
});

export default store;
