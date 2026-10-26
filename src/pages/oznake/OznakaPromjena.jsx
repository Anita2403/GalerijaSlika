import { Link, useNavigate, useParams } from "react-router-dom";
import OznakaService from "../../services/oznake/OznakaService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function OznakaPromjena() {

    const navigate = useNavigate()
    const params = useParams()

    const [oznaka, setOznaka] = useState({})

    async function ucitajOznaku() {
        await OznakaService.getBySifra(params.sifra).then((res) => {
            setOznaka(res.data)
        })
    }

    useEffect(() => {
        ucitajOznaku()
    }, [])

    async function promijeni(oznaka) {
        await OznakaService.promijeni(params.sifra, oznaka).then(() => {
            navigate(RouteNames.OZNAKE)
        })
    }

    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
            naziv: podaci.get('naziv')
        })
    }

    return (
        <>
            <h3>
                Promjena oznake
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="naziv" 
                        defaultValue={oznaka.naziv} 
                        required 
                    />
                </Form.Group>

                <hr />

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.OZNAKE}
                        className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>

                    <Col>
                        <Button type="submit" variant="success">
                            Promijeni
                        </Button>
                    </Col>
                </Row>
                
             </Form>
        </>
    )
}

