import React, { useState, useEffect, useCallback } from 'react';
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
import { formatTimeLeft, checkGeolocationAvailability, createSocketIOConnection, socket } from './utils/util';

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
    let watchID = null;

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
            watchID = navigator.geolocation.watchPosition((position) => {
                setStateLatLog({
                    ...stateLatLog,
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
                try {
                    checkOpenBoxPossible(position.coords.latitude, position.coords.longitude);
                } catch (error) {
                    console.log(error);
                }
            });
        }
    };

    const findAllBoxesInAParking = useCallback(
        async () => {
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
        }, [parking.id, setStateParking]
    );

    const activateCountdown = () => {

        reservationInterval = setInterval(() => {

            const reservation_time_left = FIVE_MINUTES - (new Date().getTime() - new Date(stateParking.boxes[stateParking.boxReservedByThisUser].lastReservationDate).getTime());

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
        if (geolocation) {
            try {
                watchPosition();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const checkOpenBoxPossible = async (latitude, longitude) => {
        const res = await ParkingDataService.get(parking.id);
        const distanceToParking = getDistanceFromLatLonInKm(latitude, longitude, parseFloat(res.data.lat), parseFloat(res.data.long));
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
            }
        } catch (error) {
            console.log(error);
        }
        checkGeolocation();
        createSocketIOConnection();

        return () => {
            cancelCountdown();
            (socket != null) && socket.disconnect();
            (watchID != null) && navigator.geolocation.clearWatch(watchID);
        };
    }, [findAllBoxesInAParking, stateParking.boxReservedByThisUser]);

    return (
        <>
            <MyNavbar history={history} />
            <MyContainer>
                <Row>
                    <Card className='m-2'>
                        <MyCard
                            parking={parking}
                            stateParking={stateParking}
                            findOutGreenRedOrOrange={findOutGreenRedOrOrange}
                            findAllBoxesInAParking={findAllBoxesInAParking}
                            activateCountdown={activateCountdown}
                            cancelCountdown={cancelCountdown}
                            stateOpenBoxPossible={stateOpenBoxPossible}
                            checkOpenBoxPossible={checkOpenBoxPossible}
                            setStateOpenBoxPossible={setStateOpenBoxPossible}
                            stateLatLog={stateLatLog}
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
                            (stateGeolocationAvailable)
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