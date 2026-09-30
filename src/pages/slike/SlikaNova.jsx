import { Await, useNavigate } from "react-router-dom";
import SlikaService from "../../services/slike/SlikaService";
import { RouteNames } from "../../constanst";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";

  
  


  export default function SlikaNova (){

    const navigate = useNavigate()

    async function dodaj (slika){
        await SlikaService.dodaj(slika).then(()=>{
            navigate(RouteNames.SLIKE)
        })
        
    }
  }

  function obradiSubmit(e){
    e.preventDefault()
    const podaci = new FormData(e.target)
    dodaj({
        naziv: podaci.get('naziv'),
        godinaIzrade: 2026,
        tehnika: podaci.get('tehnika'),
        sirina: 50,
        visina: 70,
        dostupnost: podaci.get(dostupno) === 0,
        image: '',
    })
  }

  return(
    <>
    <h3>
      Dodavanje nove slike  
    </h3>


    <Form onSubmit={obradiSubmit}>

        <Form.Group controlId="naziv">
          <FormLabel>Naziv</FormLabel>
          <FormControl type="text" name="naziv" required ></FormControl>
        </Form.Group>

        

    </Form>
    

    </>
  )