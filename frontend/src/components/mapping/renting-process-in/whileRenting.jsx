import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

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
                text={`${t('You have rented a scooter')} ${formatTimeLeft(timeElapsedSinceReservation.valueOf())} ${t('minutes ago')}.`}
                icon={faInfoCircle}
              />
              <MyMarker
                color='blue'
                state={null}
                text={t('You can return it in any parking of our network. Click below to search a parking to return the scooter.')}
                icon={faInfoCircle}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className={classes.buttons}
                onClick={findParkingToReturnScooter}>{t('Search a parking to return the scooter')}</Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Footer />
    </>
  )
};

WhileRenting.propTypes = {
  history: PropTypes.object.isRequired
};

export default WhileRenting;
