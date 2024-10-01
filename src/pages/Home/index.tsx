import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Sudoku Platform</h1>
      <Link to="/play" >Play</Link>
    </div>
  )
}

export default Home
