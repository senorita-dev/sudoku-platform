import { SudokuAction, SudokuState, store, sudokuReducer } from '@/store/sudokuStore'
import { useCallback, useEffect, useState } from 'react'

export function useSudokuActions() {
  const dispatch = useCallback((action: SudokuAction) => {
    const currentState = store.getValue()
    const newState = sudokuReducer(currentState, action)
    if (newState !== currentState) {
      store.next(newState)
    }
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
