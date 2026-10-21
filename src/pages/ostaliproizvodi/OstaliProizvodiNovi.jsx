import { Link, useNavigate } from "react-router-dom";
import OstaliProizvodiService from "../../services/ostaliproizvodi/OstaliProizvodiService";
import { RouteNames } from "../../constanst";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import MaterijalService from "../../services/materijali/MaterijalService";





export default function OstaliProizvodiNovi() {
    const [materijali, setMaterijali] = useState([])

    async function ucitajMaterijali() {
        await MaterijalService.get().then((odgovor) => {
            setMaterijali(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajMaterijali()
    }, [])

    const navigate = useNavigate()

    async function dodaj(ostaliproizvodi) {
        await OstaliProizvodiService.dodaj(ostaliproizvodi).then(() => {
            navigate(RouteNames.OSTALIPROIZVODI)
        })

    }


    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        
         if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!")
            return 
        }

    
        if (podaci.get('naziv').trim().length < 3 || podaci.get('naziv').trim().length > 30) {
            alert("Naziv ostalih proizvoda mora imati najmanje 3 znaka i najviše 30!")
            return 
        }

   
      
        if (isNaN(podaci.get('godinaIzrade')) || podaci.get('godinaIzrade') < 2022 || podaci.get('godinaIzrade') > 2026) {
            alert("Godina izrade mora biti godina između 2022 i 2026 godine!")
            return 
        }

        
        if (isNaN(podaci.get('sirina')) || podaci.get('sirina') < 20 || podaci.get('sirina') > 140) {
            alert("Širina mora biti između 20 i 140 centimetara!")
            return 
        }

         if (isNaN(podaci.get('visina')) || podaci.get('visina') < 20 || podaci.get('visina') > 140) {
            alert("Visina mora biti između 20 i 140 centimetara!")
            return 
        }

         if (!podaci.get('opis') || podaci.get('opis').trim().length === 0) {
            alert("Opis je obavezan i ne smije sadržavati samo razmake!")
            return 
        }

    
        if (podaci.get('opis').trim().length < 3 || podaci.get('opis').trim().length > 30) {
            alert("Opis ostalih proizvoda mora imati najmanje 3 znaka i najviše 500!")
            return 
        }

        dodaj({
            naziv: podaci.get('naziv'),
            godinaIzrade: parseInt(podaci.get('godinaIzrade')),
            materijal: parseInt(podaci.get('materijal')),
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
                            Dodavanje ostalih proizvoda
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
                                    <Form.Control type="number" name="godinaIzrade" step={1} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} className="mt-3">
                                <Form.Group controlId="materijal">
                                    <Form.Label>Materijal</Form.Label>
                                    <Form.Select name="materijal" required>
                                        <option value="">Odaberi materijal</option>
                                        {materijali & materijali.map((t) => (
                                            <option key={t.sifra} value={t.sifra}>t.naziv</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={4} className="mt-3">
                                <Form.Group controlId="sirina">
                                    <Form.Label>Širina</Form.Label>
                                    <Form.Control type="number" name="sirina" />
                                </Form.Group>
                            </Col>
                            <Col xs={4} className="mt-3">
                                <Form.Group controlId="visina">
                                    <Form.Label>Visina</Form.Label>
                                    <Form.Control type="number" name="visina" />
                                </Form.Group>
                            </Col>
                            <Col xs={4} className="mt-3">
                                <Form.Group controlId="dostupnost">
                                    <Form.Check label="Dostupno" name="dostupnost" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} className="mt-3">
                                <Form.Group controlId="opis">
                                    <Form.Label>Opis</Form.Label>
                                    <Form.Control as="textarea" rows={5} name="opis" />
                                </Form.Group>
                            </Col>

                            <Col xs={6} className="visinaAkcija">
                                <Link to={RouteNames.OSTALIPROIZVODI}
                                    className="btn btn-danger">
                                    Odustani
                                </Link>
                            </Col>

                            <Col xs={6} className="visinaAkcija">
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