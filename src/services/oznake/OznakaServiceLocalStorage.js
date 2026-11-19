import { PrefixStorage } from "../../constanst"

function dohvatiSveIzStorage(){
    const podaci = localStorage.getItem(PrefixStorage.OZNAKE)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(PrefixStorage.OZNAKE, JSON.stringify(podaci))
}

async function get() {
    const oznake = dohvatiSveIzStorage()
    return { data: [...oznake] }
}

async function getBySifra(sifra) {
    const oznake = dohvatiSveIzStorage()
    return { data: oznake.find(s => s.sifra === parseInt(sifra)) }
}

async function dodaj(oznaka) {
    const oznake = dohvatiSveIzStorage()
    if (oznake.length === 0) {
        oznaka.sifra = 1
    } else {
        const maxSifra = Math.max(...oznake.map(s => s.sifra))
        oznaka.sifra = maxSifra + 1
    }
    oznake.push(oznaka)
    spremiUStorage(oznake)
}

async function promijeni(sifra, oznaka) {
    const oznake = dohvatiSveIzStorage()
    const index = oznake.findIndex(s => s.sifra === parseInt(sifra))
    oznake[index] = { ...oznake[index], ...oznaka }
    spremiUStorage(oznake)
}

async function obrisi(sifra) {
    let oznake = dohvatiSveIzStorage()
    oznake = oznake.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(oznake)
}

export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}
