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
                        <div className="d-flex gap-3 pt-3">
                            <a href="/slike" className="btn btn-primary px-4 py-2">Pregledaj galeriju</a>
                            <a href="/ostaliProizvodi" className="btn btn-success px-4 py-2">Unikatni proizvodi</a>
                        </div>

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
                                borderRadius: '12px' // Malo mekši, moderniji kutevi za glavnu sliku
                            }}
                        >
                            <img
                                src="/slike/h01.jpg"
                                alt="Umjetnica na djelu"
                                className="w-100 h-100"
                                style={{
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* SEKCIJA O MENI - GALERIJSKI STIL */}
            <section className="bg-light py-5 my-5">
                <Container className="py-4">
                    <Row className="align-items-center g-5">
                        {/* Slika umjetnice oblikovana u elegantan krug ili zaobljeni portret */}
                        <Col lg={5} className="text-center">
                            <div
                                className="position-relative d-inline-block shadow-sm"
                                style={{
                                    width: '320px',
                                    height: '320px',
                                    borderRadius: '50%', // Čini okvir savršeno okruglim
                                    overflow: 'hidden',
                                    backgroundColor: '#fff',
                                    border: '6px solid #fff' // Daje efekt "rama" oko slike
                                }}
                            >
                                <img
                                    src="/slike/h02.jpg"
                                    alt="Anita - autorica"
                                    className="w-100 h-100"
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'top center',
                                        transition: 'transform 0.4s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                                />
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