import { useEffect, useState } from "react"
import OznakaService from "../../services/oznake/OznakaService"
import { Badge, Button, Card, Col, Row, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constanst"
import { BiEdit, BiRecycle } from "react-icons/bi"

export default function OznakaPregled() {

    const [oznake, setOznake] = useState([])
    
    const navigate = useNavigate()

    async function ucitajOznake() {
        await OznakaService.get().then((odgovor) => {
            setOznake(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajOznake()
    }, [])

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati')) {
            return
        }

        await OznakaService.obrisi(sifra)
        ucitajOznake()
    }

    return (
        <>
            <Link to={RouteNames.OZNAKE_DODAJ}
                className="btn btn-success w-100 my-3" >
                Dodavanje novih oznaka
            </Link>


            <Row>
                 {oznake && oznake.map((oznaka) => (
                        <Col key={oznaka.sifra}>
                            <Card className="p-4 m-1 kartica" style={{minHeight: '7rem', minWidth: '10rem'}}>
{oznaka.naziv}
                                <hr />
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                    <BiEdit title="Promijeni" onClick={() => { navigate(`/oznake/${oznaka.sifra}`) }}
                                    style={{cursor: 'hand', color:'#0d6eff'}}/> 
                                    </Col>
                                    <Col>
                                    <BiRecycle title="Obriši" onClick={() => obrisi(oznaka.sifra)}
                                    style={{cursor: 'hand', color: '#dc3545'}} />
                                    </Col>
                                </Row>
                            </Card>
                                
                                
                                    
                                
                           
                             
                           
                        </Col>
                        
                    ))}
            </Row>




            {/* <Table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {oznake && oznake.map((oznaka) => (
                        <tr key={oznaka.sifra}>
                            <td>
                                {oznaka.naziv}
                            </td>

                            <td>
                                <Button onClick={() => { navigate(`/oznake/${oznaka.sifra}`) }}>
                                    Promijeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => obrisi(oznaka.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}
            Ukupno oznaka: &nbsp;
            <Badge pill bg="success">
                {oznake && oznake.length}
            </Badge>    
        </>
    )
}