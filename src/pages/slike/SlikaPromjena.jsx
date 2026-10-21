import { Link, useNavigate, useParams } from "react-router-dom";
import SlikaService from "../../services/slike/SlikaService";
import { RouteNames } from "../../constanst";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import TehnikaService from "../../services/tehnike/TehnikaService";





export default function SlikaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [slika, setSlika] = useState({})
    const [dostupnost, setDostupnost] = useState(false)
    const [tehnike, setTehnike] = useState([])
    
         async function ucitajTehnike() {
            await TehnikaService.get().then((odgovor) => {
                setTehnike(odgovor.data)
            })
        }

    async function ucitajSlike() {
        await SlikaService.getBySifra(params.sifra).then((odgovor) => {
            const s = odgovor.data
            setSlika(s)
            // debugger
            setDostupnost(s.dostupnost)
        })
    }

    useEffect(() => {
        ucitajTehnike()
        ucitajSlike()
    }, [])

    async function promijeni(slike) {
        await SlikaService.promijeni(params.sifra, slike).then(() => {
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

    
        if (podaci.get('opis').trim().length < 3 || podaci.get('opis').trim().length > 30) {
            alert("Opis slike mora imati najmanje 3 znaka i najviše 500!")
            return 
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
                        <Col xs={12} className="mt-3">
                            <Form.Group controlId="naziv">
                                <Form.Label>Naziv</Form.Label>
                                <Form.Control type="text" name="naziv" required
                                    defaultValue={slika.naziv} />
                            </Form.Group>
                        </Col>
                        <Col xs={6} className="mt-3">
                            <Form.Group controlId="godinaIzrade">
                                <Form.Label>Godina izrade</Form.Label>
                                <Form.Control type="number"
                                    style={{ textAlign: 'right' }}
                                    name="godinaIzrade" step={1}
                                    defaultValue={slika.godinaIzrade} />
                            </Form.Group>
                        </Col>
                        <Col xs={6} className="mt-3">
                            <Form.Group controlId="tehnika">
                                <Form.Label>Tehnika</Form.Label>
                                <Form.Select name="tehnika" required
                                value={slika.tehnika} onChange={(e)=>setSlika({...slika, tehnika: parseInt(e.target.value)})}>
                                        <option value="">Odaberi tehniku</option>
                                        {tehnike && tehnike.map((t)=>(
                                            <option key={t.sifra} value={t.sifra}>{t.naziv}</option>
                                        ))}
                                    </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={4} className="mt-3">
                            <Form.Group controlId="sirina">
                                <Form.Label>Širina</Form.Label>
                                <Form.Control type="number"
                                    style={{ textAlign: 'right' }}
                                    name="sirina"
                                    defaultValue={slika.sirina} />
                            </Form.Group>
                        </Col>
                        <Col xs={4} className="mt-3">
                            <Form.Group controlId="visina">
                                <Form.Label>Visina</Form.Label>
                                <Form.Control type="number"
                                    style={{ textAlign: 'right' }}
                                    name="visina"
                                    defaultValue={slika.visina} />
                            </Form.Group>
                        </Col>
                        <Col xs={4} className="mt-3">
                            <Form.Label>Dostupno</Form.Label>
                            <Form.Group controlId="dostupnost">
                                <Form.Check label="" name="dostupnost"
                                    checked={dostupnost}
                                    onChange={(e) => { setDostupnost(e.target.checked) }} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} className="mt-3">
                            <Form.Group controlId="opis">
                                <Form.Label>Opis</Form.Label>
                                <Form.Control as="textarea" rows={5} name="opis"
                                    defaultValue={slika.opis} />
                            </Form.Group>
                        </Col>


                        <Col xs={6} className="visinaAkcija">
                            <Link to={RouteNames.SLIKE}
                                className="btn btn-danger">
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