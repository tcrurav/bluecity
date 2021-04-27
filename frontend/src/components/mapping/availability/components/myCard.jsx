import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import MyCarHeader from './myCarHeader';
import MyCarImg from './myCarImg';
import MyMarker from './myMarker';
import MyColBoxes from './myColBoxes';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { THIS_USER_HAS_NO_RESERVATION } from '../constants/constants'

const MyCard = ({ parking, stateParking, findOutGreenRedOrOrange,
  stateOpenBoxPossible,
  openBox, cancelReservation, handleReservation, openRentingBox }) => {

  const { id, address, name } = parking;

  // console.log("myCard")
  // console.log(stateParking)

  return (
    <>
      <MyCarHeader
        address={address}
        name={name}
      />
      <MyCarImg id={id} />
      <Card.Body>
        <Card.Title>{stateParking.boxes.length} boxes in total</Card.Title>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color='red'
              state={stateParking.occupied}
              text='occupied'
              icon={faMapMarkerAlt}
            />
            <MyMarker
              color='green'
              state={stateParking.free}
              text='available'
              icon={faMapMarkerAlt}
            />
            <MyMarker
              color='orange'
              state={stateParking.reserved}
              text='reserved'
              icon={faMapMarkerAlt}
            />
            <br/>
            <p style={{backgroundColor: '#45FF63', width: '70%'}}>
              Solo quería decirte hola 😉
            </p>
          </Col>
          <Col>
            <Row>
              <MyColBoxes
                boxes={stateParking.boxes}
                findOutGreenRedOrOrange={findOutGreenRedOrOrange}
                handleReservation={handleReservation}
              />
            </Row>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col></Col>
          <Col>
            <Row>
              <Col>
                {
                  stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION
                    ?
                    <Button
                      variant="contained"
                      color='primary'
                      onClick={cancelReservation}
                    >
                      Cancel Reservation
                    </Button>
                    : <></>
                }
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                {
                  stateOpenBoxPossible
                    ?
                    <Button
                      block="true"
                      variant='outlined'
                      onClick={openBox}
                    >
                      Open box nº{stateParking.boxReservedByThisUser + 1} &gt;&gt;
                                        </Button>
                    : <></>
                }</Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </>

  )
};

MyCard.propTypes = {
  parking: PropTypes.object.isRequired,
  stateParking: PropTypes.object.isRequired,
  findOutGreenRedOrOrange: PropTypes.func.isRequired,
  stateOpenBoxPossible: PropTypes.bool.isRequired,
  openBox: PropTypes.func.isRequired,
  cancelReservation: PropTypes.func.isRequired,
  handleReservation: PropTypes.func.isRequired,
};

export default MyCard;