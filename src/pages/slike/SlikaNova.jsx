import { Link, useNavigate } from "react-router-dom";
import SlikaService from "../../services/slike/SlikaService";
import { RouteNames } from "../../constanst";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import TehnikaService from "../../services/tehnike/TehnikaService";
import OznakaService from "../../services/oznake/OznakaService";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useRef } from "react";
import { useEffect, useState } from "react";
import { ShemaSlikaOstaliproizvodi } from "../../schemas/ShemaSlikaOstaliproizvodi";

export default function SlikaNova() {
    const [tehnike, setTehnike] = useState([]);
    const [oznake, setOznake] = useState([]);
    const [odabraniOznake, setOdabraniOznake] = useState([]);
    const [pretragaOznaka, setPretragaOznaka] = useState('');
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false);
    const [odabraniIndex, setOdabraniIndex] = useState(-1);
    const [slikaZaCrop, setSlikaZaCrop] = useState(null);
    const cropperRef = useRef(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        ucitajTehnike()
        ucitajOznake()
    }, [])

    async function ucitajTehnike() {
        await TehnikaService.get().then((odgovor) => {
            setTehnike(odgovor.data)
        })
    }

    async function ucitajOznake() {
        await OznakaService.get().then((odgovor) => {
            setOznake(odgovor.data)
        })
    }

    async function dodaj(slika) {
        await SlikaService.dodaj(slika).then(() => {
            navigate(RouteNames.SLIKE)
        })
    }

    function dodajOznaka(oznaka) {
        if (!odabraniOznake.find(p => p.sifra === oznaka.sifra)) {
            setOdabraniOznake([...odabraniOznake, oznaka])
        }
        setPretragaOznaka('')
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }

    function ukloniOznaka(sifra) {
        setOdabraniOznake(odabraniOznake.filter(p => p.sifra !== sifra))
    }

    function filtrirajOznake() {
        return oznake.filter(p =>
            !odabraniOznake.find(op => op.sifra === p.sifra) &&
            p.naziv.toLowerCase().includes(pretragaOznaka.toLowerCase())
        )
    }


    function handleKeyDown(e) {
        const filtriraniOznake = filtrirajOznake()

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev + 1 === filtriraniOznake.length) {
                    return 0
                }
                return prev < filtriraniOznake.length - 1 ? prev + 1 : prev
            })
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev === 0) {
                    return filtriraniOznake.length - 1
                }
                return prev > 0 ? prev - 1 : 0
            })
        } else if (e.key === 'Enter' && odabraniIndex >= 0 && filtriraniOznake.length > 0) {
            e.preventDefault()
            dodajOznaka(filtriraniOznake[odabraniIndex])
        } else if (e.key === 'Escape') {
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
    }

    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);
        objektPodataka.oznake = odabraniOznake.map(p => parseInt(p.sifra))
        const rezultat = ShemaSlikaOstaliproizvodi.safeParse(objektPodataka);

        if (!rezultat.success) {
            const noveGreske = {};

            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });
            setErrors(noveGreske);
            return;
        }


        let dataUrl = null
        if (cropperRef.current && cropperRef.current.cropper && cropperRef.current.cropper.cropped) {
            const cropper = cropperRef.current.cropper;
            const selectionData = cropper.getData();
            const actualWidth = selectionData.width;
            const actualHeight = selectionData.height;
            const targetSize = 400;
            const canvasWidth = actualWidth > targetSize ? targetSize : actualWidth;
            const canvasHeight = actualHeight > targetSize ? targetSize : actualHeight;
            const canvas = cropper.getCroppedCanvas({
                width: canvasWidth,
                height: canvasHeight,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            });
            dataUrl = canvas.toDataURL('image/png');
        }



        dodaj({
            naziv: podaci.get('naziv'),
            godinaIzrade: parseInt(podaci.get('godinaIzrade')),
            tehnika: parseInt(podaci.get('tehnika')),
            sirina: parseInt(podaci.get('sirina')),
            visina: parseInt(podaci.get('visina')),
            dostupnost: podaci.get('dostupnost') === 'on',
            image: dataUrl,
            opis: podaci.get('opis'),
            oznake: odabraniOznake.map(p => p.sifra)
        })
    }

    function onChangeImage(e) {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSlikaZaCrop(reader.result);
        };
        try {
            reader.readAsDataURL(files[0]);
        } catch (error) {
            console.error(error);
        }
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };


    const handleFocus = (nazivPolja) => {
        ocistiGresku(nazivPolja);
        if (isChecking) setIsChecking(true)
    };

    const handleBlur = () => {
        if (isChecking) setIsChecking(false);
    };

    return (
        <Form onSubmit={obradiSubmit}>
            <Container className="visinaAkcija">
                <Card style={{ padding: '1rem' }}>
                    <Card.Title>
                        Dodavanje nove slike
                    </Card.Title>

                    <Row>
                        {/* Lijeva strana  */}
                        <Col xs={4} className="mt-3">
                            <Form.Group controlId="naziv">
                                <Form.Label>Naziv</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Unesite naziv slike"
                                    className="granica"
                                    name="naziv"
                                    isInvalid={!!errors.naziv}
                                    onFocus={() => handleFocus('naziv')} // Pozivamo novu funkciju
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.naziv}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="godinaIzrade">
                                <Form.Label>Godina izrade</Form.Label>
                                <Form.Control type="number"
                                    style={{ textAlign: 'right' }}
                                    name="godinaIzrade" step={1}
                                    placeholder="0"
                                    isInvalid={!!errors.godinaIzrade}
                                    onFocus={() => ocistiGresku('godinaIzrade')}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.godinaIzrade}
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group controlId="tehnika">
                                <Form.Label>Tehnika</Form.Label>
                                <Form.Select name="tehnika"
                                    isInvalid={!!errors.tehnika}
                                    onFocus={() => ocistiGresku('tehnika')}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Odaberi tehniku</option>
                                    {tehnike && tehnike.map((t) => (
                                        <option key={t.sifra} value={t.sifra}>{t.naziv}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.tehnika}
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group controlId="sirina">
                                <Form.Label>Širina</Form.Label>
                                <Form.Control type="number"
                                    style={{ textAlign: 'right' }}
                                    name="sirina" step={1}
                                    placeholder="0"
                                    isInvalid={!!errors.sirina}
                                    onFocus={() => ocistiGresku('sirina')}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.sirina}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="visina">
                                <Form.Label>Visina</Form.Label>
                                <Form.Control type="number"
                                    style={{ textAlign: 'right' }}
                                    name="visina" step={1}
                                    placeholder="0"
                                    isInvalid={!!errors.visina}
                                    onFocus={() => ocistiGresku('visina')}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.visina}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Label>Dostupno</Form.Label>
                            <Form.Group controlId="dostupnost">
                                <Form.Check label="" name="dostupnost" />
                            </Form.Group>

                            <Form.Group controlId="opis">
                                <Form.Label>Opis</Form.Label>
                                <Form.Control as="textarea" rows={5} name="opis"
                                    placeholder="Unesite opis slike"
                                    className="granica"
                                    isInvalid={!!errors.opis}
                                    onFocus={() => handleFocus('opis')} // Pozivamo novu funkciju
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.opis}
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Col>

                        {/* Sredina */}
                        <Col xs={4} className="mt-3">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Oznake</Card.Title>

                                    {/* Autocomplete pretraga */}
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">Dodaj oznake</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Pretraži ili klikni za sve oznake..."
                                            value={pretragaOznaka}
                                            onChange={(e) => {
                                                setPretragaOznaka(e.target.value)
                                                setPrikaziAutocomplete(true) // Uvijek drži otvoreno dok se tipka
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => {
                                                setPrikaziAutocomplete(true)
                                                handleFocus('oznake')
                                            }} // Otvori odmah na klik / fokus!
                                            isInvalid={!!errors.oznake}

                                            onBlur={handleBlur}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.oznake}
                                        </Form.Control.Feedback>
                                        {prikaziAutocomplete && filtrirajOznake().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                                {filtrirajOznake().map((oznaka, index) => (
                                                    <div
                                                        key={oznaka.sifra}
                                                        className="p-2 cursor-pointer"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black'
                                                        }}
                                                        onClick={() => dodajOznaka(oznaka)}
                                                        onMouseEnter={() => setOdabraniIndex(index)}
                                                    >
                                                        {oznaka.naziv}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>

                                    {/* Tablica odabranih oznaka */}
                                    {odabraniOznake.length > 0 && (
                                        <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Naziv</th>
                                                        <th style={{ width: '80px' }}>Akcija</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabraniOznake.map(oznaka => (
                                                        <tr key={oznaka.sifra}>
                                                            <td>{oznaka.naziv}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniOznaka(oznaka.sifra)}
                                                                >
                                                                    Obriši
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                    {odabraniOznake.length === 0 && (
                                        <p className="text-muted">Nema odabranih oznaka</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Desna strana */}

                        <Col xs={4} className="mt-3">
                            <input className='mb-3' type='file' onChange={onChangeImage} />
                            <Cropper
                                src={slikaZaCrop}
                                style={{ height: 400, width: '100%' }}
                                initialAspectRatio={1}
                                guides={true}
                                autoCropArea={1}
                                viewMode={1}
                                minCropBoxWidth={400}
                                minCropBoxHeight={400}
                                cropBoxResizable={false}
                                background={false}
                                responsive={true}
                                checkOrientation={false}
                                ref={cropperRef}
                            />
                        </Col>

                    </Row>


                    <Row className="mt-3">
                        <Col xs={6} className="visinaAkcija">
                            <Link to={RouteNames.SLIKE} className="btn btn-danger">
                                Odustani
                            </Link>
                        </Col>
                        <Col xs={6} className="visinaAkcija" style={{ textAlign: 'right' }}>
                            <Button type="submit" variant="success">
                                Dodaj
                            </Button>
                        </Col>
                    </Row>

                </Card>
            </Container>
        </Form>
    )
}