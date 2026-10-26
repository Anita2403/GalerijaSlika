import { Link, useNavigate } from "react-router-dom";
import OznakaService from "../../services/oznake/OznakaService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function OznakaNova() {

    const navigate = useNavigate()

    async function dodaj(oznaka) {
        await OznakaService.dodaj(oznaka).then(() => {
            navigate(RouteNames.OZNAKE)
        })
    }

    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv')
        })
    }

    return (
        <>
            <h3>
                Dodavanje nove oznake
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
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
                            Dodaj
                        </Button>
                    </Col>
                </Row>
                
             </Form>
        </>
    )
}