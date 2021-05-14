import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { BallBeat } from "react-pure-loaders";

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
import { makeStyles } from "@material-ui/core/styles";
//import { Button, Row } from 'react-bootstrap';

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import BoxDataService from '../../../services/box.service';
import ParkingDataService from '../../../services/parking.service';
import ScooterDataService from '../../../services/scooter.service';

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
import { 
	PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
	RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
 } from '../renting-process-in/constants/constants';

const AvailabilityScreen = ({ location, history }) => {

  const [loadingState, setLoadingState] = useState(true);

  const { t } = useTranslation();

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

  const [hasBoxOccupied, setBoxOccupied] = useState(
    {
      hasOne: false,
      numberOfBox: -1,
    } 
  );
  const useStyles = makeStyles((theme) => ({
    root: {},
    image: {
      maxWidth: "512px",
    },
    buttonContainer: {
      justify: "center",
      alignItems: "center",
      //justifyContent: "center",
    },
    buttons: {
      marginTop: "1vh",
      backgroundColor: '#00a9f4',
      '&:hover': {
        backgroundColor: '#007ac1',
        color: 'white'
      }
    }
  }));
  const classes = useStyles();

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
    if ((!checkingForRenting && !data.occupied && reservationExpired) ||
      (checkingForRenting && data.occupied && reservationExpired & !data.userId)) {
      return FREE;
    }
    return OCCUPIED;
  };

  const cancelCountdown = () => (reservationInterval.current !== null) && clearInterval(reservationInterval.current);

  const handleReservation = (ind) => {
    // console.log("handleReservation")
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
        socketRef.current.emit("something-changed", { who_changed_it: apiUser.id, parking_changed: parking.id });

      });
    }).catch((error) => console.log(error));
  };

  const openBox = () => {
    // console.log('openBox');
    try {
      let index = stateParking.boxReservedByThisUser;  
      let data = stateParking.boxes[index];  
	  data.userId = apiUser.id;
	  if(checkingForRenting) {
        data.state = RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT;
      }
      else {
        data.state = PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT;
      }
      data.lastReservationDate = BEGIN_OF_TIMES;
      BoxDataService.update(data.id, data).then(() => {
		socketRef.current.emit('open-renting-box', data);
        ScooterDataService.getScooterWithUserId(apiUser.id) //renting-process-out
        .then(res => {
		    if(checkingForRenting){  //This information is necessary for whileRenting component.
				history.push({
				pathname: '/renting-process-out',  
				state: { 
					parking,
					boxId: data.id,
					stateParking: stateParking,
				}
			})
			} else {
				history.push({
					pathname: '/parking-process-in',
					state: {
						parking,
						boxId: data.id 
					}
			})
			}
		});
    });
    } catch (e) {
      console.log(e);
    }
  };

  const findAllBoxesInAParking = () => {
    // console.log("findAllBoxesInAParking")
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
    // console.log("cancelReservation")
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
    // console.log("refresh")

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
    // console.log("useEffect primero")
    // console.log(checkingForRenting)
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
      //console.log("return in useEffect")
      cancelCountdown();
    };

  }, []);

  useEffect(() => {
    //console.log("useEffect socket");
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
        // console.log("connection refreshed");
        refresh();
      }
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    //console.log("useEffect countdown")
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {

      // if (stateParking.reservation_time_left !== 0) return;  //Possible Stale Closure

      reservationInterval.current = setInterval(() => {

        try {
          const reservation_time_left = FIVE_MINUTES - (new Date().getTime() -
            new Date(stateParking.boxes[stateParking.boxReservedByThisUser].lastReservationDate).getTime()); //Possible Stale Closure

          if (reservation_time_left < 1000) {
            // //five minutes are over
            // cancelCountdown();


            // findAllBoxesInAParking().then((newState) => {
            //   setStateParking(s => ({
            //     ...s,
            //     boxes: newState.boxes,
            //     occupied: newState.occupied,
            //     reserved: newState.reserved,
            //     free: newState.free,
            //     boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
            //     reservation_time_left: 0
            //   }));

            //   socketRef.current.emit("something-changed", {
            //     who_changed_it: apiUser.id,
            //     parking_changed: parking.id
            //   })
            // });
            cancelReservation();
            return;
          }
          setStateParking(s => ({
            ...s,
            reservation_time_left
          }));
          // setStateReservation_time_left(reservation_time_left);
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
    //console.log("useEffect de geolocation")
    if (geolocation.latitude === 0 && geolocation.longitude === 0) {
      return;
    }

    // console.log("useEffect de geolocation después")

    let distanceToParkingNow = getDistanceFromLatLonInKm(geolocation.latitude, geolocation.longitude,
      stateParking.lat_parking, stateParking.long_parking);

    // console.log(geolocation.latitude)
    // console.log(geolocation.longitude)
    // console.log(stateParking.lat_parking)
    // console.log(stateParking.long_parking)
    // console.log(distanceToParkingNow)
    // console.log(distanceToParking)

    if ((Math.abs(distanceToParkingNow - distanceToParking)) < MINIMUM_DISTANCE_INCREMENT) return;

    setDistanceToParking(distanceToParkingNow);

  }, [geolocation.latitude, geolocation.longitude, stateParking.lat_parking, stateParking.long_parking]);

  useEffect(() => {
    // console.log("useEffect de openBoxPossible")
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
      {/* <Footer /> */}
    </>
  )
};

AvailabilityScreen.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default AvailabilityScreen;
