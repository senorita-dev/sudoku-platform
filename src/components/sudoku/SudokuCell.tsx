interface SudokuCellProps {
  value: number
  rowIndex: number
  colIndex: number
}

export default function SudokuCell({ value, rowIndex, colIndex }: SudokuCellProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center border text-2xl md:text-3xl lg:text-5xl ${colIndex % 3 === 2 ? 'border-r-4' : 'border-r'} ${colIndex === 0 ? 'border-l-4' : ''} ${rowIndex % 3 === 2 ? 'border-b-4' : 'border-b'} ${rowIndex === 0 ? 'border-t-4' : ''}`}
    >
      {value}
    </div>
  )
}
