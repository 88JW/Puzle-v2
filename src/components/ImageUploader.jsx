import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadImage, setDimensions } from '../redux/imageSlice';
import { setPieces } from '../redux/puzzleSlice';

const ImageUploader = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const difficulty = useSelector(state => state.game.difficulty);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setErrorMessage(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setPreview(imageUrl);
      console.log('Image loaded:', imageUrl);
      
      // Dispatch the image URL to Redux store
      dispatch(loadImage(imageUrl));
      
      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        console.log('Original image dimensions:', img.width, img.height);
        
        // Resize image if it's too large
        const maxDimension = 1000;
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.floor((height / width) * maxDimension);
            width = maxDimension;
          } else {
            width = Math.floor((width / height) * maxDimension);
            height = maxDimension;
          }
        }

        console.log('Resized image dimensions:', width, height);

        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const resizedImageUrl = canvas.toDataURL();

        // Set image dimensions
        dispatch(setDimensions({
          width,
          height
        }));
        
        // Create puzzle pieces based on the resized image
        createPuzzlePieces(resizedImageUrl, width, height);
      };
      img.src = imageUrl;
    };
    
    reader.onerror = () => {
      setErrorMessage('Error reading the file. Please try again.');
    };
    
    reader.readAsDataURL(file);
  };

  const createPuzzlePieces = (imageUrl, width, height) => {
    console.log('Creating puzzle pieces...');
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

    const pieceWidth = width / gridSize;
    const pieceHeight = height / gridSize;
    const pieces = [];
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const id = row * gridSize + col;
        pieces.push({
          id,
          imageUrl,
          correctPosition: id,
          currentPosition: id,
          width: pieceWidth,
          height: pieceHeight,
          x: col * pieceWidth,
          y: row * pieceHeight
        });
        console.log(`Piece ${id}: x=${col * pieceWidth}, y=${row * pieceHeight}, width=${pieceWidth}, height=${pieceHeight}`);
      }
    }
    
    console.log('Puzzle pieces created:', pieces);
    dispatch(setPieces(pieces));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <button
        onClick={triggerFileInput}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Select Image
      </button>
      
      {errorMessage && (
        <div className="mt-2 text-red-500 text-sm">{errorMessage}</div>
      )}
      
      {preview && (
        <div className="mt-4">
          <p className="text-sm mb-2">Preview:</p>
          <img 
            src={preview} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded border border-gray-300" 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
