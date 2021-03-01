import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { MyContainer } from '../ui/my-container';
import styled from 'styled-components';
import ParkingDataService from "../../services/parking.service";

const MyMap = styled(Map)`
  &.leaflet-container {
    width: 100%;
    height: 70vh;
  }
`;

export class ParkingsWithFreeBoxes extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      lat: 28.128081,
      lng: -15.4467406,
      zoom: 13,
    }
  }*/

  constructor(props) {
    super(props);
    this.findAllWithAFreeBox = this.findAllWithAFreeBox.bind(this);
    this.state = {
      parkings: [],
      position: [28.128081, -15.4467406]
    }
  }

  componentDidMount() {
    this.findAllWithAFreeBox();
  }

  findAllWithAFreeBox() {
    ParkingDataService.findAllWithAFreeBox().then(res => {
      this.setState({
        parkings: res.data
      })
    })
  }

  redirectToDetailedParking(p) {
    console.log("hello boxes");
        console.log(this.props.history);
    this.props.history.push({
      pathname: '/availability',
      state: {
        parking: p,
        checkingForRenting: false
      }
    })
  }

  getCurrentPosition() {
    console.log("getCurrentPosition")
    navigator.geolocation.getCurrentPosition((location) => {
      // var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
      console.log("getCurrentPosition inside")
      console.log(location);
      this.setState({
        position: [location.coords.latitude, location.coords.longitude]
      });
    });
  }

  render() {
    // Las Palmas de GC
    //const position = [28.128081, -15.4467406];
    console.log("renderizando...")
    const position = this.state.position;
    console.log(position)
    const zoom = 13;
    return (
      <MyContainer>
        <Row>
          <Col>
            <MyMap center={position} zoom={zoom}>
              <TileLayer
                attribution=''
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {this.state.parkings.map(p => {
                let pos = [p.lat, p.long];
                return <Marker key={p.id} position={pos}>
                  <Popup>
                    Parking {p.id}<br />
                    {p.name}<br />
                    {p.address} <br />
                    <Button onClick={() => this.redirectToDetailedParking(p)}>Check availability</Button>
                  </Popup>
                </Marker>;
              })}
            </MyMap>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => this.getCurrentPosition()} variant="info" className="float-right mt-3 mr-3">
              <Image src={`${process.env.REACT_APP_BASEURL}/my-location.png`} width="25" />
            </Button>
            {/* <p className="mt-3 text-center">{this.state.parkings.length} parkings in Gran Canaria now.</p> */}
          </Col>
        </Row>
      </MyContainer>
    )
  }
}