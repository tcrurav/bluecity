import React from 'react';
import { useTranslation } from 'react-i18next';
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
import { styled } from '@material-ui/core/styles';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { THIS_USER_HAS_NO_RESERVATION } from '../constants/constants'

const MyImgOverlay = styled(Card.ImgOverlay)({
  backgroundColor: 'rgba(211, 211, 211, 0.8)',
  width: '15em',
  height: '9em',
  marginLeft: '0.5em',
  marginTop: '0.5em',
  fontWeight: "bold"
});

const MyCard = ({ parking, stateParking, findOutGreenRedOrOrange,
  stateOpenBoxPossible,
  openBox, cancelReservation, handleReservation }) => {
  const { t } = useTranslation();
  const { id, address, name } = parking;

  return (
    <>
      <MyCarImg id={id} />
      <MyImgOverlay
      className="">
          <Card.Title className="">{stateParking.boxes.length} {t('boxes in total')}</Card.Title>
          <Card.Text>
            <MyMarker
              color='red'
              state={stateParking.occupied}
              text={t('unavailable')}
              icon={faMapMarkerAlt}
            />
            <MyMarker
              color='green'
              state={stateParking.free}
              text={t('available')}
              icon={faMapMarkerAlt}
            />
            <MyMarker
              color='orange'
              state={stateParking.reserved}
              text={t('reserved')}
              icon={faMapMarkerAlt}
            />
          </Card.Text>
      </MyImgOverlay>
      <MyCarHeader
        address={address}
        name={name}
      />
      <Card.Body>
        <Row>
          <Col >
            <Row className="mx-auto">
              <MyColBoxes
                boxes={stateParking.boxes}
                findOutGreenRedOrOrange={findOutGreenRedOrOrange}
                handleReservation={handleReservation}
              />
            </Row>
          </Col>
        </Row>
        <Row className='mt-1'>
          <Col>
            {
              stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION
                ?
                <Button
                  variant="contained"
                  color='primary'
                  onClick={cancelReservation}
                >
                  {t('Cancel Reservation')}
                </Button>
                : <></>
            }
          </Col>
          <Col>
            {
              stateOpenBoxPossible
                ?
                <Button
                  block="true"
                  variant='outlined'
                  onClick={openBox}
                >
                  {t('Open box no.')}{stateParking.boxReservedByThisUser + 1} &gt;&gt;
                                        </Button>
                : <></>
            }
          </Col>
          {/* </Row>
          </Col> */}
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