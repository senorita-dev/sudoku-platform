import SudokuCell from '@/components/sudoku/SudokuCell'
import { useSudokuActions, useSudokuState } from '@/hooks/useSudokuStore'
import { CellPosition, Grid } from '@/types'
import { useEffect } from 'react'

const numbers = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

export default function SudokuGrid() {
  const { grid, originalGrid, selectedPosition } = useSudokuState()
  const dispatch = useSudokuActions()

  useEffect(() => {
    const { row, col } = selectedPosition
    const handleKeyDown = (event: KeyboardEvent) => {
      const { shiftKey, ctrlKey, key } = event
      if (key === 'Tab') {
        const unsolvedCellPosition = shiftKey
          ? getPrevUnsolvedCell(selectedPosition, grid)
          : getNextUnsolvedCell(selectedPosition, grid)
        if (unsolvedCellPosition !== undefined) {
          dispatch({ type: 'SET_SELECTED_POSITION', payload: unsolvedCellPosition })
        }
        event.preventDefault()
      } else if (key === 'ArrowUp') {
        dispatch({ type: 'SET_SELECTED_POSITION', payload: { row: ctrlKey ? 0 : Math.max(row - 1, 0), col } })
      } else if (key === 'ArrowDown') {
        dispatch({ type: 'SET_SELECTED_POSITION', payload: { row: ctrlKey ? 8 : Math.min(row + 1, 8), col } })
      } else if (key === 'ArrowLeft') {
        dispatch({ type: 'SET_SELECTED_POSITION', payload: { row, col: ctrlKey ? 0 : Math.max(col - 1, 0) } })
      } else if (key === 'ArrowRight') {
        dispatch({ type: 'SET_SELECTED_POSITION', payload: { row, col: ctrlKey ? 8 : Math.min(col + 1, 8) } })
      } else if (numbers.has(key)) {
        dispatch({
          type: 'INPUT_CELL',
          payload: { row: selectedPosition.row, col: selectedPosition.col, value: parseInt(key) },
        })
      } else if (key === 'Delete' || key === 'Backspace' || key === '0') {
        dispatch({
          type: 'CLEAR_CELL',
          payload: { row: selectedPosition.row, col: selectedPosition.col },
        })
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedPosition, grid, dispatch])

  return (
    <div className="grid h-full w-full grid-cols-9 grid-rows-9 overflow-hidden">
      {grid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            value={cellValue}
            row={rowIndex}
            col={colIndex}
            original={typeof originalGrid[rowIndex][colIndex] === 'number'}
            selected={rowIndex === selectedPosition.row && colIndex === selectedPosition.col}
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
