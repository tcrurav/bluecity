import React from 'react';
import { MyAuthButtons } from './my-auth-buttons';
import { MyContainer } from './my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export class Login extends React.Component {
  render() {
    return (
        <MyContainer>
          <Row className="justify-content-md-center h-50">
            <Col md={6} className="text-center mt-auto pb-5">
              <Image fluid src="img/bluecity.jpg" alt="logo" />
            </Col>
          </Row>
          <Row className="justify-content-md-center h-50">
            <Col md={6} className="mb-auto">
              <MyAuthButtons history={this.props.history} />
            </Col>
          </Row>
        </MyContainer>
    );
  }
}