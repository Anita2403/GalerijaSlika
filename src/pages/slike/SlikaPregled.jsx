import { useEffect, useState } from "react"
import SlikaService from "../../services/slike/SlikaService"
import { GrValidate } from "react-icons/gr"
import { Button, Card, Col, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constanst"
import TehnikaService from "../../services/tehnike/TehnikaService"
import { FaEdit, FaTrash } from "react-icons/fa"

export default function SlikaPregled() {

    const [slike, setSlike] = useState([])
    const [tehnike, setTehnike] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        ucitajSlike()
        ucitajTehnike()
    }, [])

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await SlikaService.obrisi(sifra)
        ucitajSlike()
    }

    async function ucitajSlike() {
        await SlikaService.get().then((odgovor) => {
            setSlike(odgovor.data)
        })
    }

    async function ucitajTehnike() {
        await TehnikaService.get().then((odgovor) => {
            setTehnike(odgovor.data)
        })
    }

    function dohvatiNazivTehnika(sifraTehnika) {
        const tehnika = tehnike.find(s => s.sifra === sifraTehnika)
        return tehnika ? tehnika.naziv : ''
    }

    return (
        <>
            <Link to={RouteNames.SLIKE_DODAJ}
                className="btn btn-success w-100 my-3" >
                Dodavanje novih slika
            </Link>

            <Row>
                {slike && slike.map((slika) => (
                    <Col key={slika.sifra} xs={12} sm={6} lg={4} xl={3} className="mb-4">
                        <Card className="shadow-sm h-100 border-0">
                            <div style={{ height: "200px", overflow: "hidden", backgroundColor: "#f8f9fa" }} className="d-flex align-items-center justify-content-center">
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
                                    <span className="text-muted">Nema slike</span>
                                )}
                            </div>

                            <Card.Body className="d-flex flex-column">
                                <Card.Title>
                                    {slika.naziv} {slika.godinaIzrade}
                                </Card.Title>

                                <Card.Text className="text-muted small mb-3">
                                    <strong>Tehnika:</strong> {dohvatiNazivTehnika(slika.tehnika)} <br />
                                    <strong>Dimenzije:</strong> {slika.sirina}x{slika.visina} <br />
                                    <span className="d-flex align-items-center gap-1 mt-1">
                                        <strong>Dostupnost:</strong> 
                                        <GrValidate
                                            size={18}
                                            color={slika.dostupnost ? 'green' : 'red'}
                                        />
                                    </span>
                                </Card.Text>

                                <div className="mt-auto d-flex gap-2">
                                    <Button
                                        variant="outline-primary"
                                        className="flex-fill"
                                        onClick={() => navigate(`/slike/${slika.sifra}`)}
                                        title="Promijeni">
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => obrisi(slika.sifra)}
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