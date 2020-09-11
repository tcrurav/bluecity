import React from 'react';
import { MyNavbar } from './my-navbar';
import { MyContainer } from './my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Footer } from './footer';
import BoxDataService from '../services/box.service';
import ParkingDataService from '../services/parking.service';
import { getApiUser } from '../utils/common';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const MyCol = styled(Col)`
  border: 1px solid black;
  font-size: 2em;
  color: white;
  &:hover {
    box-shadow: 5px 10px 18px #888888;
    color: black;
    font-size: 2.1em;
  }
`;

const MyRedCol = styled(MyCol)`
  background-color: red;
`;

const MyGreenCol = styled(MyCol)`
  background-color: green;
`;

const MyOrangeCol = styled(MyCol)`
  background-color: orange;
`;

const RedMarker = styled.span`
  color: red;
`;

const GreenMarker = styled.span`
  color: green;
`;

const OrangeMarker = styled.span`
  color: orange;
`;

const BlueInfo = styled.span`
  color: blue;
`;

const OCCUPIED = 0, FREE = 1, RESERVED = 2;
const FIVE_MINUTES = 5 * 60 * 1000;
const THIS_USER_HAS_NO_RESERVATION = -1;
const apiUser = getApiUser();
const CLOSE_DISTANCE_TO_PARKING = 0.01; // 0.01 Kilometers = 10 meters

