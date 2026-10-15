

const STORAGE_KEY='materijali'

function dohvatiSveizStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get() {
    const materijali = dohvatiSveizStorage()
    return { data: [...materijali] }

}

async function getBySifra(sifra) {
    const materijali = dohvatiSveizStorage()
    return { data: materijali.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(materijal) {
    const materijali = dohvatiSveizStorage()
    if (materijali.length === 0) {
        materijal.sifra = 1
    } else {
        const maxSifra = Math.max(...materijali.map(s => s.sifra))
        materijal.sifra = maxSifra + 1
    }
    materijali.push(materijal)
    spremiUStorage(materijali)
}


async function promijeni(sifra, materijal) {
    const materijali = dohvatiSveizStorage()
    const index = materijali.findIndex(s => s.sifra === parseInt(sifra))
    materijali[index] = { ...materijali[index], ...materijal }
    spremiUStorage(materijali)
}



async function obrisi(sifra) {
    let materijali = dohvatiSveizStorage()
    materijali = materijali.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(materijali)
}


export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}