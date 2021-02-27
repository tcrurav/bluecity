import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../my-navbar';
import { MyContainer } from '../my-container';
import { Footer } from '../footer';
import MyCard from './components/myCard';
import MyMarker from './components/myMarker';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card } from 'react-bootstrap';

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import BoxDataService from '../../services/box.service';
import ParkingDataService from '../../services/parking.service';

/**
|--------------------------------------------------
| Utils
|--------------------------------------------------
*/
import { getDistanceFromLatLonInKm } from '../../utils/common';
import { formatTimeLeft, checkGeolocationAvailability, createSocketIOConnection } from './utils/util';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { OCCUPIED, FREE, RESERVED, FIVE_MINUTES, THIS_USER_HAS_NO_RESERVATION, API_USER, CLOSE_DISTANCE_TO_PARKING } from './constants/constants'

const AvailabilityScreen = ({ location, history }) => {

    const { state: { parking, checkingForRenting } } = location;

    const [stateParking, setStateParking] = useState(
        {
            boxes: [],
            occupied: 0,
            reserved: 0,
            free: 0,
            reservation_time_left: 0,
            boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
        }
    );

    const [stateLatLog, setStateLatLog] = useState({
        lat: 0,
        long: 0,
    });

    const [stateOpenBoxPossible, setStateOpenBoxPossible] = useState(false);

    const [stateGeolocationAvailable, setStateGeolocationAvailable] = useState(false);

    const [distanceToParking, setDistanceToParking] = useState(0);

    let reservationInterval = null;

    const findOutGreenRedOrOrange = (data) => {

        //To understand this look at the table in the documentation
        const reservationExpired = new Date(data.lastReservationDate) < new Date(new Date() - FIVE_MINUTES + 1000); // five minutes minus 1 second

        if (!reservationExpired) {
            return RESERVED;
        }
        if ((!data.occupied && reservationExpired) ||
            (checkingForRenting && !data.occupied && reservationExpired)) {
            return FREE;
        }
        return OCCUPIED;
    };

    const cancelCountdown = () => (reservationInterval != null) && clearInterval(reservationInterval);

    const watchPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                setStateLatLog({
                    ...stateLatLog,
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
            });
        }
    };

    const findAllBoxesInAParking = async () => {
        const newStateBox = await BoxDataService.getAllBoxesInAParking(parking.id);
        let occupied = 0, free = 0, reserved = 0,
            boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
        for (let i = 0; i < newStateBox.data.length; i++) {
            switch (findOutGreenRedOrOrange(newStateBox.data[i])) {
                case OCCUPIED:
                    occupied++;
                    break;
                case FREE:
                    free++;
                    break;
                case RESERVED:
                    reserved++;
                    if (newStateBox.data[i].userId === API_USER.id) {
                        boxReservedByThisUser = i;
                    }
                    break;
                default: console.log("This case should never take place");
            }
        }

        setStateParking({
            ...stateParking,
            boxes: newStateBox.data,
            occupied,
            reserved,
            free,
            boxReservedByThisUser
        });
    };

    const activateCountdown = () => {
        if (!stateParking.boxes[stateParking.boxReservedByThisUser].lastReservationDate) return;

        reservationInterval = setInterval(() => {

            const reservation_time_left = FIVE_MINUTES - (new Date().getTime() - new Date(stateParking.boxes[stateParking.boxReservedByThisUser].lastReservationDate).getTime());
            //console.log('reservation_time_left, Línea 141 ', stateParking.boxes[stateParking.boxReservedByThisUser]);


            if (reservation_time_left < 1000) {
                //five minutes are over
                cancelCountdown();

                setStateParking({
                    ...stateParking,
                    boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
                    reservation_time_left: 0,
                });
                setStateOpenBoxPossible(false);

                return;
            }
            setStateParking({
                ...stateParking,
                reservation_time_left
            });

        }, 1000);
    };

    const checkGeolocation = async () => {
        const geolocation = await checkGeolocationAvailability();
        setStateGeolocationAvailable(geolocation);
    };

    const checkOpenBoxPossible = async () => {
        const res = await ParkingDataService.get(parking.id);
        const distanceToParking = getDistanceFromLatLonInKm(stateLatLog.lat, stateLatLog.long, parseFloat(res.data.lat), parseFloat(res.data.long));
        if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION &&
            stateGeolocationAvailable.geolocationAvailable &&
            distanceToParking < CLOSE_DISTANCE_TO_PARKING) {
            setStateOpenBoxPossible(true);
            setDistanceToParking(distanceToParking);
            return;
        }
        setStateOpenBoxPossible(false);
        setDistanceToParking(distanceToParking);

    };

    useEffect(() => {
        try {
            findAllBoxesInAParking();
            if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
                try {
                    activateCountdown();
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('stateParking.boxReservedByThisUser es igual a THIS_USER_HAS_NO_RESERVATION');
            }
            checkGeolocation();
        } catch (error) {
            console.log(error);
        }

    }, [stateParking.boxReservedByThisUser]);

    useEffect(() => {
        try {

        } catch (error) {
            console.log(error);
        }

    }, []);

    useEffect(() => {
        if (stateGeolocationAvailable) {
            try {
                watchPosition();
                checkOpenBoxPossible();
            } catch (error) {
                console.log(error);
            }
        }
        createSocketIOConnection();
    }, []);
    console.log(stateParking);

    return (
        <>
            <MyNavbar history={history} />
            <MyContainer>
                <Row>
                    <Card className='m-2'>
                        <MyCard
                            parking={parking}
                            stateParking={stateParking}
                            setStateParking={setStateParking}
                            findOutGreenRedOrOrange={findOutGreenRedOrOrange}
                            findAllBoxesInAParking={findAllBoxesInAParking}
                            activateCountdown={activateCountdown}
                            cancelCountdown={cancelCountdown}
                            stateOpenBoxPossible={stateOpenBoxPossible}
                            checkOpenBoxPossible={checkOpenBoxPossible}
                            setStateOpenBoxPossible={setStateOpenBoxPossible}
                        />
                    </Card>
                </Row>
                <Row className='pt-3'>
                    <Col>
                        {
                            stateParking.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION
                                ?
                                <MyMarker
                                    color='blue'
                                    state={null}
                                    text='Click on the Box number to reserve a parking box.'
                                    icon={faInfoCircle}
                                />
                                :
                                <MyMarker
                                    color='blue'
                                    state={null}
                                    text={`Your reservation for box nº${stateParking.boxReservedByThisUser.valueOf() + 1} in parking ${parking.name} will expire in ${formatTimeLeft(stateParking.reservation_time_left.valueOf())}`}
                                    icon={faInfoCircle}
                                />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            stateGeolocationAvailable
                                ?
                                <MyMarker
                                    color='blue'
                                    state={null}
                                    text={`Geolocation activated. This parking is ${distanceToParking ? distanceToParking.toFixed(2) : ""}Km from your current location.`}
                                    icon={faInfoCircle}
                                />
                                :
                                <MyMarker
                                    color='blue'
                                    state={null}
                                    text='Geolocation not available. Please activate it.'
                                    icon={faInfoCircle}
                                />
                        }
                    </Col>
                </Row>
            </MyContainer>
            <Footer />
        </>
    )
};

AvailabilityScreen.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default AvailabilityScreen;