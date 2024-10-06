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
  const grid = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0))
  grid[0][0] = null
  grid[0][1] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  grid[0][2] = [1, 5, 9]
  grid[0][3] = [9, 5, 6, 7]
  return grid
}
