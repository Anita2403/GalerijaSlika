import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IME_APLIKACIJE, RouteNames } from '../constanst';
import { useNavigate } from 'react-router-dom';
import { NavbarToggle } from 'react-bootstrap';


export default function Izbornik(){

  const navigate = useNavigate()

return (
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
            {IME_APLIKACIJE}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
            onClick={()=>{navigate(RouteNames.HOME)}}
            >Početna</Nav.Link>
            
            <NavDropdown title="Programi" id="basic-nav-dropdown">
              <NavDropdown.Item 
              onClick={()=>navigate(RouteNames.SLIKE)}
              > Slike</NavDropdown.Item>
            
            </NavDropdown>

            <Nav.Link
            onClick={()=>{navigate(RouteNames.OAPLIKACIJI)}}
            >O Aplikaciji</Nav.Link>
            

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
)



}