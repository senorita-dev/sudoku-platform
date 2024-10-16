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
interface ClearCellAction {
  type: 'CLEAR_CELL'
  payload: { row: number; col: number }
}

export type SudokuAction = LoadAction | ClearAction | ResetAction | InputCellAction | ClearCellAction

export interface SudokuState {
  grid: Grid
  originalGrid: Grid
}

function getEmptyGrid(): Grid {
  return Array(9)
    .fill(null)
    .map(() => Array(9).fill(null))
}

function isGridEmpty(grid: Grid) {
  return grid.every((row) => row.every((cell) => cell === null))
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
const initialState: SudokuState = savedState
  ? JSON.parse(savedState)
  : { grid: getEmptyGrid(), originalGrid: getEmptyGrid() }

export function sudokuReducer(state = initialState, action: SudokuAction): SudokuState {
  switch (action.type) {
    case 'LOAD': {
      const grid = getNewGrid()
      const originalGrid = structuredClone(grid)
      return { ...state, grid, originalGrid }
    }
    case 'CLEAR': {
      if (isGridEmpty(state.grid) && isGridEmpty(state.originalGrid)) {
        return state
      }
      const grid = getEmptyGrid()
      const originalGrid = getEmptyGrid()
      return { ...state, grid, originalGrid }
    }
    case 'RESET': {
      const grid = structuredClone(state.originalGrid)
      return { ...state, grid }
    }
    case 'INPUT_CELL': {
      const { row, col, value } = action.payload
      if (typeof state.originalGrid[row][col] === 'number') {
        return state
      }
      if (value < 1 || value > 9) {
        return state
      }
      if (value === state.grid[row][col]) {
        return state
      }
      const newGrid = structuredClone(state.grid)
      newGrid[row][col] = value
      return { ...state, grid: newGrid }
    }
    case 'CLEAR_CELL': {
      const { row, col } = action.payload
      if (typeof state.originalGrid[row][col] === 'number') {
        return state
      }
      const newGrid = state.grid
      newGrid[row][col] = null
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
