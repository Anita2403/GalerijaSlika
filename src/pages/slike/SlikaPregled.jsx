import { useEffect, useState } from "react"
import SlikaService from "../../services/slike/SlikaService"
import { GrValidate } from "react-icons/gr"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate, useNavigationType } from "react-router-dom"
import { RouteNames } from "../../constanst"



export default function SlikaPregled(){

    const[slike, setSlike] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
       
        ucitajSlike()
    },[])

    async function ucitajSlike() {
        await SlikaService.get().then((odgovor)=> {
           // console.table(odgovor.data)
           setSlike(odgovor.data)
        })
    }

    return(
  <>
          <Link to={RouteNames.SLIKE_DODAJ}>
                Dodavanje novih slika
            </Link>


      
        <Table>
            <thead>
                <tr>
                 <th>Naziv</th> 
                 <th>Godina izrade</th>
                 <th>Tehnika</th>  
                 <th>Dimenzije</th>
                 <th>Dostupnost</th>
                 <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {slike && slike.map((slika) => (
                        <tr key={slika.sifra}>
                            <td>{slika.naziv}</td>
                            <td>{slika.godinaIzrade}</td>
                            <td>{slika.tehnika}</td>
                            <td>{slika.sirina}x{slika.visina}</td>

                           

                            <td>
                                {/* Primjer jedne ikone s različitim svojstvima u odnosu na boolean svojstvo */}
                                <GrValidate
                                    size={25}
                                    color={slika.dostupnost ? 'green' : 'red'}
                                   
                                />
                              
                            </td>
                            <td>
                                <Button onClick={()=>{navigate(`/slike/${slika.sifra}`)}}>
                                    Promijeni
                                </Button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
        
        
        </>
    )
}