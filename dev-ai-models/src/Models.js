import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';


const Item = ({ imageSrc, text, description, link }) => {
    return (
    <Link to={link} className="box">
        <Row className="hover-box p-4">
          <Col xs={12} className="d-flex justify-content-center align-items-center p-0">
            <Image
              src={imageSrc}
              fluid
              className="box-image"
            />
          </Col>
          <Col xs={12} className="d-flex justify-content-center align-items-center">
            <h1 className="box-text">{text}</h1>
          </Col>
          <Col xs={12} className="text-center">
            <p className="small">{description}</p>
          </Col>
        </Row>
    </Link>
    );
  };

function Models() {
  return (
    <Container className="h-100">
      <Row className="pb-4">
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Item
            imageSrc="/ai-models/lotr-races.jpg"
            text="LOTR Race"
            link="/lotr-races"
            description="Finetuned Resnet-18 classifier that recognises LOTR races from their movie photos"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Models;