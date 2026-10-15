import { Link, useNavigate, useParams } from "react-router-dom";
import MaterijalService from "../../services/materijali/MaterijalService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";




export default function MaterijalPromjena() {

    const navigate = useNavigate()
    const params = useParams()

    const [materijal, setMaterijal] = useState({})


  

    async function ucitajMaterijali() {
        await MaterijalService.getBySifra(params.sifra).then((res) => {
            setMaterijal(res.data)
        })
    }

    useEffect(() => {
        ucitajMaterijali()
    }, [])

    async function promijeni(materijal) {
        await MaterijalService.promijeni(params.sifra, materijal).then(() => {
            navigate(RouteNames.MATERIJALI)
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
                Promjeni materijale
            </h3>


            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required
                        defaultValue={materijal.naziv} />

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
                    Promijeni
                </Button>
                </Col>
            </Row>
            
             </Form >
        </>
    )

}