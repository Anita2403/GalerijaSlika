
import { slike } from "./SlikaPodaci";

async function get() {
    return {data:[...slike]}

}

async function getBySifra(sifra) {
    return {data: slike.find(s => s.sifra === parseInt(sifra))}
}


async function dodaj(slika) {
    if(slike.lenght === 0){
       slika.sifra = 1 
    }else{
        slika.sifra = slike[slike.lenght - 1].sifra + 1
    }
    slike.push(slika)
}

export default{
    get,
    getBySifra,
    dodaj,
}