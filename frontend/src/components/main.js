import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import { MyNavbar } from "./ui/navbar/my-navbar";
import {Footer} from './ui/footer'
import { getCurrentUserId } from "../utils/common";
import ScooterDataService from "../services/scooter.service";
import BoxDataService from "../services/box.service";
import ParkingDataService from "../services/parking.service";

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
import { Typography } from "@material-ui/core";

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

export function Main(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loadingState, setLoadingState] = useState(true);
  const [userState, setUserState] = useState(null);
  const [checkingForRenting, setCheckingForRenting] = useState(false);
  const [stateParking, setStateParking] = useState({
	  parkingId: 0,
	  parkingAddress: '',
	  parkingName: '',
	  boxId: 0,
  });

  //Lo dejamos aquí -- This method is not used
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
  */

  const redirectToParking = () => {
    props.history.push({
      pathname: "/renting",
      state: {
        userId: getCurrentUserId(),
      },
    });
  };
  
  const checkIfRenting = () => { /* Las Torres Gemelas */
    // Perhaps it can be easier... It is needed to get the necessary data :(
	setLoadingState(false);
	ScooterDataService.getScooterWithUserId(getCurrentUserId())
	.then((data) => {
		if(data.data == ""){
			console.log("Vacío");
			checkIfParking();
		}
		else if(data.data !== ""){
			setStateParking(s => ({
				...s,
				boxId: data.data.boxId
			}));
			BoxDataService.get(data.data.boxId)
			.then((dato) => {
				setStateParking(s => ({
					...s,
					parkingId: dato.data.parkingId
				}));
				ParkingDataService.get(dato.data.parkingId)
				.then((datos) => {
					setStateParking(s => ({
						...s,
						parkingAddress: datos.data.address,
						parkingName: datos.data.name
					}));
				})
				.catch(err => {
					console.log("Reventó" + err.message)
				});
			})
			.catch(err => {
				console.log("Reventó" + err.message)
			});
			setUserState(true);
			setCheckingForRenting(true)
		}
		else {
			console.log("This will never take place, unless it shoudn't")
		}
	})
	.catch(err => {
		console.log("Reventó" + err.message)
	});
  }
  
  const checkIfParking = () => { 
	BoxDataService.getAll().then((data) => {
		for(let i = 0;i<data.data.length;i++){
			if(data.data[i].userId === getCurrentUserId()){
				console.log("The user has a scooter parked");
				setUserState(true);
				setCheckingForRenting(false);
				
				setStateParking(s => ({
					...s,
					boxId: data.data[i].boxId,
					parkingId: data.data[i].parkingId,
				}));
				
				ParkingDataService.get(data.data[i].parkingId)
				.then((dato) => {
					setStateParking(s => ({
						...s,
						parkingAddress: dato.data.address,
						parkingName: dato.data.name
					}));
				})
				.catch(err => {
					console.log("Reventó" + err.message)
				});
				break;
			}
			else {
				console.log("Noup")
			}
		}
	})
  }
  
  const goToRentingOrParking = () => {
	const parking = {
		id: stateParking.parkingId,
		address: stateParking.parkingAddress,
		name: stateParking.parkingName
	}
	if(checkingForRenting){
		props.history.push({
			pathname: "/while-renting",   //It works
			state: {
				parking,
				boxId: stateParking.boxId,
				checkingForRenting: aux,
			},
		});
	} else {
		props.history.push({
			pathname: "/while-renting",  //It doesn't work
			state: {
				parking,
				boxId: stateParking.boxId,
				checkingForRenting: false,
			},
		});
	}
	
  }
  useEffect(() => {
    //checkUserRenting();
	checkIfRenting();
	/*
	if(!checkingForRenting) {
		checkIfParking();
	}
	*/
  }, []);

  return (
    <>
      {loadingState ? (  //Simplemente cargando -- Borrar el comentario
        <>
          <MyContainer>
            <Row className="justify-content-md-center h-50">
              <Col md={6} className="text-center mt-auto pb-5">
                <BallBeat color={"#123abc"} loading={loadingState} />
              </Col>
            </Row>
          </MyContainer>
        </>
      ) : userState ? ( //En caso de haber usado el renting o el parking -- Borrar el comentario //redirectToParking
        <>
          <MyNavbar history={props.history}/>
          <Paper elevation={0} className={classes.root}>
            <Container className={classes.image}>
				<Image src="img/bluecity.png" aspectRatio={16 / 9} /> <br/>
				<Col xs={{span: 12, offset: 0}}>
					<Typography component={'span'}>
						{
							checkingForRenting ?
								<p>	Hi! Would you like to return the scooter? </p>
							:
								<p>	Hi! Would you like to take your scooter back? </p>
						}
					</Typography>
				</Col>
				<Col xs={{span: 10, offset: 2}}>
					<Button variant="contained" className={classes.buttons} onClick={goToRentingOrParking}>
						{
							checkingForRenting ?
								<h6> Go to the renting </h6>
							:
								<h6> Go to parking </h6>
						}
						
					</Button>
				</Col> 
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
