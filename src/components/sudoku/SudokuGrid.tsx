import SudokuCell from './SudokuCell'
import { useSudokuState } from 'src/hooks/useSudokuStore'

export default function SudokuGrid() {
  const { grid } = useSudokuState()
  return (
    <div className="grid h-full w-full grid-cols-9 grid-rows-9 overflow-hidden">
      {grid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <SudokuCell key={`${rowIndex}-${colIndex}`} value={cellValue} rowIndex={rowIndex} colIndex={colIndex} />
        )),
      )}
    </div>
  )
}
