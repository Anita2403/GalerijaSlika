import { PrefixStorage } from "../../constanst"

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.OSTALIPROIZVODI)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(PrefixStorage.OSTALIPROIZVODI, JSON.stringify(podaci))
}

async function get() {
    const ostaliproizvodi = dohvatiSveIzStorage()
    return { data: [...ostaliproizvodi] }

}

async function getBySifra(sifra) {
    const ostaliproizvodi = dohvatiSveIzStorage()
    return { data: ostaliproizvodi.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(ostaliproizvod) {
    const ostaliproizvodi = dohvatiSveIzStorage()
    if (ostaliproizvodi.length === 0) {
        ostaliproizvod.sifra = 1
    } else {
        const maxSifra = Math.max(...ostaliproizvodi.map(s => s.sifra))
        ostaliproizvod.sifra = maxSifra + 1
    }
    ostaliproizvodi.push(ostaliproizvod)
    spremiUStorage(ostaliproizvodi)
}


async function promijeni(sifra, ostaliproizvod) {
    const ostaliproizvodi = dohvatiSveIzStorage()
    const index = ostaliproizvodi.findIndex(s => s.sifra === parseInt(sifra))
    ostaliproizvodi[index] = { ...ostaliproizvodi[index], ...ostaliproizvod }
    spremiUStorage(ostaliproizvodi)
}



async function obrisi(sifra) {
    let ostaliproizvodi = dohvatiSveIzStorage()
    ostaliproizvodi = ostaliproizvodi.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(ostaliproizvodi)
}


export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}