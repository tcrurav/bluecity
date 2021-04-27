import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components from Availability
|--------------------------------------------------
*/
import MyCarHeader from '../../availability/components/myCarHeader';
import MyCarImg from '../../availability/components/myCarImg';
import MyMarker from '../../availability/components/myMarker';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row } from 'react-bootstrap';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { 
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,  // 26
  RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED, //27
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED, // 28
} 
from '../constants/constants';

const MyRentingProcessCard = ({ parking, stateRentingProcess }) => {

  const { id, address, name } = parking;

  return (
    <>
      <MyCarHeader
        address={address}
        name={name}
      />
      <MyCarImg id={id} />
      <Card.Body>
        <Card.Title>Renting process steps...</Card.Title>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={ stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ? 'green' : 'red'}
              state={null}
              text='Open box door'
              icon={ stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={ stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED ? 'green' : 'red'}
              state={null}
              text='Introduce scooter in box'
              icon={ stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={ stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED  ? 'green' : 'red'}
              state={null}
              text='Plug the wires'
              icon={ stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={ stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? 'green' : 'red'}
              state={null}
              text='Close box door'
              icon={ stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={ stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? 'green' : 'red'}
              state={null}
              text='Smile'
              icon={ stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
            />
          </Col>
        </Row>
      </Card.Body>
    </>

  )
};

MyRentingProcessCard.propTypes = {
  parking: PropTypes.object.isRequired,
  stateRentingProcess: PropTypes.number.isRequired,
};

export default MyRentingProcessCard;