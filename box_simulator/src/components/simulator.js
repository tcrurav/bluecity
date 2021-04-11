import React, { useState, useEffect, useRef } from 'react';

import { Row, Col, Container, Button } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
// import boxService from '../services/box.service';

// const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED = 12;
// const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED = 13;

const BOX_CLOSED = 0;
const BOX_OPENED = 1;

const SIMULATED_BOX_ID = 2 // Box nº2 in Telde

const Simulator = () => {
  const [stateBox, setStateBox] = useState(BOX_CLOSED);

  const socketRef = useRef();

  useEffect(() => {
    console.log("useEffect socket");
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('welcome', () => {
      console.log('connected to backend');
    });

    socketRef.current.on('open-box', data => {
      if (data.boxId === SIMULATED_BOX_ID) {
        setStateBox(BOX_OPENED);

        // boxService.update(SIMULATED_BOX_ID, { state: PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED }).then(() => {
          socketRef.current.emit('open-box-confirmed', { boxId: SIMULATED_BOX_ID });
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
      socketRef.current.emit('close-box-confirmed', { boxId: SIMULATED_BOX_ID });
    // });
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Box Id: {SIMULATED_BOX_ID}</h1>
            <p>Door {stateBox === BOX_CLOSED ? 'closed' : 'opened'}</p>
          </Col>
          <Col>
            {stateBox === BOX_OPENED ? <Button onClick={closeBox}>Close Door</Button> : <></>}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Simulator;