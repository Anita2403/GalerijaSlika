import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import { DATA_SOURCE, IME_APLIKACIJE, RouteNames } from './constanst'
import Home from './pages/Home'
import Izbornik from './components/Izbornik'
import SlikaPregled from './pages/slike/SlikaPregled'
import { Route, Routes } from 'react-router-dom'
import OAplikaciji from './pages/OAplikaciji'
import SlikaNova from './pages/slike/SlikaNova'
import SlikaPromjena from './pages/slike/SlikaPromjena'
import OstaliProizvodiPregled from './pages/ostaliproizvodi/OstaliProizvodiPregled'
import OstaliProizvodiNovi from './pages/ostaliproizvodi/OstaliProizvodiNovi'
import OstaliProizvodiPromjena from './pages/ostaliproizvodi/OstaliProizvodiPromjena'
import TehnikaPregled from './pages/tehnike/TehnikaPregled'


function App() {


  return (
    <>
      <Container>
        <Izbornik />
        <Container className='app'>
          <Routes>

            <Route path={RouteNames.HOME} element={<Home />} />
            <Route path={RouteNames.OAPLIKACIJI} element={<OAplikaciji />} />

            <Route path={RouteNames.SLIKE} element={<SlikaPregled />} />
            <Route path={RouteNames.SLIKE_DODAJ} element={<SlikaNova />} />
            <Route path={RouteNames.SLIKE_PROMJENA} element={<SlikaPromjena />} />


            <Route path={RouteNames.OSTALIPROIZVODI} element={<OstaliProizvodiPregled />} />
            <Route path={RouteNames.OSTALIPROIZVODI_DODAJ} element={<OstaliProizvodiNovi />} />
            <Route path={RouteNames.OSTALIPROIZVODI_PROMJENA} element={<OstaliProizvodiPromjena />} />

            <Route path={RouteNames.TEHNIKE} element={<TehnikaPregled />} />
            <Route path={RouteNames.TEHNIKE_DODAJ} element={<TehnikaNova />} />
            <Route path={RouteNames.TEHNIKE_PROMJENA} element={<TehnikaPromjena />} />




          </Routes>

        </Container>
        <hr />
        &copy; {IME_APLIKACIJE}({DATA_SOURCE})
      </Container>
    </>
  )
}

export default App
