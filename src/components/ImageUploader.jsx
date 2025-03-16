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
      
      // Dispatch the image URL to Redux store
      dispatch(loadImage(imageUrl));
      
      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        // Set image dimensions
        dispatch(setDimensions({
          width: img.width,
          height: img.height
        }));
        
        // Create puzzle pieces based on the image
        createPuzzlePieces(imageUrl, img.width, img.height);
      };
      img.src = imageUrl;
    };
    
    reader.onerror = () => {
      setErrorMessage('Error reading the file. Please try again.');
    };
    
    reader.readAsDataURL(file);
  };

  const createPuzzlePieces = (imageUrl, width, height) => {
    const pieceSize = 100; // 100x100 pixels
    const pieces = [];
    const gridSizeX = Math.floor(width / pieceSize);
    const gridSizeY = Math.floor(height / pieceSize);
    
    for (let row = 0; row < gridSizeY; row++) {
      for (let col = 0; col < gridSizeX; col++) {
        const id = row * gridSizeX + col;
        pieces.push({
          id,
          imageUrl,
          correctPosition: id,
          currentPosition: id,
          width: pieceSize,
          height: pieceSize,
          x: col * pieceSize,
          y: row * pieceSize
        });
      }
    }
    
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
