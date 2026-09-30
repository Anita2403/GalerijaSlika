
import { slike } from "./SlikaPodaci";

async function get() {
    return {data:[...slike]}

}


async function dodaj(slike) {
    if(slike.lenght === 0){
       slike.sifra = 1 
    }else{
        slike.sifra = slike[slike.lenght - 1].sifra + 1
    }
    slike.push(slike)
}

export default{
    get,
    dodaj
}