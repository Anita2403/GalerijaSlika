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
import TehnikaPromjena from './pages/tehnike/TehnikaPromjena'
import TehnikaNova from './pages/tehnike/TehnikaNova'
import MaterijalPregled from './pages/materijali/MaterijaliPregled'
import MaterijalNova from './pages/materijali/MaterijaliNova'
import MaterijalPromjena from './pages/materijali/MaterijaliPromjena'
import GeneriranjePodataka from './pages/GeneriranjePodataka'
import OznakaPregled from './pages/oznake/OznakaPregled'
import OznakaNova from './pages/oznake/OznakaNova'
import OznakaPromjena from './pages/oznake/OznakaPromjena'
import OperaterPregled from './pages/operateri/OperaterPregled'
import OperaterNovi from './pages/operateri/OperaterNovi'
import OperaterPromjena from './pages/operateri/OperaterPromjena'
import OperaterPromjenaLozinke from './pages/operateri/OperaterPromjenaLozinke'
import useAuth from './hooks/useAuth'
import Login from './pages/login/Login'
import Registracija from './pages/registracija/Registracija'
import NadzornaPloca from './pages/NadzornaPloca'


function App() {

  const { isLoggedIn, authUser } = useAuth()

  return (
    <Container>
      <Izbornik />
      <Container className='app'>
        <Routes>

          <Route path={RouteNames.HOME} element={<Home />} />
          <Route path={RouteNames.OAPLIKACIJI} element={<OAplikaciji />} />
          <Route path={RouteNames.SLIKE} element={<SlikaPregled />} />
          <Route path={RouteNames.OSTALIPROIZVODI} element={<OstaliProizvodiPregled />} />


          {isLoggedIn ? (
            <>
              <Route path={RouteNames.TEHNIKE} element={<TehnikaPregled />} />
              <Route path={RouteNames.MATERIJALI} element={<MaterijalPregled />} />
              <Route path={RouteNames.OZNAKE} element={<OznakaPregled />} />
              <Route path={RouteNames.SLIKE_DODAJ} element={<SlikaNova />} />
              <Route path={RouteNames.SLIKE_PROMJENA} element={<SlikaPromjena />} />
              <Route path={RouteNames.OSTALIPROIZVODI_DODAJ} element={<OstaliProizvodiNovi />} />
              <Route path={RouteNames.OSTALIPROIZVODI_PROMJENA} element={<OstaliProizvodiPromjena />} />
              <Route path={RouteNames.TEHNIKE_DODAJ} element={<TehnikaNova />} />
              <Route path={RouteNames.TEHNIKE_PROMJENA} element={<TehnikaPromjena />} />
              <Route path={RouteNames.MATERIJALI_DODAJ} element={<MaterijalNova />} />
              <Route path={RouteNames.MATERIJALI_PROMJENA} element={<MaterijalPromjena />} />
              <Route path={RouteNames.OZNAKE_DODAJ} element={<OznakaNova />} />
              <Route path={RouteNames.OZNAKE_PROMJENA} element={<OznakaPromjena />} />


              {authUser.uloga === 'admin' && (
                <>
                  <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />
                  <Route path={RouteNames.OPERATERI} element={<OperaterPregled />} />
                  <Route path={RouteNames.OPERATERI_NOVI} element={<OperaterNovi />} />
                  <Route path={RouteNames.OPERATERI_PROMJENA} element={<OperaterPromjena />} />
                  <Route path={RouteNames.OPERATERI_PROMJENA_LOZINKE} element={<OperaterPromjenaLozinke />} />
                  <Route path={RouteNames.NADZORNA_PLOCA} element={<NadzornaPloca />} />
                </>
              )}


            </>
          ) : (
            <>
              <Route path={RouteNames.LOGIN} element={<Login />} />
              <Route path={RouteNames.REGISTRACIJA} element={<Registracija />} />
            </>
          )}

        </Routes>

      </Container>
      <hr />
      &copy; {IME_APLIKACIJE}({DATA_SOURCE})
    </Container>

  )
}

export default App
