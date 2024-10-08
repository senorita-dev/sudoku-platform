import { BehaviorSubject } from 'rxjs'
import { Grid } from 'src/types'
import { getSudoku } from 'sudoku-gen'

export type SudokuAction = { type: 'LOAD' | 'CLEAR' }

export interface SudokuState {
  grid: Grid
}

function getEmptyGrid(): Grid {
  return Array(9)
    .fill(null)
    .map(() => Array(9).fill(null))
}

function getNewGrid(): Grid {
  const sudoku = getSudoku()
  const newGrid = getEmptyGrid()
  sudoku.puzzle.split('').forEach((char, index) => {
    const row = Math.floor(index / 9)
    const col = index % 9
    newGrid[row][col] = char === '-' ? null : parseInt(char)
  })
  return newGrid
}

function assertNever(action: never): never {
  throw new Error(`Invalid action: ${action}`)
}

const savedState = localStorage.getItem('sudokuState')
const initialState: SudokuState = savedState ? JSON.parse(savedState) : { grid: getEmptyGrid() }

export function sudokuReducer(state = initialState, action: SudokuAction): SudokuState {
  switch (action.type) {
    case 'LOAD': {
      return { ...state, grid: getNewGrid() }
    }
    case 'CLEAR':
      return { ...state, grid: getEmptyGrid() }
    default:
      return assertNever(action.type)
  }
}

export const store = new BehaviorSubject<SudokuState>(initialState)

store.subscribe((state) => {
  localStorage.setItem('sudokuState', JSON.stringify(state))
})
