//ATENTION: THIS FILE COULD BE MERGED WITH AvailabilityScreen.jsx IN THE FUTURE
//          NOW IT'S JUST A WAY TO WORK SEPARETELY

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import { useGeolocation } from '../../geolocation/geolocation';

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

  let [geolocation, geolocationAvailability] = useGeolocation();

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

  const [stateOpenBoxPossible, setStateOpenBoxPossible] = useState(false);

  const [distanceToParking, setDistanceToParking] = useState(0);

  const reservationInterval = useRef(null);
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

  const cancelCountdown = () => (reservationInterval.current !== null) && clearInterval(reservationInterval.current);

  const handleReservation = (ind) => {
    console.log("handleReservation")
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {  //Possible Stale Closure
      console.log('You have already reserved a Box in this parking');
      return;
    }

    let data = stateParking.boxes[ind]; //Possible Stale Closure
    data.lastReservationDate = new Date();
    data.userId = getApiUser().id;
    BoxDataService.update(data.id, data).then((res) => {
      findAllBoxesInAParking().then(newState => {
        setStateParking(s => ({
          ...s,
          boxes: newState.boxes,
          occupied: newState.occupied,
          reserved: newState.reserved,
          free: newState.free,
          boxReservedByThisUser: newState.boxReservedByThisUser
        }));

        socketRef.current.emit("something-changed", { who_changed_it: apiUser.id, parking_changed: parking.id });

      });
    }).catch((error) => console.log(error));
  };

  const openBox = () => {
    console.log('openBox');
    try {
      socketRef.current.emit('open', { open: 'open' });
    } catch (e) {
      console.log(e);
    }
  };

  const cancelReservation = () => {
    console.log("cancelReservation")
    let index = stateParking.boxReservedByThisUser;  //Possible Stale Closure
    if (stateParking.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION) {  //Possible Stale Closure
      // This condition should never be possible but just in the limit it could be.
      console.log(`You haven't reserved a Box in this parking yet`);
      return;
    }

    let data = stateParking.boxes[index];  //Possible Stale Closure
    data.lastReservationDate = BEGIN_OF_TIMES;
    data.userId = null;
    BoxDataService.update(data.id, data).then(() => {
      cancelCountdown();
      try {
        findAllBoxesInAParking().then((newState) => {
          setStateParking(s => ({
            ...s,
            boxes: newState.boxes,
            occupied: newState.occupied,
            reserved: newState.reserved,
            free: newState.free,
            boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
            reservation_time_left: 0
          }));
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

    findAllBoxesInAParking().then((newState) => {
      setStateParking(s => ({
        ...s,
        boxes: newState.boxes,
        occupied: newState.occupied,
        reserved: newState.reserved,
        free: newState.free,
        boxReservedByThisUser: newState.boxReservedByThisUser
      }));
    });
  }

  useEffect(() => {
    console.log("useEffect primero")
    BoxDataService.get(box.id).then((newState) => {
        setStateBox(s => ({
          ...s,
          boxes: newState.boxes,
          occupied: newState.occupied,
          reserved: newState.reserved,
          free: newState.free,
          boxReservedByThisUser: newState.boxReservedByThisUser,
          lat_parking: res.data.lat,
          long_parking: res.data.long
        }));
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
      // console.log("refresh on utils");
      // console.log(data);
      // console.log(apiUser.id);
      // console.log(parking.id);
      if (data.who_changed_it !== apiUser.id && data.parking_changed === parking.id) {
        console.log("connection refreshed");
        refresh();
      }
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  return (
    <>
      <MyNavbar history={history} />
      <MyContainer>
        <Row>
          <Card className='m-2'>
            <MyParkingProcessCard
              parking={parking}
              stateParkingProcess={stateParkingProcess}
            />
          </Card>
        </Row>
        <Row className='pt-3'>
          <Col>
            {
              stateParkingProcess === PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT
                ?
                <MyMarker
                  color='blue'
                  state={null}
                  text='Waiting for the door to get open...'
                  icon={faInfoCircle}
                />
                : stateParkingProcess === PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ?
                <MyMarker
                  color='blue'
                  state={null}
                  text='The door is open. Introduce the your scooter and close the door.'
                  icon={faInfoCircle}
                />
                : 
                <MyMarker
                  color='blue'
                  state={null}
                  text='The door is closed. The parking process is complete.'
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
