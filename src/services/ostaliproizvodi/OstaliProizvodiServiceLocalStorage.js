

const STORAGE_KEY='ostalipolaznici'

function dohvatiSveizStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get() {
    const ostaliproizvodi = dohvatiSveizStorage()
    return { data: [...ostaliproizvodi] }

}

async function getBySifra(sifra) {
    const ostaliproizvodi = dohvatiSveizStorage()
    return { data: ostaliproizvodi.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(ostaliproizvod) {
    const ostaliproizvodi = dohvatiSveizStorage()
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
    const ostaliproizvodi = dohvatiSveizStorage()
    const index = ostaliproizvodi.findIndex(s => s.sifra === parseInt(sifra))
    ostaliproizvodi[index] = { ...ostaliproizvodi[index], ...ostaliproizvod }
    spremiUStorage(ostaliproizvodi)
}



async function obrisi(sifra) {
    let ostaliproizvodi = dohvatiSveizStorage()
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