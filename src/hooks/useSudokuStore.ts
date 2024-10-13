import { useCallback, useEffect, useState } from 'react'
import { SudokuAction, SudokuState, store, sudokuReducer } from 'src/store/sudokuStore'

export function useSudokuActions() {
  const dispatch = useCallback((action: SudokuAction) => {
    store.next(sudokuReducer(store.getValue(), action))
  }, [])

  return dispatch
}

export function useSudokuState() {
  const [state, setState] = useState<SudokuState>(store.getValue())

  useEffect(() => {
    const subscription = store.subscribe(setState)
    return () => subscription.unsubscribe()
  }, [])

  return state
}
