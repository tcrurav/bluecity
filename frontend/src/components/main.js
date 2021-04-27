import React from "react";
import { MyNavbar } from "./ui/navbar/my-navbar";
import { Footer } from "./ui/footer";

/*-----------------------------------
        Material-UI Imports
------------------------------------*/
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import Paper from "@material-ui/core/Paper";

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
            <Button variant="contained" 
              className={classes.buttons} 
              onClick={() => props.history.push({
                pathname: "/renting",
                state: {data: 'Renting'}
              })}>
              Renting
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Footer />
    </>
  );
}
