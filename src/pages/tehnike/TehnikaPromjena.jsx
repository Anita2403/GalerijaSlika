import { Link, useNavigate, useParams } from "react-router-dom";
import TehnikaService from "../../services/tehnike/TehnikaService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";




export default function TehnikaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const { showLoading, hideLoading } = useLoading()
    const [tehnika, setTehnika] = useState({})




    async function ucitajTehniku() {
        showLoading()
        await TehnikaService.getBySifra(params.sifra).then((res) => {
            setTehnika(res.data)
        })
        hideLoading()
    }

    useEffect(() => {
         showLoading()
        ucitajTehniku()
         hideLoading()
    }, [])

    async function promijeni(tehnika) {
        showLoading()
        await TehnikaService.promijeni(params.sifra, tehnika).then(() => {
            hideLoading()
        })
        navigate(RouteNames.TEHNIKE)
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
                Promijeni tehniku
            </h3>


            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required
                        defaultValue={tehnika.naziv} />

                </Form.Group>






                <hr />


                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.TEHNIKE}
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