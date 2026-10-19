import { Link, useNavigate } from "react-router-dom";
import SlikaService from "../../services/slike/SlikaService";
import { RouteNames } from "../../constanst";
import { Button, Card, CardTitle, Col, Container, Form, Row } from "react-bootstrap";





export default function SlikaNova() {

    const navigate = useNavigate()

    async function dodaj(slika) {
        await SlikaService.dodaj(slika).then(() => {
            navigate(RouteNames.SLIKE)
        })

    }


    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            godinaIzrade: parseInt(podaci.get('godinaIzrade')),
            tehnika: podaci.get('tehnika'),
            sirina: parseInt(podaci.get('sirina')),
            visina: parseInt(podaci.get('visina')),
            dostupnost: podaci.get('dostupnost') === 'on',
            image: '',
            opis: podaci.get('opis'),
        })
    }

    return (
        



            <Form onSubmit={obradiSubmit}>

                <Container className="visinaAkcija">
                    <Card style={{ padding: '1rem' }}>

                        <Card.Title>
                            Dodavanje nove slike
                        </Card.Title>

                        <Row>
                            <Col xs={12} className="mt-3">
                                <Form.Group controlId="naziv">
                                    <Form.Label>Naziv</Form.Label>
                                    <Form.Control type="text" name="naziv" required />
                                </Form.Group>
                            </Col>
                            <Col xs={6} className="mt-3">
                                <Form.Group controlId="godinaIzrade">
                                    <Form.Label>Godina izrade</Form.Label>
                                    <Form.Control type="number" 
                                    style={{textAlign:'right'}}
                                    name="godinaIzrade" step={1} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} className="mt-3">
                                <Form.Group controlId="tehnika">
                                    <Form.Label>Tehnika</Form.Label>
                                    <Form.Control type="text" name="tehnika" required />
                                </Form.Group>
                            </Col>
                            <Col xs={4} className="mt-3">
                                <Form.Group controlId="sirina">
                                    <Form.Label>Širina</Form.Label>
                                    <Form.Control type="number" 
                                    style={{textAlign:'right'}}
                                    name="sirina" />
                                </Form.Group>
                            </Col>
                            <Col xs={4} className="mt-3">
                                <Form.Group controlId="visina">
                                    <Form.Label>Visina</Form.Label>
                                    <Form.Control type="number" 
                                    style={{textAlign:'right'}}
                                    name="visina" />
                                </Form.Group>
                            </Col>
                            <Col xs={4} className="mt-3">
                            <Form.Label>Dostupno</Form.Label>
                                <Form.Group controlId="dostupnost">
                                    <Form.Check label="" name="dostupnost" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} className="mt-3">
                                <Form.Group controlId="opis">
                                    <Form.Label>Opis</Form.Label>
                                    <Form.Control as="textarea" rows={5} name="opis" />
                                </Form.Group>
                            </Col>

                            
                            <Col xs={6} className="visinaAkcija">
                                <Link to={RouteNames.SLIKE}
                                    className="btn btn-danger">
                                    Odustani
                                </Link>
                            </Col>

                            <Col xs={6} className="visinaAkcija" style={{textAlign:'right'}}>
                                <Button type="submit" variant="success">
                                    Dodaj
                                </Button>
                            </Col>

                        </Row>

                    </Card>

                </Container>




            </Form>
        
    )

}