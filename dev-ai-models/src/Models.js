import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ModelCard = ({ name, type, dataset, description, link }) => {
  return (
    <Card className="mb-4 bg-dark text-white">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {type} - Dataset: {dataset}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <div className="text-center">
          <Button variant="dark" href={link}>
            View Model
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

function ModelsShowcase() {
  return (
    <Container className="p-4">
      <h2 className="text-center mb-4">AI trained models</h2>
      <Row>
        <Col md={4} className="hover-box">
          <ModelCard
            name="Image Classifier (LOTR)"
            type="CNN Classifier"
            dataset="1000 LOTR images"
            description="A deep learning model fine-tuned to classify images into the different LOTR races using a custom dataset of 1000 images."
            link="/ai-models/lotr-races"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ModelsShowcase;
