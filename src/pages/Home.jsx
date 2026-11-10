import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IME_APLIKACIJE } from "../constanst";
import SlikaService from "../services/slike/SlikaService";
import OstaliProizvodiService from "../services/ostaliproizvodi/OstaliProizvodiService";


export default function Home() {
    const [statistika, setStatistika] = useState({ slike: 0, proizvodi: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const slikeRezultat = await SlikaService.get();
                const ostaliproizvodi = await OstaliProizvodiService.get();
                setStatistika({
                    slike: slikeRezultat.data.length,
                    proizvodi: ostaliproizvodi.data.length
                });
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="home-page">
            {/* HERO SEKCIJA */}
            <Container className="py-5 my-md-5">
                <Row className="align-items-center g-5">
                    <Col lg={6}>
                        <span className="text-uppercase tracking-widest text-muted small fw-semibold d-block mb-3">
                            Umjetnički Portfolio & Galerija
                        </span>
                        <h1 className="display-4 fw-light mb-4" style={{ letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                            Dobrodošli u svijet <span className="fw-semibold fst-italic">kreativnosti</span>
                        </h1>
                        <p className="lead text-secondary mb-4 fw-light" style={{ lineHeight: '1.8' }}>
                            Mjesto gdje se svakodnevica pretvara u platno, a ručni rad unosi dušu i toplinu u svaki prostor.
                        </p>
                        
                        {/* Minimalistička statistika umjesto teških kartica */}
                        <div className="d-flex gap-5 pt-3 border-top border-light">
                            <div>
                                <h3 className="fw-bold mb-0">{statistika.slike}</h3>
                                <small className="text-muted text-uppercase tracking-wider">Autorskih slika</small>
                            </div>
                            <div>
                                <h3 className="fw-bold mb-0">{statistika.proizvodi}</h3>
                                <small className="text-muted text-uppercase tracking-wider">Unikatnih proizvoda</small>
                            </div>
                        </div>
                    </Col>
                    
                    <Col lg={6}>
                        <div 
                            className="position-relative overflow-hidden shadow-sm"
                            style={{ 
                                height: '480px', 
                                backgroundColor: '#f4f4f4',
                                borderRadius: '4px' 
                            }}
                        >
                            {/* Ovdje umjesto placeholder-a ide prava istaknuta slika galerije */}
                            <div className="d-flex align-items-center justify-content-center h-100 text-muted fw-light">
                                <span className="small tracking-widest">[ Istaknuto Umjetničko Djelo ]</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* SEKCIJA O MENI - GALERIJSKI STIL */}
            <section className="bg-light py-5 my-5">
                <Container className="py-4">
                    <Row className="align-items-center g-5">
                        <Col lg={5}>
                            <div 
                                className="bg-white shadow-sm position-relative"
                                style={{ height: '420px', borderRadius: '4px' }}
                            >
                                <div className="d-flex align-items-center justify-content-center h-100 text-muted fw-light">
                                    <span className="small tracking-widest">[ Fotografija Umjetnice ]</span>
                                </div>
                            </div>
                        </Col>
                        
                        <Col lg={7} className="px-lg-5">
                            <h6 className="text-uppercase text-muted small tracking-widest mb-2">O autorici</h6>
                            <h2 className="fw-light mb-4 display-6">Pozdrav, ja sam Anita.</h2>
                            
                            <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                                U užurbanoj svakodnevici, slikanje je moj osobni bijeg – prostor u kojem sam istinski svoja i prisutna u trenutku.
                            </p>
                            <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                                Samouka sam umjetnica, a svoje vještine i izričaj razvijam uz pomoć kreativnog učenja i četverogodišnjeg stvaranja u sklopu osječke udruge "Likar". Moje slike nastaju spontano, no svaka s vremenom dobije svoju dublju priču.
                            </p>
                            <p className="text-secondary mb-0" style={{ lineHeight: '1.8' }}>
                                Tu istu strast prema detaljima prenosim i na ručno rađene torbe, svijećnjake i dekoracije. Vjerujem da unikatni ručni rad unosi toplinu u svaki prostor.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}