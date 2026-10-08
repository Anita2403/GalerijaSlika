import { DATA_SOURCE } from "../../constanst";
import SlikaServiceLocalStorage from "./SlikaServiceLocalStorage";
import SlikaServiceMemorija from "./SlikaServiceMemorija";

let Servis = null

switch (DATA_SOURCE){
    case 'memorija':
        Servis = SlikaServiceMemorija
        break
    case 'localStorage':
        Servis = SlikaServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async ()  => ({data: []}),
    getBySifra: async(sifra) => ({data: {}}),
    dodaj: async (slika) => {console.error('Servis nije implementiran')},
    promijeni: async (sifra, slika) => {console.error('Servis nije implementiran')},
    obrisi: async (sifra) => {console.error('Servis nije implementiran')}
}

const AktivniServis = Servis || PrazanServis

export default{
    get:() => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (sifra) => AktivniServis.dodaj(sifra),
    promijeni: (sifra, slika) => AktivniServis.promijeni(sifra, slika),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
}