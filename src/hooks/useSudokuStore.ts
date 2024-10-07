import { useCallback, useEffect, useState } from 'react'
import { SudokuAction, SudokuState, store, sudokuReducer } from 'src/store/sudokuStore'

export function useSudokuStore() {
  const [state, setState] = useState<SudokuState>(store.getValue())

  useEffect(() => {
    const subscription = store.subscribe(setState)
    return () => subscription.unsubscribe()
  }, [])

  const dispatch = useCallback((action: SudokuAction) => {
    store.next(sudokuReducer(store.getValue(), action))
  }, [])

  return { state, dispatch }
}
