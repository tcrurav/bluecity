import React from 'react';
import { MyNavbar } from './my-navbar';
import { Footer } from './footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MyContainer } from './my-container';

export class Renting extends React.Component {

  render() {
    return (
      <>
        <MyNavbar history={this.props.history} />
        <MyContainer>
          <Row className="h-75">
            <Col className="text-center my-auto">
              <h1>Renting</h1>
            </Col>
          </Row>
        </MyContainer>
        <Footer />
      </>
    );
  }
}

