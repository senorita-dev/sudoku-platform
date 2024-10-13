import { useCallback } from 'react'
import { SudokuAction, store, sudokuReducer } from 'src/store/sudokuStore'

export function useSudokuActions() {
  const dispatch = useCallback((action: SudokuAction) => {
    store.next(sudokuReducer(store.getValue(), action))
  }, [])

  return dispatch
}
