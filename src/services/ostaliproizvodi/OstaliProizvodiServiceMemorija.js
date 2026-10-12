
import { ostaliproizvodi } from "./OstaliProizvodiPodaci";

async function get() {
    return { data: [...ostaliproizvodi] }

}

async function getBySifra(sifra) {
    return { data: ostaliproizvodi.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(ostaliproizvod) {
    if (ostaliproizvodi.lenght === 0) {
        ostaliproizvod.sifra = 1
    } else {
        ostaliproizvod.sifra = ostaliproizvodi[ostaliproizvodi.length - 1].sifra + 1
    }
    ostaliproizvodi.push(ostaliproizvod)
}


async function promijeni(sifra, ostaliproizvod) {
    const index = nadiIndex(sifra)
    ostaliproizvodi[index] = { ...ostaliproizvodi[index], ...ostaliproizvod }
}


function nadiIndex(sifra) {
    return ostaliproizvodi.findIndex(s => s.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra)
    ostaliproizvodi.splice(index, 1)
}


export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}