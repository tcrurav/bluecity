import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { BallBeat } from "react-pure-loaders";
import { Footer } from '../../ui/footer';

import { useGeolocation } from '../../geolocation/geolocation';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../../ui/navbar/my-navbar';
import { MyContainer } from '../../ui/my-container';
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
import { getDistanceFromLatLonInKm, getDistanceToOpenBox } from '../../../utils/common';
import { formatTimeLeft } from './utils/util';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { OCCUPIED, FREE, RESERVED, FIVE_MINUTES, THIS_USER_HAS_NO_RESERVATION, getApiUser, 
  // CLOSE_DISTANCE_TO_PARKING, 
  BEGIN_OF_TIMES, MINIMUM_DISTANCE_INCREMENT } from './constants/constants'
import {
  PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  RENTING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT
} from '../constants/constants';

const AvailabilityScreen = ({ location, history }) => {

  const [loadingState, setLoadingState] = useState(true);

  const { t } = useTranslation();

  let [geolocation, geolocationAvailability] = useGeolocation();

  const { state: { parking, checkingForRenting, returningScooter } } = location;

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
    const reservationExpired = new Date(data.lastReservationDate) < new Date(new Date() - FIVE_MINUTES + 1000); // five minutes minus 1 second

    if (!reservationExpired) return RESERVED;
    
    if (!data.enabled) return OCCUPIED;

    if ((!checkingForRenting && !data.occupied && reservationExpired) ||
      (checkingForRenting && data.occupied && reservationExpired & !data.userId)) {
      return FREE;
    }

    return OCCUPIED;
  };

  const cancelCountdown = () => (reservationInterval.current !== null) && clearInterval(reservationInterval.current);

  const handleReservation = (ind) => {
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {  //Possible Stale Closure
      console.log('You have already reserved a Box in this parking');
      return;
    }

    let data = stateParking.boxes[ind]; //Possible Stale Closure
    data.lastReservationDate = new Date();
    data.userId = getApiUser().id; //???????
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
        socketRef.current.emit("something-changed", { 
          who_changed_it: apiUser.id, 
          parking_changed: parking.id,
          box_id: stateParking.boxes[newState.boxReservedByThisUser].id,
          reservation: true
        });

      });
    }).catch((error) => console.log(error));
  };

  const openBox = () => {
    try {
      let index = stateParking.boxReservedByThisUser;
      let data = stateParking.boxes[index];
      data.userId = apiUser.id;
      data.lastReservationDate = new Date();
      if (checkingForRenting) {
        data.state = RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT;
      } else {
        if (returningScooter) {
          data.state = RENTING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT;
        } else {
          // Looking for parking for own scooter
          data.state = PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT;
        }
      }
      BoxDataService.update(data.id, data).then(() => {
        if (checkingForRenting) {
          socketRef.current.emit('open-box-renting-out', data);
          history.push({
            pathname: '/renting-process-out',
            state: {
              parking,
              boxId: data.id
            }
          });
          return;
        }

        if (returningScooter) {
          socketRef.current.emit('open-box-renting-in', data);
          history.push({
            pathname: '/renting-process-in',
            state: {
              parking,
              boxId: data.id
            }
          });
          return;
        }

        // Parking
        socketRef.current.emit('open-box-parking-in', data);
        history.push({
          pathname: '/parking-process-in',
          state: {
            parking,
            boxId: data.id
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const findAllBoxesInAParking = () => {
    return new Promise((resolve, reject) => {
      BoxDataService.getAllBoxesInAParking(parking.id).then(res => {
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

  const cancelReservation = () => {
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
          const boxId = stateParking.boxes[stateParking.boxReservedByThisUser].id;
          setStateParking(s => ({
            ...s,
            boxes: newState.boxes,
            occupied: newState.occupied,
            reserved: newState.reserved,
            free: newState.free,
            boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
            reservation_time_left: 0
          }));
          socketRef.current.emit("something-changed", {
            who_changed_it: apiUser.id,
            parking_changed: parking.id,
            box_id: boxId,
            reservation: false
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
    findAllBoxesInAParking().then((newState) => {
      ParkingDataService.get(parking.id).then(res => {
        setStateParking(s => ({
          ...s,
          boxes: newState.boxes,
          occupied: newState.occupied,
          reserved: newState.reserved,
          free: newState.free,
          boxReservedByThisUser: newState.boxReservedByThisUser,
          lat_parking: res.data.lat,
          long_parking: res.data.long
        }));
        setLoadingState(false);
      });
    });

    return () => {
      cancelCountdown();
    };

  }, []);

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('welcome', () => {
      console.log('connected to backend');
    });

    socketRef.current.on('refresh', data => {
      if (data.who_changed_it !== apiUser.id && data.parking_changed === parking.id) {
        refresh();
      }
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {

      reservationInterval.current = setInterval(() => {

        try {
          const reservation_time_left = FIVE_MINUTES - (new Date().getTime() -
            new Date(stateParking.boxes[stateParking.boxReservedByThisUser].lastReservationDate).getTime()); //Possible Stale Closure

          if (reservation_time_left < 1000) {
            cancelReservation();
            return;
          }
          setStateParking(s => ({
            ...s,
            reservation_time_left
          }));
        } catch (e) {
          console.log(e);
        }
      }, 1000);
    };

    return () => {
      cancelCountdown();
    }
  }, [stateParking.boxReservedByThisUser]);

  useEffect(() => {
    if (geolocation.latitude === 0 && geolocation.longitude === 0) {
      return;
    }

    let distanceToParkingNow = getDistanceFromLatLonInKm(geolocation.latitude, geolocation.longitude,
      stateParking.lat_parking, stateParking.long_parking);

    if ((Math.abs(distanceToParkingNow - distanceToParking)) < MINIMUM_DISTANCE_INCREMENT) return;

    setDistanceToParking(distanceToParkingNow);

  }, [geolocation.latitude, geolocation.longitude, stateParking.lat_parking, stateParking.long_parking]);

  useEffect(() => {
    let CLOSE_DISTANCE_TO_PARKING = getDistanceToOpenBox();
    if (distanceToParking < CLOSE_DISTANCE_TO_PARKING && stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
      setStateOpenBoxPossible(true);
    } else {
      setStateOpenBoxPossible(false);
    }
  }, [distanceToParking, stateParking.boxReservedByThisUser]);

  return (
    <>
      <MyNavbar history={history} />

      { loadingState ? (
        <>
          <MyContainer>
            <Row className="justify-content-md-center h-50">
              <Col md={6} className="text-center mt-auto pb-5">
                <BallBeat color={"#123abc"} loading={loadingState} />
              </Col>
            </Row>
          </MyContainer>
        </>
      ) :

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
                    text={`${t('Click on a Box number to reserve')} ${checkingForRenting ? t('a scooter') : t('a parking box')}.`}
                    icon={faInfoCircle}
                  />
                  :
                  <MyMarker
                    color='blue'
                    state={null}
                    text={`${t('Your reservation for')} ${checkingForRenting ? t('a scooter in') : ''} ${t('parking')}${stateParking.boxReservedByThisUser.valueOf() + 1} ${t('in station')} ${parking.name} ${t('will expire in')} ${formatTimeLeft(stateParking.reservation_time_left.valueOf())}`}
                    icon={faInfoCircle}
                  />
              }
            </Col>
          </Row>
          <Row>
            <Col>
              {
                (geolocationAvailability && distanceToParking)
                  ?
                  <MyMarker
                    color='blue'
                    state={null}
                    text={`${t('Geolocation activated. This parking is')} ${distanceToParking ? distanceToParking.toFixed(2) : ""}${t('Km from your current location')}.`}
                    icon={faInfoCircle}
                  />
                  :
                  <MyMarker
                    color='blue'
                    state={null}
                    text={t('Geolocation not available. Please activate it.')}
                    icon={faInfoCircle}
                  />
              }
            </Col>
          </Row>
        </MyContainer>
      }
      <Footer />
    </>
  )
};

AvailabilityScreen.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default AvailabilityScreen;
