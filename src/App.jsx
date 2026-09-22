import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'

import { IME_APLIKACIJE, RouteNames } from './constanst'
import Home from './pages/Home'
import Izbornik from './components/izbornik'
import SlikaPregled from './pages/slike/SlikaPregled'
import { Route, Routes } from 'react-router-dom'


function App() {
  

  return (
    <>
      <Container>
        <Izbornik />
        <Container className='app'>
          <Routes>
            
            <Route path={RouteNames.HOME} element={<Home />} />

            <Route path={RouteNames.SLIKE} element={<SlikaPregled />} />
          </Routes>
          
        </Container>
        <hr />
        &copy; {IME_APLIKACIJE}
      </Container>
    </>
  )
}

export default App
