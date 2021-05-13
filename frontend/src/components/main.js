import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import { MyNavbar } from "./ui/navbar/my-navbar";
import {Footer} from './ui/footer'
import { getCurrentUserId } from "../utils/common";
import ScooterDataService from "../services/scooter.service";
import BoxDataService from "../services/box.service";

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

  //Lo dejamos aquí
  const checkUserRenting = () => {
    ScooterDataService.getScooterWithUserId(getCurrentUserId()).then((res) => {
      /* console.log("Res data:")
		console.log(res); */
      if (res.data !== "") {
        setUserState(res.data);
      }
      setLoadingState(false	);
    });
  };

  const redirectToParking = () => {
    props.history.push({
      pathname: "/renting",
      state: {
        userId: getCurrentUserId(),
      },
    });
  };
  
  const checkIfUserHasRented = () => {
	ScooterDataService.getScooterWithUserId(getCurrentUserId())
	.then((data) => {
		if(data.data == ""){
			console.log("Vacío")
		}
		else if(data.data !== ""){
			console.log(data.data.id);
			//Mándalo a whileRenting
		}
		else{
			console.log("This will never take place, unless it shoudn't")
		}
	});
  }
  const checkIfUserHasParkedHisScooter = () =>{
	BoxDataService.getAll().then((data) => {
		for(let i = 0;i<data.data.length;i++){
			if(data.data[i].userId == getCurrentUserId()){
				console.log("The user has a scooter parked");
				//Llevarlo a whileRenting para parking
			}
			else{
				console.log("Noup")
			}
		}
	})
  }
  useEffect(() => {
    checkUserRenting();
	checkIfUserHasRented();
	checkIfUserHasParkedHisScooter();
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
      ) : userState ? ( //En caso de haber usado el renting -- Borrar el comentario
        <>
          <MyNavbar history={props.history}/>
          <Paper elevation={0} className={classes.root}>
            <Container className={classes.image}>
              <Typography>Hello, world</Typography>
              <Button onClick={redirectToParking}>Accept</Button>
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
