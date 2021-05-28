import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import { MyNavbar } from "./ui/navbar/my-navbar";
import { Footer } from './ui/footer'
import { getCurrentUserId } from "../utils/common";

import BoxDataService from "../services/box.service";
import ParkingDataService from "../services/parking.service";
import ScooterDataService from "../services/scooter.service";

import MyMarker from './mapping/availability/components/myMarker';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import {
  PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  PARKING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED,
  PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED,
  PARKING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  PARKING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  PARKING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED,
  PARKING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED,
  RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED,
  RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED,
  RENTING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT,
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED,
  RENTING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED,
  RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED
} from "./mapping/constants/constants";

/*-----------------------------------
        Material-UI Imports
------------------------------------*/
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import Paper from "@material-ui/core/Paper";

/**
 *  React-Bootstrap Imports
 */
import { MyContainer } from "./ui/my-container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BallBeat } from "react-pure-loaders";

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
  margins: {
    marginTop: "1em",
    marginBottom: "1em",
    marginLeft: "1em",
    marginRight: "1em"
  },
  footer: {
    top: 0,
  },
}));

export function Main(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loadingState, setLoadingState] = useState(true);
  const [userState, setUserState] = useState(null);
  const [currentBox, setCurrentBox] = useState(false);

  // const history = useHistory();

  // const [stateParking, setStateParking] = useState({
  //   parkingId: 0,
  //   parkingAddress: '',
  //   parkingName: '',
  //   boxId: 0,
  // });

  //Lo dejamos aquí -- This method is not used!
  /*
  const checkUserRenting = () => {
    ScooterDataService.getScooterWithUserId(getCurrentUserId()).then((res) => {
      /* console.log("Res data:")
    console.log(res); 
      if (res.data !== "") {
        setUserState(res.data);
      }
      setLoadingState(false);
    });
  };

  ** Ya este método no es necesario, ha sido sustituido por goToRentingOrParking **
  const redirectToParking = () => { 
    props.history.push({
      pathname: "/renting",
      state: {
        userId: getCurrentUserId(),
      },
    });
  };
  */

  // const checkIfRenting = () => { /* Pendiente a modificar para una mayor sencillez */
  //   // Perhaps it can be easier... It is needed to get the necessary data 
  //   setLoadingState(false);
  //   ScooterDataService.getScooterWithUserId(getCurrentUserId())
  //     .then((data) => {
  //       if (data.data == "") {
  //         console.log("Vacío");
  //         checkIfParking();
  //       }
  //       else if (data.data !== "") {
  //         setStateParking(s => ({
  //           ...s,
  //           boxId: data.data.boxId
  //         }));
  //         BoxDataService.get(data.data.boxId)
  //           .then((dato) => {
  //             setStateParking(s => ({
  //               ...s,
  //               parkingId: dato.data.parkingId
  //             }));
  //             ParkingDataService.get(dato.data.parkingId)
  //               .then((datos) => {
  //                 setStateParking(s => ({
  //                   ...s,
  //                   parkingAddress: datos.data.address,
  //                   parkingName: datos.data.name
  //                 }));
  //               })
  //               .catch(err => {
  //                 console.log("Error " + err.message)
  //               });
  //           })
  //           .catch(err => {
  //             console.log("Error " + err.message)
  //           });
  //         setUserState(true);
  //         setCheckingForRenting(true)
  //       }
  //       else {
  //         console.log("This will never take place, unless it shoudn't")
  //       }
  //     })
  //     .catch(err => {
  //       console.log("Error " + err.message)
  //     });
  // }

  // const checkIfParking = () => {
  //   BoxDataService.getAll().then((data) => {
  //     for (let i = 0; i < data.data.length; i++) {
  //       if (data.data[i].userId === getCurrentUserId() && data.data[i].state === 14) {
  //         /* The second condition avoids the chance of confusing a renting scooter reservation with a parking scooter parked */
  //         console.log("The user has a scooter parked");
  //         setUserState(true);
  //         setCheckingForRenting(false);

  //         setStateParking(s => ({
  //           ...s,
  //           boxId: data.data[i].id,
  //           parkingId: data.data[i].parkingId,
  //         }));

  //         ParkingDataService.get(data.data[i].parkingId)
  //           .then((dato) => {
  //             setStateParking(s => ({
  //               ...s,
  //               parkingAddress: dato.data.address,
  //               parkingName: dato.data.name
  //             }));
  //           })
  //           .catch(err => {
  //             console.log("Error " + err.message)
  //           });
  //         break;
  //       }
  //       else {
  //         continue;
  //       }
  //     }
  //   })
  // }

  // const goToRentingOrParking = () => {
  //   const parking = {
  //     id: stateParking.parkingId,
  //     address: stateParking.parkingAddress,
  //     name: stateParking.parkingName
  //   }
  //   if (checkingForRenting) {
  //     props.history.push({
  //       pathname: "/renting",
  //       state: {
  //         userId: getCurrentUserId(),
  //       },
  //     });
  //   } else {
  //     props.history.push({
  //       pathname: "/while-renting",
  //       state: {
  //         parking,
  //         boxId: stateParking.boxId,
  //         checkingForRenting: false,
  //       },
  //     });
  //   }

  // }

  const checkUserState = () => {
    const currentUserId = getCurrentUserId();
    BoxDataService.getOneWithUserId(currentUserId).then(data => {
      console.log(data)
      if (data.data != "") {
        switch (data.data.state) {
          case PARKING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT:
          case PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED:
          case PARKING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED:
            setUserState({
              state: "parking in",
              message: "You are parking right now. Click continue to go on with the process."
            });
            break;
          case PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED:
            setUserState({
              state: "parked in",
              message: "Your scooter is parked right now. Click continue to get your scooter back."
            });
            break;
          case PARKING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT:
          case PARKING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED:
          case PARKING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED:
          case PARKING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED:
            setUserState({
              state: "parking out",
              message: "You are getting out your scooter right now. Click continue to go on with the process."
            });
            break;
          case RENTING_MODE_PULLING_OUT_SCOOTER_ORDER_TO_OPEN_DOOR_SENT:
          case RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED:
          case RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED:
            setUserState({
              state: "renting out",
              message: "You are renting a scooter right now. Click continue to go on with the process."
            });
            break;
          case RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED:
            setUserState({
              state: "rented out",
              message: "You are enjoying a rented scooter right now. Click continue to return it."
            });
            break;
          case RENTING_MODE_INTRODUCING_SCOOTER_ORDER_TO_OPEN_DOOR_SENT:
          case RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED:
          case RENTING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED:
          case RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED:
            setUserState({
              state: "renting in",
              message: "You are returning a scooter right now. Click continue to go on with the process."
            });
            break;
          default:
            //It Happens when the user has nothing in a box
            //The user maybe riding on a rented scooter. Let's check it...
            ScooterDataService.getScooterWithUserId(currentUserId).then(data => {
              console.log("vacío o no")
              console.log(data)
              if (data.data) {
                setUserState({
                  state: "rented out",
                  message: "You are enjoying a rented scooter right now. Click continue to return it."
                });
                setLoadingState(false);
                return;
              }
            }).catch((e) => {
              //Error
            });

            //It happens when the user has started a reservation but hasn't finished the process
            setUserState({
              state: "reserving for parking",
              message: "You may have made a reservation. Click continue to go on."
            });
        }
        setCurrentBox(data.data);
        setLoadingState(false);
        return;
      }
      setLoadingState(false);
    })
  }

  const continueWithProcess = () => {
    switch (userState.state) {
      case "reserving for parking":
        ParkingDataService.get(currentBox.parkingId).then(data => {
          props.history.push({
            pathname: "/availability",
            state: {
              parking: data.data,
              checkingForRenting: false,
              returningScooter: false
            },
          });
        });
        break;
      case "parking in":
        ParkingDataService.get(currentBox.parkingId).then(data => {
          props.history.push({
            pathname: "/parking-process-in",
            state: {
              parking: data.data,
              boxId: currentBox.id
            },
          });
        })
        break;
      case "parked in":
        ParkingDataService.get(currentBox.parkingId).then(data => {
          props.history.push({
            pathname: "/while-parking",
            state: {
              parking: data.data,
              boxId: currentBox.id
            },
          });
        })
        break;
      case "parking out":
        ParkingDataService.get(currentBox.parkingId).then(data => {
          props.history.push({
            pathname: "/parking-process-out",
            state: {
              parking: data.data,
              boxId: currentBox.id
            },
          });
        })
        break;
      case "renting out":
        ParkingDataService.get(currentBox.parkingId).then(data => {
          props.history.push({
            pathname: "/renting-process-out",
            state: {
              parking: data.data,
              boxId: currentBox.id
            },
          });
        })
        break;
      case "rented out":
        props.history.push({
          pathname: "/while-renting"
        });
        break;
      case "renting in":
        ParkingDataService.get(currentBox.parkingId).then(data => {
          props.history.push({
            pathname: "/renting-process-in",
            state: {
              parking: data.data,
              boxId: currentBox.id
            },
          });
        })
        break;
    }
  }

  useEffect(() => {
    // checkIfRenting();
    checkUserState();
  }, []);

  return (
    <>
      {loadingState ? (
        <>
          <MyContainer>
            <Row className="justify-content-md-center h-50">
              <Col md={6} className="text-center mt-auto pb-5">
                <BallBeat color={"#123abc"} loading={loadingState} />
              </Col>
            </Row>
          </MyContainer>
        </>
      ) : userState != null ? ( /* En caso de haber usado el renting o el parking, falta inhabilitar el navbar */
        <>
          <MyNavbar history={props.history} />
          <Paper elevation={0} className={classes.root}>
            <Container className={classes.image}>
              <Image src="img/bluecity.png" aspectRatio={16 / 9} />
              <Grid container className={classes.buttonContainer} direction="column">
                <Grid item xs={12} className={classes.margins}>
                  <MyMarker
                    color='blue'
                    state={null}
                    text={userState.message}
                    icon={faInfoCircle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" className={classes.buttons} onClick={continueWithProcess}>
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Paper>
          <Footer />
        </>
      ) : (
        <>
          <MyNavbar history={props.history} />
          <Paper elevation={0} className={classes.root}>
            <Container className={classes.image}>
              <Image src="img/bluecity.png" aspectRatio={16 / 9} />
            </Container>
            <Grid
              container
              className={classes.buttonContainer}
              direction="column"
            >
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className={classes.buttons}
                  onClick={() => props.history.push("/parking")}
                >
                  {t('Parking')}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className={classes.buttons}
                  onClick={() =>
                    props.history.push({
                      pathname: "/renting",
                      state: {
                        userId: getCurrentUserId(),
                      },
                    })
                  }
                >
                  {t('Renting')}
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Footer className={classes.footer} />
        </>
      )}
    </>
  );
}
