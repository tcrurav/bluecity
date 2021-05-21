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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col, Card } from 'react-bootstrap';
import Button from "@material-ui/core/Button";

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
  PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  PARKING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  NEITHER_PARKING_NOT_RENTING,
  } from '../constants/constants';
/**
|--------------------------------------------------
*/
const WhileRenting = ({ location, history }) => {

  const { state: { parking, boxId, checkingForRenting } } = location;
  
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
  
  const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10vh",
  },
  image: {
    maxWidth: "512px",
  },
  buttonContainer: {
    justify: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: "1vh",
    backgroundColor: "#00a9f4",
    "&:hover": {
      backgroundColor: "#007ac1",
      color: "white",
    },
  },
  footer: {
    top: 0,
  },
  }));

  const classes = useStyles();
  
  const cancelCountdown = () => (reservationInterval.current !== null) && clearInterval(reservationInterval.current);
  
  const getNecessaryData = () => {
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
		for(let i=0;i<data.data.length;i++){
			if(data.data[i].id === boxId){
				setStateParking(s => ({
					...s,
					boxReservedByThisUser: i 
				})); 
				console.log(data.data[i].id)
				return;
			}
		} 
	});
	
	BoxDataService.get(boxId).then((data) => {
		const lastReservation = new Date(data.data.lastReservationDate).getTime();  
		setStateParking(s => ({
			...s,
			lastReservationDate: lastReservation
		}));
	});
  }
  
  const goToRenting = () => {
	history.push({
		pathname: '/renting',
		state: {  
			userId: getApiUser().id
		}
	});
  }
  
  const goToParkingProcessOut = () => {
	let index = stateParking.boxReservedByThisUser;  
    let data = stateParking.boxes[index]; 
	console.log(data)	
	socketRef.current.emit('open-box-parking-out', data);  
	history.push({
		  pathname: "/parking-process-out",
		  state: {
			parking: parking,
			boxId: boxId
		  },
	});  
  }
  
  useEffect(() => {
    console.log("useEffect socket");
    socketRef.current = socketIOClient(process.env.REACT_APP_BASEURL);

    socketRef.current.on('welcome', () => {
		console.log('connected to backend');
		
    });
	
    return () => {
      socketRef.current.disconnect();
    }
  }, []);
  
  useEffect(() => {
	getNecessaryData(); //Necessary
	
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
    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
      reservationInterval.current = setInterval(() => {
        try {
			const reservation_time_left = new Date().getTime() - stateParking.lastReservationDate;
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
  }, [stateParking.boxReservedByThisUser, stateParking.reservation_time_left]); //Necessary change
  
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
		<Row>
			<Col xs={{span: 12, offset: 0}}>
				{
					checkingForRenting 
					?
						<span>
							<FontAwesomeIcon icon={faInfoCircle} color="blue" />
							&nbsp; You have rented a scooter in {name}
						</span>
					:
						<span> 
							<FontAwesomeIcon icon={faInfoCircle} color="blue" />
							&nbsp; You have parked your scooter in  {name}
						</span>
				}
				<br/>	
				<FontAwesomeIcon icon={faInfoCircle} color="blue" />
					&nbsp; You rented it {formatTimeLeft(stateParking.reservation_time_left.valueOf())} minutes ago. 
				<br/>
				<FontAwesomeIcon icon={faInfoCircle} color="blue" />
					&nbsp; Distance to parking: {distanceToParking.toFixed(2)} km 
				
				{
					!checkingForRenting && stateOpenBoxPossible ?
					
						<div>
							<span>
								<FontAwesomeIcon icon={faInfoCircle} color="blue" />
								&nbsp; You can take your scooter back
							</span>
							<Col xs={{span: 9, offset: 3}}>
								<br/>
								<Button 
									variant="contained" 
									className={classes.buttons} 
									onClick={goToParkingProcessOut}> Open Box </Button>
							</Col>
						</div>
					
					: checkingForRenting ?

						<div>
							<span>
								<FontAwesomeIcon icon={faInfoCircle} color="blue" />
								&nbsp; You can return the scooter whenever you want
							</span>
							<Col xs={{span: 9, offset: 3}}>
								<br/>
								<Button 
									variant="contained" 
									className={classes.buttons} 
									onClick={goToRenting}> Go to renting </Button>
							</Col>
						</div>
						
					: !checkingForRenting && !stateOpenBoxPossible ?
						
						<span>
						<br/>
							<FontAwesomeIcon icon={faInfoCircle} color="blue" />
							&nbsp;You are too far from the parking 
						</span>
					:
						<> This case should never take place </>	
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
