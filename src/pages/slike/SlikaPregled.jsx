import { useEffect, useState } from "react";
import SlikaService from "../../services/slike/SlikaService";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constanst";
import TehnikaService from "../../services/tehnike/TehnikaService";
import { FaEdit, FaFilePdf, FaTrash, FaPlus } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import OznakaService from "../../services/oznake/OznakaService";
import SlikePDFGenerator from "../../components/SlikePDFGenerator";
import useAuth from "../../hooks/useAuth";

export default function SlikaPregled() {
    const [slike, setSlike] = useState([]);
    const [tehnike, setTehnike] = useState([]);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        ucitajSlike();
        ucitajTehnike();
    }, []);

    async function obrisi(sifra) {
        if (!confirm('Jeste li sigurni da želite obrisati ovu sliku?')) {
            return;
        }
        await SlikaService.obrisi(sifra);
        ucitajSlike();
    }

    async function ucitajSlike() {
        const odgovor = await SlikaService.get();
        setSlike(odgovor.data);
    }

    async function ucitajTehnike() {
        const odgovor = await TehnikaService.get();
        setTehnike(odgovor.data);
    }

    function dohvatiNazivTehnika(sifraTehnika) {
        const tehnika = tehnike.find(s => s.sifra === sifraTehnika);
        return tehnika ? tehnika.naziv : 'Nije definirano';
    }

    async function generirajPDFZaSliku(slika) {
        const odgovorOznaka = await OznakaService.get();
        const oznakeSlike = odgovorOznaka.data.filter(p =>
            slika.oznake && slika.oznake.includes(p.sifra)
        );

        const odgovorTehnike = await TehnikaService.get();
        const tehnikaSlike = odgovorTehnike.data.find(p =>
            slika.tehnika === p.sifra
        );

        const generiraj = SlikePDFGenerator({
            slika,
            tehnika: tehnikaSlike,
            oznake: oznakeSlike
        });
        await generiraj();
    }

    return (
        <Container className="py-5">
            {/* Zaglavlje s naslovom i gumbom za dodavanje */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom border-light">
                <div>
                    <span className="text-uppercase tracking-widest text-muted small fw-semibold">Galerija radova</span>
                    <h1 className="fw-light display-6 mb-0">Pregled slika</h1>
                </div>
                <div className="mt-3 mt-md-0">
                    {isLoggedIn && (
                        <Link
                            to={RouteNames.SLIKE_DODAJ}
                            className="btn btn-outline-dark px-4 py-2 d-inline-flex align-items-center gap-2"
                            style={{ borderRadius: '4px', fontWeight: '500' }}
                        >
                            <FaPlus size={14} /> Dodaj novu sliku
                        </Link>
                    )}

                </div>
            </div>

            {/* Grid kartica */}
            <Row className="g-4">
                {slike && slike.map((slika) => (
                    <Col key={slika.sifra} xs={12} sm={6} lg={4} xl={3}>
                        <Card className="h-100 border-0 bg-white" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>

                            {/* Slika okvir */}
                            <div style={{ height: "220px", overflow: "hidden", backgroundColor: "#f8f9fa", borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} className="position-relative d-flex align-items-center justify-content-center">
                                {slika.image ? (
                                    <Card.Img
                                        variant="top"
                                        src={slika.image}
                                        style={{
                                            objectFit: "cover",
                                            height: "100%",
                                            width: "100%"
                                        }}
                                    />
                                ) : (
                                    <span className="text-muted fw-light small tracking-widest">Nema slike</span>
                                )}
                            </div>

                            <Card.Body className="d-flex flex-column p-4">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Card.Title className="fw-semibold fs-5 mb-0 text-dark">
                                        {slika.naziv} <span className="text-muted fw-light fs-6">({slika.godinaIzrade})</span>
                                    </Card.Title>
                                    <FaFilePdf
                                        className="text-secondary ms-2 mt-1"
                                        size={18}
                                        style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                                        onClick={() => generirajPDFZaSliku(slika)}
                                        title="Generiraj PDF dokument"
                                    />
                                </div>

                                <Card.Text className="text-secondary small mb-4 fw-light" style={{ lineHeight: '1.6' }}>
                                    <span className="d-block"><strong>Tehnika:</strong> {dohvatiNazivTehnika(slika.tehnika)}</span>
                                    <span className="d-block"><strong>Dimenzije:</strong> {slika.sirina} × {slika.visina} cm</span>
                                    <span className="d-flex align-items-center gap-2 mt-2">
                                        <strong>Dostupnost:</strong>
                                        <GrValidate
                                            size={16}
                                            color={slika.dostupnost ? '#198754' : '#dc3545'}
                                        />
                                    </span>
                                </Card.Text>

                                {/* Akcijski gumbi */}
                                {isLoggedIn && (
                                    <div className="mt-auto d-flex gap-2 pt-2 border-top border-light">
                                        <Button
                                            variant="outline-secondary"
                                            className="flex-fill d-flex align-items-center justify-content-center gap-1 py-2"
                                            onClick={() => navigate(`/slike/${slika.sifra}`)}
                                            title="Uredi podatke"
                                            style={{ borderRadius: '4px', fontSize: '0.9rem' }}
                                        >
                                            <FaEdit /> Uredi
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            className="d-flex align-items-center justify-content-center px-3 py-2"
                                            onClick={() => obrisi(slika.sifra)}
                                            title="Obriši sliku"
                                            style={{ borderRadius: '4px' }}
                                        >
                                            <FaTrash size={14} />
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}