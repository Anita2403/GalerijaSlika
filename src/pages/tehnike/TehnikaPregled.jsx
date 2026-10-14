import { useEffect, useState } from "react"
import TehnikaService from "../../services/tehnike/TehnikaService"
import { GrValidate } from "react-icons/gr"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate, } from "react-router-dom"
import { RouteNames } from "../../constanst"



export default function TehnikaPregled() {

    const [tehnike, setTehnike] = useState([])
    const navigate = useNavigate()


    useEffect(() => {

        ucitajTehnike()
    }, [])

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati')) {
            return
        }
        await TehnikaService.obrisi(sifra)
        ucitajTehnike()
    }

    async function ucitajTehnike() {
        await TehnikaService.get().then((odgovor) => {
            // console.table(odgovor.data)

            //    console.log(JSON.stringify(odgovor.data))
            setTehnike(odgovor.data)
        })
    }

    return (
        <>
            <Link to={RouteNames.TEHNIKE_DODAJ}
                className="btn btn-success w-100 my-3" >
                Dodavanje novih tehnika
            </Link>


            <Table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {tehnike && tehnike.map((tehnika) => (
                        <tr key={tehnika.sifra}>
                            <td>{tehnika.naziv}
                                {/* <br />
                                <small>
                                    {tehnika.opis}
                                </small> */}
                            </td>



                            <td>
                                <Button onClick={() => { navigate(`/tehnike/${tehnika.sifra}`) }}>
                                    Promijeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => obrisi(tehnika.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </>
    )
}