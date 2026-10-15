import { Await, Link, useNavigate, useParams } from "react-router-dom";
import TehnikaService from "../../services/slike/TehnikaService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import SlikaService from "../../services/slike/SlikaService";





export default function TehnikaPromjena() {

    const navigate = useNavigate()
    const params = useParams()

    const [slike, setSlike] = useState({})
    const [tehnika, setTehnika] = useState({})


    async function ucitajSlike() {
        await SlikaService.get().then((res) => {
            setSlike(res.data)
        })
    }

    async function ucitajTehniku() {
        await TehnikaService.getBySifra(params.sifra).then((res) => {
            setTehnika(res.data)
        })
    }

    useEffect(() => {
        ucitajSlike()
        ucitajTehniku()
    }, [])

    async function promijeni(tehnika) {
        await TehnikaService.promijeni(params.sifra, tehnika).then(() => {
            navigate(RouteNames.TEHNIKE)
        })

    }


    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
            naziv: podaci.get('naziv'),
            slika: parseInt(podaci.get('slika'),
            
        })
    }

    return (
        <>
            <h3>
                Promjeni tehniku
            </h3>


            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required
                        defaultValue={tehnika.naziv} />

                </Form.Group>

                <Form.Group controlId="slika">
                    <Form.Label>Slika</Form.Label>
                    <Form.Select name="slika" required
                        value={tehnika.slika}
                        onChange={(e) => setTehnika({ ...tehnika, slika: parseInt(e.target.value) })}>
                
                <option value=""key={0}>Obavezan odabir smjera</option>
                    {smjerovi && smjerovi.map((s) => (
                        <option value={s.sifra} key={s.sifra}>
                            {s.naziv}
                        </option>
                    ))}
                </Form.Select>
           
        </Form.Group >

                

           

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