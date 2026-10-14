import { DATA_SOURCE } from "../../constanst";
import TehnikaServiceLocalStorage from "./TehnikaServiceLocalStorage";
import TehnikaServiceMemorija from "./TehnikaServiceMemorija";

let Servis = null

switch (DATA_SOURCE){
    case 'memorija':
        Servis = TehnikaServiceMemorija
        break
    case 'localStorage':
        Servis = TehnikaServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async ()  => ({data: []}),
    getBySifra: async(sifra) => ({data: {}}),
    dodaj: async (tehnika) => {console.error('Servis nije implementiran')},
    promijeni: async (sifra, tehnika) => {console.error('Servis nije implementiran')},
    obrisi: async (sifra) => {console.error('Servis nije implementiran')}
}

const AktivniServis = Servis || PrazanServis

export default{
    get:() => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (sifra) => AktivniServis.dodaj(sifra),
    promijeni: (sifra, tehnika) => AktivniServis.promijeni(sifra, tehnika),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
}