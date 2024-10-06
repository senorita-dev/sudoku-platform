import { useState } from 'react'
import { Link } from 'react-router-dom'
import SudokuGrid from 'src/components/sudoku/SudokuGrid'
import { Grid } from 'src/types'
import { getSudoku } from 'sudoku-gen'

function getEmptyGrid(): Grid {
  const emptyGrid = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null))
  return emptyGrid
}

function Play() {
  const [grid, setGrid] = useState<Grid>(getEmptyGrid())
  function loadGrid() {
    const sudoku = getSudoku()
    const newGrid = getEmptyGrid()
    sudoku.puzzle.split('').forEach((char, index) => {
      const row = Math.floor(index / 9)
      const col = index % 9
      if (char === '-') {
        newGrid[row][col] = null
      } else {
        newGrid[row][col] = parseInt(char)
      }
    })
    setGrid(newGrid)
  }
  function clearGrid() {
    setGrid(getEmptyGrid())
  }
  return (
    <div className="flex flex-grow flex-col items-center p-2">
      <h1 className="text-4xl font-bold">Play</h1>
      <Link to="/">Home</Link>
      <button onClick={loadGrid}>load</button>
      <button onClick={clearGrid}>clear</button>
      <div className="h-[min(80vw,80vh)] w-[min(80vw,80vh)] bg-white">
        <SudokuGrid grid={grid} />
      </div>
    </div>
  )
}

export default Play
