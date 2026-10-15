import { useEffect, useState } from "react"
import MaterijalService from "../../services/materijali/MaterijalService"
import { Badge, Button, Table } from "react-bootstrap"
import { Link, useNavigate, } from "react-router-dom"
import { RouteNames } from "../../constanst"



export default function MaterijalPregled() {

    const [materijali, setMaterijali] = useState([])
   


    const navigate = useNavigate()

    async function ucitajMaterijali() {
        await MaterijalService.get().then((odgovor) => {
            // console.table(odgovor.data)

            //    console.log(JSON.stringify(odgovor.data))
            setMaterijali(odgovor.data)
        })
    }

    useEffect(() => {
            ucitajMaterijali()
        }, [])

    async function obrisi(sifra) {
                if (!confirm('Sigurno obrisati')) {
                    return
                }

                await MaterijalService.obrisi(sifra)
                ucitajMaterijali()
     }

    return (
            <>
                <Link to={RouteNames.MATERIJALI_DODAJ}
                    className="btn btn-success w-100 my-3" >
                    Dodavanje novih materijala
                </Link>


                <Table>
                    <thead>
                        <tr>
                            <th>Naziv</th>
                            <th>Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materijali && materijali.map((materijal) => (
                            <tr key={materijal.sifra}>
                                <td>
                                    {materijal.naziv}
                                </td>

                                <td>
                                    <Button onClick={() => { navigate(`/materijali/${materijal.sifra}`) }}>
                                        Promijeni
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button variant="danger" onClick={() => obrisi(materijal.sifra)}>
                                        Obriši
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                      Ukupno materijal: &nbsp;
                      <Badge pill bg="success">
                        {materijali&&materijali.length}
                        </Badge>     

            </>
        )
    }