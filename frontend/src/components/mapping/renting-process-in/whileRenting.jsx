import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../../ui/navbar/my-navbar';
import MyMarker from '../availability/components/myMarker';
import { Footer } from '../../ui/footer';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";


/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import { formatTimeLeft } from '../availability/utils/util';

import { getApiUser } from '../availability/constants/constants.js';

import ScooterDataService from '../../../services/scooter.service';

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
  margins: {
    marginTop: "1em",
    marginLeft: "1em",
    marginRight: "1em"
  },
  footer: {
    top: 0,
  },
}));

const WhileRenting = ({ history }) => {

  const reservationInterval = useRef(null);

  const [lastReservationDate, setLastReservationDate] = useState(new Date());

  const [timeElapsedSinceReservation, setTimeElapsedSinceReservation] = useState(0);

  const classes = useStyles();

  const cancelCountdown = () => (reservationInterval.current !== null) && clearInterval(reservationInterval.current);

  const getNecessaryData = () => {
    ScooterDataService.getScooterWithUserId(getApiUser().id).then(data => {
      setLastReservationDate(data.data.lastReservationDate);
    });
  }

  const findParkingToReturnScooter = () => {
    history.push({
      pathname: '/renting',
      state: {
        userId: getApiUser().id
      }
    });
  }

  useEffect(() => {
    getNecessaryData(); //Necessary
  }, []);

  useEffect(() => {
      reservationInterval.current = setInterval(() => {
        try {
          setTimeElapsedSinceReservation(new Date().getTime() - lastReservationDate);
        } catch (e) {
          console.log(e);
        }
      }, 1000);

    return () => {
      cancelCountdown();
    }
  }, []); 

  return (
    <>
      <MyNavbar history={history} />
      <Paper elevation={0} className={classes.root}>
        <Container className={classes.image}>
          <Image src="img/bluecity.png" aspectRatio={16 / 9} />
          <Grid container className={classes.buttonContainer} direction="column">
            <Grid item xs={12} className={classes.margins}>
              <MyMarker
                color='blue'
                state={null}
                text={`You have rented a scooter ${formatTimeLeft(timeElapsedSinceReservation.valueOf())} minutes ago.`}
                icon={faInfoCircle}
              />
              <MyMarker
                color='blue'
                state={null}
                text={"You can return it in any parking of our network. Click below to search a parking to return the scooter."}
                icon={faInfoCircle}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className={classes.buttons}
                onClick={findParkingToReturnScooter}>Search a parking to return the scooter</Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Footer />
      {/* <MyNavbar history={history} />
      <MyContainer>
        <Row>
          <Col sm={8} xs={12}>
            <MyCarHeader address={address} name={name} />
            <MyCarImg id={parking.id} />
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 12, offset: 0 }}>
            <div className={classes.margins}>
              <FontAwesomeIcon icon={faInfoCircle} color="blue" />&nbsp; You have rented a scooter in {name}<br />
              <FontAwesomeIcon icon={faInfoCircle} color="blue" />&nbsp; You rented it {formatTimeLeft(stateScooter.reservation_time_left.valueOf())} minutes ago.<br />
              <div>
                <span>
                  <FontAwesomeIcon icon={faInfoCircle} color="blue" />&nbsp; You can return the scooter in any parking of our wide network. Click below to look for a parking to return the scooter.
							  </span>
                <Col xs={{ span: 9, offset: 3 }}>
                  <br />
                  <Button
                    variant="contained"
                    className={classes.buttons}
                    onClick={findParkingToReturnScooter}>Find a parking to return the scooter</Button>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </MyContainer> */}
    </>
  )
};

WhileRenting.propTypes = {
  history: PropTypes.object.isRequired
};

export default WhileRenting;
