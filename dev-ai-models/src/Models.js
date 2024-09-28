import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const ModelCard = ({ name, type, dataset, description, link }) => {
  return (
    <Link to={link} className='text-muted'>
      <Card className="mb-4 bg-dark text-white">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-secondary">
            {type} - Dataset: {dataset}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <div className="text-center text-info">
              View Model
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

function ModelsShowcase() {
  return (
    <Container className="p-4">
      <h2 className="text-center mb-4">AI trained models</h2>
      <Row>
        <Col md={4} className="hover-box">
          <ModelCard
            name="LOTR races"
            type="CNN Classifier"
            dataset="1000 DDG images"
            description="A resnet18 deep learning model fine-tuned to classify images into the different LOTR races."
            link="/lotr-races"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ModelsShowcase;
