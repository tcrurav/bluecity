//ATENTION: THIS FILE COULD/SHOULD BE MERGED WITH AvailabilityScreen.jsx IN THE FUTURE
//          NOW IT'S JUST A WAY TO WORK IN A MORE UNDERSTANDABLE WAY

import React, { useState, useEffect, useRef } from 'react';
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
import MyRentingProcessCard from './components/myRentingProcessCard';
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
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  RENTING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED,
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED,
  NEITHER_PARKING_NOT_RENTING } from './constants/constants';

const RentingProcessScreen = ({ location, history }) => {

  const { state: { parking, boxId } } = location;

  const socketRef = useRef();

  const [stateRentingProcess, setStateRentingProcess] = useState( NEITHER_PARKING_NOT_RENTING );

  const refreshBoxState = () => {
    console.log("refreshBoxState")

    BoxDataService.get(boxId).then((data) => {
      console.log("refreshBoxState after call to boxdataservice")
      //console.log(boxId);
      //console.log(data);
      //console.log(data.data.state);
      setStateRentingProcess(
        data.data.state
      );
    });
  }

  useEffect(() => {
    console.log("useEffect primero");
    refreshBoxState();
  }, []);

  useEffect(() => {
    console.log("useEffect socket");
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL); // Port 4000

    socketRef.current.on('welcome', () => {
      console.log('connected to backend');
    });

    socketRef.current.emit("open-box", {id: boxId});

    socketRef.current.on('box-opened', () => {
      console.log('The box is opened');
      setStateRentingProcess(RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED)
    });

    socketRef.current.on('refresh-box-state', data => {
      if (data.boxId === boxId) {
        console.log("box state refreshed");
        refreshBoxState();
      }
    });

    socketRef.current.on('simulator-charger-connected', () => {
      setStateRentingProcess(RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED)

      console.log('Charger connected');
    });
	
	socketRef.current.on('box-closed-confirmed', (data) => {
      setStateRentingProcess(RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED)

      console.log('The box has been closed');
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
            <MyRentingProcessCard
              parking={parking}
              stateRentingProcess={stateRentingProcess}
            />
          </Card>
        </Row>
        <Row className='pt-3'>
          <Col>
            {
              stateRentingProcess === RENTING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT
                ?
                <MyMarker
                  color='blue'
                  state={null}
                  text='Waiting for the door to get open...'
                  icon={faInfoCircle}
                />
                : stateRentingProcess === RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ?
                  <MyMarker
                    color='blue'
                    state={null}
                    text='The door is open. Introduce your scooter and close the door.'
                    icon={faInfoCircle}
                  />
                  : stateRentingProcess === RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED ?
				  <MyMarker
                    color='blue'
                    state={null}
                    text='The door is open and the scooter is plugged. Close the door.'
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

RentingProcessScreen.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default RentingProcessScreen;
