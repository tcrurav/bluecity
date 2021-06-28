import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { Footer } from '../../ui/footer';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../../ui/navbar/my-navbar';
import { MyContainer } from '../../ui/my-container';
import MyCarHeader from '../availability/components/myCarHeader';
import MyCarImg from '../availability/components/myCarImg';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from 'react-bootstrap';
import Button from "@material-ui/core/Button";

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import BoxDataService from '../../../services/box.service';
import ParkingDataService from '../../../services/parking.service';
import { useGeolocation } from '../../geolocation/geolocation';
import { getDistanceFromLatLonInKm, getDistanceToOpenBox } from '../../../utils/common';
import { formatTimeLeft } from '../availability/utils/util';

import {
  THIS_USER_HAS_NO_RESERVATION,
  MINIMUM_DISTANCE_INCREMENT,
} from '../availability/constants/constants.js';

import {
  PARKING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
} from '../constants/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10vh",
  },
  image: {
    maxWidth: "512px",
  },
  buttonContainer: {
    justify: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: "1vh",
    backgroundColor: "#00a9f4",
    "&:hover": {
      backgroundColor: "#007ac1",
      color: "white",
    },
  },
  margins: {
    marginTop: "1em",
    marginLeft: "1em",
    marginRight: "1em"
  },
  footer: {
    top: 0,
  },
}));

const WhileParking = ({ location, history }) => {

  const { state: { parking, boxId } } = location;

  const { t } = useTranslation();

  const socketRef = useRef();

  const reservationInterval = useRef(null);

  const { id, address, name } = parking;

  let [geolocation, geolocationAvailability] = useGeolocation();
  const [distanceToParking, setDistanceToParking] = useState(0);
  const [stateOpenBoxPossible, setStateOpenBoxPossible] = useState(false);

  const [stateParking, setStateParking] = useState(
    {
      reservation_time_left: 0,
      lastReservationDate: null,
      boxReservedByThisUser: 0,
      lat_parking: 0,
      long_parking: 0,
      boxes: [],
    }
  );

  const classes = useStyles();

  const cancelCountdown = () => (reservationInterval.current !== null) && clearInterval(reservationInterval.current);

  const getNecessaryData = () => {
    ParkingDataService.get(id).then((data) => {
      setStateParking(s => ({
        ...s,
        lat_parking: data.data.lat,
        long_parking: data.data.long,
      }));
    });

    BoxDataService.getAllBoxesInAParking(id).then((data) => {
      setStateParking(s => ({
        ...s,
        boxes: data.data
      }));
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].id === boxId) {
          setStateParking(s => ({
            ...s,
            boxReservedByThisUser: i
          }));
          return;
        }
      }
    });

    BoxDataService.get(boxId).then((data) => {
      const lastReservation = new Date(data.data.lastReservationDate).getTime();
      setStateParking(s => ({
        ...s,
        lastReservationDate: lastReservation
      }));
    });
  }

  const goToParkingProcessOut = () => {
    try {
      let index = stateParking.boxReservedByThisUser;
      let data = stateParking.boxes[index];
      data.state = PARKING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT;
      BoxDataService.update(data.id, data).then(() => {
        socketRef.current.emit('open-box-parking-in', data);
        history.push({
          pathname: '/parking-process-out',
          state: {
            parking,
            boxId: boxId
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log("useEffect socket");
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('welcome', () => {
      console.log('connected to backend');

    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    getNecessaryData(); //Necessary

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

  useEffect(() => {
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
      reservationInterval.current = setInterval(() => {
        try {
          let reservation_time_left = 1;
          if (stateParking.lastReservationDate !== null) {
            reservation_time_left = new Date().getTime() - stateParking.lastReservationDate;
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
  }, [stateParking.boxReservedByThisUser, stateParking.reservation_time_left]); //Necessary change

  return (
    <>
      <MyNavbar history={history} />
      <MyContainer>
        <Row>
          <Col sm={8} xs={12}>
            <MyCarHeader address={address} name={name} />
            <MyCarImg id={parking.id} />
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 12, offset: 0 }}>
            <div className={classes.margins}>
              <FontAwesomeIcon icon={faInfoCircle} color="blue" />{` ${t('You have parked your scooter in')} ${name}.`}<br />
              <FontAwesomeIcon icon={faInfoCircle} color="blue" />{` ${t('You parked it')} ${formatTimeLeft(stateParking.reservation_time_left.valueOf())} ${t('minutes ago')}.`}<br />
              <FontAwesomeIcon icon={faInfoCircle} color="blue" />{` ${t('Distance to parking')}: ${distanceToParking.toFixed(2)} km.`}

              {stateOpenBoxPossible ?
                <div>
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} color="blue" />{` ${t('You can take your scooter back')}.`}
                  </span>
                  <br /><br />
                  <div className="text-center">
                    <Button
                      variant="contained"
                      className={classes.buttons}
                      onClick={goToParkingProcessOut}>{t('Open box')}</Button>
                  </div>
                </div>
                :
                <div>
                  <FontAwesomeIcon icon={faInfoCircle} color="blue" />{` ${t('You are too far from the parking to open the door')}.`}
                </div>
              }
            </div>
          </Col>
        </Row>
      </MyContainer>
      <Footer />
    </>
  )
};

WhileParking.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default WhileParking;
