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
    dodaj: async (ostaliproizvod) => {console.error('Servis nije implementiran')},
    promijeni: async (sifra, ostaliproizvod) => {console.error('Servis nije implementiran')},
    obrisi: async (sifra) => {console.error('Servis nije implementiran')}
}

const AktivniServis = Servis || PrazanServis

export default{
    get:() => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (sifra) => AktivniServis.dodaj(sifra),
    promijeni: (sifra, ostaliproizvod) => AktivniServis.promijeni(sifra, ostaliproizvod),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
}