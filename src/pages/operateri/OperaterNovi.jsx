import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { RouteNames } from "../../constanst"
import { Link, useNavigate } from "react-router-dom"
import OperaterService from "../../services/operateri/OperaterService"
import { ShemaOperater } from "../../schemas/ShemaOperater"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"

export default function OperaterNovi() {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    async function dodaj(operater) {
        const rezultat = await OperaterService.dodaj(operater)
        if (rezultat.success) {
            navigate(RouteNames.OPERATERI)
        } else {
            alert(rezultat.message || 'Greška pri dodavanju operatera')
        }
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({})
        const objektPodataka = Object.fromEntries(podaci)

        // Provjera pomoću Zod sheme
        const rezultat = ShemaOperater.safeParse(objektPodataka)

        if (!rezultat.success) {
            const noveGreske = {}

            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0]
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message
                }
            })

            setErrors(noveGreske)
            return
        }

        dodaj({
            email: podaci.get('email'),
            lozinka: podaci.get('lozinka'),
            uloga: podaci.get('uloga')
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors }
            delete noveGreske[nazivPolja]
            setErrors(noveGreske)
        }
    }

    return (
        <Container className="py-5">
            {/* Zaglavlje */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom border-light">
                <div>
                    <span className="text-uppercase tracking-widest text-muted small fw-semibold">Upravljanje sustavom</span>
                    <h1 className="fw-light display-6 mb-0">Unos novog operatera</h1>
                </div>
                <div className="mt-3 mt-md-0">
                    <Link 
                        to={RouteNames.OPERATERI}
                        className="btn btn-outline-secondary px-4 py-2 d-inline-flex align-items-center gap-2"
                        style={{ borderRadius: '4px', fontWeight: '500' }}
                    >
                        <FaArrowLeft size={14} /> Natrag na pregled
                    </Link>
                </div>
            </div>

            <Form onSubmit={odradiSubmit}>
                <Card className="border-0 bg-white p-4" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <Card.Body className="p-0">
                        <Row className="g-4">
                            <Col xs={12} lg={6}>
                                <Form.Group controlId="email">
                                    <Form.Label className="fw-semibold">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="operater@galerijaslika.hr"
                                        isInvalid={!!errors.email}
                                        onFocus={() => ocistiGresku('email')}
                                        style={{ borderRadius: '4px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col xs={12} lg={6}>
                                <Form.Group controlId="uloga">
                                    <Form.Label className="fw-semibold">Uloga</Form.Label>
                                    <Form.Select
                                        name="uloga"
                                        isInvalid={!!errors.uloga}
                                        onFocus={() => ocistiGresku('uloga')}
                                        style={{ borderRadius: '4px' }}
                                    >
                                        <option value="">Odaberite ulogu...</option>
                                        <option value="admin">Admin</option>
                                        <option value="korisnik">Korisnik</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.uloga}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group controlId="lozinka">
                                    <Form.Label className="fw-semibold">Lozinka</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="lozinka"
                                        placeholder="Unesite lozinku"
                                        isInvalid={!!errors.lozinka}
                                        onFocus={() => ocistiGresku('lozinka')}
                                        style={{ borderRadius: '4px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lozinka}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted small">
                                        Lozinka mora sadržavati: najmanje 8 znakova, veliko slovo, malo slovo, broj i interpukcijski znak (!@#$%^&*)
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Akcijski gumbi na dnu */}
                        <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top border-light">
                            <Link 
                                to={RouteNames.OPERATERI} 
                                className="btn btn-outline-secondary px-4 py-2" 
                                style={{ borderRadius: '4px', fontWeight: '500' }}
                            >
                                Odustani
                            </Link>
                            <Button 
                                type="submit" 
                                variant="dark" 
                                className="px-4 py-2" 
                                style={{ borderRadius: '4px', fontWeight: '500' }}
                            >
                                Spremi operatera
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        </Container>
    )
}