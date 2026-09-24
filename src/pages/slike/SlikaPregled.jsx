import { useEffect, useState } from "react"
import SlikaService from "../../services/slike/SlikaService"
import { GrValidate } from "react-icons/gr"
import { Table } from "react-bootstrap"



export default function SlikaPregled(){

    const[slike, setSlike] = useState([])

    useEffect(()=>{
       
        ucitajSlike()
    },[])

    async function ucitajSlike () {
        await SlikaService.get().then((odgovor)=>{
           // console.table(odgovor.data)
           setSlike(odgovor.data)
        })
    }

    return(
        <>
        <Table>
            <thead>
                <tr>
                 <th>Naziv</th> 
                 <th>Godina izrade</th>
                 <th>Tehnika</th>  
                 <th>Dimenzije</th>
                 <th>Dostupnost</th>
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
                        </tr>
                    ))}
            </tbody>
        </Table>
        
        
        </>
    )
}