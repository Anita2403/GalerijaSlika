import { useEffect, useState } from "react";
import MaterijalService from "../../services/materijali/MaterijalService";
import { Button, Table, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constanst";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function MaterijalPregled() {
    const [materijali, setMaterijali] = useState([]);
    const navigate = useNavigate();

    async function ucitajMaterijali() {
        const odgovor = await MaterijalService.get();
        setMaterijali(odgovor.data);
    }

    useEffect(() => {
        ucitajMaterijali();
    }, []);

    async function obrisi(sifra) {
        if (!confirm('Jeste li sigurni da želite obrisati ovaj materijal?')) {
            return;
        }
        await MaterijalService.obrisi(sifra);
        ucitajMaterijali();
    }

    return (
        <Container className="py-5">
            {/* Zaglavlje s naslovom i gumbom */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom border-light">
                <div>
                    <span className="text-uppercase tracking-widest text-muted small fw-semibold">Šifrarnik</span>
                    <h1 className="fw-light display-6 mb-0">Pregled materijala</h1>
                </div>
                <div className="mt-3 mt-md-0">
                    <Link 
                        to={RouteNames.MATERIJALI_DODAJ}
                        className="btn btn-outline-dark px-4 py-2 d-inline-flex align-items-center gap-2"
                        style={{ borderRadius: '4px', fontWeight: '500' }}
                    >
                        <FaPlus size={14} /> Dodaj novi materijal
                    </Link>
                </div>
            </div>

            {/* Elegantna tablica */}
            <div className="bg-white p-4 shadow-sm" style={{ borderRadius: '4px' }}>
                <Table hover responsive className="align-middle mb-0">
                    <thead className="border-bottom">
                        <tr>
                            <th className="py-3 text-secondary fw-semibold">Naziv materijala</th>
                            <th className="py-3 text-secondary fw-semibold text-end" style={{ width: '150px' }}>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materijali && materijali.map((materijal) => (
                            <tr key={materijal.sifra}>
                                <td className="py-3 fw-light text-dark fs-5">
                                    {materijal.naziv}
                                </td>
                                <td className="py-3 text-end">
                                    <div className="d-flex justify-content-end gap-2">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className="d-flex align-items-center justify-content-center p-2"
                                            onClick={() => navigate(`/materijali/${materijal.sifra}`)}
                                            title="Uredi materijal"
                                            style={{ borderRadius: '4px' }}
                                        >
                                            <FaEdit size={14} />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            className="d-flex align-items-center justify-content-center p-2"
                                            onClick={() => obrisi(materijal.sifra)}
                                            title="Obriši materijal"
                                            style={{ borderRadius: '4px' }}
                                        >
                                            <FaTrash size={14} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Brojač na dnu tablice umjesto klasičnog Badge-a */}
                <div className="d-flex justify-content-between align-items-center pt-4 mt-3 border-top text-muted small">
                    <span>Ukupno unosa:</span>
                    <span className="fw-semibold">{materijali ? materijali.length : 0}</span>
                </div>
            </div>
        </Container>
    );
}