

const STORAGE_KEY='tehnike'

function dohvatiSveizStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get() {
    const tehnike = dohvatiSveizStorage()
    return { data: [...tehnike] }

}

async function getBySifra(sifra) {
    const tehnike = dohvatiSveizStorage()
    return { data: tehnike.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(tehnika) {
    const tehnike = dohvatiSveizStorage()
    if (tehnike.length === 0) {
        tehnika.sifra = 1
    } else {
        const maxSifra = Math.max(...tehnike.map(s => s.sifra))
        tehnika.sifra = maxSifra + 1
    }
    tehnike.push(tehnika)
    spremiUStorage(tehnike)
}


async function promijeni(sifra, tehnika) {
    const tehnike = dohvatiSveizStorage()
    const index = tehnike.findIndex(s => s.sifra === parseInt(sifra))
    tehnike[index] = { ...tehnike[index], ...tehnika }
    spremiUStorage(tehnike)
}



async function obrisi(sifra) {
    let tehnike = dohvatiSveizStorage()
    tehnike = tehnike.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(tehnike)
}


export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}