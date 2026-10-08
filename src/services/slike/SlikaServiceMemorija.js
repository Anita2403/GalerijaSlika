
import { slike } from "./SlikaPodaci";

async function get() {
    return { data: [...slike] }

}

async function getBySifra(sifra) {
    return { data: slike.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(slika) {
    if (slike.lenght === 0) {
        slika.sifra = 1
    } else {
        slika.sifra = slike[slike.length - 1].sifra + 1
    }
    slike.push(slika)
}


async function promijeni(sifra, slika) {
    const index = nadiIndex(sifra)
    slike[index] = { ...slike[index], ...slika }
}


function nadiIndex(sifra) {
    return slike.findIndex(s => s.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra)
    slike.splice(index, 1)
}


export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}