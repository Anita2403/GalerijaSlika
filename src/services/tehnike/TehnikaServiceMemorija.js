
import { tehnike } from "./TehnikaPodaci";

async function get() {
    return { data: [...tehnike] }

}

async function getBySifra(sifra) {
    return { data: tehnike.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(tehnika) {
    if (tehnike.length === 0) {
        tehnika.sifra = 1
    } else {
        tehnika.sifra = tehnike[tehnike.length - 1].sifra + 1
    }
    tehnike.push(tehnika)
}


async function promijeni(sifra, tehnika) {
    const index = nadiIndex(sifra)
    tehnike[index] = { ...tehnike[index], ...tehnika }
}


function nadiIndex(sifra) {
    return tehnike.findIndex(s => s.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra)
    tehnike.splice(index, 1)
}


export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}