export class Availability extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      boxes: [],
      occupied: 0,
      reserved: 0,
      free: 0,
      reservation_time_left: 0,
      boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
      openBoxPossible: false,
      geolocationAvailable: false,
      lat: 0,
      long: 0
    }

    this.findAllBoxesInAParking = this.findAllBoxesInAParking.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
    this.findOutGreenRedOrOrange = this.findOutGreenRedOrOrange.bind(this);
    this.formatTimeLeft = this.formatTimeLeft.bind(this);
    this.activateCountdown = this.activateCountdown.bind(this);
    this.checkGeolocationAvailability = this.checkGeolocationAvailability.bind(this);
    this.openBox = this.openBox.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.getDistanceFromLatLonInKm = this.getDistanceFromLatLonInKm.bind(this);
    this.deg2rad = this.deg2rad.bind(this);

    this.reservationInterval = null;
  }

  componentDidMount() {
    this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
      this.setState(newState);
      if (this.state.boxReservedByThisUser != THIS_USER_HAS_NO_RESERVATION) {
        this.activateCountdown();
      }

      this.checkGeolocationAvailability().then(res => {
        this.setState(res);
        if (res.geolocationAvailable) {
          this.watchPosition();
        }
      });
    });
  }

  checkOpenBoxPossible() {
    //Check distance to first box in parking. Notice that all boxes in the same parking have the same location.
    ParkingDataService.get(this.state.boxes[0].parkingId).then((res) => {
      console.log("checkOpenBoxPossible")
      console.log(res);
      console.log(this.state)
      const distanceToParking = this.getDistanceFromLatLonInKm(this.state.lat, this.state.long, parseFloat(res.data.lat), parseFloat(res.data.long));
      console.log(distanceToParking)
      if (this.state.boxReservedByThisUser != THIS_USER_HAS_NO_RESERVATION &&
        this.state.geolocationAvailable &&
        distanceToParking < CLOSE_DISTANCE_TO_PARKING) {
        this.setState({ openBoxPossible: true, distanceToParking: distanceToParking });
        return;
      }
      this.setState({ openBoxPossible: false, distanceToParking: distanceToParking });
    });
  }

  checkGeolocationAvailability() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        resolve({ geolocationAvailable: true });
        console.log("Available");
      } else {
        resolve({ geolocationAvailable: false });
        console.log("Not Available");
      }
    });
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }

  watchPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
        this.checkOpenBoxPossible();
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }

  findAllBoxesInAParking(id) {
    return new Promise((resolve, reject) => {
      BoxDataService.getAllBoxesInAParking(id).then(res => {
        // console.log(res);
        let occupied = 0, free = 0, reserved = 0,
          boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
        for (let i = 0; i < res.data.length; i++) {
          switch (this.findOutGreenRedOrOrange(res.data[i])) {
            case OCCUPIED:
              occupied++;
              break;
            case FREE:
              free++;
              break;
            case RESERVED:
              reserved++;
              if (res.data[i].userId == apiUser.id) {
                boxReservedByThisUser = i;
              }
              break;
            default: console.log("This case should never take place");
          }
        }

        resolve({
          boxes: res.data,
          occupied: occupied,
          reserved: reserved,
          free: free,
          boxReservedByThisUser: boxReservedByThisUser
        });
      })
    });

  }

  findOutGreenRedOrOrange(data) {
    //To understand this look at the table in the documentation

    const reservationExpired = new Date(data.lastReservationDate) < new Date(new Date() - FIVE_MINUTES + 1000); // five minutes minus 1 second

    if (!reservationExpired) {
      return RESERVED;
    }
    if ((!data.occupied && reservationExpired) ||
      (this.props.location.state.checkingForRenting && !data.occupied && reservationExpired)) {
      return FREE;
    }
    return OCCUPIED;
  }

  handleReservation(index) {
    if (this.state.boxReservedByThisUser != THIS_USER_HAS_NO_RESERVATION) {
      console.log("You have already reserved a Box in this parking");
      return;
    }

    let data = this.state.boxes[index];
    data.lastReservationDate = new Date();
    data.userId = apiUser.id;
    BoxDataService.update(data.id, data).then((res) => {
      this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
        this.setState(newState);
        this.activateCountdown();
        this.checkOpenBoxPossible();
      });
    }).catch((e) => console.error(e));
  }

  activateCountdown() {
    this.reservationInterval = setInterval(() => {
      const reservation_time_left = FIVE_MINUTES - (new Date().getTime() - new Date(this.state.boxes[this.state.boxReservedByThisUser].lastReservationDate).getTime());
      if (reservation_time_left < 1000) {
        //five minutes are over
        clearInterval(this.reservationInterval);
        this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
          newState.boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
          newState.reservation_time_left = 0;
          this.setState(newState);
        });
        return;
      }
      this.setState({
        reservation_time_left: reservation_time_left
      });
    }, 1000);
  }

  formatTimeLeft() {
    let totalSeconds = Math.floor(this.state.reservation_time_left / 1000);
    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds % 60;
    if (sec < 10) {
      sec = "0" + sec;
    }
    return (min == 0 && sec == 0 ? "" : `${min}:${sec}`);
  }

  openBox() {
    console.log("openBox")
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  componentWillUnmount() {
    if (this.reservationInterval) clearInterval(this.reservationInterval);
  }

  render() {
    return (
      <>
        <MyNavbar history={this.props.history} />
        <MyContainer>
          <Card>
            <Card.Header>
              <h3>{this.props.location.state.parking.name}</h3>
              <p>{this.props.location.state.parking.address}</p>
            </Card.Header>
            <Card.Img variant="top" src={`http://localhost:4000/parking${this.props.location.state.parking.id}.jpg`} />
            <Card.Body>
              <Card.Title>{this.state.boxes.length} boxes in total</Card.Title>
              <Card.Text>
                <Row className="pt-2">
                  <Col>
                    <Row><Col><RedMarker><FontAwesomeIcon icon={faMapMarkerAlt} /></RedMarker> {this.state.occupied} occupied</Col></Row>
                    <Row><Col><GreenMarker><FontAwesomeIcon icon={faMapMarkerAlt} /></GreenMarker> {this.state.free} available</Col></Row>
                    <Row><Col><OrangeMarker><FontAwesomeIcon icon={faMapMarkerAlt} /></OrangeMarker> {this.state.reserved} reserved</Col></Row>
                  </Col>
                  <Col>
                    <Row>
                      {
                        this.state.boxes.map((b, index) => {
                          switch (this.findOutGreenRedOrOrange(b)) {
                            case OCCUPIED: return <MyRedCol key={b.id}>{index + 1}</MyRedCol>;
                            case FREE: return <MyGreenCol key={b.id} onClick={(b) => this.handleReservation(index)}>{index + 1}</MyGreenCol>;
                            case RESERVED: return <MyOrangeCol key={b.id}>{index + 1}</MyOrangeCol>;
                            default: console.log("This case should never take place");
                          }
                        })
                      }
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col className="pt-3">
                    {
                      this.state.openBoxPossible ? <Button variant="secondary" size="lg" onClick={this.openBox}>Open box nº{this.state.boxReservedByThisUser + 1} &gt;&gt;</Button> : <></>
                    }
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
          <Row className="pt-3">
            <Col>
              {
                this.state.boxReservedByThisUser == THIS_USER_HAS_NO_RESERVATION ?
                  <><BlueInfo><FontAwesomeIcon icon={faInfoCircle} /></BlueInfo> Click on the Box number to reserve a parking box.</>
                  :
                  <><BlueInfo><FontAwesomeIcon icon={faInfoCircle} /></BlueInfo> Your reservation for box nº{this.state.boxReservedByThisUser + 1} in parking {this.props.location.state.parking.name} will expire in {this.formatTimeLeft()}</>
              }
            </Col>
          </Row>
          <Row>
            <Col>
              {
                this.state.geolocationAvailable ?
                  <><BlueInfo><FontAwesomeIcon icon={faInfoCircle} /></BlueInfo> Geolocation activated. This parking is {this.state.distanceToParking ? this.state.distanceToParking.toFixed(2) : ""}Km from your current location.</>
                  :
                  <><RedMarker><FontAwesomeIcon icon={faMapMarkerAlt} /></RedMarker> Geolocation not available. Please activate it.</>
              }
            </Col>
          </Row>
        </MyContainer>
        <Footer />
      </>
    );
  }
}