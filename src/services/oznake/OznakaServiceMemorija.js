import { oznake } from "./OznakaPodaci";

async function get() {
    return { data: [...oznake] }
}

async function getBySifra(sifra) {
    return { data: oznake.find(s => s.sifra === parseInt(sifra)) }
}

async function dodaj(oznaka) {
    if (oznake.length === 0) {
        oznaka.sifra = 1
    } else {
        oznaka.sifra = oznake[oznake.length - 1].sifra + 1
    }
    oznake.push(oznaka)
}

async function promijeni(sifra, oznaka) {
    const index = nadiIndex(sifra)
    oznake[index] = { ...oznake[index], ...oznaka }
}

function nadiIndex(sifra) {
    return oznake.findIndex(s => s.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra)
    oznake.splice(index, 1)
}

export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}