import { useEffect, useState } from 'react'
import { SudokuState, store } from 'src/store/sudokuStore'

export function useSudokuState() {
  const [state, setState] = useState<SudokuState>(store.getValue())

  useEffect(() => {
    const subscription = store.subscribe(setState)
    return () => subscription.unsubscribe()
  }, [])

  return state
}
