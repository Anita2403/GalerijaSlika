import bcrypt from 'bcryptjs'

// Inicijalni operateri s hashiranim lozinkama
// Lozinka za sve: "GalerijaSlika123!"
const hashiranaLozinka = bcrypt.hashSync('GalerijaSlika123!', 10)

export const operateri = [
    {
        sifra: '1',
        email: 'admin@galerijaslika.hr',
        lozinka: hashiranaLozinka,
        uloga: 'admin'
    },
    {
        sifra: '2',
        email: 'operater@galerijaslika.hr',
        lozinka: hashiranaLozinka,
        uloga: 'korisnik'
    }
]

export default{
    operateri
}