import OznakaServiceMemorija from "./OznakaServiceMemorija";
import OznakaServiceLocalStorage from "./OznakaServiceLocalStorage";
import { DATA_SOURCE } from "../../constanst";

let Servis = null

switch (DATA_SOURCE){
    case 'memorija':
        Servis = OznakaServiceMemorija
        break
    case 'localStorage':
        Servis = OznakaServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async ()  => ({data: []}),
    getBySifra: async(sifra) => ({data: {}}),
    dodaj: async (oznaka) => {console.error('Servis nije implementiran')},
    promijeni: async (sifra, oznaka) => {console.error('Servis nije implementiran')},
    obrisi: async (sifra) => {console.error('Servis nije implementiran')}
}

const AktivniServis = Servis || PrazanServis

export default{
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (oznaka) => AktivniServis.dodaj(oznaka),
    promijeni: (sifra, oznaka) => AktivniServis.promijeni(sifra, oznaka),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
}