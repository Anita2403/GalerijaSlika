
import { ostaliproizvodi } from "./OstaliProizvodiPodaci";

async function get() {
    return { data: [...ostaliproizvodi] }

}

async function getBySifra(sifra) {
    return { data: ostaliproizvodi.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(ostaliproizvodi) {
    if (ostaliproizvodi.lenght === 0) {
        ostaliproizvodi.sifra = 1
    } else {
        ostaliproizvodi.sifra = ostaliproizvodi[ostaliproizvodi.length - 1].sifra + 1
    }
    ostaliproizvodi.push(ostaliproizvodi)
}


async function promijeni(sifra, ostaliproizvodi) {
    const index = nadiIndex(sifra)
    ostaliproizvodi[index] = { ...ostaliproizvodi[index], ...ostaliproizvodi }
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