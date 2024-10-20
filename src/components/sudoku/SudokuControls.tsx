import { useSudokuActions } from '@/hooks/useSudokuStore'

export default function SudokuControls() {
  const dispatch = useSudokuActions()
  return (
    <div className="flex flex-col gap-4">
      <button onClick={() => dispatch({ type: 'LOAD', payload: null })}>new</button>
      <button onClick={() => dispatch({ type: 'LOAD', payload: 'easy' })}>easy</button>
      <button onClick={() => dispatch({ type: 'LOAD', payload: 'medium' })}>medium</button>
      <button onClick={() => dispatch({ type: 'LOAD', payload: 'hard' })}>hard</button>
      <button onClick={() => dispatch({ type: 'LOAD', payload: 'expert' })}>expert</button>
      <button onClick={() => dispatch({ type: 'CLEAR' })}>clear</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
      <button onClick={() => dispatch({ type: 'SET_EDIT_MODE', payload: 'normal' })}>edit normal mode</button>
      <button onClick={() => dispatch({ type: 'SET_EDIT_MODE', payload: 'pencil' })}>edit pencil mode</button>
    </div>
  )
}
