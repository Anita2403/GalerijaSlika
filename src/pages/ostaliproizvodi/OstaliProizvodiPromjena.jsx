import { Link, useNavigate, useParams } from "react-router-dom";
import OstaliProizvodiService from "../../services/ostaliproizvodi/OstaliProizvodiService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";





export default function OstaliProizvodiPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const[ostaliproizvod, setOstaliProizvodi] = useState({})
    const[dostupnost, setDostupnost] = useState(false)

    async function ucitajOstaliproizvodi(){
        await OstaliProizvodiService.getBySifra(params.sifra).then((odgovor)=>{
            const s = odgovor.data
            setOstaliProizvodi(s)
           // debugger
            setDostupnost(s.dostupnost)
        })
    }

    useEffect(()=>{
        ucitajOstaliproizvodi()
    },[])

    async function promijeni(ostaliproizvod) {
        await OstaliProizvodiService.promijeni(params.sifra, ostaliproizvod).then(() => {
            navigate(RouteNames.OSTALIPROIZVODI)
        })

    }


    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
            naziv: podaci.get('naziv'),
            godinaIzrade: parseInt(podaci.get('godinaIzrade')),
            materijal: podaci.get('materijal'),
            sirina: parseInt(podaci.get('sirina')),
            visina: parseInt(podaci.get('visina')),
            dostupnost: dostupnost,
            image: '',
            opis: podaci.get('opis'),
        })
    }

    return (
        <>
            <h3>
                Promjena ostalih proizvoda
            </h3>


            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={ostaliproizvod.naziv}/>
                    
                </Form.Group>

                <Form.Group controlId="godinaIzrade">
                    <Form.Label>Godina izrade</Form.Label>
                    <Form.Control type="number" name="godinaIzrade" step={1}
                    defaultValue={ostaliproizvod.godinaIzrade} />
                </Form.Group>

                <Form.Group controlId="materijal">
                    <Form.Label>Materijal</Form.Label>
                    <Form.Control type="text" name="materijal" required 
                    defaultValue={ostaliproizvod.materijal}/>
                </Form.Group>

                <Form.Group controlId="sirina">
                    <Form.Label>Širina</Form.Label>
                    <Form.Control type="number" name="sirina" 
                    defaultValue={ostaliproizvod.sirina}/>
                </Form.Group>

                <Form.Group controlId="visina">
                    <Form.Label>Visina</Form.Label>
                    <Form.Control type="number" name="visina" 
                    defaultValue={ostaliproizvod.visina}/>
                </Form.Group>

                <Form.Group controlId="dostupnost">
                    <Form.Check label="Dostupno" name="dostupnost"
                    checked={dostupnost} 
                    onChange={(e)=>{setDostupnost(e.target.checked)}}/>
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control as="textarea" rows={5} name="opis"
                    defaultValue={ostaliproizvod.opis}/>
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
                <Button type="submit">
                    Promijeni
                </Button>
                </Col>
            </Row>
            
             </Form>
        </>
    )

}