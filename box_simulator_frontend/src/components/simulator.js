import React, { useState, useEffect, useRef } from 'react';

import { Row, Col, Container, Button } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
// import boxService from '../services/box.service';

// const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED = 12;
// const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED = 13;

const BOX_CLOSED = 1;
const BOX_OPENED = 2;
const CHARGER_PLUGGED_OUT= 3;
const CHARGER_PLUGGED_IN= 4;





const SIMULATED_BOX_ID = 14 // Box nº2 in Telde
const SIMULATED_PARKING_ID = 3 // Parking in Telde

const Simulator = () => {
  const [stateBox, setStateBox] = useState(BOX_CLOSED);
  const [stateCharger, setStateCharger]= useState(CHARGER_PLUGGED_OUT);

  const socketRef = useRef();

  useEffect(() => {
    console.log("useEffect socket");
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('simulator-welcome', () => {
      console.log('connected to box backend');
    });

    socketRef.current.on('simulator-open-box', data => {
      console.log("simulator-open-box in simulator frontend")
      console.log(data)
      if (parseInt(data.boxId) === SIMULATED_BOX_ID) {
        setStateBox(BOX_OPENED);

        // boxService.update(SIMULATED_BOX_ID, { state: PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED }).then(() => {
          socketRef.current.emit('simulator-open-box-confirmed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID });
        // });
      }
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  const closeBox = () => {
    setStateBox(BOX_CLOSED);

    // boxService.update(SIMULATED_BOX_ID, { state: PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED }).then(() => {
      socketRef.current.emit('simulator-box-closed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: stateCharger });
    // });
  }

  const plugChargerIn = () => {
    setStateCharger(CHARGER_PLUGGED_IN);

    // boxService.update(SIMULATED_BOX_ID, { state: PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED }).then(() => {
      socketRef.current.emit('simulator-charger-plugged-in', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: stateCharger });
    // });
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Box Id: {SIMULATED_BOX_ID}</h1>
            <p>Door {stateBox === BOX_CLOSED ? 'closed' : 'opened'}</p>
            <p>Charger {stateCharger === CHARGER_PLUGGED_OUT ? 'plugged out' : 'plugged in'}</p>
          </Col>
          <Col>
            {stateCharger === CHARGER_PLUGGED_OUT && stateBox === BOX_OPENED ? <Button onClick={plugChargerIn}>Plug the Charger in</Button> : <></>}
          </Col>
           <Col>
            {stateBox === BOX_OPENED && stateCharger === CHARGER_PLUGGED_IN ? <Button onClick={closeBox}>Close Door</Button> : <></>}
          </Col>
         
        </Row>
      </Container>
    </>
  )
}

export default Simulator;