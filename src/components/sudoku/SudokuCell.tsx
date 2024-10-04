interface SudokuCellProps {
  value: number
}

export default function SudokuCell({ value }: SudokuCellProps) {
  return (
    <div className="flex h-full w-full items-center justify-center border text-xl md:border-[1.5px] md:text-3xl lg:border-2 lg:text-5xl">
      {value}
    </div>
  )
}
