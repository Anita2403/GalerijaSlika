import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IME_APLIKACIJE } from "../constanst";
import OstaliProizvodiService from "../services/ostaliproizvodi/OstaliProizvodiService";
import SlikaService from "../services/slike/SlikaService";
import TehnikaService from "../services/tehnike/TehnikaService";
import MaterijalService from "../services/materijali/MaterijalService";


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
                const brojMaterijali = await MaterijalService.get();

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
                        <Row>
                            <Col>
                                <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                                    <Card.Body className="text-center">
                                        <p className="text-white">Slike</p>
                                        <div className="statistikaTekst">
                                            {animatedSlike}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                                    <Card.Body className="text-center">
                                        <p className="text-white">Ostali proizvodi</p>
                                        <div className="statistikaTekst">
                                            {animatedOstaliProizvodi}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>


                        <Row>
                            <Col>
                                <Card className="shadow-lg border-0 statistikaPanel">
                                    <Card.Body className="text-center">
                                        <p className="text-white">Tehnike</p>
                                        <div className="statistikaTekst">
                                            {animatedTehnike}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="shadow-lg border-0 statistikaPanel">
                                    <Card.Body className="text-center">
                                        <p className="text-white">Materijali</p>
                                        <div className="statistikaTekst">
                                            {animatedMaterijali}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>




                    </div>
                </Col>
            </Row>

         
            <div className="bg-white py-5 shadow-sm my-5">
                <Container>
                    <Row className="align-items-center g-5">
                        {/* Ovdje možeš staviti svoju sliku */}
                        <Col lg={5} className="text-center">
                            <div
                                className="bg-light rounded-3 shadow-sm d-flex align-items-center justify-content-center text-muted"
                                style={{ height: '350px', border: '2px dashed #dee2e6' }}
                            >
                                <span>[ Ovdje ide tvoja slika ]</span>
                            </div>
                        </Col>

                        {/* Tekst o tebi */}
                        <Col lg={7}>
                            <h2 className="fw-bold mb-3">O meni</h2>
                            <h5 className="text-primary fw-semibold mb-3">
                                Pozdrav, ja sam Anita!
                            </h5>
                            <p className="text-muted mb-3">
                                Dobrodošli u moj kreativni svijet. U užurbanoj svakodnevici, slikanje je moj osobni bijeg – prostor u kojem sam istinski svoja i prisutna u trenutku.
                            </p>
                            <p className="text-muted mb-3">
                                Samouka sam umjetnica, a svoje vještine i izričaj razvijam uz pomoć kreativnog učenja i četverogodišnjeg stvaranja u sklopu osječke udruge "Likar". Moje slike nastaju spontano, no svaka s vremenom dobije svoju dublju priču i razlog postojanja.
                            </p>
                            <p className="text-muted mb-0">
                                Tu istu strast prema detaljima prenosim i na ručno rađene torbe, svijećnjake i dekoracije. Vjerujem da unikatni ručni rad unosi toplinu u svaki prostor. Hvala ti što podržavaš moj rad!
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
          
      </>


    )
}