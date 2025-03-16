import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import ImageUploader from './components/ImageUploader'
import PuzzleContainer from './components/PuzzleContainer'
import Controls from './components/Controls'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const imageLoaded = useSelector((state) => state.image.loaded)
  const gameStarted = useSelector((state) => state.game.isStarted)
  const isSolved = useSelector((state) => state.puzzle.isSolved)
  const moves = useSelector((state) => state.game.moves)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Puzle v2</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <ImageUploader />
        
        {imageLoaded && (
          <DndProvider backend={HTML5Backend}>
            <PuzzleContainer />
            <Controls />
            
            {gameStarted && (
              <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
                Moves: {moves}
              </div>
            )}
            
            {isSolved && gameStarted && (
              <div className="mt-4 text-center text-green-500 font-bold">
                Puzzle solved! Congratulations!
              </div>
            )}
          </DndProvider>
        )}
      </div>
    </div>
  )
}

export default App
