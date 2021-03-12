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
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      color: "danger",
    },
  },
  container: {
    marginBottom: "10vh"
  },
  image: {
    marginTop: "10vh",
    width: "50%",
    alignItems: "center"
  }
}));

export function Main(props) {
  const classes = useStyles();

  return (
    <>
      <MyNavbar history={props.history} />
      <Container className={classes.container}>

        <Card className= {classes.image}>
          <CardContent>
            <CardMedia image="img/bluecity.png"/>
          </CardContent>
        </Card>


        {/* <Grid container spacing={3} className={classes.image}>
          <Grid item xs={12} className="mt-3">
            <Image aspectRatio={(16/9)} src="img/bluecity.png" alt="logo"/>
          </Grid>
          <Grid container spacing={3} className="pt-5">
            <Grid item xs={12} className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                className="mt-2"
                onClick={() => {
                  props.history.push("/parking");
                }}
              >
                Parking
                </Button>
            </Grid>
            <Grid item xs={12} className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                className="mt-2"
                onClick={() => {
                  props.history.push("/renting");
                }}
              >
                Renting
                </Button>
            </Grid>
          </Grid>
        </Grid> */}
      </Container>
      <Footer />
    </>
  );
}
