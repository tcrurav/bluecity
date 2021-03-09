import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { MyNavbar } from '../ui/navbar/my-navbar';
import { Footer } from '../ui/footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MyContainer } from '../ui/my-container';
import styled from 'styled-components';

const MyMap = styled(Map)`
  &.leaflet-container {
    width: 100%;
    height: 100vh;
  }
`;

export class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 28.128081,
      lng: -15.4467406,
      zoom: 13,
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <>
        <MyNavbar history={this.props.history} />
        <MyContainer>
          <Row>
            <Col>
              <MyMap center={position} zoom={this.state.zoom}>
                <TileLayer
                  attribution=''
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    IES El Rincón<br />
                    Guanarteme Building<br />
                    My school.<br />
                    I miss it so much.
                  </Popup>
                </Marker>
              </MyMap>
            </Col>
          </Row>
        </MyContainer>
        <Footer />
      </>
    )
  }
}