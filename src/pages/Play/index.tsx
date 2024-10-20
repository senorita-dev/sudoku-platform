import SudokuGrid from '@/components/sudoku/SudokuGrid'
import { useSudokuActions, useSudokuDifficulty } from '@/hooks/useSudokuStore'
import { Link } from 'react-router-dom'

function Play() {
  const dispatch = useSudokuActions()
  const difficulty = useSudokuDifficulty()

  return (
    <div className="flex flex-grow flex-col items-center p-2">
      <h1 className="text-4xl font-bold">Play</h1>
      <Link to="/">Home</Link>
      <div className="flex gap-4">
        <button onClick={() => dispatch({ type: 'LOAD' })}>load</button>
        <button onClick={() => dispatch({ type: 'CLEAR' })}>clear</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
        <button onClick={() => dispatch({ type: 'SET_EDIT_MODE', payload: 'normal' })}>edit normal mode</button>
        <button onClick={() => dispatch({ type: 'SET_EDIT_MODE', payload: 'pencil' })}>edit pencil mode</button>
      </div>
      <div className="h-[min(80vw,80vh)] w-[min(80vw,80vh)] bg-white">
        <SudokuGrid />
      </div>
      <div>
        <span>{difficulty && <>difficulty: {difficulty}</>} </span>
      </div>
    </div>
  )
}

export default Play
