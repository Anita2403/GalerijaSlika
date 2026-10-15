
import { materijali } from "./MaterijalPodaci";

async function get() {
    return { data: [...materijali] }

}

async function getBySifra(sifra) {
    return { data: materijali.find(s => s.sifra === parseInt(sifra)) }
}


async function dodaj(materijal) {
    if (materijali.lenght === 0) {
        materijal.sifra = 1
    } else {
        materijal.sifra = materijali[materijali.length - 1].sifra + 1
    }
    materijali.push(materijal)
}


async function promijeni(sifra, materijal) {
    const index = nadiIndex(sifra)
    materijali[index] = { ...materijali[index], ...materijal }
}


function nadiIndex(sifra) {
    return materijali.findIndex(s => s.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra)
    materijali.splice(index, 1)
}


export default {
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
}