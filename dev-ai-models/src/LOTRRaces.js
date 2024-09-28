import React, { useState, useCallback } from "react";
import { Button, Form, Container, Row, Col, Image, Spinner, Card, ProgressBar, Alert } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const ImageUploadPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [videoStream, setVideoStream] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const userAgent =(navigator.userAgent || window.opera || navigator.vendor).toLowerCase();
  const isMobile = /iphone|android|mobile|ipad|tablet/i.test(userAgent);

  const startCamera = () => {
    const video = document.getElementById("cameraStream");

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        setIsCameraActive(true);
        setVideoStream(stream);
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
        alert("Camera access is required to take a picture.");
      });
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
      setVideoStream(null);
    }
  };

  const handleTakePicture = () => {
    const video = document.getElementById("cameraStream");

    if (!video.srcObject) {
      alert("Please start the camera first.");
      return;
    }

    const captureCanvas = document.createElement("canvas");
    const context = captureCanvas.getContext("2d");

    captureCanvas.width = video.videoWidth;
    captureCanvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);

    stopCamera();

    captureCanvas.toBlob((blob) => {
      const imageFile = new File([blob], "captured.png", { type: "image/png" });
      setUploadedImage(imageFile);
      setImagePreview(URL.createObjectURL(imageFile));
    });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInference = async () => {
    if (!uploadedImage) return;

    setLoading(true);
    try {
      const base64Image = await fileToBase64(uploadedImage);

      const response = await fetch('https://api.gerovlabs.com/v1/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      const jsonResponse = await response.json();
      setResult(jsonResponse);

    } catch (error) {
      console.error("Error making inference:", error);
      setResult("Error with inference");
    } finally {
      setLoading(false);
    }
  };

  const renderPredictionCards = (predictions) => {
    const sortedPredictions = Object.entries(predictions)
      .sort(([, a], [, b]) => b - a) // Sort by percentage in descending order
      .slice(0, 3);
  
    return sortedPredictions.map(([race, percentage], index) => (
      <Card key={index} className="mb-3 mx-2" bg="dark" text="light" style={{ border: '1px solid #4a4a4a' }}>
        <Card.Body>
          <Card.Title>{race}</Card.Title>
          <ProgressBar animated now={percentage * 100} label={`${(percentage * 100).toFixed(0)}%`} />
        </Card.Body>
      </Card>
    ));
  };


  return (
    <Container className="p-4">
      <h2 className="text-center mb-4">Image Classifier (LOTR)</h2>
      <Row>
        <Col className="col-6">
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #4a4a4a",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: "10px",
              backgroundColor: isDragActive ? "#676363" : "transparent",
              marginBottom: "20px",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              isMobile ? (
                <p>Tap here to upload or take a photo</p>
              ) : (
                <p>Drag & drop an image here, or click to select a file</p>
              )
            )}
          </div>
        </Col>
        <Col>
          <Row className="mb-4">
          { !isMobile && (
              <Col className="col-8">
                <Row className="text-center"><Col className="col-12">or use your cam</Col></Row>
                <Row className="text-center">
                  <Col>
                    <Button variant="dark m-2" onClick={startCamera} disabled={isCameraActive}>
                      ▶️
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="dark m-2" onClick={stopCamera} disabled={!isCameraActive}>
                      ◽️
                    </Button>
                  </Col>
                  <Col>
                  <Button variant="dark m-2" onClick={handleTakePicture} disabled={!isCameraActive}>
                    📸
                  </Button>
                  </Col>
                </Row>
              </Col>
            )}
            <Col>
            { !isMobile && (
              <Row className="text-center mb-2">
                <Col>AI</Col>
              </Row>
            )}
              <Row className="text-center">
                  <Button variant="success" className="mr-4" onClick={handleInference} disabled={!uploadedImage || loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                      </>
                    ) : (
                      "Process"
                    )}
                  </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-4" fluid>
        <Col>
          <Row>
            {imagePreview && !isCameraActive && (
                    <Image src={imagePreview} alt="Preview" fluid width='300px' />
              )}
            <video id="cameraStream" fluid width="300px" style={{ display: isCameraActive ? "block" : "none" }}></video>
          </Row>
          <Row className="mt-4">

          </Row>
        </Col>
        <Col className="text-center col-6">
          {result && result.predictions && (
            <Row className="d-flex align-items-center justify-content-center px-2">
              {renderPredictionCards(result.predictions)}
            </Row>
          )}
          {result && !result.predictions && (
            <Alert key="danger" variant="danger">
              Something went wrong with the image processing
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ImageUploadPage;
