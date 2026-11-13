import { useEffect, useState } from "react";
import OstaliProizvodiService from "../../services/ostaliproizvodi/OstaliProizvodiService";
import { GrValidate } from "react-icons/gr";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constanst";
import MaterijalService from "../../services/materijali/MaterijalService";
import { FaEdit, FaFilePdf, FaTrash, FaPlus } from "react-icons/fa";
import OstaliProizvodiPDFGenerator from "../../components/OstaliProizvodiPDFGenerator";
import OznakaService from "../../services/oznake/OznakaService";
import useAuth from "../../hooks/useAuth";

export default function OstaliProizvodiPregled() {
    const [ostaliproizvodi, setOstaliProizvodi] = useState([]);
    const [materijali, setMaterijali] = useState([]);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        ucitajOstaliProizvodi();
        ucitajMaterijali();
    }, []);

    async function obrisi(sifra) {
        if (!confirm('Jeste li sigurni da želite obrisati ovaj proizvod?')) {
            return;
        }
        await OstaliProizvodiService.obrisi(sifra);
        ucitajOstaliProizvodi();
    }

    async function ucitajOstaliProizvodi() {
        const odgovor = await OstaliProizvodiService.get();
        setOstaliProizvodi(odgovor.data);
    }

    async function ucitajMaterijali() {
        const odgovor = await MaterijalService.get();
        setMaterijali(odgovor.data);
    }

    function dohvatiNazivMaterijal(sifraMaterijal) {
        const materijal = materijali.find(s => s.sifra === sifraMaterijal);
        return materijal ? materijal.naziv : 'Nije definirano';
    }

    async function generirajPDFZaOstaliProizvodi(ostaliproizvod) {
        const odgovorOznaka = await OznakaService.get();
        const oznakeOstaliProizvodi = odgovorOznaka.data.filter(p =>
            ostaliproizvod.oznake && ostaliproizvod.oznake.includes(p.sifra)
        );

        const odgovorMaterijali = await MaterijalService.get();
        const materijalOstaliProizvodi = odgovorMaterijali.data.find(p =>
            ostaliproizvod.materijal === p.sifra
        );

        const generiraj = OstaliProizvodiPDFGenerator({
            ostaliproizvod,
            materijal: materijalOstaliProizvodi,
            oznake: oznakeOstaliProizvodi
        });
        await generiraj();
    }

    return (
        <Container className="py-5">
            {/* Zaglavlje s naslovom i elegantnim gumbom za dodavanje */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom border-light">
                <div>
                    <span className="text-uppercase tracking-widest text-muted small fw-semibold">Kolekcija dekoracija i torbi</span>
                    <h1 className="fw-light display-6 mb-0">Pregled ostalih proizvoda</h1>
                </div>
                <div className="mt-3 mt-md-0">
                    {isLoggedIn && (
                    <Link 
                        to={RouteNames.OSTALIPROIZVODI_DODAJ}
                        className="btn btn-outline-dark px-4 py-2 d-inline-flex align-items-center gap-2"
                        style={{ borderRadius: '4px', fontWeight: '500' }}
                    >
                        <FaPlus size={14} /> Dodaj novi proizvod
                    </Link>
                    )}
                </div>
            </div>

            {/* Grid kartica */}
            <Row className="g-4">
                {ostaliproizvodi && ostaliproizvodi.map((op) => (
                    <Col key={op.sifra} xs={12} sm={6} lg={4} xl={3}>
                        <Card className="h-100 border-0 bg-white" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                            
                            {/* Slika okvir */}
                            <div style={{ height: "220px", overflow: "hidden", backgroundColor: "#f8f9fa", borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} className="position-relative d-flex align-items-center justify-content-center">
                                {op.image ? (
                                    <Card.Img
                                        variant="top"
                                        src={op.image}
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
                                        {op.naziv} <span className="text-muted fw-light fs-6">({op.godinaIzrade})</span>
                                    </Card.Title>
                                    <FaFilePdf
                                        className="text-secondary ms-2 mt-1"
                                        size={18}
                                        style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                                        onClick={() => generirajPDFZaOstaliProizvodi(op)} 
                                        title="Generiraj PDF dokument" 
                                    />
                                </div>

                                <Card.Text className="text-secondary small mb-4 fw-light" style={{ lineHeight: '1.6' }}>
                                    <span className="d-block"><strong>Materijal:</strong> {dohvatiNazivMaterijal(op.materijal)}</span>
                                    <span className="d-block"><strong>Dimenzije:</strong> {op.sirina} × {op.visina} cm</span>
                                    <span className="d-flex align-items-center gap-2 mt-2">
                                        <strong>Dostupnost:</strong> 
                                        <GrValidate
                                            size={16}
                                            color={op.dostupnost ? '#198754' : '#dc3545'}
                                        />
                                    </span>
                                </Card.Text>

                                {/* Akcijski gumbi */}
                                {isLoggedIn && (
                                <div className="mt-auto d-flex gap-2 pt-2 border-top border-light">
                                    <Button
                                        variant="outline-secondary"
                                        className="flex-fill d-flex align-items-center justify-content-center gap-1 py-2"
                                        onClick={() => navigate(`/ostaliproizvodi/${op.sifra}`)}
                                        title="Uredi podatke"
                                        style={{ borderRadius: '4px', fontSize: '0.9rem' }}
                                    >
                                        <FaEdit /> Uredi
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        className="d-flex align-items-center justify-content-center px-3 py-2"
                                        onClick={() => obrisi(op.sifra)}
                                        title="Obriši proizvod"
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