import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const PuzzlePiece = ({ piece, index, movePiece }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'PIECE',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'PIECE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        movePiece(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="puzzle-piece border border-gray-300"
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: '100px',
        height: '100px',
        backgroundImage: `url(${piece.imageUrl})`,
        backgroundPosition: `-${piece.x}px -${piece.y}px`,
        backgroundSize: `${piece.width * 3}px ${piece.height * 3}px`, // Adjust based on grid size
      }}
    >

    </div>
  );
};

export default PuzzlePiece;
