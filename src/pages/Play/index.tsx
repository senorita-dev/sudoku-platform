import { Link } from 'react-router-dom'
import SudokuGrid from 'src/components/sudoku/SudokuGrid'
import { useSudokuStore } from 'src/hooks/useSudokuStore'

function Play() {
  const { state, dispatch } = useSudokuStore()

  return (
    <div className="flex flex-grow flex-col items-center p-2">
      <h1 className="text-4xl font-bold">Play</h1>
      <Link to="/">Home</Link>
      <button onClick={() => dispatch({ type: 'LOAD' })}>load</button>
      <button onClick={() => dispatch({ type: 'CLEAR' })}>clear</button>
      <div className="h-[min(80vw,80vh)] w-[min(80vw,80vh)] bg-white">
        <SudokuGrid grid={state.grid} />
      </div>
    </div>
  )
}

export default Play
