import React from 'react';
import { MyNavbar } from './my-navbar';
import { MyContainer } from './my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Footer } from './footer';

export class Availability extends React.Component {



  render() {
    return (
      <>
        <MyNavbar history={this.props.history} />
        <MyContainer>
            <h1>Hello, world</h1>
            <p>{this.props.location.state.parkingId}</p>
            <img src={`http://localhost:4000/parking${this.props.location.state.parkingId}.jpg`}></img>
        </MyContainer>
        <Footer />
      </>
    );
  }
}