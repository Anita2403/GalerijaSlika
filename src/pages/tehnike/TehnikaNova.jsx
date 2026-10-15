import { Link, useNavigate } from "react-router-dom";
import TehnikaService from "../../services/tehnike/TehnikaService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function TehnikaNova() {

    const navigate = useNavigate()


    async function dodaj(tehnika) {
        await TehnikaService.dodaj(tehnika).then(() => {
            navigate(RouteNames.TEHNIKE)
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
                Dodavanje nove tehnike
            </h3>


            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
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
                    Dodaj
                </Button>
                </Col>
            </Row>
            
             </Form>
        </>
    )

}