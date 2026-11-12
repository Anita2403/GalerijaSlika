import { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { Faker, en } from '@faker-js/faker';
import SlikaService from '../services/slike/SlikaService';
import OstaliProizvodiService from '../services/ostaliproizvodi/OstaliProizvodiService';
import TehnikaService from '../services/tehnike/TehnikaService';
import MaterijalService from '../services/materijali/MaterijalService';
import OznakaService from '../services/oznake/OznakaService';
import { slike } from '../services/slike/SlikaPodaci';
import { DATA_SOURCE } from '../constanst';
import slika_generiranje_podataka from '../assets/slika_generiranje_podataka.jpg';
import { FaDatabase, FaTrashAlt, FaPlus, FaLayerGroup } from 'react-icons/fa';
import OperaterService from '../services/operateri/OperaterService';

export default function GeneriranjePodataka() {
    const [brojSlika, setBrojSlika] = useState(10);
    const [brojOstaliProizvodi, setBrojOstaliProizvodi] = useState(10);
    const [brojTehnika, setBrojTehnika] = useState(5);
    const [brojMaterijali, setBrojMaterijali] = useState(5);
    const [brojOznaka, setBrojOznaka] = useState(5);
    const [brojOperatera, setBrojOperatera] = useState(5);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    const faker = new Faker({
        locale: [en]
    });

    const generirajSlike = async (broj) => {
        const naziviSlika = [
            'Sjene sjećanja', 'Šapat kiše', 'Zlatni sat', 'Eho tišine', 'Snovi u boji',
            'Jutarnja magla', 'Vremenski trag', 'Krhka ravnoteža', 'Sjaj zvijezda', 'Skriveni put',
        ];

        const rezultatTehnike = await TehnikaService.get();
        const tehnike = rezultatTehnike.data;

        const rezultatOznake = await OznakaService.get();
        const dohvaceneOznake = rezultatOznake.data;

        if (dohvaceneOznake.length === 0) {
            throw new Error('Nema dostupnih oznaka. Prvo generirajte oznake.');
        }

        if (tehnike.length === 0) {
            throw new Error('Nema dostupnih tehnika. Prvo generirajte tehnike.');
        }

        for (let i = 0; i < broj; i++) {
            const randomtehnika = tehnike[faker.number.int({ min: 0, max: tehnike.length - 1 })];
            const randomSlika = slike[faker.number.int({ min: 0, max: slike.length - 1 })];
            const brojZaOdabrati = faker.number.int({ min: 2, max: 5 });

            const randomOznake = faker.helpers.arrayElements(
                dohvaceneOznake.map(p => p.sifra),
                brojZaOdabrati
            );

            const slika = {
                naziv: naziviSlika[i % naziviSlika.length] + (i >= naziviSlika.length ? ` ${Math.floor(i / naziviSlika.length) + 1}` : ''),
                godinaIzrade: faker.number.int({ min: 2022, max: 2026 }),
                sirina: faker.number.int({ min: 20, max: 140 }),
                visina: faker.number.int({ min: 20, max: 140 }),
                tehnika: randomtehnika.sifra,
                dostupnost: faker.datatype.boolean(),
                slika: randomSlika.sifra,
                image: faker.image.personPortrait(),
                opis: faker.commerce.productDescription(),
                oznake: randomOznake
            };

            await SlikaService.dodaj(slika);
        }
    };

    const generirajOstaleProizvodi = async (broj) => {
        const naziviOstaliProizvodi = [
            'Sjaj svijeće', 'Ponoćna torba', 'Zlatni plamen', 'Krhka elegancija', 'Šapat kože',
            'Sjenoviti sjaj', 'Jutarnja šetnja', 'Vremenski trag', 'Snovi u plamenu', 'Skriveni džep',
        ];

        const rezultatMaterijali = await MaterijalService.get();
        const materijali = rezultatMaterijali.data;

        const rezultatOznake = await OznakaService.get();
        const dohvaceneOznake = rezultatOznake.data;

        if (dohvaceneOznake.length === 0) {
            throw new Error('Nema dostupnih oznaka. Prvo generirajte oznake.');
        }

        if (materijali.length === 0) {
            throw new Error('Nema dostupnih materijala. Prvo generirajte materijale.');
        }

        for (let i = 0; i < broj; i++) {
            const randommaterijal = materijali[faker.number.int({ min: 0, max: materijali.length - 1 })];
            const brojZaOdabrati = faker.number.int({ min: 2, max: 5 });

            const randomOznake = faker.helpers.arrayElements(
                dohvaceneOznake.map(p => p.sifra),
                brojZaOdabrati
            );

            await OstaliProizvodiService.dodaj({
                naziv: naziviOstaliProizvodi[i % naziviOstaliProizvodi.length] + (i >= naziviOstaliProizvodi.length ? ` ${Math.floor(i / naziviOstaliProizvodi.length) + 1}` : ''),
                godinaIzrade: faker.number.int({ min: 2022, max: 2026 }),
                sirina: faker.number.int({ min: 20, max: 140 }),
                visina: faker.number.int({ min: 20, max: 140 }),
                dostupnost: faker.datatype.boolean(),
                materijal: randommaterijal.sifra,
                image: faker.image.personPortrait(),
                opis: faker.commerce.productDescription(),
                oznake: randomOznake
            });
        }
    };

    const generirajTehnike = async (broj) => {
        for (let i = 0; i < broj; i++) {
            const tehnika = {
                naziv: 'Tehnika ' + faker.person.firstName(),
            };
            await TehnikaService.dodaj(tehnika);
        }
    };

    const generirajMaterijale = async (broj) => {
        for (let i = 0; i < broj; i++) {
            const materijal = {
                naziv: faker.person.firstName() + ' materijal'
            };
            await MaterijalService.dodaj(materijal);
        }
    };

    const generirajOznake = async (broj) => {
        const primjeriOznaka = ['Portret', 'Ljubavna', 'Životinje', 'Pejzaž', 'Apstrakcija', 'Mrtva priroda', 'Arhitektura', 'Morski motivi', 'Cvijeće i biljke', 'Mitologija'];
        for (let i = 0; i < broj; i++) {
            const oznaka = {
                naziv: primjeriOznaka[i % primjeriOznaka.length] + (i >= primjeriOznaka.length ? ` ${Math.floor(i / primjeriOznaka.length) + 1}` : '') + ' ' + faker.person.firstName(),
            };
            await OznakaService.dodaj(oznaka);
        }
    };

    // MASOVNO GENERIRANJE SVEGA
    const handleGenerirajSve = async () => {
        setLoading(true);
        setPoruka(null);
        try {
            await generirajTehnike(brojTehnika);
            await generirajMaterijale(brojMaterijali);
            await generirajOznake(brojOznaka);
            await generirajSlike(brojSlika);
            await generirajOstaleProizvodi(brojOstaliProizvodi);
            await generirajOperatere(brojOperatera);
            setPoruka({ tip: 'success', tekst: 'Uspješno generirani svi testni podaci!' });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška pri masovnom generiranju: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    // MASOVNO BRISANJE SVEGA
    const handleObrisiSve = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati SVE podatke iz baze?')) return;
        setLoading(true);
        setPoruka(null);
        try {
            const [slikeRes, ostaliRes, tehnikeRes, materijaliRes, oznakeRes,operateriRes] = await Promise.all([
                SlikaService.get(),
                OstaliProizvodiService.get(),
                TehnikaService.get(),
                MaterijalService.get(),
                OznakaService.get(),
                OperaterService.get()
            ]);

            for (const item of slikeRes.data) await SlikaService.obrisi(item.sifra);
            for (const item of ostaliRes.data) await OstaliProizvodiService.obrisi(item.sifra);
            for (const item of tehnikeRes.data) await TehnikaService.obrisi(item.sifra);
            for (const item of materijaliRes.data) await MaterijalService.obrisi(item.sifra);
            for (const item of oznakeRes.data) await OznakaService.obrisi(item.sifra);
            for (const item of operateriRes.data) await OperaterService.obrisi(item.sifra);

            setPoruka({ tip: 'success', tekst: 'Uspješno obrisani svi podaci iz baze!' });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška pri masovnom brisanju: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajSlike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);
        try {
            await generirajSlike(brojSlika);
            setPoruka({ tip: 'success', tekst: `Uspješno generirano ${brojSlika} slika!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška pri generiranju slika: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajOstaliProizvodi = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);
        try {
            await generirajOstaleProizvodi(brojOstaliProizvodi);
            setPoruka({ tip: 'success', tekst: `Uspješno generirano ${brojOstaliProizvodi} ostalih proizvoda!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška pri generiranju ostalih proizvoda: ' + error.message });
        } finally {
            setLoading(false);
        }
    };


     const generirajOperatere = async (broj) => {
        // Prvo obriši admin operatera ako postoji
        const rezultat = await OperaterService.get();
        const operateri = rezultat.data;
        const adminOperater = operateri.find(op => op.email === 'admin@edunova.hr');
        
        if (adminOperater) {
            await OperaterService.obrisi(adminOperater.sifra);
        }

        // Dodaj admin operatera
        await OperaterService.dodaj({
            email: 'admin@edunova.hr',
            lozinka: 'Edunova123!',
            uloga: 'admin'
        });

        // Generiraj korisnik operatere
        for (let i = 0; i < broj; i++) {
            await OperaterService.dodaj({
                email: faker.internet.email(),
                lozinka: 'Edunova123!',
                uloga: 'korisnik'
            });
        }
    };

    const handleGenerirajOperatere = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajOperatere(brojOperatera);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojOperatera + 1} operatera (1 admin + ${brojOperatera} korisnika)!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju operatera: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiOperatere = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve operatere?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await OperaterService.get();
            const operateri = rezultat.data;
            
            for (const operater of operateri) {
                await OperaterService.obrisi(operater.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${operateri.length} operatera!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju operatera: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiOstaliProizvodi = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve ostale proizvode?')) return;
        setLoading(true);
        setPoruka(null);
        try {
            const rezultat = await OstaliProizvodiService.get();
            for (const item of rezultat.data) {
                await OstaliProizvodiService.obrisi(item.sifra);
            }
            setPoruka({ tip: 'success', tekst: `Uspješno obrisano ${rezultat.data.length} ostalih proizvoda!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška pri brisanju: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiSlike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve slike?')) return;
        setLoading(true);
        setPoruka(null);
        try {
            const rezultat = await SlikaService.get();
            for (const item of rezultat.data) {
                await SlikaService.obrisi(item.sifra);
            }
            setPoruka({ tip: 'success', tekst: `Uspješno obrisano ${rezultat.data.length} slika!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška pri brisanju: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajTehnike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);
        try {
            await generirajTehnike(brojTehnika);
            setPoruka({ tip: 'success', tekst: `Uspješno generirano ${brojTehnika} tehnika!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiTehnike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve tehnike?')) return;
        setLoading(true);
        setPoruka(null);
        try {
            const rezultat = await TehnikaService.get();
            for (const item of rezultat.data) {
                await TehnikaService.obrisi(item.sifra);
            }
            setPoruka({ tip: 'success', tekst: `Uspješno obrisano ${rezultat.data.length} tehnika!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajMaterijale = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);
        try {
            await generirajMaterijale(brojMaterijali);
            setPoruka({ tip: 'success', tekst: `Uspješno generirano ${brojMaterijali} materijala!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiMaterijale = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve materijale?')) return;
        setLoading(true);
        setPoruka(null);
        try {
            const rezultat = await MaterijalService.get();
            for (const item of rezultat.data) {
                await MaterijalService.obrisi(item.sifra);
            }
            setPoruka({ tip: 'success', tekst: `Uspješno obrisano ${rezultat.data.length} materijala!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajOznake = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);
        try {
            await generirajOznake(brojOznaka);
            setPoruka({ tip: 'success', tekst: `Uspješno generirano ${brojOznaka} oznaka!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiOznake = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve oznake?')) return;
        setLoading(true);
        setPoruka(null);
        try {
            const rezultat = await OznakaService.get();
            for (const item of rezultat.data) {
                await OznakaService.obrisi(item.sifra);
            }
            setPoruka({ tip: 'success', tekst: `Uspješno obrisano ${rezultat.data.length} oznaka!` });
        } catch (error) {
            setPoruka({ tip: 'danger', tekst: 'Greška: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            {/* Zaglavlje */}
            <div className="mb-5 pb-3 border-bottom border-light">
                <span className="text-uppercase tracking-widest text-muted small fw-semibold">Administracija</span>
                <h1 className="fw-light display-6 mb-2">Generiranje i upravljanje podacima</h1>
                <p className="text-secondary fw-light mb-0">
                    Alat za brzo kreiranje i testiranje lažnih (mock) podataka unutar baze.
                </p>
            </div>

            {DATA_SOURCE === 'memorija' ? (
                <div className="text-center py-5 bg-white p-4 shadow-sm" style={{ borderRadius: '4px' }}>
                    <p className="text-muted mb-4">Na memoriji se ne mogu generirati podaci.</p>
                    <img src={slika_generiranje_podataka} alt="Memorija" className="img-fluid rounded" style={{ maxWidth: '400px' }} />
                </div>
            ) : (
                <>
                    {poruka && (
                        <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)} className="mb-4">
                            {poruka.tekst}
                        </Alert>
                    )}

                    {/* GLAVNE MASTER AKCIJE (DODAJ SVE / OBRIŠI SVE) */}
                    <div className="bg-white p-4 mb-5 shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-center gap-3" style={{ borderRadius: '4px' }}>
                        <div>
                            <h5 className="fw-semibold text-dark mb-1">Glavne akcije</h5>
                            <p className="text-muted small mb-0 fw-light">Jednim klikom generirajte ili očistite cjelokupnu bazu podataka.</p>
                        </div>
                        <div className="d-flex gap-3 w-100 w-md-auto">
                            <Button variant="dark" onClick={handleGenerirajSve} disabled={loading} className="px-4 py-2 d-flex align-items-center justify-content-center gap-2 flex-fill" style={{ borderRadius: '4px' }}>
                                <FaLayerGroup size={14} /> {loading ? 'Obrada...' : 'Generiraj sve podatke'}
                            </Button>
                            <Button variant="outline-danger" onClick={handleObrisiSve} disabled={loading} className="px-4 py-2 d-flex align-items-center justify-content-center gap-2 flex-fill" style={{ borderRadius: '4px' }}>
                                <FaTrashAlt size={14} /> {loading ? 'Obrada...' : 'Obriši sve podatke'}
                            </Button>
                        </div>
                    </div>

                    {/* SEKCIJA ZA POJEDINAČNO GENERIRANJE */}
                    <h5 className="fw-semibold text-dark mb-4 d-flex align-items-center gap-2">
                        <FaDatabase className="text-secondary" size={16} /> Pojedinačni generatori
                    </h5>

                    <Row className="g-4 mb-5">
                        <Col md={4}>
                            <Card className="h-100 border-0 bg-white p-4" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <Form onSubmit={handleGenerirajTehnike}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-secondary fw-semibold">Broj tehnika</Form.Label>
                                        <Form.Control type="number" min="1" max="10" value={brojTehnika} onChange={(e) => setBrojTehnika(parseInt(e.target.value))} disabled={loading} style={{ borderRadius: '4px' }} />
                                    </Form.Group>
                                    <Button variant="outline-dark" type="submit" disabled={loading} className="w-100 d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '4px' }}>
                                        <FaPlus size={12} /> {loading ? 'Generiranje...' : 'Generiraj tehnike'}
                                    </Button>
                                </Form>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="h-100 border-0 bg-white p-4" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <Form onSubmit={handleGenerirajMaterijale}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-secondary fw-semibold">Broj materijala</Form.Label>
                                        <Form.Control type="number" min="1" max="10" value={brojMaterijali} onChange={(e) => setBrojMaterijali(parseInt(e.target.value))} disabled={loading} style={{ borderRadius: '4px' }} />
                                    </Form.Group>
                                    <Button variant="outline-dark" type="submit" disabled={loading} className="w-100 d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '4px' }}>
                                        <FaPlus size={12} /> {loading ? 'Generiranje...' : 'Generiraj materijale'}
                                    </Button>
                                </Form>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="h-100 border-0 bg-white p-4" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <Form onSubmit={handleGenerirajOznake}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-secondary fw-semibold">Broj oznaka</Form.Label>
                                        <Form.Control type="number" min="1" max="10" value={brojOznaka} onChange={(e) => setBrojOznaka(parseInt(e.target.value))} disabled={loading} style={{ borderRadius: '4px' }} />
                                    </Form.Group>
                                    <Button variant="outline-dark" type="submit" disabled={loading} className="w-100 d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '4px' }}>
                                        <FaPlus size={12} /> {loading ? 'Generiranje...' : 'Generiraj oznake'}
                                    </Button>
                                </Form>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="h-100 border-0 bg-white p-4" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <Form onSubmit={handleGenerirajSlike}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-secondary fw-semibold">Broj slika</Form.Label>
                                        <Form.Control type="number" min="1" max="10" value={brojSlika} onChange={(e) => setBrojSlika(parseInt(e.target.value))} disabled={loading} style={{ borderRadius: '4px' }} />
                                    </Form.Group>
                                    <Button variant="outline-dark" type="submit" disabled={loading} className="w-100 d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '4px' }}>
                                        <FaPlus size={12} /> {loading ? 'Generiranje...' : 'Generiraj slike'}
                                    </Button>
                                </Form>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="h-100 border-0 bg-white p-4" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <Form onSubmit={handleGenerirajOstaliProizvodi}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-secondary fw-semibold">Broj ostalih proizvoda</Form.Label>
                                        <Form.Control type="number" min="1" max="10" value={brojOstaliProizvodi} onChange={(e) => setBrojOstaliProizvodi(parseInt(e.target.value))} disabled={loading} style={{ borderRadius: '4px' }} />
                                    </Form.Group>
                                    <Button variant="outline-dark" type="submit" disabled={loading} className="w-100 d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '4px' }}>
                                        <FaPlus size={12} /> {loading ? 'Generiranje...' : 'Generiraj ostale proizvode'}
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 border-0 bg-white p-4" style={{ borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <Form onSubmit={handleGenerirajOperatere}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Broj operatera</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            max="50"
                                            value={brojOperatera}
                                            onChange={(e) => setBrojOperatera(parseInt(e.target.value))}
                                            disabled={loading}
                                        />
                                    </Form.Group>
                                    <Button variant="outline-dark" type="submit" disabled={loading} className="w-100 d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '4px' }}>
                                        <FaPlus size={12} /> {loading ? 'Generiranje...' : 'Generiraj operatere'}
                                    </Button>
                                    
                                </Form>
                            </Card>
                        </Col>
                    </Row>

                    {/* SEKCIJA ZA POJEDINAČNO BRISANJE */}
                    <div className="pt-4 border-top">
                        <h5 className="fw-semibold text-danger mb-4 d-flex align-items-center gap-2">
                            <FaTrashAlt size={15} /> Pojedinačno brisanje podataka
                        </h5>
                        <Row className="g-3">
                            <Col md={4}>
                                <Button variant="outline-danger" onClick={handleObrisiSlike} disabled={loading} className="w-100 py-2" style={{ borderRadius: '4px' }}>
                                    Obriši sve slike
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Button variant="outline-danger" onClick={handleObrisiOstaliProizvodi} disabled={loading} className="w-100 py-2" style={{ borderRadius: '4px' }}>
                                    Obriši sve ostale proizvode
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Button variant="outline-danger" onClick={handleObrisiTehnike} disabled={loading} className="w-100 py-2" style={{ borderRadius: '4px' }}>
                                    Obriši sve tehnike
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Button variant="outline-danger" onClick={handleObrisiMaterijale} disabled={loading} className="w-100 py-2" style={{ borderRadius: '4px' }}>
                                    Obriši sve materijale
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Button variant="outline-danger" onClick={handleObrisiOznake} disabled={loading} className="w-100 py-2" style={{ borderRadius: '4px' }}>
                                    Obriši sve oznake
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Button variant="outline-danger" onClick={handleObrisiOperatere} disabled={loading} className="w-100 py-2" style={{ borderRadius: '4px' }}>
                                    Obriši sve operatere
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </>
            )}
        </Container>
    );
}