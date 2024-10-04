import SudokuCell from './SudokuCell'
import { useMemo } from 'react'

export default function SudokuGrid() {
  const grid = useMemo(() => generateGrid(), [])
  return (
    <div className="grid aspect-square grid-cols-9 border-[3px] md:border-[6px]">
      {grid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 md:border-r-[3px]' : ''} ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 md:border-b-[3px]' : ''}`}
          >
            <SudokuCell value={cellValue} />
          </div>
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
