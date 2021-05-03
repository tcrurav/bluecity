import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import {MyContainer} from '../ui/my-container';
import styled from 'styled-components';
import ParkingDataService from "../../services/parking.service";

const MyMap = styled(Map)`
  &.leaflet-container {
    width: 100%;
    height: 100vh;
  }
`;

export class ParkingsWithFreeScooters extends React.Component {
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
        this.findAllWithAFreeScooter = this.findAllWithAFreeScooter.bind(this);
        this.state = {
            parkings: []
        }
    }

    componentDidMount() {
        this.findAllWithAFreeScooter();
    }

    findAllWithAFreeScooter() {
        ParkingDataService.findAllWithAFreeScooter().then(res => {
            this.setState({
                parkings: res.data
            })
        })
    }

    redirectToDetailedParking(p) {
        console.log("hello");
        console.log(this.props.history);
        this.props.history.push({
          pathname: '/availability',
          state: {
            parking: p,
            checkingForRenting: true
          }
        })
      }

    render() {
        const position = [28.128081, -15.4467406]
        const zoom = 13
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
                                        Parking {p.id}<br/>
                                        {p.name}<br/>
                                        {p.address} <br/>
                                        <Button onClick={() => this.redirectToDetailedParking(p)}>Check availability</Button>
                                    </Popup>
                                </Marker>;
                            })}
                        </MyMap>
                    </Col>
                </Row>
            </MyContainer>
        )
    }
}