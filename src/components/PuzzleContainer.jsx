import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PuzzlePiece from './PuzzlePiece';
import { incrementMoves } from '../redux/gameSlice';
import { movePiece } from '../redux/puzzleSlice';

const PuzzleContainer = () => {
  const dispatch = useDispatch();
  const pieces = useSelector((state) => state.puzzle.pieces);
  const difficulty = useSelector((state) => state.game.difficulty);

  const handleMovePiece = (fromIndex, toIndex) => {
    dispatch(movePiece({ fromIndex, toIndex }));
    dispatch(incrementMoves());
  };

  let gridSize;
  switch (difficulty) {
    case 'easy':
      gridSize = 3;
      break;
    case 'medium':
      gridSize = 4;
      break;
    case 'hard':
      gridSize = 5;
      break;
    default:
      gridSize = 4;
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="puzzle-container" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 100px)`, gap: '1px', padding: '5px', backgroundColor: '#ccc', borderRadius: '10px', maxWidth: '100%' }}>
        {pieces.map((piece, index) => (
          <PuzzlePiece key={piece.id} piece={{ ...piece, gridSize }} index={index} movePiece={handleMovePiece} />
        ))}
      </div>
    </div>
  );
};

export default PuzzleContainer;
