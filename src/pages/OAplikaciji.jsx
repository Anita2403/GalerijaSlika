import { Container, Row, Col } from "react-bootstrap";
import { IME_APLIKACIJE } from "../constanst";

export default function OAplikaciji() {
  const features = [
    {
      title: 'Umjetničke slike',
      text: 'Unikatni vizuali s pričom i dubinom koji oživljavaju svaki prostor.'
    },
    {
      title: 'Ručno rađene torbe',
      text: 'Statement komadi stvoreni s naglaskom na stil, kvalitetu i unikatnost.'
    },
    {
      title: 'Domaći dekor & svijećnjaci',
      text: 'Pažljivo birani detalji koji unose toplinu i osobni pečat u interijer.'
    }
  ];

  const benefits = [
    { title: '100% Unikatno', desc: 'Svaki komad je poseban, autorski rađen i neponovljiv.' },
    { title: 'Inspiracija na dlanu', desc: 'Jednostavno sučelje s pričama koje stoje iza svakog artikla.' },
    { title: 'Podrška kreativnosti', desc: 'Kupnjom i pregledom podržavate trud, strast i autentični rad.' }
  ];

  return (
    <div className="about-page bg-white min-vh-100 d-flex flex-column justify-content-between py-5">
      
      {/* Hero / Header sekcija */}
      <Container className="py-md-5 text-center">
        <Row className="justify-content-center">
          <Col lg={8}>
            <span className="text-uppercase tracking-widest text-muted small fw-semibold d-block mb-3">
              O projektu
            </span>
            <h1 className="display-4 fw-light mb-4" style={{ letterSpacing: '-0.02em' }}>
              Dobrodošli u <span className="fw-semibold fst-italic">"{IME_APLIKACIJE}"</span>
            </h1>
            <p className="lead text-secondary fw-light mx-auto" style={{ maxWidth: '650px', lineHeight: '1.8' }}>
              Mjesto gdje se umjetnost susreće s ručnom izradom. Uronite u kreativnu oazu i otkrijte pomno birane komade koji daju dušu svakom prostoru.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Što te čeka? - Minimalistički raspored umjesto klasičnih kartica */}
      <Container className="py-5 my-3 border-top border-light">
        <div className="text-center mb-5">
          <h6 className="text-uppercase text-muted small tracking-widest mb-2">Kolekcija</h6>
          <h2 className="fw-light display-6">Što se sve ovdje nalazi?</h2>
        </div>
        <Row className="g-5">
          {features.map((item, idx) => (
            <Col md={4} key={idx} className="text-center px-lg-4">
              <div className="h-100 p-2">
                <h5 className="fw-semibold mb-3">{item.title}</h5>
                <p className="text-secondary fw-light" style={{ lineHeight: '1.7' }}>{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Zašto odabrati ovu galeriju? - Suptilna pozadina */}
      <section className="bg-light py-5 my-5">
        <Container className="py-4">
          <div className="text-center mb-5">
            <h6 className="text-uppercase text-muted small tracking-widest mb-2">Vrijednosti</h6>
            <h2 className="fw-light display-6">Zašto odabrati ovaj rad?</h2>
          </div>
          <Row className="g-5">
            {benefits.map((benefit, idx) => (
              <Col md={4} key={idx} className="text-center px-lg-4">
                <div className="bg-white p-4 h-100 shadow-sm border-0" style={{ borderRadius: '4px' }}>
                  <h5 className="fw-semibold mb-3">{benefit.title}</h5>
                  <p className="text-secondary fw-light mb-0" style={{ lineHeight: '1.7' }}>{benefit.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </div>
  );
}