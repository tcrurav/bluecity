import React from "react";
import { MyNavbar } from "./ui/navbar/my-navbar";
//import Button from 'react-bootstrap/Button';
import { Footer } from "./ui/footer";

/*-----------------------------------
        Material-UI Imports
------------------------------------*/
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
  root: {},
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
    backgroundColor: '#00a9f4',
    '&:hover': {
      backgroundColor: '#007ac1',
      color: 'white'
    }
  }
}));

export function Main(props) {
  const classes = useStyles();

  return (
    <>
      <MyNavbar history={props.history} />
      <Paper elevation={2} className={classes.root}>
        <Container className={classes.image}>
          <Image src="img/bluecity.png" aspectRatio={16 / 9} />
        </Container>
        <Grid container className={classes.buttonContainer} direction="column">
          <Grid item xs={12}>
            <Button variant="contained" className={classes.buttons} onClick={() => props.history.push("/parking")}>
              Parking
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" className={classes.buttons} onClick={() => props.history.push("/renting")}>
              Renting
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Footer />
    </>
  );
}
