import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Play from '@/pages/Play'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-dvh bg-stone-200">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
