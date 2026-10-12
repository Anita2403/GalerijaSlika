import { DATA_SOURCE } from "../../constanst";
import OstaliProizvodiServiceLocalStorage from "./OstaliProizvodiServiceLocalStorage";
import OstaliProizvodiServiceMemorija from "./OstaliProizvodiServiceMemorija";

let Servis = null

switch (DATA_SOURCE){
    case 'memorija':
        Servis = OstaliProizvodiServiceMemorija
        break
    case 'localStorage':
        Servis = OstaliProizvodiServiceLocalStorage
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