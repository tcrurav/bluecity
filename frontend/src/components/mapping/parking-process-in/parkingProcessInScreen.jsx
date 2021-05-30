//ATENTION: THIS FILE COULD/SHOULD BE MERGED WITH AvailabilityScreen.jsx IN THE FUTURE
//          NOW IT'S JUST A WAY TO WORK IN A MORE UNDERSTANDABLE WAY

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { useTranslation } from 'react-i18next';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../../ui/navbar/my-navbar';
import { MyContainer } from '../../ui/my-container';
import MyParkingProcessInCard from './components/myParkingProcessInCard';
import MyMarker from '../availability/components/myMarker';

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

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import {
  PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  PARKING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED,
  PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED,
  NEITHER_PARKING_NOT_RENTING
} from '../constants/constants';
import { BEGIN_OF_TIMES } from '../availability/constants/constants';

const ParkingProcessInScreen = ({ location, history }) => {

  const { state: { parking, boxId } } = location;

  const { t } = useTranslation();

  const socketRef = useRef();

  const [stateParkingProcess, setStateParkingProcess] = useState(NEITHER_PARKING_NOT_RENTING);

  const openBoxTimeout = useRef(null);

  const [noResponseFromParkingDevice, setNoResposeFromParkingDevice] = useState(false);

  const refreshBoxState = () => {
    console.log("refreshBoxState")

    BoxDataService.get(boxId).then((data) => {
      setStateParkingProcess(
        data.data.state
      );
    });
  }

  useEffect(() => {
    refreshBoxState();
  }, []);

  useEffect(() => {
    if (stateParkingProcess === PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED) {
      history.push({
        pathname: "/while-parking",
        state: {
          parking,
          boxId: boxId
        },
      });
    }
  }, [stateParkingProcess]);

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('welcome', () => {
      console.log('connected to backend');
    });

    socketRef.current.on('refresh-box-state', data => {
      if (data.boxId === boxId) {
        console.log("box state refreshed");
        refreshBoxState();
      }
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  const continueWithProcess = () => {
    const boxData = {
      state: NEITHER_PARKING_NOT_RENTING,
      lastReservationDate: BEGIN_OF_TIMES,
      userId: null
    };
    BoxDataService.update(boxId, boxData).then(data => {
      history.push({
        pathname: "/main"
      })
    });
  }

  useEffect(() => {
    openBoxTimeout.current = setTimeout(function () {
      BoxDataService.get(boxId).then(data => {
        if (data.data.state === NEITHER_PARKING_NOT_RENTING ||
          data.data.state === PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT) {
          setNoResposeFromParkingDevice(true);
        }
      });
    }, 15000);

    return () => {
      if (openBoxTimeout.current !== null) clearTimeout(openBoxTimeout.current);
    }
  }, []);

  return (
    <>
      <MyNavbar history={history} />
      <MyContainer>
        <Row>
          <Card className='m-2'>
            <MyParkingProcessInCard
              parking={parking}
              stateParkingProcess={stateParkingProcess}
              noResponseFromParkingDevice={noResponseFromParkingDevice}
              continueWithProcess={continueWithProcess}
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
                  text={t('Waiting for the door to get open...')}
                  icon={faInfoCircle}
                />
                : stateParkingProcess === PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ?
                  <MyMarker
                    color='blue'
                    state={null}
                    text={t('The door is opened. Please, introduce your scooter and plug the charger in.')}
                    icon={faInfoCircle}
                  />
                  : stateParkingProcess === PARKING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED ?
                    <MyMarker
                      color='blue'
                      state={null}
                      text={t('The scooter is in the box. Please, close the door.')}
                      icon={faInfoCircle}
                    />
                    :
                    <>
                      <MyMarker
                        color='blue'
                        state={null}
                        text={t('The door is closed. The parking process is complete.')}
                        icon={faInfoCircle}
                      />
                    </>
            }
          </Col>
        </Row>
      </MyContainer>
    </>
  )
};

ParkingProcessInScreen.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default ParkingProcessInScreen;
