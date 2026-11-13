import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { DATA_SOURCE, IME_APLIKACIJE, RouteNames } from '../constanst';
import { useNavigate } from 'react-router-dom';
import { NavbarToggle } from 'react-bootstrap';
import { FaMemory } from 'react-icons/fa';
import { GrStatusUnknown, GrVirtualStorage } from 'react-icons/gr';
import useAuth from '../hooks/useAuth';
import { Button } from 'react-bootstrap';


export default function Izbornik() {

  const navigate = useNavigate()
  const { isLoggedIn, logout, authUser } = useAuth()

  function izvor() {
    switch (DATA_SOURCE) {
      case 'memorija':
        return <FaMemory title='Memorija' />
      case 'localStorage':
        return <GrVirtualStorage title='Local storage' />
      default:
        return <GrStatusUnknown title='Nepoznato' />
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        {izvor()} {IME_APLIKACIJE}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => navigate(RouteNames.HOME)}
              eventKey="pocetna"
            >Početna</Nav.Link>

            <NavDropdown title="Proizvodi" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => navigate(RouteNames.SLIKE)}
              > Slike</NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => navigate(RouteNames.OSTALIPROIZVODI)}
              > Ostali Proizvodi</NavDropdown.Item>

            </NavDropdown>

            {isLoggedIn && (
              <>

                <NavDropdown title="Šifrarnici" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.TEHNIKE)}
                  > Tehnike</NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.MATERIJALI)}
                  > Materijali</NavDropdown.Item>


                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.OZNAKE)}
                  > Oznake</NavDropdown.Item>
                </NavDropdown>

              {authUser.uloga === 'admin' && (
                <>
                <NavDropdown.Divider />

                <NavDropdown title="Servisno">
                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.OPERATERI)}
                  >Operateri</NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.GENERIRANJE_PODATAKA)}
                  >Generiraj podatke</NavDropdown.Item>
                </NavDropdown>
                </>
              )}
                
              </>
            )}

            <Nav.Link
              onClick={() => { navigate(RouteNames.OAPLIKACIJI) }}
            >O Aplikaciji</Nav.Link>


          </Nav>
           <Nav className="ms-auto">
                        <div className="btn-group">
                            {isLoggedIn ? (
                                <Button
                                    className="me-2"
                                    onClick={() => logout()}
                                >Logout {authUser.email}</Button>
                            ) : (
                                <>
                                    <Button
                                        className="me-2"
                                        onClick={() => navigate(RouteNames.REGISTRACIJA)}
                                    >Registracija</Button>
                                    <Button
                                        onClick={() => navigate(RouteNames.LOGIN)}
                                    >Login</Button>
                                </>)}
                        </div>
                    </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )



}