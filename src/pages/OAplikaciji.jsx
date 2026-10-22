import { Button, Card, Col, Container, Row } from "react-bootstrap";


export default function OAplikaciji() {


  const features = [
    {
      title: 'Umjetničke slike',
      text: 'Unikatni vizuali s pričom i opisom koji oživljavaju svaki zid.'
    },
    {
      title: 'Ručno šivane torbe',
      text: 'Statement komadi stvoreni s naglaskom na stil i unikatnost.'
    },
    {
      title: 'Domaći dekor & svijećnjaci',
      text: 'Detalji koji stvaraju savršeni ugođaj u tvojoj sobi.'
    }
  ];

  const benefits = [
    { title: '100% Unikatno', desc: 'Svaki komad je poseban, ručno rađen i neponovljiv.' },
    { title: 'Inspiracija na dlanu', desc: 'Jednostavno sučelje s detaljnim pričama iza svakog artikla.' },
    { title: 'Podrška kreativnosti', desc: 'Kupnjom podržavaš trud, strast i autentični ručni rad.' }
  ];

  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-between">
      {/* Hero / Header sekcija */}
      <div className="bg-white shadow-sm py-5 mb-5 text-center">
        <Container>
          <h1 className="display-4 fw-bold text-dark mb-3">
            Galerija slika
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Mjesto gdje se umjetnost susreće s ručnom izradom. Uroni u našu digitalnu oazu kreativnosti i otkrij pomno birane komade koji daju dušu svakom prostoru.
          </p>
        </Container>
      </div>

      {/* Što te čeka? Kartice */}
      <Container className="mb-5">
        <h2 className="text-center fw-bold mb-4">Što te čeka?</h2>
        <Row className="g-4">
          {features.map((item, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <Card.Body>
                  <Card.Title className="fw-bold mb-3">{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Zašto odabrati Galeriju slika? */}
      <div className="bg-white py-5 mb-5 shadow-sm">
        <Container>
          <h2 className="text-center fw-bold mb-4">Zašto odabrati Galeriju slika?</h2>
          <Row className="g-4">
            {benefits.map((benefit, idx) => (
              <Col md={4} key={idx} className="text-center">
                <div className="p-3">
                  <h4 className="fw-bold text-primary mb-2">{benefit.title}</h4>
                  <p className="text-muted">{benefit.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

     
    </div>
  );
}

   
