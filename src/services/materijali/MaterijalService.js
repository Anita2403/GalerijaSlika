import { DATA_SOURCE } from "../../constanst";
import MaterijalServiceLocalStorage from "./MaterijalServiceLocalStorage";
import MaterijalServiceMemorija from "./MaterijalServiceMemorija";

let Servis = null

switch (DATA_SOURCE){
    case 'memorija':
        Servis = MaterijalServiceMemorija
        break
    case 'localStorage':
        Servis = MaterijalServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async ()  => ({data: []}),
    getBySifra: async(sifra) => ({data: {}}),
    dodaj: async (materijal) => {console.error('Servis nije implementiran')},
    promijeni: async (sifra, materijal) => {console.error('Servis nije implementiran')},
    obrisi: async (sifra) => {console.error('Servis nije implementiran')}
}

const AktivniServis = Servis || PrazanServis

export default{
    get:() => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (sifra) => AktivniServis.dodaj(sifra),
    promijeni: (sifra, materijal) => AktivniServis.promijeni(sifra, materijal),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
}