import SudokuCell from './SudokuCell'
import { Grid } from 'src/types'

interface SudokuGridProps {
  grid: Grid
}

export default function SudokuGrid({ grid }: SudokuGridProps) {
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
