import { useState } from "react";


export default function Home() {

    const [brojSlike, setBrojSlike] = useState(0);
    const [brojOstalihProizvoda, setBrojOstalihProizvoda] = useState(0);
    const [brojTehnika, setBrojTehnika] = useState(0);
    const [brojMaterijali, setBrojMaterijali] = useState(0);
    const [animatedSlike, setAnimatedSlike] = useState(0);
    const [animatedOstaliProizvodi, setAnimatedOstaliProizvodi] = useState(0);
    const [animatedTehnike, setAnimatedTehnike] = useState(0);
    const [animatedMaterijali, setAnimatedMaterijali] = useState(0);

     useEffect(() => {
        const fetchData = async () => {
            try {
                const slikeRezultat = await SlikaService.get();
                const ostaliproizvodi = await OstaliProizvodiService.get();
                const tehnike = await TehnikaService.get();
                
                setBrojSmjerova(smjeroviRezultat.data.length);
                setBrojPolaznika(polaznici.data.length);
                setBrojGrupa(grupe.data.length);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h1>Dobrodošli u galeriju slika</h1>
            </div>

            <div style={{ textAlign: 'left' }}>
                <h3>O meni</h3>
            </div>
        </>


    )
}