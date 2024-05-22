import React from 'react'
import { BrowserRouter as Router, Route, Routes }  from 'react-router-dom'
import ParticleRing from './components/ParticleRing'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={'/'} element={<ParticleRing />}  />
        </Routes>
        </Router>
        app
    </div>
  )
}

export default App