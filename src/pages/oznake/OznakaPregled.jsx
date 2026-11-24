import { useEffect, useState } from "react";
import OznakaService from "../../services/oznake/OznakaService";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constanst";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";
import useModal from "../../hooks/useModal";

export default function OznakaPregled() {
    const [oznake, setOznake] = useState([]);
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading()
    const { showModal } = useModal()

    async function ucitajOznake() {
        showLoading();
        const odgovor = await OznakaService.get();
        setOznake(odgovor.data);
        hideLoading()
    }

    useEffect(() => {
        showLoading()
        ucitajOznake();
        hideLoading()
    }, []);

    async function obrisi(sifra) {
         showModal('Sigurno obrisati oznake?', async () => {
            showLoading()
            await OznakaService.obrisi(sifra)
            ucitajOznake()
            hideLoading()
        })
    }

    return (
        <Container className="py-5">
            {/* Zaglavlje s naslovom i gumbom */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom border-light">
                <div>
                    <span className="text-uppercase tracking-widest text-muted small fw-semibold">Šifrarnik</span>
                    <h1 className="fw-light display-6 mb-0">Pregled oznaka</h1>
                </div>
                <div className="mt-3 mt-md-0">
                    <Link
                        to={RouteNames.OZNAKE_DODAJ}
                        className="btn btn-outline-dark px-4 py-2 d-inline-flex align-items-center gap-2"
                        style={{ borderRadius: '4px', fontWeight: '500' }}
                    >
                        <FaPlus size={14} /> Dodaj novu oznaku
                    </Link>
                </div>
            </div>

            {/* Grid kartica za oznake */}
            <Row className="g-4 mb-5">
                {oznake && oznake.map((oznaka) => (
                    <Col key={oznaka.sifra} xs={12} sm={6} md={4} lg={3}>
                        <Card className="h-100 border-0 bg-white p-3 d-flex flex-column justify-content-between" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                            <div className="mb-3">
                                <span className="fw-semibold text-dark fs-5">{oznaka.naziv}</span>
                            </div>

                            <div className="d-flex gap-2 pt-3 border-top border-light">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="flex-fill d-flex align-items-center justify-content-center gap-1 py-1"
                                    onClick={() => navigate(`/oznake/${oznaka.sifra}`)}
                                    title="Uredi oznaku"
                                    style={{ borderRadius: '4px' }}
                                >
                                    <FaEdit size={13} /> Uredi
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="d-flex align-items-center justify-content-center px-3 py-1"
                                    onClick={() => obrisi(oznaka.sifra)}
                                    title="Obriši oznaku"
                                    style={{ borderRadius: '4px' }}
                                >
                                    <FaTrash size={12} />
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Ukupan broj na dnu */}
            <div className="d-flex justify-content-between align-items-center pt-4 border-top text-muted small">
                <span>Ukupno oznaka:</span>
                <span className="fw-semibold">{oznake ? oznake.length : 0}</span>
            </div>
        </Container>
    );
}