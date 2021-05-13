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
  RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED,
  RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED,
  NEITHER_PARKING_NOT_RENTING } from './constants/constants';

const RentingProcessScreen = ({ location, history, valores }) => {

  const { state: { parking, boxId, stateParking } } = location;

  const socketRef = useRef();

  const [stateRentingProcess, setStateRentingProcess] = useState( RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT );  //NEITHER_PARKING_NOT_RENTING

  const refreshBoxState = () => {
    console.log("refreshBoxState")

    BoxDataService.get(boxId).then((data) => {
      console.log("refreshBoxState after call to boxdataservice")
      console.log(boxId);
      setStateRentingProcess(
        data.data.state          
      );
    });
  }
  
  useEffect(() => {
    console.log("useEffect socket");
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);
	
	socketRef.current.on('renting-box-opened', () => {
      console.log('The box is opened');
      setStateRentingProcess(RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED)
      console.log("CAMBIADO EL ESTADO A:" + RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED)
    });

    socketRef.current.on('renting_charger_unplugged', () => {
        setStateRentingProcess(RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED)
        console.log("CAMBIADO EL ESTADO A:" + RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED)
    })

    socketRef.current.on('renting-box-closed-confirmed', () => {
      setStateRentingProcess(RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED)

      console.log('The box has been closed');
	  
	  history.push({
            pathname: '/while-renting',
            state: {  //Necessary information for while-renting
              parking,
			  boxes: stateParking.boxes,
			  long_parking: stateParking.long_parking,
			  lat_parking: stateParking.lat_parking,
			  boxReservedByThisUser: stateParking.boxReservedByThisUser,
              boxId: boxId   
            }
        });
    });

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
    console.log("useEffect primero");
    refreshBoxState();
  }, [stateRentingProcess]);

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
              stateRentingProcess === RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT 
                ?
                <MyMarker
                  color='blue'
                  state={null}
                  text='Waiting for the door to get open...'
                  icon={faInfoCircle}
                />
                : stateRentingProcess === RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ?
                  <MyMarker
                    color='blue'
                    state={null}
                    text='The door is open. Pull out your scooter and close the door.'
                    icon={faInfoCircle}
                  />
                  : stateRentingProcess === RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED ?
                  <MyMarker
                    color='blue'
                    state={null}
                    text='The charger is unplugged. You have pulled out your scotter.'
                    icon={faInfoCircle}
                  />
                  :
                  <MyMarker
                    color='blue'
                    state={null}
                    text='The door is closed. The scooter is all yours.'
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
