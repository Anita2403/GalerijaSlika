import { useEffect, useState } from "react";


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

                setBrojSlike(slikeRezultat.data.length);
                setBrojOstalihProizvoda(ostaliproizvodi.data.length);
                setBrojTehnika(tehnike.data.length);
                setBrojMaterijali(brojMaterijali.data.length);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (animatedSlike < brojSlike) {
            const timer = setTimeout(() => {
                setAnimatedSlike(prev => Math.min(prev + 1, brojSlike));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [animatedSlike, brojSlike]);

    useEffect(() => {
        if (animatedOstaliProizvodi < brojOstalihProizvoda) {
            const timer = setTimeout(() => {
                setAnimatedOstaliProizvodi(prev => Math.min(prev + 1, brojOstalihProizvoda));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [animatedOstaliProizvodi, brojOstalihProizvoda]);

    useEffect(() => {
        if (animatedTehnike < brojTehnika) {
            const timer = setTimeout(() => {
                setAnimatedTehnike(prev => Math.min(prev + 1, brojTehnika));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedTehnike, brojTehnika]);

    useEffect(() => {
        if (animatedMaterijali < brojMaterijali) {
            const timer = setTimeout(() => {
                setAnimatedMaterijali(prev => Math.min(prev + 1, brojMaterijali));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedMaterijali, brojMaterijali]);

    return (
        <>
            <Row>
                <Col md={6}>
                    <div style={{ textAlign: 'center' }}>

                    </div>
                    <p className="lead m-5 text-center">Dobrodošli na {IME_APLIKACIJE}</p>
                    <div style={{ maxWidth: '500px', margin: 'auto' }}>
                    </div>
                </Col>

                <Col className="d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%', maxWidth: '400px' }}>
                        <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                            <Card.Body className="text-center">
                                <p className="text-white">Slike</p>
                                <div className="statistikaTekst">
                                    {animatedSlike}
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                            <Card.Body className="text-center">
                                <p className="text-white">Ostali proizvodi</p>
                                <div className="statistikaTekst">
                                    {animatedOstaliProizvodi}
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="shadow-lg border-0 statistikaPanel">
                            <Card.Body className="text-center">
                                <p className="text-white">Tehnike</p>
                                <div className="statistikaTekst">
                                    {animatedTehnike}
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="shadow-lg border-0 statistikaPanel">
                            <Card.Body className="text-center">
                                <p className="text-white">Materijali</p>
                                <div className="statistikaTekst">
                                    {animatedMaterijali}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>


            <div style={{ textAlign: 'left' }}>
                <h3>O meni</h3>
            </div>
        </>


    )
}