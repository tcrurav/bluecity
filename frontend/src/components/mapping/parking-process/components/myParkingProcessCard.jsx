import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components from Availability
|--------------------------------------------------
*/
import MyCarHeader from '../../availability/components/myCarHeader';
import MyCarImg from '../../availability/components/myCarImg';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row } from 'react-bootstrap';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { NO_ICON } from '../constants/constants';

const MyParkingProcessCard = ({ parking, stateParkingProcess }) => {

  const { id, address, name } = parking;

  // console.log("MyParkingProcessCard")

  return (
    <>
      <MyCarHeader
        address={address}
        name={name}
      />
      <MyCarImg id={id} />
      <Card.Body>
        <Card.Title>Parking process steps...</Card.Title>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={ stateParkingProcess >= PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ? 'green' : 'black'}
              state={null}
              text='Open box door'
              icon={ stateParkingProcess >= PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ? faCheckCircle : NO_ICON}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={ stateParkingProcess >= PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? 'green' : 'black'}
              state={null}
              text='Introduce scooter in box'
              icon={ stateParkingProcess >= PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? faCheckCircle : NO_ICON}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={ stateParkingProcess >= PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? 'green' : 'black'}
              state={null}
              text='Close box door'
              icon={ stateParkingProcess >= PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? faCheckCircle : NO_ICON}
            />
          </Col>
        </Row>
      </Card.Body>
    </>

  )
};

MyCard.propTypes = {
  parking: PropTypes.object.isRequired,
  stateParkingProcess: PropTypes.number.isRequired,
};

export default MyCard;