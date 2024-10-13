import { Cell } from 'src/types'

interface SudokuCellProps {
  value: Cell
  rowIndex: number
  colIndex: number
}

export default function SudokuCell({ value, rowIndex, colIndex }: SudokuCellProps) {
  return (
    <div
      className={`flex h-full w-full select-none items-center justify-center border text-2xl hover:bg-purple-100 md:text-3xl lg:text-5xl ${colIndex % 3 === 2 ? 'border-r-4' : 'border-r'} ${colIndex === 0 ? 'border-l-4' : ''} ${rowIndex % 3 === 2 ? 'border-b-4' : 'border-b'} ${rowIndex === 0 ? 'border-t-4' : ''}`}
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
