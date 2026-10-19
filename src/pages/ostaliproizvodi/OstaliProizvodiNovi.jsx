import { Link, useNavigate } from "react-router-dom";
import OstaliProizvodiService from "../../services/ostaliproizvodi/OstaliProizvodiService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import MaterijalService from "../../services/materijali/MaterijalService";





export default function OstaliProizvodiNovi() {
    const [materijali, setMaterijali]=useState([])

    async function ucitajMaterijali(){
        await MaterijalService.get().then((odgovor) => {
            setMaterijali(odgovor.data)
        })
    }

    useEffect(()=>{
        ucitajMaterijali()
    }, [])

    const navigate = useNavigate()

    async function dodaj(ostaliproizvodi) {
        await OstaliProizvodiService.dodaj(ostaliproizvodi).then(() => {
            navigate(RouteNames.OSTALIPROIZVODI)
        })

    }


    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            godinaIzrade: parseInt(podaci.get('godinaIzrade')),
            materijal: parseInt(podaci.get('materijal')),
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
                Dodavanje novih proizvoda
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

                <Form.Group controlId="materijal">
                    <Form.Label>Materijal</Form.Label>
                    <Form.Select name="materijal" required>
                        <option value="">Odaberi materijal</option>
                        {materijali&materijali.map((t)=>(
                         <option key={t.sifra} value={t.sifra}>t.naziv</option>
                        ))}
                    </Form.Select>
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
                    <Link to={RouteNames.OSTALIPROIZVODI}
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