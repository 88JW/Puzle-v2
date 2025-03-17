import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PuzzlePiece from './PuzzlePiece';
import { incrementMoves } from '../redux/gameSlice';
import { checkSolved } from '../redux/puzzleSlice';

const PuzzleContainer = () => {
  const dispatch = useDispatch();
  const pieces = useSelector((state) => state.puzzle.pieces);
  const difficulty = useSelector((state) => state.game.difficulty);

  const movePiece = (fromIndex, toIndex) => {
    const newPieces = [...pieces];
    [newPieces[fromIndex], newPieces[toIndex]] = [newPieces[toIndex], newPieces[fromIndex]];
    dispatch({ type: 'puzzle/setPieces', payload: newPieces });
    dispatch(incrementMoves());
    dispatch(checkSolved());
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
    <div className="puzzle-container" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: '1px', padding: '5px', backgroundColor: '#ccc', borderRadius: '10px' }}>
      {pieces.map((piece, index) => (
        <PuzzlePiece key={piece.id} piece={piece} index={index} movePiece={movePiece} />
      ))}
    </div>
  );
};

export default PuzzleContainer;
