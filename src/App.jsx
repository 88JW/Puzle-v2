import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './store/reducers/counterReducer'
import './App.css'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Puzle v2</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => dispatch(decrement())}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            -
          </button>
          <span className="text-xl font-semibold dark:text-white"> count is {count} </span>
          <button 
            onClick={() => dispatch(increment())}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
