import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components from Availability
|--------------------------------------------------
*/
import MyCarHeader from '../../availability/components/myCarHeader';
import MyCarImg from '../../availability/components/myCarImg';
import MyMarker from '../../availability/components/myMarker';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row } from 'react-bootstrap';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import {
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  RENTING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED,
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED,
}
  from '../../constants/constants';

/*-----------------------------------
        Material-UI Imports
------------------------------------*/
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

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
    //justifyContent: "center",
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

const MyRentingProcessCard = ({ parking, stateRentingProcess, continueWithProcess }) => {

  const { id, address, name } = parking;

  const classes = useStyles();

  return (
    <>
      <MyCarHeader
        address={address}
        name={name}
      />
      <MyCarImg id={id} />
      <Card.Body>
        <Card.Title>Returning rented Scooter...</Card.Title>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ? 'green' : 'red'}
              state={null}
              text='Open box door'
              icon={stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED ? 'green' : 'red'}
              state={null}
              text='Introduce the scooter in the box'
              icon={stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED ? 'green' : 'red'}
              state={null}
              text='Plug the charger in'
              icon={stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col>
            <MyMarker
              color={stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? 'green' : 'red'}
              state={null}
              text='Close box door'
              icon={stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
            />
            {
              stateRentingProcess >= RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ?
                <Grid
                  container
                  className={classes.buttonContainer}
                  direction="column"
                >
                  <Grid item xs={12}>
                    <Button variant="contained" className={classes.buttons} onClick={continueWithProcess}>
                      Continue
                  </Button>
                  </Grid>
                </Grid>
                :
                <></>
            }
          </Col>
        </Row>
      </Card.Body>
    </>
  )
};

MyRentingProcessCard.propTypes = {
  parking: PropTypes.object.isRequired,
  stateRentingProcess: PropTypes.number.isRequired
};

export default MyRentingProcessCard;