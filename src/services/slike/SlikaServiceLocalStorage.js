

const STORAGE_KEY='slike'

function dohvatiSveizStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get() {
    const slike = dohvatiSveizStorage()
    return { data: [...slike] }

}

async function getBySifra(sifra) {
    const slike = dohvatiSveizStorage()
    return { data: slike.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(slika) {
    const slike = dohvatiSveizStorage()
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
    const slike = dohvatiSveizStorage()
    const index = slike.findIndex(s => s.sifra === parseInt(sifra))
    slike[index] = { ...slike[index], ...slika }
    spremiUStorage(slike)
}



async function obrisi(sifra) {
    let slike = dohvatiSveizStorage()
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