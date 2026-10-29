import { useEffect, useState } from "react"
import OstaliProizvodiService from "../../services/ostaliproizvodi/OstaliProizvodiService"
import { GrValidate } from "react-icons/gr"
import { Button, Card, Col, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constanst"
import MaterijalService from "../../services/materijali/MaterijalService"
import { FaEdit, FaTrash } from "react-icons/fa"

export default function OstaliProizvodiPregled() {

    const [ostaliproizvodi, setOstaliProizvodi] = useState([])
    const [materijali, SetMaterijali] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        ucitajOstaliProizvodi()
        ucitajMaterijali()
    }, [])

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await OstaliProizvodiService.obrisi(sifra)
        ucitajOstaliProizvodi()
    }

    async function ucitajOstaliProizvodi() {
        await OstaliProizvodiService.get().then((odgovor) => {
            setOstaliProizvodi(odgovor.data)
        })
    }

    async function ucitajMaterijali() {
        await MaterijalService.get().then((odgovor) => {
            SetMaterijali(odgovor.data)
        })
    }

    function dohvatiNazivMaterijal(sifraMaterijal) {
        const materijal = materijali.find(s => s.sifra === sifraMaterijal)
        return materijal ? materijal.naziv : ''
    }

    return (
        <>
            <Link to={RouteNames.OSTALIPROIZVODI_DODAJ}
                className="btn btn-success w-100 my-3" >
                Dodavanje novih ostalih proizvoda
            </Link>

            <Row>
                {ostaliproizvodi && ostaliproizvodi.map((ostaliproizvodi) => (
                    <Col key={ostaliproizvodi.sifra} xs={12} sm={6} lg={4} xl={3} className="mb-4">
                        <Card className="shadow-sm h-100 border-0">
                            <div style={{ height: "200px", overflow: "hidden", backgroundColor: "#f8f9fa" }} className="d-flex align-items-center justify-content-center">
                                {ostaliproizvodi.image ? (
                                    <Card.Img
                                        variant="top"
                                        src={ostaliproizvodi.image}
                                        style={{
                                            objectFit: "cover",
                                            height: "100%",
                                            width: "100%"
                                        }}
                                    />
                                ) : (
                                    <span className="text-muted">Nema slike</span>
                                )}
                            </div>

                            <Card.Body className="d-flex flex-column">
                                <Card.Title>
                                    {ostaliproizvodi.naziv} {ostaliproizvodi.godinaIzrade}
                                </Card.Title>

                                <Card.Text className="text-muted small mb-3">
                                    <strong>Materijal:</strong> {dohvatiNazivMaterijal(ostaliproizvodi.materijal)} <br />
                                    <strong>Dimenzije:</strong> {ostaliproizvodi.sirina}x{ostaliproizvodi.visina} <br />
                                    <span className="d-flex align-items-center gap-1 mt-1">
                                        <strong>Dostupnost:</strong> 
                                        <GrValidate
                                            size={18}
                                            color={ostaliproizvodi.dostupnost ? 'green' : 'red'}
                                        />
                                    </span>
                                </Card.Text>

                                <div className="mt-auto d-flex gap-2">
                                    <Button
                                        variant="outline-primary"
                                        className="flex-fill"
                                        onClick={() => navigate(`/ostaliproizvodi/${ostaliproizvodi.sifra}`)}
                                        title="Promijeni">
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => obrisi(ostaliproizvodi.sifra)}
                                        title="Obriši"
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}