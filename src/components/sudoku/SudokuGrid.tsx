import SudokuCell from './SudokuCell'
import { useState } from 'react'
import { useSudokuState } from 'src/hooks/useSudokuStore'
import { CellPosition } from 'src/types'

const defaultCellPosition: CellPosition = { row: 0, col: 0 }

export default function SudokuGrid() {
  const { grid } = useSudokuState()
  const [selectedCell, setSelectedCell] = useState<CellPosition>(defaultCellPosition)
  return (
    <div className="grid h-full w-full grid-cols-9 grid-rows-9 overflow-hidden">
      {grid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            value={cellValue}
            rowIndex={rowIndex}
            colIndex={colIndex}
            selected={rowIndex === selectedCell.row && colIndex === selectedCell.col}
            setSelectedCell={setSelectedCell}
          />
        )),
      )}
    </div>
  )
}
