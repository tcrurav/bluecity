import React, { useState, useEffect, useRef } from 'react';

import { Row, Col, Container, Button } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
// import boxService from '../services/box.service';

// const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED = 12;
// const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED = 13;

const BOX_CLOSED = 0;
const BOX_OPENED = 1;
const PLUGGED_IN = 2;
const UNPLUGGED = 3;

const SIMULATED_BOX_ID = 2 // Box nº2 in Telde
const SIMULATED_PARKING_ID = 1 // Parking in Telde

const Simulator = () => {
  const [stateBox, setStateBox] = useState(BOX_CLOSED);
  const [stateCharger, setStateCharger] = useState(PLUGGED_IN);
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

    socketRef.current.on('simulator-open-renting-box', data => {
      console.log("simulator-open-renting-box in simulator frontend")
      console.log(data)
      if (parseInt(data.boxId) === SIMULATED_BOX_ID) {
        setStateBox(BOX_OPENED);

        // boxService.update(SIMULATED_BOX_ID, { state: PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED }).then(() => {
        socketRef.current.emit('simulator-open-renting-box-confirmed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID });
        // });
      }
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  /* Renting pulling scooter in */
  const plugScooter = () => {
    setStateBox(PLUGGED_IN);

    socketRef.current.emit('simulator-charger-connected', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: true });
  }
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
    socketRef.current.emit('simulator-box-closed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: true });
  }

  /* Renting pulling scooter out */
  const closeBox2 = () => {
    setStateBox(BOX_CLOSED);

    socketRef.current.emit('simulator-renting-box-closed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: false });
  }


  const unplug = () => {
    setStateCharger(UNPLUGGED);

    socketRef.current.emit('simulator-renting-scooter-charger-unplugged', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: false });
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
            <p>(In case you are pulling out the scooter) </p>
            <Button onClick={unplug}>Unplug</Button>
            {stateBox >= BOX_OPENED ? <Button onClick={closeBox2}>Close Door</Button> : <></>}
            <br />
            <br />
            <p> (In case you are pulling in the scooter) </p>
            <button onClick={plugScooter}>Plug Scooter</button>
            {stateBox >= BOX_OPENED ? <Button onClick={closeBox}>Close Door</Button> : <></>}
          </Col>

        </Row>
      </Container>
    </>
  )
}

export default Simulator;