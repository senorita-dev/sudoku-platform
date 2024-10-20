import { useSudokuActions } from '@/hooks/useSudokuStore'
import { Cell } from '@/types'
import React from 'react'

interface SudokuCellProps {
  value: Cell
  row: number
  col: number
  original: boolean
  selected: boolean
}

function SudokuCell({ value, row, col, original, selected }: SudokuCellProps) {
  const dispatch = useSudokuActions()
  return (
    <div
      className={`flex h-full w-full select-none items-center justify-center border text-2xl md:text-3xl lg:text-5xl ${original ? 'font-semibold' : 'text-gray-400'} ${selected ? 'bg-gray-200' : ''} ${col % 3 === 2 ? 'border-r-4' : 'border-r'} ${col === 0 ? 'border-l-4' : ''} ${row % 3 === 2 ? 'border-b-4' : 'border-b'} ${row === 0 ? 'border-t-4' : ''} `}
      onClick={() => dispatch({ type: 'SET_SELECTED_POSITION', payload: { row, col } })}
    >
      <CellComponent value={value} />
    </div>
  )
}

function CellComponent({ value }: { value: Cell }) {
  if (typeof value === 'number') {
    return value
  }
  if (Array.isArray(value)) {
    return <CandidatesCell candidates={value} />
  }
  return null
}

function CandidatesCell({ candidates }: { candidates: number[] }) {
  const children = Array(9)
    .fill(null)
    .map((_, index) => <div key={index} />)
  for (const value of candidates) {
    const index = value - 1
    children[index] = <div key={index}>{value}</div>
  }
  return (
    <div className="flex grid h-full w-full grid-cols-3 grid-rows-3 items-center text-center text-xs md:text-base lg:text-lg">
      {children}
    </div>
  )
}

export default React.memo(SudokuCell)
