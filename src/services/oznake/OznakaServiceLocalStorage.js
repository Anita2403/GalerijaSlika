const STORAGE_KEY = 'oznake'

function dohvatiSveizStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get() {
    const oznake = dohvatiSveizStorage()
    return { data: [...oznake] }
}

async function getBySifra(sifra) {
    const oznake = dohvatiSveizStorage()
    return { data: oznake.find(s => s.sifra === parseInt(sifra)) }
}

async function dodaj(oznaka) {
    const oznake = dohvatiSveizStorage()
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
    const oznake = dohvatiSveizStorage()
    const index = oznake.findIndex(s => s.sifra === parseInt(sifra))
    oznake[index] = { ...oznake[index], ...oznaka }
    spremiUStorage(oznake)
}

async function obrisi(sifra) {
    let oznake = dohvatiSveizStorage()
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
