import { PrefixStorage } from "../../constanst"


function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.SLIKE)
    return podaci ? JSON.parse(podaci) : []
}
function spremiUStorage(podaci){
    localStorage.setItem(PrefixStorage.SLIKE, JSON.stringify(podaci))
}

async function get() {
    const slike = dohvatiSveIzStorage()
    return { data: [...slike] }

}

async function getBySifra(sifra) {
    const slike = dohvatiSveIzStorage()
    return { data: slike.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(slika) {
    const slike = dohvatiSveIzStorage()
    if (slike.length === 0) {
        slika.sifra = 1
    } else {
        const maxSifra = Math.max(...slike.map(s => s.sifra))
        slika.sifra = maxSifra + 1
    }
    slike.push(slika)
    spremiUStorage(slike)
}


async function promijeni(sifra, slika) {
    const slike = dohvatiSveIzStorage()
    const index = slike.findIndex(s => s.sifra === parseInt(sifra))
    slike[index] = { ...slike[index], ...slika }
    spremiUStorage(slike)
}



async function obrisi(sifra) {
    let slike = dohvatiSveIzStorage()
    slike = slike.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(slike)
}


export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}