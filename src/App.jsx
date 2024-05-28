import React from 'react'
import { BrowserRouter as Router, Route, Routes }  from 'react-router-dom'
import ParticleRing from './components/ParticleRing';
// import TestRoot from './components/TestRoot';
import Service from './components/Service';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={'/'} element={<ParticleRing />}  />
          <Route path={'/services'} element={ <Service />} />
        </Routes>
        </Router>
    </div>
  )
}

export default App