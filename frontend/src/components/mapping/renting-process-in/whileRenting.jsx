import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../../ui/navbar/my-navbar';
import { MyContainer } from '../../ui/my-container';
import { Footer } from '../../ui/footer';
import MyRentingProcessCard from './components/myRentingProcessCard';
import MyCarHeader from '../availability/components/myCarHeader';
import MyCarImg from '../availability/components/myCarImg';
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
import BoxDataService from '../../../services/box.service';
import ParkingDataService from '../../../services/parking.service';
import { useGeolocation } from '../../geolocation/geolocation';
import { getDistanceFromLatLonInKm } from '../../../utils/common';
import { formatTimeLeft } from '../availability/utils/util';

import 
{ 
	OCCUPIED, FREE, RESERVED, FIVE_MINUTES, THIS_USER_HAS_NO_RESERVATION, getApiUser, CLOSE_DISTANCE_TO_PARKING, BEGIN_OF_TIMES, MINIMUM_DISTANCE_INCREMENT 
} 
from '../availability/constants/constants.js';

import { 
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  RENTING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED,
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED,
  NEITHER_PARKING_NOT_RENTING 
  } from './constants/constants';
/**
|--------------------------------------------------
*/

const WhileRenting = ({ location, history }) => {

  const { state: { parking, boxId } } = location;

  const socketRef = useRef();
  
  const reservationInterval = useRef(null);
  
  const { id, address, name } = parking; 
  
  
  let [geolocation, geolocationAvailability] = useGeolocation();
  const [distanceToParking, setDistanceToParking] = useState(0);
  const [stateOpenBoxPossible, setStateOpenBoxPossible] = useState(false);
  
  const [stateParking, setStateParking] = useState(
    {
      reservation_time_left: 0,
	  lastReservationDate: null,
      boxReservedByThisUser: 0,
      lat_parking: 0,
      long_parking: 0,
	  boxes: [],
    }
  );
  
  const cancelCountdown = () => (reservationInterval.current !== null) && clearInterval(reservationInterval.current);
  
  const returnScooter = () => {
	let index = stateParking.boxReservedByThisUser;  
    let data = stateParking.boxes[index];  
	data.state = RENTING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT; //Always
	data.lastReservationDate = BEGIN_OF_TIMES; //Duda here, hmmm...
	socketRef.current.emit('open-box', data);
	history.push({
        pathname: '/renting-process-in',
        state: {  
            parking,
            boxId: data.id 
        }
    });
  }
  
  const getNecessaryData = () =>{
	ParkingDataService.get(id).then((data) => {
        setStateParking(s => ({
          ...s,
          lat_parking: data.data.lat,
          long_parking: data.data.long,
        })); 
	});
	
	BoxDataService.getAllBoxesInAParking(id).then((data) => {
        setStateParking(s => ({
          ...s,
          boxes: data.data
        })); 
	});
	console.log(stateParking.boxReservedByThisUser)
	
	for(let i=0;i<stateParking.boxes.length;i++){
		if(stateParking.boxes[i].id == boxId){
			setStateParking(s => ({
				...s,
				boxReservedByThisUser: i 
			})); 
			console.log("ahora")
			console.log(stateParking.boxes[i])
		}
	}  
  }

  useEffect(() => {
    console.log("useEffect socket");
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('welcome', () => {
      console.log('connected to backend');
	  
	  //After connecting to backend, in order to avoid issues
	  getNecessaryData()
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);
  
  useEffect(() => {
    if (geolocation.latitude === 0 && geolocation.longitude === 0) {
      return;
    }

    let distanceToParkingNow = getDistanceFromLatLonInKm(geolocation.latitude, geolocation.longitude,
      stateParking.lat_parking, stateParking.long_parking);
	  

    if ((Math.abs(distanceToParkingNow - distanceToParking)) < MINIMUM_DISTANCE_INCREMENT) return;

    setDistanceToParking(distanceToParkingNow);

  }, [geolocation.latitude, geolocation.longitude, stateParking.lat_parking, stateParking.long_parking]);
  
  useEffect(() => {
    console.log("useEffect de openBoxPossible")
    if (distanceToParking < CLOSE_DISTANCE_TO_PARKING && stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
      setStateOpenBoxPossible(true);
    } else {
      setStateOpenBoxPossible(false);
    }
  }, [distanceToParking, stateParking.boxReservedByThisUser]);
  
  useEffect(() => {
	// Timer counter  
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
      reservationInterval.current = setInterval(() => {
        try {
			BoxDataService.get(boxId)
			.then((data) => {
				const lastReservationDate = new Date(data.data.lastReservationDate).getTime();  
				setStateParking(s => ({
					...s,
					lastReservationDate
				}));
			});
			const reservation_time_left = new Date().getTime() - stateParking.lastReservationDate;
			//console.log(reservation_time_left)
			setStateParking(s => ({
				...s,
				reservation_time_left
			}));
        } catch (e) {
          console.log(e);
        }
      }, 1000);
    };

    return () => {
      cancelCountdown();
    }
  }, [stateParking.boxReservedByThisUser]);

  return (
    <>
      <MyNavbar history={history} />
      <MyContainer>
		<Row>
			<Col sm={8} xs={12}>
				<MyCarHeader address={address} name={name}/>
				<MyCarImg id={parking.id} />
		    </Col>
		</Row>
		<br/>
		<br/>
		<Row>
			<Col xs={{span: 12, offset: 0}}>
				<ul>
					<li> You have rented a scooter in {address} called {name}</li>
					<li> You rented it {formatTimeLeft(stateParking.reservation_time_left.valueOf())} minutes ago </li>
					<li> Distance to parking: {distanceToParking.toFixed(2)} km </li>
				</ul>
				{
					distanceToParking <= CLOSE_DISTANCE_TO_PARKING ?
						<Col xs={12}>
							<p> Would you like to return it back? </p>
							<button onClick={returnScooter}> Open Box </button>
						</Col>
					:
						<p> You are too far from the parking </p>
				}
			</Col>
		</Row>
      </MyContainer>
    </>
  )
};

WhileRenting.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default WhileRenting;
