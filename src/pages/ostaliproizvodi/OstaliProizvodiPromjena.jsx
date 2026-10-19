import { Link, useNavigate, useParams } from "react-router-dom";
import OstaliProizvodiService from "../../services/ostaliproizvodi/OstaliProizvodiService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import MaterijalService from "../../services/materijali/MaterijalService";





export default function OstaliProizvodiPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [ostaliproizvod, setOstaliProizvodi] = useState({})
    const [dostupnost, setDostupnost] = useState(false)
    const [materijali, setMaterijali] = useState([])

    async function ucitajMaterijali() {
        await MaterijalService.get().then((odgovor) => {
            setMaterijali(odgovor.data)
        })
    }

    async function ucitajOstaliproizvodi() {
        await OstaliProizvodiService.getBySifra(params.sifra).then((odgovor) => {
            const s = odgovor.data
            setOstaliProizvodi(s)
            // debugger
            setDostupnost(s.dostupnost)
        })
    }

    useEffect(() => {
        ucitajOstaliproizvodi()
        ucitajMaterijali()
    }, [])

    async function promijeni(ostaliproizvod) {
        await OstaliProizvodiService.promijeni(params.sifra, ostaliproizvod).then(() => {
            navigate(RouteNames.OSTALIPROIZVODI)
        })

    }


    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
            naziv: podaci.get('naziv'),
            godinaIzrade: parseInt(podaci.get('godinaIzrade')),
            materijal: parseInt(podaci.get('materijal')),
            sirina: parseInt(podaci.get('sirina')),
            visina: parseInt(podaci.get('visina')),
            dostupnost: dostupnost,
            image: '',
            opis: podaci.get('opis'),
        })
    }

    return (

        <Form onSubmit={obradiSubmit}>

            <Container className="visinaAkcija">
                <Card style={{ padding: '1rem' }}>

                    <Card.Title>
                        Promjena ostalih proizvoda
                    </Card.Title>

                    <Row>
                        <Col xs={12} className="mt-3">
                            <Form.Group controlId="naziv">
                                <Form.Label>Naziv</Form.Label>
                                <Form.Control type="text" name="naziv" required
                                    defaultValue={ostaliproizvod.naziv} />
                            </Form.Group>
                        </Col>
                        <Col xs={6} className="mt-3">
                            <Form.Group controlId="godinaIzrade">
                                <Form.Label>Godina izrade</Form.Label>
                                <Form.Control type="number" name="godinaIzrade" step={1}
                                    defaultValue={ostaliproizvod.godinaIzrade} />
                            </Form.Group>
                        </Col>
                        <Col xs={6} className="mt-3">
                            <Form.Group controlId="materijal">
                                <Form.Label>Materijal</Form.Label>
                                <Form.Select name="materijal" required>
                                    value={ostaliproizvod.materijal} onChange={(e) => setOstaliProizvodi({ ...ostaliproizvod, materijal: parseInt(e.target.value) })}>
                                    <option value="">Odaberi materijal</option>
                                    {materijali && materijali.map((t) => (
                                        <option key={t.sifra} value={t.sifra}>{t.naziv}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={4} className="mt-3">
                            <Form.Group controlId="sirina">
                                <Form.Label>Širina</Form.Label>
                                <Form.Control type="number" name="sirina"
                                    defaultValue={ostaliproizvod.sirina} />
                            </Form.Group>
                        </Col>
                        <Col xs={4} className="mt-3">
                            <Form.Group controlId="visina">
                                <Form.Label>Visina</Form.Label>
                                <Form.Control type="number" name="visina"
                                    defaultValue={ostaliproizvod.visina} />
                            </Form.Group>
                        </Col>
                        <Col xs={4} className="mt-3">
                            <Form.Group controlId="dostupnost">
                                <Form.Check label="Dostupno" name="dostupnost"
                                    checked={dostupnost}
                                    onChange={(e) => { setDostupnost(e.target.checked) }} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} className="mt-3">
                            <Form.Group controlId="opis">
                                <Form.Label>Opis</Form.Label>
                                <Form.Control as="textarea" rows={5} name="opis"
                                    defaultValue={ostaliproizvod.opis} />
                            </Form.Group>
                        </Col>

                        <Col xs={6} className="visinaAkcija">
                            <Link to={RouteNames.OSTALIPROIZVODI}
                                className="btn btn-danger">
                                Odustani
                            </Link>
                        </Col>

                        <Col  xs={6} className="visinaAkcija" style={{ textAlign: 'right' }}>
                            <Button type="submit" variant="success">
                                Promijeni
                            </Button>
                        </Col>

                    </Row>


                </Card>

            </Container>
           

        </Form>

    )

}