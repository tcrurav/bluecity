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
import MyRentingProcessOutCard from './components/myRentingProcessOutCard';
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
import ScooterDataService from '../../../services/scooter.service';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import {
  RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED,
  RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED
} from '../constants/constants';
import { BEGIN_OF_TIMES, getApiUser, NEITHER_PARKING_NOT_RENTING } from '../availability/constants/constants';

const RentingProcessScreen = ({ location, history }) => {

  const { state: { parking, boxId } } = location;

  const { t } = useTranslation();

  const socketRef = useRef();

  const [stateRentingProcess, setStateRentingProcess] = useState(RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT);  //NEITHER_PARKING_NOT_RENTING

  const openBoxTimeout = useRef(null);

  const [noResponseFromParkingDevice, setNoResposeFromParkingDevice] = useState(false);

  const refreshBoxState = () => {
    BoxDataService.get(boxId).then((data) => {
      setStateRentingProcess(
        data.data.state
      );
    });
  }

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

  useEffect(() => {
    refreshBoxState();
  }, []);

  useEffect(() => {
    if (stateRentingProcess === RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED) {
      ScooterDataService.getScooterWithBoxId(boxId).then(data => {
        const scooterData = {
          userId: getApiUser().id,
          lastReservationDate: new Date(),
          boxId: null
        }
        ScooterDataService.update(data.data.id, scooterData).then(data => {
          const boxData = {
            userId: null,
            lastReservationDate: BEGIN_OF_TIMES,
            state: NEITHER_PARKING_NOT_RENTING,
            occupied: false
          };
          BoxDataService.update(boxId, boxData).then(data => {
            history.push({
              pathname: '/while-renting',
            });
          })
        })
      })
    }
  }, [stateRentingProcess]);

  const continueWithProcess = () => {
    const boxData = {
      state: 0,
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
        if (data.data.state == NEITHER_PARKING_NOT_RENTING ||
          data.data.state == RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT) {
          setNoResposeFromParkingDevice(true);
        }
      })
    }, 15000);

    return () => {
      if (openBoxTimeout.current != null) clearTimeout(openBoxTimeout.current);
    }
  }, []);

  return (
    <>
      <MyNavbar history={history} />
      <MyContainer>
        <Row>
          <Card className='m-2'>
            <MyRentingProcessOutCard
              parking={parking}
              stateRentingProcess={stateRentingProcess}
              noResponseFromParkingDevice={noResponseFromParkingDevice}
              continueWithProcess={continueWithProcess}
            />
          </Card>
        </Row>
        <Row className='pt-3'>
          <Col>
            {
              stateRentingProcess === RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT
                ?
                <MyMarker
                  color='blue'
                  state={null}
                  text={t('Waiting for the door to get open...')}
                  icon={faInfoCircle}
                />
                : stateRentingProcess === RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ?
                  <MyMarker
                    color='blue'
                    state={null}
                    text={t('The door is opened. Pull out your scooter and close the door.')}
                    icon={faInfoCircle}
                  />
                  : stateRentingProcess === RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED ?
                    <MyMarker
                      color='blue'
                      state={null}
                      text={t('You have pulled out your scooter. Close the door.')}
                      icon={faInfoCircle}
                    />
                    :
                    <MyMarker
                      color='blue'
                      state={null}
                      text={t('The door is closed. Enjoy the rented scooter.')}
                      icon={faInfoCircle}
                    />
            }
          </Col>
        </Row>
      </MyContainer>
    </>
  )
};

RentingProcessScreen.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default RentingProcessScreen;