import React from 'react';
import { MyNavbar } from '../MyNavbar/MyNavbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class Main extends React.Component {
  render() {
    return (
      <>
        <MyNavbar />
        <Container className="p-3">
          <Row>
            <img className="img-fluid" src="img/bluecity.jpg" alt="logo" />
          </Row>
          <Row>
            <Col>
              <img className="img-fluid" src="img/marker.png" alt="marker" />
            </Col>
            <Col>
              <Row>
                <Button variant="outline-primary" className="mt-2" href="/parking-search">Parking search</Button>
              </Row>
              <Row>
                <Button variant="outline-primary" className="mt-2" href="/rent">Rent a scooter</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}