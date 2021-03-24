import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import {useGeolocation, checkGeolocationAvailability} from '../../geolocation/geolocation';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../../ui/navbar/my-navbar';
import { MyContainer } from '../../ui/my-container';
import { Footer } from '../../ui/footer';
import MyCard from './components/myCard';
import MyMarker from './components/myMarker';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card } from 'react-bootstrap';

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import BoxDataService from '../../../services/box.service';
import ParkingDataService from '../../../services/parking.service';

/**
|--------------------------------------------------
| Utils
|--------------------------------------------------
*/
import { getDistanceFromLatLonInKm } from '../../../utils/common';
import { formatTimeLeft } from './utils/util';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { OCCUPIED, FREE, RESERVED, FIVE_MINUTES, THIS_USER_HAS_NO_RESERVATION, getApiUser, CLOSE_DISTANCE_TO_PARKING, BEGIN_OF_TIMES, MINIMUM_DISTANCE_INCREMENT } from './constants/constants'

const AvailabilityScreen = ({ location, history }) => {

  let geolocation = useGeolocation();

  const { state: { parking, checkingForRenting } } = location;

  const socketRef = useRef();

  const [stateParking, setStateParking] = useState(
    {
      boxes: [],
      occupied: 0,
      reserved: 0,
      free: 0,
      reservation_time_left: 0,
      boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
      lat_parking: 0,
      long_parking: 0
    }
  );

  // const [stateReservation_time_left, setStateReservation_time_left] = useState(0);

  const [stateOpenBoxPossible, setStateOpenBoxPossible] = useState(false);

  const [distanceToParking, setDistanceToParking] = useState(0);

  let reservationInterval = null;
  const apiUser = getApiUser();

  const findOutGreenRedOrOrange = (data) => {
    // console.log("findOutGreenRedOrOrange")
    //To understand this look at the table in the documentation
    const reservationExpired = new Date(data.lastReservationDate) < new Date(new Date() - FIVE_MINUTES + 1000); // five minutes minus 1 second

    if (!reservationExpired) {
      return RESERVED;
    }
    if ((!data.occupied && reservationExpired) ||
      (checkingForRenting && !data.occupied && reservationExpired)) {
      return FREE;
    }
    return OCCUPIED;
  };

  const cancelCountdown = () => (reservationInterval != null) && clearInterval(reservationInterval);

  const handleReservation = (ind) => {
    console.log("handleReservation")
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
      console.log('You have already reserved a Box in this parking');
      return;
    }

    let data = stateParking.boxes[ind];
    data.lastReservationDate = new Date();
    data.userId = getApiUser().id;
    BoxDataService.update(data.id, data).then((res) => {
      findAllBoxesInAParking(parking.id).then(newState => {
        setStateParking({
          ...stateParking,
          boxes: newState.boxes,
          occupied: newState.occupied,
          reserved: newState.reserved,
          free: newState.free,
          boxReservedByThisUser: newState.boxReservedByThisUser
        });
        // activateCountdown();
        // checkOpenBoxPossible();
        console.log("something-changed y handle-reservatino");
        // console.log(socket);

        socketRef.current.emit("something-changed", { who_changed_it: apiUser.id, parking_changed: parking.id });
        // console.log("se activó handleReservation")
      });
    }).catch((error) => console.log(error));
  };



  const openBox = () => {
    console.log('openBox');
    try {
      socketRef.current.emit('open', { open: 'open' });
      console.log('socket OK');
    } catch (e) {
      console.log('error');
      console.log(e);
    } finally {
      console.log('finally log');
    }
  };

  const findAllBoxesInAParking = (id) => {
    console.log("findAllBoxesInAParking")
    return new Promise((resolve, reject) => {
      BoxDataService.getAllBoxesInAParking(id).then(res => {
        // console.log(res);
        let occupied = 0, free = 0, reserved = 0,
          boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
        for (let i = 0; i < res.data.length; i++) {
          switch (findOutGreenRedOrOrange(res.data[i])) {
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
          occupied,
          reserved,
          free,
          boxReservedByThisUser
        });
      })
    });

  }

  const activateCountdown = () => {
    console.log("activateCountdown")
    if(stateParking.reservation_time_left != 0 ) return;

    reservationInterval = setInterval(() => {

      // if (stateParking.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION) {
      //   //Probably a second went over before the reservation was cancelled.
      //   cancelCountdown();
      //   return;
      // }

      try {
        // console.log("errorcito")
        // console.log(stateParking.boxReservedByThisUser)
        const reservation_time_left = FIVE_MINUTES - (new Date().getTime() - new Date(stateParking.boxes[stateParking.boxReservedByThisUser].lastReservationDate).getTime());

        if (reservation_time_left < 1000) {
          //five minutes are over
          cancelCountdown();

          findAllBoxesInAParking(parking.id).then((newState) => {
            setStateParking({
              ...stateParking,
              boxes: newState.boxes,
              occupied: newState.occupied,
              reserved: newState.reserved,
              free: newState.free,
              boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
              reservation_time_left: 0
            });
            // setStateReservation_time_left(0);
            // setStateOpenBoxPossible(false);
            // checkOpenBoxPossible();
          });
          return;
        }
        setStateParking({
          ...stateParking,
          reservation_time_left
        });
        // setStateReservation_time_left(reservation_time_left);
      } catch (e) {
        console.log(e);
      }

    }, 1000);
  };

  const cancelReservation = () => {
    console.log("cancelReservation")
    let index = stateParking.boxReservedByThisUser;
    if (stateParking.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION) {
      // This condition should never be possible but just in the limit it could be.
      console.log(`You haven't reserved a Box in this parking yet`);
      return;
    }

    let data = stateParking.boxes[index];
    data.lastReservationDate = BEGIN_OF_TIMES;
    data.userId = null;
    BoxDataService.update(data.id, data).then(() => {
      cancelCountdown();
      try {
        findAllBoxesInAParking(parking.id).then((newState) => {
          setStateParking({
            ...stateParking,
            boxes: newState.boxes,
            occupied: newState.occupied,
            reserved: newState.reserved,
            free: newState.free,
            boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
            reservation_time_left: 0
          });
          // setStateReservation_time_left(0);
          // setStateOpenBoxPossible(false);
          // console.log("something-changed cancel reservation")
          socketRef.current.emit("something-changed", {
            who_changed_it: apiUser.id,
            parking_changed: parking.id
          })
        })
      } catch (error) {
        console.log(error);
      }
    });

  };

  const refresh = () => {
    console.log("refresh")
    
    findAllBoxesInAParking(parking.id).then((newState) => {
      setStateParking({
        ...stateParking,
        boxes: newState.boxes,
        occupied: newState.occupied,
        reserved: newState.reserved,
        free: newState.free,
        boxReservedByThisUser: newState.boxReservedByThisUser
      });
    });
  }

  useEffect(() => {
    console.log("useEffect primero")
    findAllBoxesInAParking(parking.id).then((newState) => {
      ParkingDataService.get(parking.id).then(res => {
        setStateParking({
          ...stateParking,
          boxes: newState.boxes,
          occupied: newState.occupied,
          reserved: newState.reserved,
          free: newState.free,
          boxReservedByThisUser: newState.boxReservedByThisUser,
          lat_parking: res.data.lat,
          long_parking: res.data.long
        });
      });
    });

    return () => {
      console.log("return in useEffect")
      cancelCountdown();
    };

  }, []);

  useEffect(() => {
    console.log("useEffect socket");
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('welcome', () => {
      console.log('connected to backend');
    });

    socketRef.current.on('refresh', data => {
      console.log("refresh on utils");
      console.log(data);
      console.log(apiUser.id);
      console.log(parking.id);
      if (data.who_changed_it !== apiUser.id && data.parking_changed === parking.id) {
        console.log("connection refreshed");
        refresh();
      }
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    console.log("useEffect countdown")
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION && reservationInterval == null) {
      activateCountdown();
    }
  }, [stateParking.boxReservedByThisUser]);

  useEffect(() => {
    console.log("useEffect de geolocation")
    if (geolocation.latitude == 0 && geolocation.longitude == 0) {
      return;
    }

    // console.log("useEffect de geolocation después")

    let distanceToParkingNow = getDistanceFromLatLonInKm(geolocation.latitude, geolocation.longitude,
      stateParking.lat_parking, stateParking.long_parking);

    // console.log(geolocation.latitude)
    // console.log(geolocation.longitude)
    // console.log(stateParking.lat_parking)
    // console.log(stateParking.long_parking)

    if ((distanceToParkingNow - distanceToParking) < MINIMUM_DISTANCE_INCREMENT) return;

    setDistanceToParking(distanceToParkingNow);

  }, [geolocation]);

  useEffect(() => {
    console.log("useEffect de openBoxPossible")
    if (distanceToParking < CLOSE_DISTANCE_TO_PARKING && stateParking.boxReservedByThisUser != THIS_USER_HAS_NO_RESERVATION) {
      setStateOpenBoxPossible(true);
    } else {
      setStateOpenBoxPossible(false);
    }
  }, [distanceToParking, stateParking.boxReservedByThisUser]);

  return (
    <>
      <MyNavbar history={history} />
      <MyContainer>
        <Row>
          <Card className='m-2'>
            <MyCard
              parking={parking}
              stateParking={stateParking}
              findOutGreenRedOrOrange={findOutGreenRedOrOrange}
              stateOpenBoxPossible={stateOpenBoxPossible}
              openBox={openBox}
              cancelReservation={cancelReservation}
              handleReservation={handleReservation}
            />
          </Card>
        </Row>
        <Row className='pt-3'>
          <Col>
            {
              stateParking.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION
                ?
                <MyMarker
                  color='blue'
                  state={null}
                  text='Click on the Box number to reserve a parking box.'
                  icon={faInfoCircle}
                />
                :
                <MyMarker
                  color='blue'
                  state={null}
                  text={`Your reservation for box nº${stateParking.boxReservedByThisUser.valueOf() + 1} in parking ${parking.name} will expire in ${formatTimeLeft(stateParking.reservation_time_left.valueOf())}`}
                  icon={faInfoCircle}
                />
            }
          </Col>
        </Row>
        <Row>
          <Col>
            {
              (geolocation.geolocationAvailability && distanceToParking)
                ?
                <MyMarker
                  color='blue'
                  state={null}
                  text={`Geolocation activated. This parking is ${distanceToParking ? distanceToParking.toFixed(2) : ""}Km from your current location.`}
                  icon={faInfoCircle}
                />
                :
                <MyMarker
                  color='blue'
                  state={null}
                  text='Geolocation not available. Please activate it.'
                  icon={faInfoCircle}
                />
            }
          </Col>
        </Row>
      </MyContainer>
      <Footer />
    </>
  )
};

AvailabilityScreen.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default AvailabilityScreen;
