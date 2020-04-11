import React from 'react';
import { MyNavbar } from './my-navbar';
import { MyContainer } from './my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Footer } from './footer';

export class Main extends React.Component {

  render() {
    return (
      <>
        <MyNavbar history={this.props.history} />
        <MyContainer>
          <Row className="justify-content-md-center h-25"> 
            <Col md={6} className="text-center mt-auto" >
              <Image fluid src="img/bluecity.jpg" alt="logo" />
            </Col>
          </Row>
          <Row className="justify-content-md-center h-50">
            <Col xs={6} md={3} className="pt-5">
              <Image fluid src="img/marker.png" alt="marker" />
            </Col>
            <Col xs={6} md={3} className="pt-5">
              <Row>
                <Button variant="outline-primary" className="mt-2" href="/parking">Parking</Button>
              </Row>
              <Row>
                <Button variant="outline-primary" className="mt-2" href="/renting">Renting</Button>
              </Row>
            </Col>
          </Row>
        </MyContainer>
        <Footer />
      </>
    );
  }
}