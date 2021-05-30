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
import MyParkingProcessOutCard from './components/myParkingProcessOutCard';
import MyMarker from '../availability/components/myMarker';
import { BEGIN_OF_TIMES } from '../../mapping/availability/constants/constants';

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
  PARKING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED,
  PARKING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  PARKING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  NEITHER_PARKING_NOT_RENTING
} from '../constants/constants';

const ParkingProcessOutScreen = ({ location, history }) => {

  const { state: { parking, boxId } } = location;

  const { t } = useTranslation();

  const socketRef = useRef();

  const [stateParkingProcess, setStateParkingProcess] = useState(NEITHER_PARKING_NOT_RENTING);

  const continueWithProcess = () => {
    const data = {
      state: 0,
      lastReservationDate: BEGIN_OF_TIMES,
      occupied: false,
      userId: null
    }
    BoxDataService.update(boxId, data).then((res) => {
      history.push("/main")
    }).catch((error) => console.log(error));
  }

  const refreshBoxState = () => {
    console.log("refreshBoxState")

    BoxDataService.get(boxId).then((data) => {
      console.log("refreshBoxState after call to boxdataservice")
      setStateParkingProcess(
        data.data.state
      );
    });
  }

  useEffect(() => {
    refreshBoxState();
  }, []);

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

  return (
    <>
        <MyNavbar history={history} />
        <MyContainer>
          <Row>
            <Card className='m-2'>
              <MyParkingProcessOutCard
                parking={parking}
                stateParkingProcess={stateParkingProcess}
                continueWithProcess={continueWithProcess}
              />
            </Card>
          </Row>
          <Row className='pt-3'>
            <Col>
              {
                stateParkingProcess === PARKING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT
                  ?
                  <MyMarker
                    color='blue'
                    state={null}
                    text={t('Waiting for the door to get open...')}
                    icon={faInfoCircle}
                  />
                  : stateParkingProcess === PARKING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ?
                    <MyMarker
                      color='blue'
                      state={null}
                      text={t('The door is opened. Please, pull out your scooter and unplug the charger.')}
                      icon={faInfoCircle}
                    />
                    : stateParkingProcess === PARKING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED ?
                      <MyMarker
                        color='blue'
                        state={null}
                        text={t('You have pulled your scooter out. Please, close the door.')}
                        icon={faInfoCircle}
                      />
                      :
                      <MyMarker
                        color='blue'
                        state={null}
                        text={t('The door is closed. Thank you for using our service.')}
                        icon={faInfoCircle}
                      />
              }
            </Col>
          </Row>
        </MyContainer>
    </>
  )
};

ParkingProcessOutScreen.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default ParkingProcessOutScreen;
