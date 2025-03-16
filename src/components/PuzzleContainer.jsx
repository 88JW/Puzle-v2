import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PuzzlePiece from './PuzzlePiece';
import { incrementMoves } from '../redux/gameSlice';
import { checkSolved } from '../redux/puzzleSlice';

const PuzzleContainer = () => {
  const dispatch = useDispatch();
  const pieces = useSelector((state) => state.puzzle.pieces);

  const movePiece = (fromIndex, toIndex) => {
    const newPieces = [...pieces];
    [newPieces[fromIndex], newPieces[toIndex]] = [newPieces[toIndex], newPieces[fromIndex]];
    dispatch({ type: 'puzzle/setPieces', payload: newPieces });
    dispatch(incrementMoves());
    dispatch(checkSolved());
  };

  const gridSizeX = Math.sqrt(pieces.length);
  const gridSizeY = Math.sqrt(pieces.length);

  return (
    <div className={`puzzle-container grid grid-cols-${gridSizeX} gap-1 p-2 bg-gray-200 rounded-lg`}>
      {pieces.map((piece, index) => (
        <PuzzlePiece key={piece.id} piece={piece} index={index} movePiece={movePiece} />
      ))}
    </div>
  );
};

export default PuzzleContainer;
