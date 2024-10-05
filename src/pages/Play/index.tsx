import { Link } from 'react-router-dom'
import SudokuGrid from 'src/components/sudoku/SudokuGrid'

function Play() {
  return (
    <div className="flex flex-grow flex-col items-center p-2">
      <h1 className="text-4xl font-bold">Play</h1>
      <Link to="/">Home</Link>
      <div className="h-[max(min(80vw,80vh),480px)] w-[max(min(80vw,80vh),480px)] bg-white">
        <SudokuGrid />
      </div>
    </div>
  )
}

export default Play
