import React, { useState, useEffect, useRef } from 'react';

import { Row, Col, Container, Button } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
// import boxService from '../services/box.service';

// const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED = 12;
// const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED = 13;

const BOX_CLOSED = 0;
const BOX_OPENED = 1;
const SCOOTER_PLUGGED = 2;

const SIMULATED_BOX_ID = 4 // Box nº2 in Telde
const SIMULATED_PARKING_ID = 1 // Parking in Telde

const Simulator = () => {
  const [stateBox, setStateBox] = useState(BOX_CLOSED);

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

  const plugScooter = () =>{
    setStateBox(SCOOTER_PLUGGED); 
	
	socketRef.current.emit('simulator-charger-connected', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: true });
  }
  const closeBox = () => {
    setStateBox(BOX_CLOSED);

    // boxService.update(SIMULATED_BOX_ID, { state: PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED }).then(() => {
    socketRef.current.emit('simulator-box-closed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: true });
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
            {stateBox >= BOX_OPENED ? <Button onClick={closeBox}>Close Door</Button> : <></>}
          </Col>
          <Col>
          {
              stateBox === BOX_OPENED ?
                <button onClick={plugScooter}>Plug Scooter</button>
              :
				<p> The charger might be connected I guess </p>
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Simulator;