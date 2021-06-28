import React, { useState, useEffect, useRef } from 'react';

import { Row, Col, Container, Button } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';

//const SIMULATED_BOX_ID = 1 // Box nº1 in Museo Elder
//const SIMULATED_PARKING_ID = 8 // Parking in Museo Elder

const SimulatorOPCUA = () => {
  const [plcOpenBoxConfirmed1, setPlcOpenBoxConfirmed1] = useState(0);
  const [plcOpenBoxConfirmed2, setPlcOpenBoxConfirmed2] = useState(0);
  const [plcOpenBoxConfirmed3, setPlcOpenBoxConfirmed3] = useState(0);
  const [plcDetector1, setPlcDetector1] = useState(0);
  const [plcDetector2, setPlcDetector2] = useState(0);
  const [plcDetector3, setPlcDetector3] = useState(1); // Este es para alquilar

  const [plcBoxId, setPlcBoxId] = useState(0);
  const [plcOpenBox, setPlcOpenBox] = useState(0);
  const [plcCloseBox, setPlcCloseBox] = useState(0);
  const [plcReserve, setPlcReserve] = useState(0);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('simulator-welcome', () => {
      console.log('connected to box backend');
    });

    socketRef.current.on('simulator-write-to-plc', data => {
      console.log("simulator-write-to-plc")
      //if (parseInt(data.plcBoxId) === SIMULATED_BOX_ID) {
        setPlcBoxId(data.plcBoxId);
        setPlcOpenBox(data.plcOpenBox);
        setPlcCloseBox(data.plcCloseBox);
        setPlcReserve(data.plcReserve);
      //}
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  const resetReceivingVariables = () => {
    setPlcOpenBox(0);
    setPlcCloseBox(0);
  }

  useEffect(() => {
    if (plcOpenBox === 1 && plcCloseBox === 0) {
      switch (plcBoxId) {
        case 1: setPlcOpenBoxConfirmed1(1);
          break;
        case 2: setPlcOpenBoxConfirmed2(1);
          break;
        case 3: setPlcOpenBoxConfirmed3(1);
          break;
        default:
          break;
      }
      resetReceivingVariables();
    }

  }, [plcOpenBox, plcCloseBox]);

  useEffect(() => {
    somethingChanged();
  }, [plcOpenBoxConfirmed1, plcOpenBoxConfirmed2, plcOpenBoxConfirmed3, 
    plcDetector1, plcDetector2, plcDetector3]);

  const closeDoor = (boxId) => {
    switch (boxId) {
      case 1: setPlcOpenBoxConfirmed1(0);
        break;
      case 2: setPlcOpenBoxConfirmed2(0);
        break;
      case 3: setPlcOpenBoxConfirmed3(0);
        break;
      default:
        break;
    }
  }

  const pullScooterOut = (boxId) => {
    switch (boxId) {
      case 1: setPlcDetector1(0);
        break;
      case 2: setPlcDetector2(0);
        break;
      case 3: setPlcDetector3(0);
        break;
      default:
        break;
    }
  }

  const pullScooterIn = (boxId) => {
    switch (boxId) {
      case 1: setPlcDetector1(1);
        break;
      case 2: setPlcDetector2(1);
        break;
      case 3: setPlcDetector3(1);
        break;
      default:
        break;
    }
  }

  const somethingChanged = () => {
    console.log("somethingChanged")
    socketRef.current.emit('simulator-read-from-plc', [{
      value: {
        value: plcOpenBoxConfirmed1
      }
    }, {
      value: {
        value: plcOpenBoxConfirmed2
      }
    }, {
      value: {
        value: plcOpenBoxConfirmed3
      }
    }, {
      value: {
        value: plcDetector1
      }
    }, {
      value: {
        value: plcDetector2
      }
    }, {
      value: {
        value: plcDetector3
      }
    }]);
  }

  return (
    <>
      <Container>
        <Row>
          <Col>plcOpenBoxConfirmed1: {plcOpenBoxConfirmed1}</Col>
          <Col>{plcOpenBoxConfirmed1 ? <Button onClick={() => closeDoor(1)}>close door</Button> : <></>}</Col>
        </Row>
        <Row>
          <Col>plcOpenBoxConfirmed2: {plcOpenBoxConfirmed2}</Col>
          <Col>{plcOpenBoxConfirmed2 ? <Button onClick={() => closeDoor(2)}>close door</Button> : <></>}</Col>
        </Row>
        <Row>
          <Col>plcOpenBoxConfirmed3: {plcOpenBoxConfirmed3}</Col>
          <Col>{plcOpenBoxConfirmed3 ? <Button onClick={() => closeDoor(3)}>close door</Button> : <></>}</Col>
        </Row>
        <Row>
          <Col>plcDetector1: {plcDetector1}</Col>
          <Col>{plcOpenBoxConfirmed1 ?
            (
              plcDetector1 ?
                <Button onClick={() => pullScooterOut(1)}>pull scooter out</Button>
                :
                <Button onClick={() => pullScooterIn(1)}>pull scooter in</Button>
            )
            :
            <></>
          }
          </Col>
        </Row>
        <Row>
          <Col>plcDetector2: {plcDetector2}</Col>
          <Col>{plcOpenBoxConfirmed2 ?
            (
              plcDetector2 ?
                <Button onClick={() => pullScooterOut(2)}>pull scooter out</Button>
                :
                <Button onClick={() => pullScooterIn(2)}>pull scooter in</Button>
            )
            :
            <></>
          }
          </Col>
        </Row>
        <Row>
          <Col>plcDetector3: {plcDetector3}</Col>
          <Col>{plcOpenBoxConfirmed3 ?
            (
              plcDetector3 ?
                <Button onClick={() => pullScooterOut(3)}>pull scooter out</Button>
                :
                <Button onClick={() => pullScooterIn(3)}>pull scooter in</Button>
            )
            :
            <></>
          }
          </Col>
        </Row>

        <Row>
          <Col>plcBoxId: {plcBoxId}</Col>
        </Row>
        <Row>
          <Col>plcOpenBox: {plcOpenBox}</Col>
        </Row>
        <Row>
          <Col>plcCloseBox: {plcCloseBox}</Col>
        </Row>
        <Row>
          <Col>plcReserve: {plcReserve}</Col>
        </Row>

      </Container>
    </>
  )
}

export default SimulatorOPCUA;