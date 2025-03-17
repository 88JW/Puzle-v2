import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shufflePieces, resetPieces } from '../redux/puzzleSlice';
import { startGame, resetGame, endGame, setDifficulty } from '../redux/gameSlice';

const Controls = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector(state => state.game?.isStarted || false);
  const imageLoaded = useSelector(state => state.image?.loaded || false);
  const difficulty = useSelector(state => state.game?.difficulty || 'medium');
  const startTime = useSelector(state => state.game?.startTime);
  const endTime = useSelector(state => state.game?.endTime);
  const moves = useSelector(state => state.game?.moves || 0);
  
  // State for the timer
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Timer effect
  useEffect(() => {
    let timerInterval;
    
    if (isGameStarted && !isPaused) {
      timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isGameStarted, isPaused, startTime]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleShuffle = () => {
    console.log('Shuffling pieces...');
    dispatch(shufflePieces());
    if (!isGameStarted) {
      console.log('Starting game...');
      dispatch(startGame());
      setIsPaused(false);
    }
  };

  const handleReset = () => {
    console.log('Resetting pieces and game...');
    dispatch(resetPieces());
    dispatch(resetGame());
    setElapsedTime(0);
    setIsPaused(false);
  };

  const handleStartGame = () => {
    console.log('Handling start game...');
    if (!isGameStarted) {
      console.log('Starting game...');
      dispatch(startGame());
      dispatch(shufflePieces());
      setIsPaused(false);
    } else {
      console.log('Resetting and starting game...');
      dispatch(resetGame());
      dispatch(resetPieces());
      dispatch(startGame());
      dispatch(shufflePieces());
      setIsPaused(false);
    }
  };
  
  const handlePauseResume = () => {
    if (isPaused) {
      // Resume: We need to adjust the start time to account for paused time
      const pausedTime = Date.now() - (startTime + elapsedTime * 1000);
      dispatch({
        type: 'game/resumeGame',
        payload: pausedTime
      });
      setIsPaused(false);
    } else {
      // Pause
      setIsPaused(true);
    }
  };
  
  const handleDifficultyChange = (e) => {
    dispatch(setDifficulty(e.target.value));
  };

  return (
    <div className="mt-4">
      {/* Game info display */}
      <div className="flex justify-between items-center mb-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded">
        <div className="text-sm">
          <span className="font-semibold">Difficulty: </span>
          <span className="capitalize">{difficulty}</span>
        </div>
        
        {isGameStarted && (
          <div className="text-sm">
            <span className="font-semibold">Time: </span>
            <span>{formatTime(elapsedTime)}</span>
          </div>
        )}
        
        {isGameStarted && (
          <div className="text-sm">
            <span className="font-semibold">Moves: </span>
            <span>{moves}</span>
          </div>
        )}
      </div>
      
      {/* Difficulty selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Select Difficulty:
        </label>
        <select
          value={difficulty}
          onChange={handleDifficultyChange}
          disabled={isGameStarted}
          className={`w-full p-2 rounded border ${isGameStarted ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <option value="easy">Easy (3×3)</option>
          <option value="medium">Medium (4×4)</option>
          <option value="hard">Hard (5×5)</option>
        </select>
      </div>
      
      {/* Game control buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={handleShuffle}
          disabled={!imageLoaded || isPaused}
          className={`px-4 py-2 rounded transition-colors flex items-center
                    ${imageLoaded && !isPaused
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Shuffle
        </button>
        
        <button
          onClick={handleReset}
          disabled={!imageLoaded}
          className={`px-4 py-2 rounded transition-colors flex items-center
                    ${imageLoaded 
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Reset
        </button>
        
        {isGameStarted && (
          <button
            onClick={handlePauseResume}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors flex items-center"
          >
            {isPaused ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Resume
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Pause
              </>
            )}
          </button>
        )}
        
        <button
          onClick={handleStartGame}
          disabled={!imageLoaded}
          className={`px-4 py-2 rounded transition-colors flex items-center
                    ${imageLoaded 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          {isGameStarted ? 'Restart Game' : 'Start Game'}
        </button>
      </div>
    </div>
  );
};

export default Controls;
