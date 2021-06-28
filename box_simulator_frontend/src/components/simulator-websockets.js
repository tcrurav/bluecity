import React, { useState, useEffect, useRef } from 'react';

import { Row, Col, Container, Button } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';

const BOX_CLOSED = 0;
const BOX_OPENED = 1;
const PLUGGED_IN = 2;
const UNPLUGGED = 3;

const SIMULATED_BOX_ID = 22 // Box nº1 in Museo Elder
const SIMULATED_PARKING_ID = 8 // Parking in Museo Elder

const SimulatorWebsockets = () => {
  const [stateBox, setStateBox] = useState(BOX_CLOSED);
  const [isRenting, setIsRenting] = useState(false)
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('simulator-welcome', () => {
      console.log('connected to box backend');
    });

    socketRef.current.on('simulator-open-box-renting-in', data => {
      setIsRenting(true)
      console.log("simulator-open-box in simulator frontend")
      if (parseInt(data.boxId) === SIMULATED_BOX_ID) {
        setStateBox(BOX_OPENED);

        socketRef.current.emit('simulator-open-box-confirmed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID });
      }
    });

    socketRef.current.on('simulator-open-box-renting-out', data => {
      setIsRenting(true)
      console.log("simulator-open-renting-box out simulator frontend")
      if (parseInt(data.boxId) === SIMULATED_BOX_ID) {
        setStateBox(BOX_OPENED);

        socketRef.current.emit('simulator-open-renting-box-confirmed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID });
      }
    });

    socketRef.current.on('simulator-open-box-parking-in', data => {
      setIsRenting(false)
      console.log("simulator-open-parking-box in simulator frontend")
      if (parseInt(data.boxId) === SIMULATED_BOX_ID) {
        setStateBox(BOX_OPENED);

        socketRef.current.emit('simulator-open-box-parking-in-confirmed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID });
      }
    });

    socketRef.current.on('simulator-open-box-parking-out', data => {
      setIsRenting(false)
      console.log("simulator-open-parking-box out simulator frontend")
      if (parseInt(data.boxId) === SIMULATED_BOX_ID) {
        setStateBox(BOX_OPENED);

        socketRef.current.emit('simulator-open-box-parking-out-confirmed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID });
      }
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  /* Renting pulling scooter in */
  const RentingPlugScooter = () => {
    setStateBox(PLUGGED_IN);

    socketRef.current.emit('simulator-charger-connected', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: true });
  }
  const closeBoxRentingIn = () => {
    setStateBox(BOX_CLOSED);

    socketRef.current.emit('simulator-box-closed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: stateBox });
  }

  /* Renting pulling scooter out */
  const closeBoxRentingOut = () => {
    setStateBox(BOX_CLOSED);

    socketRef.current.emit('simulator-renting-box-closed', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: false });
  }


  const RentingUnPlug = () => {
    setStateBox(UNPLUGGED);

    socketRef.current.emit('simulator-renting-scooter-charger-unplugged', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: false });
  }

  /* Parking pulling scooter in */
  const plugScooterParkingIn = () => {
    setStateBox(PLUGGED_IN);

    socketRef.current.emit('simulator-charger-connected-parking-in', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: true });
  }
  const closeBoxParkingIn = () => {
    setStateBox(BOX_CLOSED);

    socketRef.current.emit('simulator-box-closed-parking-in', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: stateBox });
  }


  /* Parking pulling scooter out */
  const unplugParkingOut = () => {
    setStateBox(UNPLUGGED);

    socketRef.current.emit('simulator-charger-unplugged-parking-out', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: false });
  }

  const closeBoxParkingOut = () => {
    setStateBox(BOX_CLOSED);

    socketRef.current.emit('simulator-box-closed-parking-out', { parkingId: SIMULATED_PARKING_ID, boxId: SIMULATED_BOX_ID, chargerState: false });
  }

  return (
    <>
      {isRenting ?
        <Container>
          <Row>
            <Col>
              <h1>Renting process</h1>
              <h2>Box Id: {SIMULATED_BOX_ID}</h2>
              <p>Door {stateBox === BOX_CLOSED ? 'closed' : 'opened'}</p>
            </Col>
            <Col>
              <p>(In case you are pulling out the scooter) </p>
              <Button onClick={RentingUnPlug}>Unplug</Button>
              {stateBox >= BOX_OPENED ? <Button onClick={closeBoxRentingOut}>Close Door</Button> : <></>}
              <br />
              <br />
              <p> (In case you are pulling in the scooter) </p>
              <button onClick={RentingPlugScooter}>Plug Scooter</button>
              {stateBox >= BOX_OPENED ? <Button onClick={closeBoxRentingIn}>Close Door</Button> : <></>}
            </Col>
          </Row>
        </Container>
        :
        <Container>
          <Row>
            <Col>
              <h1>Parking process</h1>
              <h2>Box Id: {SIMULATED_BOX_ID}</h2>
              <p>Door {stateBox === BOX_CLOSED ? 'closed' : 'opened'}</p>
            </Col>
            <Col>
              <p>(In case you are pulling out the scooter) </p>
              <Button onClick={unplugParkingOut}>Unplug</Button>
              {stateBox >= BOX_OPENED ? <Button onClick={closeBoxParkingOut}>Close Door</Button> : <></>}
              <br />
              <br />
              <p> (In case you are pulling in the scooter) </p>
              <button onClick={plugScooterParkingIn}>Plug Scooter</button>
              {stateBox >= BOX_OPENED ? <Button onClick={closeBoxParkingIn}>Close Door</Button> : <></>}
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default SimulatorWebsockets;