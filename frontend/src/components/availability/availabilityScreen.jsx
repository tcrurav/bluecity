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
import MyMarker from './components/myMarker';
import MyColBoxes from './components/myColBoxes';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import socketIOClient from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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
import { formatTimeLeft } from './utils/util';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { OCCUPIED, FREE, RESERVED, FIVE_MINUTES, THIS_USER_HAS_NO_RESERVATION, API_USER, CLOSE_DISTANCE_TO_PARKING, BEGIN_OF_TIMES } from './constants/constants'

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { MyCol, MyRedCol, MyGreenCol, ColorMarker, BlueInfo } from './styled/styles';

const AvailabilityScreen = ({ location, history }) => {

    const { state: { parking, checkingForRenting } } = location;

    const [stateBox, setStateBox] = useState(
        {
            boxes: [],
            occupied: 0,
            reserved: 0,
            free: 0,
            reservation_time_left: 0,
            boxReservedByThisUser: THIS_USER_HAS_NO_RESERVATION,
            openBoxPossible: false,
            geolocationAvailable: false,
            lat: 0,
            long: 0,
        }
    );

    let reservationInterval = null;
    let socket = null;
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

    /*const findAllBoxesInAParking = useCallback(
        (id) => {
            return new Promise((resolve, reject) => {
                BoxDataService.getAllBoxesInAParking(id)
                    .then(res => {
                        console.log("findAllBoxesInAParking")
                        console.log(res);
                        let occupied = 0, free = 0, reserved = 0,
                            boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
                        for (let i = 0; i < res.data.length; i++) {
                            switch (findOutGreenRedOrOrange(res.data[i])) {
                                case OCCUPIED:
                                    occupied++;
                                    break;
                                case FREE:
                                    free++;
                                    break;
                                case RESERVED:
                                    reserved++;
                                    if (res.data[i].userId === API_USER.id) {
                                        boxReservedByThisUser = i;
                                    }
                                    break;
                                default: console.log("This case should never take place");
                            }
                        }

                        resolve({
                            boxes: res.data,
                            occupied: occupied,
                            reserved: reserved,
                            free: free,
                            boxReservedByThisUser: boxReservedByThisUser
                        });
                    })
            });
        }, []);*/

    const checkGeolocationAvailability = () => {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                resolve({ geolocationAvailable: true });
                console.log('Geolocation Available');
            } else {
                resolve({ geolocationAvailable: false });
                console.log('Geolocation Not Available');
            }
        });
    };

    const activateCountdown = async () => {
        reservationInterval = setInterval(() => {
            const reservation_time_left = FIVE_MINUTES - (new Date().getTime() - new Date(stateBox.boxes[stateBox.boxReservedByThisUser].lastReservationDate).getTime());
            if (reservation_time_left < 1000) {
                //five minutes are over
                cancelCountdown();
                /*findAllBoxesInAParking(parking.id).then((newState) => {
                    newState.boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
                    newState.reservation_time_left = 0;
                    newState.openBoxPossible = false;
                    setStateBox({...stateBox, newState});
                    //checkOpenBoxPossible();
                });*/
                const newStateBox = findAllBoxesInAParking(parking.id);
                newStateBox.boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
                newStateBox.reservation_time_left = 0;
                newStateBox.openBoxPossible = false;
                setStateBox({ ...stateBox, ...newStateBox });
                return;
            }
            setStateBox({
                ...stateBox,
                reservation_time_left: reservation_time_left
            });
        }, 1000);
        console.log(reservationInterval);
    };

    const cancelCountdown = () => (reservationInterval != null) && clearInterval(reservationInterval);

    const checkOpenBoxPossible = async () => {
        //Check distance to first box in parking. Notice that all boxes in the same parking have the same location.
        //console.log(stateBox)
        /*ParkingDataService.get(parking.id).then((res) => {
            console.log("checkOpenBoxPossible")
            const distanceToParking = getDistanceFromLatLonInKm(stateBox.lat, stateBox.long, parseFloat(res.data.lat), parseFloat(res.data.long));
            console.log(distanceToParking)
            if (stateBox.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION &&
                stateBox.geolocationAvailable &&
                distanceToParking < CLOSE_DISTANCE_TO_PARKING) {
                setStateBox({ ...stateBox, openBoxPossible: true, distanceToParking: distanceToParking });
                return;
            }
            setStateBox({ ...stateBox, openBoxPossible: false, distanceToParking: distanceToParking });
        });*/

        const boxPossible = await ParkingDataService.get(parking.id);
        console.log("checkOpenBoxPossible")

    };

    /*const watchPosition = (state) => {
        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition((position) => {
                setStateBox({
                    ...state,
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });

                //checkOpenBoxPossible();
                // console.log("Latitude is :", position.coords.latitude);
                // console.log("Longitude is :", position.coords.longitude);
            });
        }
    };*/

    /*const createSocketIOConnection = () => {
        console.log("createSocketIOConnection");
        if (!socket) {
            console.log("victoria");
            socket = socketIOClient(process.env.REACT_APP_BASEURL);
            console.log("otro1")
            socket.on('connect', () => {
                console.log('connected to backend');
            });
            console.log("otro")
            socket.on("hola", data => {
                console.log("connection confirmed");
            });

            console.log("otro2")
        }
    };

    const openBox = () => {
        console.log("openBox");
        try {
            socket.emit("chacho-tu", { hola: "hola" });
            console.log("terminó bien");
        } catch (e) {
            console.log("error");
        } finally {
            console.log("terminó bien o mal");
        }

    };

    useEffect(() => {
        const fetchAllBoxes = async () => {
            const newState = await findAllBoxesInAParking(parking.id);
            console.log(newState);
            setStateBox(newState);
            if (newState.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
                activateCountdown();
            }
            checkGeolocationAvailability().then(res => {
                setStateBox({ ...newState, res });
                console.log(res.geolocationAvailable)
                if (res.geolocationAvailable) {
                    watchPosition(newState);
                }
            });
        };

        fetchAllBoxes();

        findAllBoxesInAParking(parking.id)
            .then((newState) => {

                setStateBox(newState);
                if (stateBox.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
                    activateCountdown();
                }

                checkGeolocationAvailability().then(res => {
                    setStateBox({ ...newState, res });
                    console.log(res.geolocationAvailable)
                    if (res.geolocationAvailable) {
                        watchPosition();
                    }
                });
            });

        createSocketIOConnection();
        return () => {
            cancelCountdown();

            if (socket != null) this.socket.disconnect();

            if (watchID != null) navigator.geolocation.clearWatch(watchID);
        }
    }, [parking.id]);*/


    const findAllBoxesInAParking = useCallback(
        async () => {
            const newStateBoxes = await BoxDataService.getAllBoxesInAParking(parking.id);
            const { data } = newStateBoxes;
            let occupied = 0, free = 0, reserved = 0,
                boxReservedByThisUser = THIS_USER_HAS_NO_RESERVATION;
            for (let i = 0; i < data.length; i++) {
                switch (findOutGreenRedOrOrange(data[i])) {
                    case OCCUPIED:
                        occupied++;
                        break;
                    case FREE:
                        free++;
                        break;
                    case RESERVED:
                        reserved++;
                        if (data[i].userId === API_USER.id) {
                            boxReservedByThisUser = i;
                        }
                        break;
                    default: console.log("This case should never take place");
                }
            }

            checkGeolocationAvailability().then(res => {

                if (res.geolocationAvailable) {

                    if (navigator.geolocation) {
                        watchID = navigator.geolocation.watchPosition((position) => {
                            setStateBox({
                                ...stateBox,
                                boxes: data,
                                occupied: occupied,
                                reserved: reserved,
                                free: free,
                                boxReservedByThisUser: boxReservedByThisUser,
                                geolocationAvailable: res.geolocationAvailable,
                                lat: position.coords.latitude,
                                long: position.coords.longitude
                            });

                            //checkOpenBoxPossible();
                        });
                        console.log(watchID);
                    }
                }
            });
            return () => {
                (watchID != null) && navigator.geolocation.clearWatch(watchID);
            };
        },
        [parking.id],
    );

    useEffect(() => {
        try {
            findAllBoxesInAParking();
        } catch (error) {
            console.log(error);
        }
    }, [findAllBoxesInAParking]);


    console.log('11111111', stateBox);
    console.log(watchID);
    return (
        <>
            <MyNavbar history={history} />
            <MyContainer>
                <Row>
                    <Card className='m-2'>
                        <Card.Header>
                            <h4>{parking.name}</h4>
                            <p>{parking.address}</p>
                        </Card.Header>
                        <Card.Img
                            variant='top'
                            src={`${process.env.REACT_APP_BASEURL}/parking${parking.id}.jpg`}
                        />
                        <Card.Body>
                            <Row className='pt-2'>
                                <Col>
                                    <MyMarker
                                        color='red'
                                        state={stateBox.occupied}
                                        text='occupied'
                                        icon={faMapMarkerAlt}
                                    />
                                    <MyMarker
                                        color='green'
                                        state={stateBox.free}
                                        text='available'
                                        icon={faMapMarkerAlt}
                                    />
                                    <MyMarker
                                        color='orange'
                                        state={stateBox.reserved}
                                        text='reserved'
                                        icon={faMapMarkerAlt}
                                    />
                                </Col>
                                <MyColBoxes
                                    stateBox={stateBox}
                                    setStateBox={setStateBox}
                                    parking={parking}
                                    checkingForRenting={checkingForRenting}
                                    findOutGreenRedOrOrange={findOutGreenRedOrOrange}

                                />
                            </Row>

                        </Card.Body>
                    </Card>
                </Row>
                <Row className='pt-3'>
                    <Col>
                        {
                            stateBox.boxReservedByThisUser === THIS_USER_HAS_NO_RESERVATION
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
                                    text={`Your reservation for box nº${setStateBox.boxReservedByThisUser + 1} in parking ${parking.name} will expire in ${formatTimeLeft()}`}
                                    icon={faInfoCircle}
                                />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            setStateBox.geolocationAvailable
                                ?
                                <MyMarker
                                    color='blue'
                                    state={null}
                                    text={`Geolocation activated. This parking is ${setStateBox.distanceToParking ? setStateBox.distanceToParking.toFixed(2) : ""}Km from your current location.`}
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
}

AvailabilityScreen.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default AvailabilityScreen;
