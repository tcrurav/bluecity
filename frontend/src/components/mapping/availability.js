import React from 'react';
import { MyNavbar } from '../ui/navbar/my-navbar';
import { MyContainer } from '../ui/my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Footer } from '../ui/footer';
import BoxDataService from '../../services/box.service';
import ParkingDataService from '../../services/parking.service';
import { getApiUser, getDistanceFromLatLonInKm } from '../../utils/common';

import socketIOClient from "socket.io-client"; //Websockets

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
const CLOSE_DISTANCE_TO_PARKING = 2; //0.01; // 0.01 Kilometers = 10 meters
const BEGIN_OF_TIMES = new Date('1970-01-01 00:00:00');

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
      lat_parking: 0,
      long_parking: 0,
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
    this.createSocketIOConnection = this.createSocketIOConnection.bind(this); //Websockets
    this.checkDistanceToParking = this.checkDistanceToParking.bind(this);
    this.cancelCountdown = this.cancelCountdown.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);
    this.refresh = this.refresh.bind(this);

    this.reservationInterval = null;
    this.socket = null; //Websockets
    this.watchID = null;
  }

  componentDidMount() {
    this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
      this.setState(newState);
      if (this.state.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
        this.activateCountdown();
      }

      this.checkGeolocationAvailability().then(res => {
        this.setState(res);
        if (res.geolocationAvailable) {
          this.watchPosition();
        }

    this.createSocketIOConnection(); //Websockets
  }

  refresh() {
    console.log("refresh");
    this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
      this.setState(newState);
      if (this.state.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
        this.activateCountdown();
      }
    });
  }

  createSocketIOConnection() { //Websockets
    console.log("createSocketIOConnection");
    if (!this.socket) {
      console.log("victoria");
      this.socket = socketIOClient(process.env.REACT_APP_BASEURL, {
        withCredentials: true
      });
      console.log("otro1")
      this.socket.on('connect', () => {
        console.log('connected to backend');
      });
      console.log("otro")
      this.socket.on("hola", data => {
        console.log("connection confirmed");
      });

      this.socket.on("refresh", data => {
        if (data.who_changed_it !== apiUser.id && data.parking_changed === this.props.location.state.parking.id) this.refresh();
        console.log("connection refreshed");
      });

      console.log("otro2")
    }

  checkOpenBoxPossible() {
    //Condition to check if lat, long of parking has been already queried. Black hole somewhere in athlantic sea lat=0, long=0
    // if (this.state.lat !== 0 || this.state.long !== 0) {
    //Check distance to first box in parking. Notice that all boxes in the same parking have the same location.
    ParkingDataService.get(this.state.boxes[0].parkingId).then((res) => {
      this.checkDistanceToParking(res.data.lat, res.data.long);
    });
    // } else {
    //   this.checkDistanceToParking(this.state.lat_parking, this.state.long_parking);
    // }
  }

  checkDistanceToParking(lat, long) {
    console.log("checkOpenBoxPossible")
    const distanceToParking = getDistanceFromLatLonInKm(
      this.state.lat, this.state.long, parseFloat(lat), parseFloat(long));
    // console.log(distanceToParking)
    if (this.state.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION &&
      this.state.geolocationAvailable &&
      distanceToParking < CLOSE_DISTANCE_TO_PARKING) {
      this.setState({
        openBoxPossible: true, distanceToParking: distanceToParking, lat_parking: lat, long_parking: long
      });
      return;
    }
    this.setState({ openBoxPossible: false, distanceToParking: distanceToParking, lat_parking: lat, long_parking: long });
  }

    checkOpenBoxPossible() {
        //Check distance to first box in parking. Notice that all boxes in the same parking have the same location.
        ParkingDataService.get(this.state.boxes[0].parkingId).then((res) => {
            console.log("checkOpenBoxPossible")
            const distanceToParking = getDistanceFromLatLonInKm(this.state.lat, this.state.long, parseFloat(res.data.lat), parseFloat(res.data.long));
            // console.log(distanceToParking)
            if (this.state.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION &&
                this.state.geolocationAvailable &&
                distanceToParking < CLOSE_DISTANCE_TO_PARKING) {
                this.setState({ openBoxPossible: true, distanceToParking: distanceToParking });
                return;
            }
            this.setState({ openBoxPossible: false, distanceToParking: distanceToParking });
        });
    }

  // getCurrentPosition() {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     this.setState({
  //       lat: position.coords.latitude,
  //       long: position.coords.longitude
  //     });
  //     // console.log("Latitude is :", position.coords.latitude);
  //     // console.log("Longitude is :", position.coords.longitude);
  //   });
  // }

  watchPosition() {
    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        if (this.state.lat !== position.coords.latitude || this.state.long !== position.coords.longitude) {
          this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude
          });
          this.checkOpenBoxPossible();
          // console.log("Latitude is :", position.coords.latitude);
          // console.log("Longitude is :", position.coords.longitude);
        }
      });
    }

    // getCurrentPosition() {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     this.setState({
    //       lat: position.coords.latitude,
    //       long: position.coords.longitude
    //     });
    //     // console.log("Latitude is :", position.coords.latitude);
    //     // console.log("Longitude is :", position.coords.longitude);
    //   });
    // }

    watchPosition() {
        if (navigator.geolocation) {
            this.watchID = navigator.geolocation.watchPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
                this.checkOpenBoxPossible();
                // console.log("Latitude is :", position.coords.latitude);
                // console.log("Longitude is :", position.coords.longitude);
            });
        }
    }

    findAllBoxesInAParking(id) {
        return new Promise((resolve, reject) => {
            BoxDataService.getAllBoxesInAParking(id).then(res => {
                console.log("findAllBoxesInAParking")
                console.log(res);
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
                            if (res.data[i].userId === apiUser.id) {
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
    if ((!data.occupied && reservationExpired) || (this.props.location.state.checkingForRenting && !data.occupied && reservationExpired)) {
      return FREE;
    }

    handleReservation(index) {
        if (this.state.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
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

    let data = this.state.boxes[index];
    data.lastReservationDate = new Date();
    data.userId = apiUser.id;
    BoxDataService.update(data.id, data).then((res) => {
      this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
        this.setState(newState);
        this.activateCountdown();
        this.checkOpenBoxPossible();
        this.socket.emit("something-changed", { who_changed_it: apiUser.id, parking_changed: this.props.location.state.parking.id });
      });
    }).catch((e) => console.error(e));
  }

        let data = this.state.boxes[index];
        data.lastReservationDate = BEGIN_OF_TIMES;
        data.userId = null;
        BoxDataService.update(data.id, data).then((res) => {
            this.cancelCountdown();
            this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
                newState.boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
                newState.reservation_time_left = 0;
                newState.openBoxPossible = false;
                this.setState(newState);
                // this.checkOpenBoxPossible();
            });
        }).catch((e) => console.error(e));
    }

    let data = this.state.boxes[index];
    data.lastReservationDate = BEGIN_OF_TIMES;
    data.userId = null;
    BoxDataService.update(data.id, data).then((res) => {
      this.cancelCountdown();
      this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
        newState.boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
        newState.reservation_time_left = 0;
        newState.openBoxPossible = false;
        this.setState(newState);
        // this.checkOpenBoxPossible();
        this.socket.emit("something-changed", { who_changed_it: apiUser.id, parking_changed: this.props.location.state.parking.id });
      });
    }).catch((e) => console.error(e));
  }

  cancelCountdown() {
    if (this.reservationInterval != null) clearInterval(this.reservationInterval);
  }

  activateCountdown() {
    this.reservationInterval = setInterval(() => {
      if (this.state.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION) {
        //Probably a second went over before the reservation was cancelled.
        this.cancelCountdown();
        return;
      }
      const reservation_time_left = FIVE_MINUTES - (new Date().getTime() - new Date(this.state.boxes[this.state.boxReservedByThisUser].lastReservationDate).getTime());
      if (reservation_time_left < 1000) {
        //five minutes are over
        this.cancelCountdown();
        this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
          newState.boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
          newState.reservation_time_left = 0;
          newState.openBoxPossible = false;
          this.setState(newState);
          this.checkOpenBoxPossible();
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
  return (min === 0 && sec === 0 ? "" : `${min}:${sec}`);
}

openBox() {
  console.log("openBox");
  try { //Websockets
    this.socket.emit("chacho-tu", { hola: "hola" });
    console.log("terminó bien");
  } catch (e) {
    console.log("error");
  } finally {
    console.log("terminó bien o mal");
  }

}

componentWillUnmount() {
  this.cancelCountdown();

  if (this.socket != null) this.socket.disconnect(); //Websockets

  if (this.watchID != null) navigator.geolocation.clearWatch(this.watch);

}

render() {
  return (
    <>
      <MyNavbar history={this.props.history} />
      <MyContainer>
        <Row>
          <Card className="m-2">
            <Card.Header>
              <h4>{this.props.location.state.parking.name}</h4>
              <p>{this.props.location.state.parking.address}</p>
            </Card.Header>
            <Card.Img variant="top" src={`${process.env.REACT_APP_BASEURL}/parking${this.props.location.state.parking.id}.jpg`} />
            <Card.Body>
              <Card.Title>{this.state.boxes.length} boxes in total</Card.Title>
              {/* <Card.Text> */}
              <Row className="pt-2">
                <Col>
                  <RedMarker><FontAwesomeIcon icon={faMapMarkerAlt} /></RedMarker> {this.state.occupied} occupied<br />
                  <GreenMarker><FontAwesomeIcon icon={faMapMarkerAlt} /></GreenMarker> {this.state.free} available<br />
                  <OrangeMarker><FontAwesomeIcon icon={faMapMarkerAlt} /></OrangeMarker> {this.state.reserved} reserved<br />
                </Col>
                <Col>
                  <Row>
                    {
                      this.state.boxes.map((b, index) => {
                        switch (this.findOutGreenRedOrOrange(b)) {
                          case OCCUPIED: return <MyRedCol key={b.id}>{index + 1}</MyRedCol>;
                          case FREE: return <MyGreenCol key={b.id} onClick={(b) => this.handleReservation(index)}>{index + 1}</MyGreenCol>;
                          case RESERVED: return <MyOrangeCol key={b.id}>{index + 1}</MyOrangeCol>;
                          default:
                            console.log("This case should never take place");
                            return <></>;
                        }
                      })
                    }
                  </Row>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col></Col>
                <Col>
                  <Row>
                    <Col>
                      {
                        this.state.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION ?
                          <Button block variant="secondary" onClick={() =>
                            this.cancelReservation(this.state.boxReservedByThisUser)}>Cancel Reservation
                              </Button>
                          : <></>
                      }
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col>
                      {
                        this.state.openBoxPossible ?
                          <Button block variant="primary"
                            onClick={this.openBox}>Open box nº{this.state.boxReservedByThisUser + 1} &gt;&gt;
                              </Button>
                          : <></>
                      }
                    </Col>
                  </Row>

                </Col>
              </Row>
              {/* </Card.Text> */}
            </Card.Body>
          </Card>
        </Row>
        <Row className="pt-3">
          <Col>
            {
              this.state.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION ?
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