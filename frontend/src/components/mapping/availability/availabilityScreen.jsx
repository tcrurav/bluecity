import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

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
import { formatTimeLeft, checkGeolocationAvailability } from './utils/util';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { OCCUPIED, FREE, RESERVED, FIVE_MINUTES, THIS_USER_HAS_NO_RESERVATION, getApiUser, CLOSE_DISTANCE_TO_PARKING, BEGIN_OF_TIMES, MINIMUM_DISTANCE_INCREMENT } from './constants/constants'

const AvailabilityScreen = ({ location, history }) => {

  const { state: { parking, checkingForRenting } } = location;

  //const [refSocket, setRefSocket] = useRef(() => socketIOClient(process.env.REACT_APP_BASEURL));

  let refSocket = null;

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

  const [stateLatLog, setStateLatLog] = useState({
    lat: 0,
    long: 0,
  });

  const [stateOpenBoxPossible, setStateOpenBoxPossible] = useState(false);

  const [stateGeolocationAvailable, setStateGeolocationAvailable] = useState(false);

  const [distanceToParking, setDistanceToParking] = useState(0);

  let reservationInterval = null;
  let watchID = null;
  const apiUser = getApiUser();

  const findOutGreenRedOrOrange = (data) => {
    console.log("findOutGreenRedOrOrange")
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

  const watchPosition = () => {
    console.log("watchPosition")
    if (navigator.geolocation) {
      watchID = navigator.geolocation.watchPosition((position) => {
        if (stateLatLog.lat == 0 && stateLatLog.long == 0) {
          setStateLatLog({ lat: position.coords.latitude, long: position.coords.longitude });
          return;
        }

        let distanceFromLastCheck = getDistanceFromLatLonInKm(stateLatLog.lat, stateLatLog.long, position.coords.latitude, position.coords.longitude);
        console.log("distanceFromLastCheck");
        console.log(distanceFromLastCheck);
        console.log(stateLatLog.lat)
        console.log(stateLatLog.long)
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        if (distanceFromLastCheck > MINIMUM_DISTANCE_INCREMENT) {
          setStateLatLog({
            lat: position.coords.latitude,
            long: position.coords.longitude
          });
        }
      });
    }
  };

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
        activateCountdown();
        checkOpenBoxPossible();
        refSocket && refSocket.emit("something-changed", { who_changed_it: apiUser.id, parking_changed: parking.id });
      });
    }).catch((error) => console.log(error));
  };

  const createSocketIOConnection = (parking) => {
    console.log('createSocketIOConnection');
    if (!refSocket) {
      console.log('victoria');
      refSocket = socketIOClient(process.env.REACT_APP_BASEURL)

      /* setRefSocket(
        socket
      ) */

      console.log(refSocket)
      //console.log('otro1')
      refSocket.on('connect', () => {
        console.log('connected to backend');
      });
      //console.log('otro')
      refSocket.on('open', data => {
        console.log('connection confirmed');
      });
      //console.log('otro2')
      refSocket.on('refresh', data => {
        console.log("refresh on utils");
        if (data.who_changed_it !== apiUser.id && data.parking_changed === parking.id) {
          console.log("connection refreshed");
          refresh();
        }
      });
    }
  };

  const openBox = () => {
    console.log('openBox');
    try {
      refSocket.emit('open', { open: 'open' });
      console.log('socket OK');
    } catch (e) {
      console.log('error');
      console.log(e);
    } finally {
      console.log('finally log');
    }
  };

  // const findAllBoxesInAParking = useCallback(
  //   async () => {
  //     const newStateBox = await BoxDataService.getAllBoxesInAParking(parking.id);
  //     console.log("findAllBoxesInAParking")
  //     let occupied = 0, free = 0, reserved = 0,
  //       boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
  //     for (let i = 0; i < newStateBox.data.length; i++) {
  //       switch (findOutGreenRedOrOrange(newStateBox.data[i])) {
  //         case OCCUPIED:
  //           occupied++;
  //           break;
  //         case FREE:
  //           free++;
  //           break;
  //         case RESERVED:
  //           reserved++;
  //           if (newStateBox.data[i].userId === apiUser.id) {
  //             boxReservedByThisUser = i;
  //           }
  //           break;
  //         default: console.log("This case should never take place");
  //       }
  //     }

  //     setStateParking({
  //       ...stateParking,
  //       boxes: newStateBox.data,
  //       occupied,
  //       reserved,
  //       free,
  //       boxReservedByThisUser
  //     });
  //   }, [parking.id, setStateParking]
  // );

  const findAllBoxesInAParking = (id) => {
    console.log("findAllBoxesInAParking")
    return new Promise((resolve, reject) => {
      BoxDataService.getAllBoxesInAParking(id).then(res => {
        console.log(res);
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
    reservationInterval = setInterval(() => {

      if (stateParking.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION) {
        //Probably a second went over before the reservation was cancelled.
        cancelCountdown();
        return;
      }

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
          setStateOpenBoxPossible(false);
          // checkOpenBoxPossible();
        });
        return;
      }
      setStateParking({
        ...stateParking,
        reservation_time_left
      });

    }, 1000);
  };

  const checkGeolocation = async () => {
    const geolocation = await checkGeolocationAvailability();
    if (geolocation != stateGeolocationAvailable) {
      setStateGeolocationAvailable(geolocation);
      try {
        watchPosition();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkOpenBoxPossible = () => {
    console.log("checkOpenBoxPossible")
    ParkingDataService.get(parking.id).then(res => {
      checkDistanceToParking(res.data.lat, res.data.long);
    });
  };

  const checkDistanceToParking = (lat, long) => {
    console.log("checkDistanceToParking")
    const ThisDistanceToParking = getDistanceFromLatLonInKm(
      stateLatLog.lat, stateLatLog.long, parseFloat(lat), parseFloat(long));
    // console.log(distanceToParking)
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION &&
      stateGeolocationAvailable &&
      ThisDistanceToParking < CLOSE_DISTANCE_TO_PARKING) {
      setStateParking({
        ...stateParking,
        lat_parking: lat,
        long_parking: long
      })
      setDistanceToParking(ThisDistanceToParking);
      setStateOpenBoxPossible(true);
      return;
    }
    setStateParking({
      ...stateParking,
      lat_parking: lat,
      long_parking: long
    })
    setDistanceToParking(ThisDistanceToParking);
    setStateOpenBoxPossible(false);
  }


  /* const refresh = () => {
    findAllBoxesInAParking().then((newState) => {
      setStateParking(newState);
      if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
        activateCountdown();
      }
    });
  } */

  /* refresh() {
    this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
      this.setState(newState);
      if (this.state.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
        this.activateCountdown();
      }
    });
  } */

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
          setStateOpenBoxPossible(false);
          console.log("something-changed")
          refSocket && refSocket.emit("something-changed", {
            who_changed_it: apiUser.id,
            parking_changed: parking.id
          })
        })
      } catch (error) {
        console.log(error);
      }
    });

  };

  // const refresh = () => {
  //   try {
  //     console.log("refresh");
  //     findAllBoxesInAParking();
  //     if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
  //       try {
  //         activateCountdown();
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     checkGeolocation();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const refresh = () => {
    console.log("refresh")
  }

  useEffect(() => {
    console.log("useEffect")
    findAllBoxesInAParking(parking.id).then((newState) => {
      console.log(newState);
      console.log("estado viejo")
      console.log(stateParking)
      setStateParking({
        ...stateParking,
        boxes: newState.boxes,
        occupied: newState.occupied,
        reserved: newState.reserved,
        free: newState.free,
        boxReservedByThisUser: newState.boxReservedByThisUser
      });
      console.log("estado nuevo")
      console.log(stateParking)
      if (newState.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
        activateCountdown();
      }

      checkGeolocationAvailability().then(res => {
        setStateGeolocationAvailable(res);
        if (res) {
          watchPosition();
        }
      });
    });

    createSocketIOConnection(parking);

    return () => {
      console.log("return in useEffect")
      cancelCountdown();
      (refSocket != null) && refSocket.disconnect();
      (watchID != null) && navigator.geolocation.clearWatch(watchID);
    };

  }, []);

  //useEffect(() => {
  //if(stateGeolocationAvailable && stateLatLog.lat != 0 && stateLatLog.long != 0) checkOpenBoxPossible();
  //}, [stateLatLog])

  // useEffect(() => {
  //   refresh();
  // }, [stateParking])

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
              (stateGeolocationAvailable)
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
