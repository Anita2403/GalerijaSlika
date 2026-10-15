import { Link, useNavigate } from "react-router-dom";
import MaterijalService from "../../services/materijali/MaterijalService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, Row } from "react-bootstrap";


export default function MaterijalNova() {

    const navigate = useNavigate()


    async function dodaj(materijal) {
        await MaterijalService.dodaj(materijal).then(() => {
            navigate(RouteNames.MATERIJALI)
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
                Dodavanje novih materijala
            </h3>


            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                


            <hr />


            <Row className="mt-4">
                <Col>
                    <Link to={RouteNames.MATERIJALI}
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