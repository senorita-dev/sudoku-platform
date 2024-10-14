import SudokuCell from './SudokuCell'
import { useEffect, useState } from 'react'
import { useSudokuActions, useSudokuState } from 'src/hooks/useSudokuStore'
import { CellPosition, Grid } from 'src/types'

const defaultCellPosition: CellPosition = { row: 0, col: 0 }
const numbers = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

export default function SudokuGrid() {
  const { grid } = useSudokuState()
  const dispatch = useSudokuActions()
  const [selectedCell, setSelectedCell] = useState<CellPosition>(defaultCellPosition)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { shiftKey, ctrlKey, key } = event
      if (key === 'Tab') {
        const unsolvedCellPosition = shiftKey
          ? getPrevUnsolvedCell(selectedCell, grid)
          : getNextUnsolvedCell(selectedCell, grid)
        if (unsolvedCellPosition !== undefined) {
          setSelectedCell(unsolvedCellPosition)
        }
        event.preventDefault()
      } else if (key === 'ArrowUp') {
        setSelectedCell(({ row, col }) => ({ row: ctrlKey ? 0 : Math.max(row - 1, 0), col }))
      } else if (key === 'ArrowDown') {
        setSelectedCell(({ row, col }) => ({ row: ctrlKey ? 8 : Math.min(row + 1, 8), col }))
      } else if (key === 'ArrowLeft') {
        setSelectedCell(({ row, col }) => ({ row, col: ctrlKey ? 0 : Math.max(col - 1, 0) }))
      } else if (key === 'ArrowRight') {
        setSelectedCell(({ row, col }) => ({ row, col: ctrlKey ? 8 : Math.min(col + 1, 8) }))
      } else if (numbers.has(key)) {
        dispatch({
          type: 'INPUT_CELL',
          payload: { row: selectedCell.row, col: selectedCell.col, value: parseInt(key) },
        })
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedCell, grid, dispatch])

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

function getNextUnsolvedCell(currentPosition: CellPosition, grid: Grid): CellPosition | undefined {
  const unsolvedCells = getUnsolvedCells(grid)
  if (unsolvedCells.length === 0) {
    return undefined
  }
  const nextUnsolvedCell = unsolvedCells.find(({ row, col }) => {
    return row > currentPosition.row || (row === currentPosition.row && col > currentPosition.col)
  })
  if (nextUnsolvedCell) {
    return nextUnsolvedCell
  }
  return unsolvedCells[0]
}

function getPrevUnsolvedCell(currentPosition: CellPosition, grid: Grid): CellPosition | undefined {
  const unsolvedCells = getUnsolvedCells(grid).reverse()
  if (unsolvedCells.length === 0) {
    return undefined
  }
  const nextUnsolvedCell = unsolvedCells.find(({ row, col }) => {
    return row < currentPosition.row || (row === currentPosition.row && col < currentPosition.col)
  })
  if (nextUnsolvedCell) {
    return nextUnsolvedCell
  }
  return unsolvedCells[0]
}

function getUnsolvedCells(grid: Grid): CellPosition[] {
  const unsolvedCells: CellPosition[] = []
  grid.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (typeof cell === 'number') return
      unsolvedCells.push({ row: rowIndex, col: colIndex })
    }),
  )
  return unsolvedCells
}
