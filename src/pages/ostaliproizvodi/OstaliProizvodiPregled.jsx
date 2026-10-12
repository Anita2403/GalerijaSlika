import { useEffect, useState } from "react"
import OstaliProizvodiService from "../../services/ostaliproizvodi/OstaliProizvodiService"
import { GrValidate } from "react-icons/gr"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate, useNavigationType } from "react-router-dom"
import { RouteNames } from "../../constanst"



export default function OstaliProizvodiPregled(){

    const[ostaliproizvodi, setSlike] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
       
        ucitajOstaliProizvodi()
    },[])

    async function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return
        }
        await OstaliProizvodiService.obrisi(sifra)
        ucitajOstaliProizvodi()
    }

    async function ucitajOstaliProizvodi() {
        await OstaliProizvodiService.get().then((odgovor)=> {
           // console.table(odgovor.data)
           setOstaliProizvodi(odgovor.data)
        })
    }

    return(
  <>
          <Link to={RouteNames.OSTALIPROIZVODI_DODAJ}
          className="btn btn-success w-100 my-3" >
                Dodavanje novih ostalih proizvoda
            </Link>
            
      
        <Table>
            <thead>
                <tr>
                 <th>Naziv</th> 
                 <th>Godina izrade</th>
                 <th>Materijal</th>  
                 <th>Dimenzije</th>
                 <th>Dostupnost</th>
                 <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {ostaliproizvodi && ostaliproizvodi.map((ostaliproizvodi) => (
                        <tr key={ostaliproizvodi.sifra}>
                            <td>{ostaliproizvodi.naziv}
                                {/* <br />
                                <small>
                                    {ostaliproizvodi.opis}
                                </small> */}
                            </td>
                            <td>{ostaliproizvodi.godinaIzrade}</td>
                            <td>{ostaliproizvodi.materijal}</td>
                            <td>{ostaliproizvodi.sirina}x{ostaliproizvodi.visina}</td>

                           

                            <td>
                                {/* Primjer jedne ikone s različitim svojstvima u odnosu na boolean svojstvo */}
                                <GrValidate
                                    size={25}
                                    color={ostaliproizvodi.dostupnost ? 'green' : 'red'}
                                   
                                />
                              
                            </td>
                            <td>
                                <Button onClick={()=>{navigate(`/ostaliproizvodi/${ostaliproizvodi.sifra}`)}}>
                                    Promijeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={()=>obrisi(ostaliproizvodi.sifra)}>
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