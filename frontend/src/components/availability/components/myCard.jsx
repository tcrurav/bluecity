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
import { Card, Col, Row, Button } from 'react-bootstrap';

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import BoxDataService from '../../../services/box.service';

/**
|--------------------------------------------------
| Utils
|--------------------------------------------------
*/
import { openBox } from '../utils/util';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { THIS_USER_HAS_NO_RESERVATION, BEGIN_OF_TIMES } from '../constants/constants'

const MyCard = ({ parking, stateParking, setStateParking, findOutGreenRedOrOrange, findAllBoxesInAParking, activateCountdown, checkOpenBoxPossible, cancelCountdown, stateOpenBoxPossible, setStateOpenBoxPossible }) => {

    const { id, address, name } = parking;

    const cancelReservation = (index) => {
        if (stateParking.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION) {
            // This condition should never be possible but just in the limit it could be.
            console.log(`You haven't reserved a Box in this parking yet`);
            return;
        }

        let data = stateParking.boxes[index];
        data.lastReservationDate = BEGIN_OF_TIMES;
        data.userId = null;
        BoxDataService.update(data.id, data)
            .then(async (res) => {
                cancelCountdown();
                await findAllBoxesInAParking(parking.id);
                setStateOpenBoxPossible(false);
            })
            .catch((e) => console.error(e));
    };

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
                    </Col>
                    <Col>
                        <Row>
                            <MyColBoxes
                                stateParking={stateParking}
                                setStateParking={setStateParking}
                                findOutGreenRedOrOrange={findOutGreenRedOrOrange}
                                findAllBoxesInAParking={findAllBoxesInAParking}
                                idParking={id}
                                activateCountdown={activateCountdown}
                                checkOpenBoxPossible={checkOpenBoxPossible}

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
                                            block
                                            variant='secondary'
                                            onClick={() => cancelReservation(stateParking.boxReservedByThisUser)}
                                        >
                                            Cancel Reservation
                                        </Button>
                                        : <></>
                                }</Col>
                        </Row>
                        <Row className='mt-1'>
                            <Col>
                                {
                                    stateOpenBoxPossible
                                        ?
                                        <Button
                                            block
                                            variant='primary'
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
    setStateParking: PropTypes.func.isRequired,
    findOutGreenRedOrOrange: PropTypes.func.isRequired,
    findAllBoxesInAParking: PropTypes.func.isRequired,
    activateCountdown: PropTypes.func.isRequired,
    checkOpenBoxPossible: PropTypes.func
};

export default MyCard;
