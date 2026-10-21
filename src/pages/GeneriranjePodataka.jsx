import { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { Faker, hr, en } from '@faker-js/faker';
import SlikaService from '../services/slike/SlikaService';
import OstaliProizvodiService from '../services/ostaliproizvodi/OstaliProizvodiService';
import TehnikaService from '../services/tehnike/TehnikaService';
import MaterijalService from '../services/materijali/MaterijalService';


export default function GeneriranjePodataka() {
    const [brojSlika, setBrojSlika] = useState(10);
    const [brojOstaliProizvodi, setBrojOstaliProizvodi] = useState(10);
    const [brojTehnika, setBrojTehnika] = useState(5);
    const [brojMaterijali, setBrojMaterijali] = useState(5)
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    // Postavi faker na hrvatski jezik
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

        
        if (tehnike.length === 0) {
            throw new Error('Nema dostupnih tehnika. Prvo generirajte tehnike.');
        }
        

        for (let i = 0; i < broj; i++) {
            const randomtehnika = tehnike[faker.number.int({ min: 0, max: tehnike.length - 1 })];
  
            await SlikaService.dodaj({
                naziv: naziviSlika[i % naziviSlika.length] + (i >= naziviSlika.length ? ` ${Math.floor(i / naziviSlika.length) + 1}` : ''),
                godinaIzrade: faker.number.int({ min: 2022, max: 2026 }),
                sirina: faker.number.int({ min: 20, max: 140 }),
                visina: faker.number.int({ min: 20, max: 140 }),
                tehnika: randomtehnika.sifra,
                dostupnost: faker.datatype.boolean(),
                image: faker.image.personPortrait(),
                opis: faker.commerce.productDescription()
            });
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
            const randommaterijal = materijali[faker.number.int({min: 0, max: materijali.length - 1})];

            await OstaliProizvodiService.dodaj({
                naziv: naziviOstaliProizvodi[i % naziviOstaliProizvodi.length] + (i >= naziviOstaliProizvodi.length ? ` ${Math.floor(i / naziviOstaliProizvodi.length) + 1}` : ''),
                godinaIzrade: faker.number.int({ min: 2022, max: 2026 }),
                sirina: faker.number.int({ min: 20, max: 140 }),
                visina: faker.number.int({ min: 20, max: 140 }),
                dostupnost: faker.datatype.boolean(),
                materijal: randommaterijal.sifra,
                dostupnost: faker.datatype.boolean(),
                image: faker.image.personPortrait,
                opis: faker.commerce.productDescription
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

    const generirajMaterijali = async (broj) => {



        for (let i = 0; i < broj; i++) {
   
            const materijali = {
                naziv: faker.person.firstName() + ' materijal'
            };

            await MaterijalService.dodaj(materijali);
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

            for (const ostaliproizvodi of ostaliproizvodi) {
                await OstaliProizvodiService.obrisi(ostaliproizvodi.sifra);
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
            const slike = rezultat.data;

            for (const slika of slike) {
                await SlikaService.obrisi(slika.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${slike.length} slika!`
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
            await generirajMaterijali(brojMaterijali);

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





    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima na hrvatskom jeziku.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
            <Col md={4}>
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
                            <Form.Text className="text-muted">
                                Unesite broj tehnika (1-10)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj tehnike'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
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
                            <Form.Text className="text-muted">
                                Unesite broj materijala (1-10)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj materijale'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
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
                            <Form.Text className="text-muted">
                                Unesite broj slika (1-10)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj slike'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
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
                            <Form.Text className="text-muted">
                                Unesite broj ostalih proizvoda (1-10)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj ostale proizvode'}
                        </Button>
                    </Form>
                </Col>
                

            </Row>

            <Alert variant="warning" className="mt-3">
                <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                Ako želite početi ispočetka, prvo obrišite postojeće podatke.
            </Alert>

            <hr className="my-4" />

            <h3>Brisanje podataka</h3>
            <p className="text-muted">
                Koristite ove opcije za brisanje svih podataka iz baze.
            </p>

            <Row className="mt-3">
                <Col md={4}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiSlike}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve slike'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiOstaliProizvodi}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve ostale proizvode'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiTehnike}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve tehnike'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiMaterijale}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve materijale'}
                    </Button>
                </Col>

            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>
        </Container>
    );
}
