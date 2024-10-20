import SudokuControls from '@/components/sudoku/SudokuControls'
import SudokuGrid from '@/components/sudoku/SudokuGrid'
import { useSudokuDifficulty } from '@/hooks/useSudokuStore'
import React from 'react'
import { Link } from 'react-router-dom'

function Play() {
  const difficulty = useSudokuDifficulty()

  return (
    <div className="flex flex-grow flex-col">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Play</h1>
        <Link to="/">Home</Link>
      </header>
      <div className="flex flex-grow">
        <Left />
        <Main>
          <SudokuGrid />
        </Main>
        <Right>
          <SudokuControls />
        </Right>
      </div>
      <footer className="py-4 text-center">
        <span>{difficulty && <>Difficulty: {difficulty}</>}</span>
      </footer>
    </div>
  )
}

function Left() {
  return <aside className="w-full p-4 md:w-1/4" />
}

function Right({ children }: { children: React.ReactNode }) {
  return <aside className="w-full p-4 md:w-1/4">{children}</aside>
}

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-grow items-center justify-center p-4">
      <div className="h-[min(80vw,80vh)] w-[min(80vw,80vh)] bg-white">{children}</div>
    </main>
  )
}

export default Play
