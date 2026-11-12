import { useEffect, useState } from "react"
import OperaterService from "../../services/operateri/OperaterService"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { IME_APLIKACIJE, RouteNames } from "../../constanst"
import { FaEdit, FaTrash, FaKey, FaPlus } from "react-icons/fa"

export default function OperaterPregled() {

    const navigate = useNavigate()
    const [operateri, setOperateri] = useState([])

    useEffect(()=>{document.title='Operateri, ' + IME_APLIKACIJE})

    useEffect(() => {
        ucitajOperatere()
    }, [])

    async function ucitajOperatere() {
        await OperaterService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setOperateri(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati operatera?')) return
        
        const rezultat = await OperaterService.obrisi(sifra)
        if (rezultat.success) {
            ucitajOperatere()
        } else {
            alert(rezultat.message || 'Greška pri brisanju')
        }
    }

    return (
        <Container className="py-5">
            {/* Zaglavlje s naslovom i gumbom za dodavanje */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom border-light">
                <div>
                    <span className="text-uppercase tracking-widest text-muted small fw-semibold">Upravljanje sustavom</span>
                    <h1 className="fw-light display-6 mb-0">Pregled operatera</h1>
                </div>
                <div className="mt-3 mt-md-0">
                    <Link 
                        to={RouteNames.OPERATERI_NOVI}
                        className="btn btn-outline-dark px-4 py-2 d-inline-flex align-items-center gap-2"
                        style={{ borderRadius: '4px', fontWeight: '500' }}
                    >
                        <FaPlus size={14} /> Dodaj novog operatera
                    </Link>
                </div>
            </div>

            {/* Grid kartica */}
            <Row className="g-4">
                {operateri && operateri.map((operater) => (
                    <Col key={operater.sifra} xs={12} sm={6} lg={4} xl={3}>
                        <Card className="h-100 border-0 bg-white" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                            <Card.Body className="d-flex flex-column p-4">
                                <div className="mb-3">
                                    <span className="text-uppercase tracking-widest text-muted small fw-semibold d-block mb-1">Email adresa</span>
                                    <Card.Title className="fw-semibold fs-6 mb-0 text-dark text-break">
                                        {operater.email}
                                    </Card.Title>
                                </div>

                                <Card.Text className="text-secondary small mb-4 fw-light" style={{ lineHeight: '1.6' }}>
                                    <span className="d-flex align-items-center gap-2">
                                        <strong>Uloga:</strong> 
                                        <span className={`badge px-2 py-1 ${operater.uloga === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                            {operater.uloga}
                                        </span>
                                    </span>
                                </Card.Text>

                                {/* Akcijski gumbi */}
                                <div className="mt-auto d-flex gap-2 pt-3 border-top border-light">
                                    <Button
                                        variant="outline-secondary"
                                        className="flex-fill d-flex align-items-center justify-content-center gap-1 py-2"
                                        onClick={() => navigate(`/operateri/${operater.sifra}`)}
                                        title="Promijeni email"
                                        style={{ borderRadius: '4px', fontSize: '0.85rem' }}
                                    >
                                        <FaEdit size={13} /> Uredi
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        className="d-flex align-items-center justify-content-center px-3 py-2"
                                        onClick={() => navigate(`/operateri/${operater.sifra}/lozinka`)}
                                        title="Promijeni lozinku"
                                        style={{ borderRadius: '4px' }}
                                    >
                                        <FaKey size={13} />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        className="d-flex align-items-center justify-content-center px-3 py-2"
                                        onClick={() => brisanje(operater.sifra)}
                                        title="Obriši operatera"
                                        style={{ borderRadius: '4px' }}
                                    >
                                        <FaTrash size={13} />
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}