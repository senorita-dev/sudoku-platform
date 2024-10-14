import { BehaviorSubject } from 'rxjs'
import { Grid } from 'src/types'
import { getSudoku } from 'sudoku-gen'

interface LoadAction {
  type: 'LOAD'
}
interface ClearAction {
  type: 'CLEAR'
}
interface ResetAction {
  type: 'RESET'
}
interface InputCellAction {
  type: 'INPUT_CELL'
  payload: { row: number; col: number; value: number }
}

export type SudokuAction = LoadAction | ClearAction | ResetAction | InputCellAction

export interface SudokuState {
  grid: Grid
  originalGrid: Grid
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
      const newGrid = getNewGrid()
      return { ...state, grid: newGrid, originalGrid: newGrid }
    }
    case 'CLEAR': {
      const newGrid = getEmptyGrid()
      return { ...state, grid: newGrid, originalGrid: newGrid }
    }
    case 'RESET': {
      return { ...state, grid: state.originalGrid }
    }
    case 'INPUT_CELL': {
      const { row, col, value } = action.payload
      if (value < 1 || value > 9) {
        return state
      }
      const newGrid = state.grid
      newGrid[row][col] = value
      // grid[row][col] = value
      return { ...state, grid: newGrid }
    }
    default: {
      return assertNever(action)
    }
  }
}

export const store = new BehaviorSubject<SudokuState>(initialState)

store.subscribe((state) => {
  localStorage.setItem('sudokuState', JSON.stringify(state))
})
