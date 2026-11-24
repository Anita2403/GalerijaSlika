import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { DATA_SOURCE, IME_APLIKACIJE, RouteNames } from '../constanst';
import { useNavigate } from 'react-router-dom';
import { NavbarToggle } from 'react-bootstrap';
import { FaMemory } from 'react-icons/fa';
import { GrServer, GrStatusUnknown, GrVirtualStorage } from 'react-icons/gr';
import useAuth from '../hooks/useAuth';
import { Button } from 'react-bootstrap';
import useLoading from '../hooks/useLoading';


export default function Izbornik() {

  const navigate = useNavigate()
  const { isLoggedIn, logout, authUser } = useAuth()

  function izvor() {
    switch (DATA_SOURCE) {
      case 'memorija':
        return <FaMemory title='Memorija' />
      case 'localStorage':
        return <GrVirtualStorage title='Local storage' />
      case 'firebase':
        return <GrServer title='Firebase' />
      default:
        return <GrStatusUnknown title='Nepoznato' />
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" as="nav" aria-label="Glavna navigacija">
      <Container>
        <span aria-hidden="true">{izvor()}</span>
        <span style={{ fontWeight: 'bold' }} aria-live="polite" aria-atomic="true">{IME_APLIKACIJE}</span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Otvori/zatvori navigacijski izbornik" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" as="ul">
            <Nav.Item as="li">
              <Nav.Link
                href={RouteNames.HOME}
                onClick={(e) => { e.preventDefault(); navigate(RouteNames.HOME); }}
                eventKey="pocetna"
              >Početna</Nav.Link>
            </Nav.Item>

            {isLoggedIn && (
              <>
                <Nav.Item as="li">
                  <Nav.Link
                    href={RouteNames.NADZORNA_PLOCA}
                    onClick={(e) => { e.preventDefault(); navigate(RouteNames.NADZORNA_PLOCA); }}
                    eventKey="nadzorna-ploca"
                  >Nadzorna ploča</Nav.Link>
                </Nav.Item>

              </>
            )}

            <NavDropdown title="Programi" id="basic-nav-dropdown" as="li" renderMenuOnMount>

              <NavDropdown.Item
                href={RouteNames.SLIKE}
                onClick={(e) => { e.preventDefault(); navigate(RouteNames.SLIKE); }}
                eventKey="slike"
              > Slike</NavDropdown.Item>

              <NavDropdown.Item
                href={RouteNames.OSTALIPROIZVODI}
                onClick={(e) => { e.preventDefault(); navigate(RouteNames.OSTALIPROIZVODI); }}
                eventKey="ostaliproizvodi"
              > Ostali Proizvodi</NavDropdown.Item>

            </NavDropdown>

            {isLoggedIn && (
              <>

                <NavDropdown title="Šifrarnici" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    href={RouteNames.TEHNIKE}
                    onClick={(e) => { e.preventDefault(); navigate(RouteNames.TEHNIKE); }}
                    eventKey="tehnike"
                  > Tehnike</NavDropdown.Item>

                  <NavDropdown.Item
                    href={RouteNames.MATERIJALI}
                    onClick={(e) => { e.preventDefault(); navigate(RouteNames.MATERIJALI); }}
                    eventKey="materijali"
                  > Materijali</NavDropdown.Item>


                  <NavDropdown.Item
                    href={RouteNames.OZNAKE}
                    onClick={(e) => { e.preventDefault(); navigate(RouteNames.OZNAKE); }}
                    eventKey="oznake"
                  > Oznake</NavDropdown.Item>
                </NavDropdown>

                {authUser.uloga === 'admin' && (
                  <>
                    <NavDropdown.Divider />

                    <NavDropdown title="Servisno">
                      <NavDropdown.Item
                        href={RouteNames.OPERATERI}
                        onClick={(e) => { e.preventDefault(); navigate(RouteNames.OPERATERI); }}
                        eventKey="operateri"
                      >Operateri</NavDropdown.Item>
                      <NavDropdown.Item
                        href={RouteNames.GENERIRANJE_PODATAKA}
                        onClick={(e) => { e.preventDefault(); navigate(RouteNames.GENERIRANJE_PODATAKA); }}
                        eventKey="generiranje podataka"
                      >Generiraj podatke</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}

              </>
            )}

            <Nav.Link
              href={RouteNames.OAPLIKACIJI}
              onClick={(e) => { e.preventDefault(); navigate(RouteNames.OAPLIKACIJI); }}
              eventKey="oaplikaciji"
            >O Aplikaciji</Nav.Link>


          </Nav>
          <Nav className="ms-auto">
            <div className="btn-group" role="group" aria-label="Autentifikacija">
              {isLoggedIn ? (
                <Button
                  className="me-2"
                  onClick={() => logout()}
                  aria-label={`Odjava korisnika ${authUser.email}`}
                >Odjava – {authUser.email}</Button>
              ) : (
                <>
                  <Button
                    className="me-2"
                    onClick={() => navigate(RouteNames.REGISTRACIJA)}
                    aria-label="Registracija novog korisnika"
                  >Registracija</Button>
                  <Button
                    onClick={() => navigate(RouteNames.LOGIN)}
                    aria-label="Prijava u sustav"
                  >Login</Button>
                </>)}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )



}