import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useSudokuActions } from '@/hooks/useSudokuStore'

export default function SudokuControls() {
  const dispatch = useSudokuActions()
  return (
    <Card className="flex flex-col gap-4">
      <Button variant="outline" onClick={() => dispatch({ type: 'LOAD', payload: null })}>
        new
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: 'LOAD', payload: 'easy' })}>
        easy
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: 'LOAD', payload: 'medium' })}>
        medium
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: 'LOAD', payload: 'hard' })}>
        hard
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: 'LOAD', payload: 'expert' })}>
        expert
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: 'CLEAR' })}>
        clear
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: 'RESET' })}>
        reset
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: 'SET_EDIT_MODE', payload: 'normal' })}>
        edit normal mode
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: 'SET_EDIT_MODE', payload: 'pencil' })}>
        edit pencil mode
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: 'SHOW_SOLUTION' })}>
        show solution
      </Button>
    </Card>
  )
}
