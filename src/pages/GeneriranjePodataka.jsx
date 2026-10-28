import { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { Faker, en } from '@faker-js/faker';
import SlikaService from '../services/slike/SlikaService';
import OstaliProizvodiService from '../services/ostaliproizvodi/OstaliProizvodiService';
import TehnikaService from '../services/tehnike/TehnikaService';
import MaterijalService from '../services/materijali/MaterijalService';
import OznakaService from '../services/oznake/OznakaService';
import { slike } from '../services/slike/SlikaPodaci';
import { oznake } from '../services/oznake/OznakaPodaci';

export default function GeneriranjePodataka() {
    const [brojSlika, setBrojSlika] = useState(10);
    const [brojOstaliProizvodi, setBrojOstaliProizvodi] = useState(10);
    const [brojTehnika, setBrojTehnika] = useState(5);
    const [brojMaterijali, setBrojMaterijali] = useState(5);
    const [brojOznaka, setBrojOznaka] = useState(5);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    // Postavi faker na engleski jezik
    const faker = new Faker({
        locale: [en]
    });

    const generirajSlike = async (broj) => {
        const naziviSlika = [
            'Sjene sjećanja',
            'Šapat kiše',
            'Zlatni sat',
            'Eho tišine',
            'Snovi u boji',
            'Jutarnja magla',
            'Vremenski trag',
            'Krhka ravnoteža',
            'Sjaj zvijezda',
            'Skriveni put',
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
            'Sjaj svijeće',
            'Ponoćna torba',
            'Zlatni plamen',
            'Krhka elegancija',
            'Šapat kože',
            'Sjenoviti sjaj',
            'Jutarnja šetnja',
            'Vremenski trag',
            'Snovi u plamenu',
            'Skriveni džep',
        ];

        const rezultatMaterijali = await MaterijalService.get();
        const materijali = rezultatMaterijali.data;

        if (materijali.length === 0) {
            throw new Error('Nema dostupnih materijala. Prvo generirajte materijale.');
        }

        for (let i = 0; i < broj; i++) {
            const randommaterijal = materijali[faker.number.int({ min: 0, max: materijali.length - 1 })];

            await OstaliProizvodiService.dodaj({
                naziv: naziviOstaliProizvodi[i % naziviOstaliProizvodi.length] + (i >= naziviOstaliProizvodi.length ? ` ${Math.floor(i / naziviOstaliProizvodi.length) + 1}` : ''),
                godinaIzrade: faker.number.int({ min: 2022, max: 2026 }),
                sirina: faker.number.int({ min: 20, max: 140 }),
                visina: faker.number.int({ min: 20, max: 140 }),
                dostupnost: faker.datatype.boolean(),
                materijal: randommaterijal.sifra,
                image: faker.image.personPortrait(),
                opis: faker.commerce.productDescription()
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

    const handleGenerirajSlike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajSlike(brojSlika);
            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojSlika} slika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju slika: ' + error.message
            });
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
            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojOstaliProizvodi} ostalih proizvoda!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju ostalih proizvoda: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiOstaliProizvodi = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve ostale proizvode?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await OstaliProizvodiService.get();
            const ostaliproizvodi = rezultat.data;

            for (const ostaliproizvod of ostaliproizvodi) {
                await OstaliProizvodiService.obrisi(ostaliproizvod.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${ostaliproizvodi.length} ostalih proizvoda!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju ostalih proizvoda: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiSlike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve slike?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await SlikaService.get();
            const slikeBaza = rezultat.data;

            for (const slika of slikeBaza) {
                await SlikaService.obrisi(slika.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${slikeBaza.length} slika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju slika: ' + error.message
            });
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
            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojTehnika} tehnika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju tehnika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiTehnike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve tehnike?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await TehnikaService.get();
            const tehnike = rezultat.data;

            for (const tehnika of tehnike) {
                await TehnikaService.obrisi(tehnika.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${tehnike.length} tehnika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju tehnika: ' + error.message
            });
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
            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojMaterijali} materijala!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju materijala: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiMaterijale = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve materijale?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await MaterijalService.get();
            const materijali = rezultat.data;

            for (const materijal of materijali) {
                await MaterijalService.obrisi(materijal.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${materijali.length} materijala!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju materijala: ' + error.message
            });
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
            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojOznaka} oznaka!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju oznaka: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiOznake = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve oznake?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await OznakaService.get();
            const dohvaceneOznake = rezultat.data;

            for (const oznaka of dohvaceneOznake) {
                await OznakaService.obrisi(oznaka.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${dohvaceneOznake.length} oznaka!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju oznaka: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
                <Col md={4} className="mb-3">
                    <Form onSubmit={handleGenerirajTehnike}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj tehnika</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                value={brojTehnika}
                                onChange={(e) => setBrojTehnika(parseInt(e.target.value))}
                                disabled={loading}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading} className="w-100">
                            {loading ? 'Generiranje...' : 'Generiraj tehnike'}
                        </Button>
                    </Form>
                </Col>

                <Col md={4} className="mb-3">
                    <Form onSubmit={handleGenerirajMaterijale}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj materijala</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                value={brojMaterijali}
                                onChange={(e) => setBrojMaterijali(parseInt(e.target.value))}
                                disabled={loading}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading} className="w-100">
                            {loading ? 'Generiranje...' : 'Generiraj materijale'}
                        </Button>
                    </Form>
                </Col>

                <Col md={4} className="mb-3">
                    <Form onSubmit={handleGenerirajOznake}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj oznaka</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                value={brojOznaka}
                                onChange={(e) => setBrojOznaka(parseInt(e.target.value))}
                                disabled={loading}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading} className="w-100">
                            {loading ? 'Generiranje...' : 'Generiraj oznake'}
                        </Button>
                    </Form>
                </Col>

                <Col md={4} className="mb-3">
                    <Form onSubmit={handleGenerirajSlike}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj slika</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                value={brojSlika}
                                onChange={(e) => setBrojSlika(parseInt(e.target.value))}
                                disabled={loading}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading} className="w-100">
                            {loading ? 'Generiranje...' : 'Generiraj slike'}
                        </Button>
                    </Form>
                </Col>

                <Col md={4} className="mb-3">
                    <Form onSubmit={handleGenerirajOstaliProizvodi}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj ostalih proizvoda</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                value={brojOstaliProizvodi}
                                onChange={(e) => setBrojOstaliProizvodi(parseInt(e.target.value))}
                                disabled={loading}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading} className="w-100">
                            {loading ? 'Generiranje...' : 'Generiraj ostale proizvode'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <hr className="my-4" />

            <h3>Brisanje podataka</h3>
            <Row className="mt-3">
                <Col md={4} className="mb-2">
                    <Button variant="danger" onClick={handleObrisiSlike} disabled={loading} className="w-100">
                        Obriši sve slike
                    </Button>
                </Col>
                <Col md={4} className="mb-2">
                    <Button variant="danger" onClick={handleObrisiOstaliProizvodi} disabled={loading} className="w-100">
                        Obriši sve ostale proizvode
                    </Button>
                </Col>
                <Col md={4} className="mb-2">
                    <Button variant="danger" onClick={handleObrisiTehnike} disabled={loading} className="w-100">
                        Obriši sve tehnike
                    </Button>
                </Col>
                <Col md={4} className="mb-2">
                    <Button variant="danger" onClick={handleObrisiMaterijale} disabled={loading} className="w-100">
                        Obriši sve materijale
                    </Button>
                </Col>
                <Col md={4} className="mb-2">
                    <Button variant="danger" onClick={handleObrisiOznake} disabled={loading} className="w-100">
                        Obriši sve oznake
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}