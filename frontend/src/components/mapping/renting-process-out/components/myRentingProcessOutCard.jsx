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
import { faCheckCircle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row } from 'react-bootstrap';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import {
  RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED,
  RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED,
} from '../../constants/constants';

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

const MyRentingProcessOutCard = ({ parking, stateRentingProcess, noResponseFromParkingDevice, continueWithProcess }) => {

  const classes = useStyles();

  const { id, address, name } = parking;

  return (
    <>
      <MyCarHeader
        address={address}
        name={name}
      />
      <MyCarImg id={id} />
      <Card.Body>
        {
          noResponseFromParkingDevice ?
            <>
              <MyMarker
                color='blue'
                state={null}
                text='No response from Parking device...'
                icon={faInfoCircle}
              />
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
            </>
            :
            <>
              <Card.Title>Renting process steps...</Card.Title>
              <Row className='pt-2'>
                <Col>
                  <MyMarker
                    color={stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ? 'green' : 'red'}
                    state={null}
                    text='Open box door'
                    icon={stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
                  />
                </Col>
              </Row>
              <Row className='pt-2'>
                <Col>
                  <MyMarker
                    color={stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED ? 'green' : 'red'}
                    state={null}
                    text='Pull out scooter charger'
                    icon={stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
                  />
                </Col>
              </Row>
              <Row className='pt-2'>
                <Col>
                  <MyMarker
                    color={stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? 'green' : 'red'}
                    state={null}
                    text='Closed box door'
                    icon={stateRentingProcess >= RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED ? faCheckCircle : faTimes}
                  />
                </Col>
              </Row>
            </>
        }
      </Card.Body>
    </>
  )
};

MyRentingProcessOutCard.propTypes = {
  parking: PropTypes.object.isRequired,
  stateRentingProcess: PropTypes.number.isRequired,
};

export default MyRentingProcessOutCard;