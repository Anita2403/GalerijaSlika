import { Link, useNavigate } from "react-router-dom";
import SlikaService from "../../services/slike/SlikaService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, Row } from "react-bootstrap";





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
        <>
            <h3>
                Dodavanje nove slike
            </h3>


            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="godinaIzrade">
                    <Form.Label>Godina izrade</Form.Label>
                    <Form.Control type="number" name="godinaIzrade" step={1} />
                </Form.Group>

                <Form.Group controlId="tehnika">
                    <Form.Label>Tehnika</Form.Label>
                    <Form.Control type="text" name="tehnika" required />
                </Form.Group>

                <Form.Group controlId="sirina">
                    <Form.Label>Širina</Form.Label>
                    <Form.Control type="number" name="sirina" />
                </Form.Group>

                <Form.Group controlId="visina">
                    <Form.Label>Visina</Form.Label>
                    <Form.Control type="number" name="visina" />
                </Form.Group>

                <Form.Group controlId="dostupnost">
                    <Form.Check label="Dostupno" name="dostupnost" />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control as="textarea" rows={5} name="opis"/>
                </Form.Group>



           

            <hr />


            <Row>
                <Col>
                    <Link to={RouteNames.SLIKE}>
                        Odustani
                    </Link>
                </Col>

                <Col>
                <Button type="submit">
                    Dodaj
                </Button>
                </Col>
            </Row>
            
             </Form>
        </>
    )

}