import { useEffect, useState } from "react"
import SlikaService from "../../services/slike/SlikaService"
import { GrValidate } from "react-icons/gr"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate, } from "react-router-dom"
import { RouteNames } from "../../constanst"
import TehnikaService from "../../services/tehnike/TehnikaService"



export default function SlikaPregled(){

    const[slike, setSlike] = useState([])
    const[tehnike, setTehnike] = useState([])
    
    const navigate = useNavigate()


    useEffect(()=>{
       
        ucitajSlike()
        ucitajTehnike()
    },[])

    async function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return
        }
        await SlikaService.obrisi(sifra)
        ucitajSlike()
    }

    async function ucitajSlike() {
        await SlikaService.get().then((odgovor)=> {
           // console.table(odgovor.data)
        //    console.log(JSON.stringify(odgovor.data))
           setSlike(odgovor.data)
        })
    }

    async function ucitajTehnike(){
        await TehnikaService.get().then((odgovor) => {

            setTehnike(odgovor.data)
        })
    }
    
    function dohvatiNazivTehnika(sifraTehnika){
        const tehnika = tehnike.find(s => s.sifra === sifraTehnika)
        return tehnika.naziv
    }


    return(
  <>
          <Link to={RouteNames.SLIKE_DODAJ}
          className="btn btn-success w-100 my-3" >
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
                            <td>
                            <img style={{maxWidth: '30px'}} src={slika.image} alt={'Slika ' + slika.naziv} />
                            {slika.naziv}
                             <span title="Broj oznaka"> ({slika.oznake.length}) </span>
                                {/* <br />
                                <small>
                                    {slika.opis}
                                </small> */}
                            </td>
                            <td>{slika.godinaIzrade}</td>
                            
                            <td>{dohvatiNazivTehnika(slika.tehnika)}</td>
                                

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
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={()=>obrisi(slika.sifra)}>
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