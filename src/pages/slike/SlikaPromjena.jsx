import { Await, Link, useNavigate, useParams } from "react-router-dom";
import SlikaService from "../../services/slike/SlikaService";
import { RouteNames } from "../../constanst";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useEffect, useState } from "react";





export default function SlikaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const[slika, setSlika] = useState({})
    const[dostupnost, setDostupnost] = useState(false)

    async function ucitajSlike(){
        await SlikaService.getBySifra(params.sifra).then((odgovor)=>{
            const s = odgovor.data
            setSlika(s)
           // debugger
            setDostupnost(s.dostupnost)
        })
    }

    useEffect(()=>{
        ucitajSlike()
    },[])

    async function dodaj(slike) {
        await SlikaService.dodaj(slike).then(() => {
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
        })
    }

    return (
        <>
            <h3>
                Promjena slike
            </h3>


            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={slika.naziv}/>
                    
                </Form.Group>

                <Form.Group controlId="godinaIzrade">
                    <Form.Label>Godina izrade</Form.Label>
                    <Form.Control type="number" name="godinaIzrade" step={1}
                    defaultValue={slika.godinaIzrade} />
                </Form.Group>

                <Form.Group controlId="tehnika">
                    <Form.Label>Tehnika</Form.Label>
                    <Form.Control type="text" name="tehnika" required 
                    defaultValue={slika.tehnika}/>
                </Form.Group>

                <Form.Group controlId="sirina">
                    <Form.Label>Širina</Form.Label>
                    <Form.Control type="number" name="sirina" 
                    defaultValue={slika.sirina}/>
                </Form.Group>

                <Form.Group controlId="visina">
                    <Form.Label>Visina</Form.Label>
                    <Form.Control type="number" name="visina" 
                    defaultValue={slika.visina}/>
                </Form.Group>

                <Form.Group controlId="dostupnost">
                    <Form.Check label="Dostupno" name="dostupnost"
                    checked={dostupnost} 
                    onChange={(e)=>{setDostupnost(e.target.checked)}}/>
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
                    Promijeni
                </Button>
                </Col>
            </Row>
            
             </Form>
        </>
    )

}