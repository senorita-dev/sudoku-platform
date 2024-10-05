import SudokuCell from './SudokuCell'
import { useMemo } from 'react'

export default function SudokuGrid() {
  const grid = useMemo(() => generateGrid(), [])

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

function generateGrid(): number[][] {
  return Array(9)
    .fill(0)
    .map(() => Array(9).fill(0))
}
