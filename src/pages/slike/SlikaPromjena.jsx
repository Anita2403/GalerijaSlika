import { Link, useNavigate, useParams } from "react-router-dom";
import SlikaService from "../../services/slike/SlikaService";
import { RouteNames } from "../../constanst";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import TehnikaService from "../../services/tehnike/TehnikaService";
import OznakaService from "../../services/oznake/OznakaService";

export default function SlikaPromjena() {
    const navigate = useNavigate()
    const params = useParams()
    const [slika, setSlika] = useState({})
    const [dostupnost, setDostupnost] = useState(false)
    const [tehnike, setTehnike] = useState([])
    const [oznake, setOznake] = useState([])
    const [odabraniOznake, setOdabraniOznake] = useState([])
    const [pretragaOznaka, setPretragaOznaka] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)

    useEffect(() => {
        ucitajTehnike()
        ucitajOznake()
    }, [])

    async function ucitajTehnike() {
        await TehnikaService.get().then((odgovor) => {
            setTehnike(odgovor.data)
        })
    }

    async function ucitajOznake() {
        await OznakaService.get().then((odgovor) => {
            setOznake(odgovor.data)
            ucitajSliku(odgovor.data)
        })
    }

    async function ucitajSliku(sveOznake) {
        await SlikaService.getBySifra(params.sifra).then((odgovor) => {
            const s = odgovor.data
            setSlika(s)
            setDostupnost(s.dostupnost)
            if (s.oznake && sveOznake.length > 0) {
                const odabrane = sveOznake.filter(p => s.oznake.includes(p.sifra))
                setOdabraniOznake(odabrane)
            }
        })
    }

    function dodajOznaka(oznaka) {
        if (!odabraniOznake.find(p => p.sifra === oznaka.sifra)) {
            setOdabraniOznake([...odabraniOznake, oznaka])
        }
        setPretragaOznaka('')
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }

    function ukloniOznaka(sifra) {
        setOdabraniOznake(odabraniOznake.filter(p => p.sifra !== sifra))
    }

    function filtrirajOznake() {
        if (!pretragaOznaka) return []
        return oznake.filter(p =>
            !odabraniOznake.find(op => op.sifra === p.sifra) &&
            (p.naziv.toLowerCase().includes(pretragaOznaka.toLowerCase()))
        )
    }

    function handleKeyDown(e) {
        const filtriraniOznake = filtrirajOznake()

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev + 1 === filtriraniOznake.length) {
                    return 0
                }
                return prev < filtriraniOznake.length - 1 ? prev + 1 : prev
            })
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev === 0) {
                    return filtriraniOznake.length - 1
                }
                return prev > 0 ? prev - 1 : 0
            })
        } else if (e.key === 'Enter' && odabraniIndex >= 0 && filtriraniOznake.length > 0) {
            e.preventDefault()
            dodajOznaka(filtriraniOznake[odabraniIndex])
        } else if (e.key === 'Escape') {
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
    }

    async function promijeni(slikaPodaci) {
        await SlikaService.promijeni(params.sifra, slikaPodaci).then(() => {
            navigate(RouteNames.SLIKE)
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
            alert("Naziv slike mora imati najmanje 3 znaka i najviše 30!")
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

        if (podaci.get('opis').trim().length < 3 || podaci.get('opis').trim().length > 500) {
            alert("Opis slike mora imati najmanje 3 znaka i najviše 500!")
            return
        }

        if (odabraniOznake.length === 0) {
            alert("Morate odabrati barem jednu oznaku!");
            return;
        }

        promijeni({
            naziv: podaci.get('naziv'),
            godinaIzrade: parseInt(podaci.get('godinaIzrade')),
            tehnika: parseInt(podaci.get('tehnika')),
            sirina: parseInt(podaci.get('sirina')),
            visina: parseInt(podaci.get('visina')),
            dostupnost: dostupnost,
            image: '',
            opis: podaci.get('opis'),
            oznake: odabraniOznake.map(p => p.sifra)
        })
    }

    return (
        <Form onSubmit={obradiSubmit}>
            <Container className="visinaAkcija">
                <Card style={{ padding: '1rem' }}>
                    <Card.Title>
                        Promjena slike
                    </Card.Title>

                    <Row>
                        {/* Lijeva strana */}
                        <Col xs={6} className="mt-3">
                            <Form.Group controlId="naziv">
                                <Form.Label>Naziv</Form.Label>
                                <Form.Control type="text" name="naziv" required
                                    defaultValue={slika.naziv} />
                            </Form.Group>
                            <Form.Group controlId="godinaIzrade">
                                <Form.Label>Godina izrade</Form.Label>
                                <Form.Control type="number"
                                    style={{ textAlign: 'right' }}
                                    name="godinaIzrade" step={1}
                                    defaultValue={slika.godinaIzrade} />
                            </Form.Group>
                            <Form.Group controlId="tehnika">
                                <Form.Label>Tehnika</Form.Label>
                                <Form.Select name="tehnika" required
                                    value={slika.tehnika || ""} onChange={(e) => setSlika({ ...slika, tehnika: parseInt(e.target.value) })}>
                                    <option value="">Odaberi tehniku</option>
                                    {tehnike && tehnike.map((t) => (
                                        <option key={t.sifra} value={t.sifra}>{t.naziv}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="sirina">
                                <Form.Label>Širina</Form.Label>
                                <Form.Control type="number"
                                    style={{ textAlign: 'right' }}
                                    name="sirina"
                                    defaultValue={slika.sirina} />
                            </Form.Group>
                            <Form.Group controlId="visina">
                                <Form.Label>Visina</Form.Label>
                                <Form.Control type="number"
                                    style={{ textAlign: 'right' }}
                                    name="visina"
                                    defaultValue={slika.visina} />
                            </Form.Group>
                            <Form.Label>Dostupno</Form.Label>
                            <Form.Group controlId="dostupnost">
                                <Form.Check label="" name="dostupnost"
                                    checked={dostupnost}
                                    onChange={(e) => { setDostupnost(e.target.checked) }} />
                            </Form.Group>
                            <Form.Group controlId="opis">
                                <Form.Label>Opis</Form.Label>
                                <Form.Control as="textarea" rows={5} name="opis"
                                    defaultValue={slika.opis} />
                            </Form.Group>
                        </Col>

                        {/* Desna strana */}
                        <Col xs={6} className="mt-3">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Oznake</Card.Title>

                                    {/* Autocomplete pretraga */}
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">Dodaj oznake</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Pretraži oznake..."
                                            value={pretragaOznaka}
                                            onChange={(e) => {
                                                setPretragaOznaka(e.target.value)
                                                setPrikaziAutocomplete(e.target.value.length > 0)
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => setPrikaziAutocomplete(pretragaOznaka.length > 0)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {prikaziAutocomplete && filtrirajOznake().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                                {filtrirajOznake().map((oznaka, index) => (
                                                    <div
                                                        key={oznaka.sifra}
                                                        className="p-2 cursor-pointer"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black'
                                                        }}
                                                        onClick={() => dodajOznaka(oznaka)}
                                                        onMouseEnter={() => setOdabraniIndex(index)}
                                                    >
                                                        {oznaka.naziv}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>

                                    {/* Tablica odabranih oznaka */}
                                    {odabraniOznake.length > 0 && (
                                        <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Naziv</th>
                                                        <th style={{ width: '80px' }}>Akcija</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabraniOznake.map(oznaka => (
                                                        <tr key={oznaka.sifra}>
                                                            <td>{oznaka.naziv}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniOznaka(oznaka.sifra)}
                                                                >
                                                                    Obriši
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                    {odabraniOznake.length === 0 && (
                                        <p className="text-muted">Nema odabranih oznaka</p>
                                    )}

                                    <img src={slika.image} alt="Ovo ti Anita" />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col xs={6} className="visinaAkcija">
                            <Link to={RouteNames.SLIKE} className="btn btn-danger">
                                Odustani
                            </Link>
                        </Col>
                        <Col xs={6} className="visinaAkcija" style={{ textAlign: 'right' }}>
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