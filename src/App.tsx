import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from 'src/pages/Home'
import NotFound from 'src/pages/NotFound'
import Play from 'src/pages/Play'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
