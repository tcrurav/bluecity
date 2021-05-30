import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "1em",
  },
  media: {
    height: 140,
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      marginRight: "2em",
      marginLeft: "4em"
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: "2em",
      marginRight: "2em"
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: "20em",
      marginRight: "16em",
      marginBottom: "2em",
    },
    textAlign: "center",
  },
  title: {
    marginTop: "2em"
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50",
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      marginRight: "2em",
      marginLeft: "4em"
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: "2em",
      marginRight: "2em"
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: "20em",
      marginRight: "16em",
      marginBottom: "2em",
    },
    marginTop: "2em",
  },
  titleHeader: {
    marginTop: "5em"
  }
}));

const Terradas = ({ changeWebpage }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const classes = useStyles();

  return (
    <>
      <div className={classes.titleHeader}>
        <Typography align="center" variant="h2" component="p">El centro</Typography>
        {/* <Typography align="center" variant="h4" color="textSecondary" component="p">El centro</Typography> */}
      </div>
      <div className={classes.description}>
        <Grid container className={classes.root}>
          <Grid item sm={6}>
            <Image className={classes.image} fluid width="50%" src="img/centro5.png"></Image>
          </Grid>
          <Grid item sm={6}>
            <Typography>
              Estamos situados en el centro de Cornellà de Llobregat (Baix Llobregat), muy cerca de Barcelona y bien comunicado con metro, Renfe, autobuses y Ferrocarriles.

              El hecho de tener más de 300 empresas colaboradoras, que cada curso se firmen aproximadamente 500 convenios de prácticas, así como las relaciones que mantenemos con empresarios, madres y padres de alumnos y ex-alumnos;
              nos autorizan a hacer una valoración positiva del trabajo hecho hasta ahora.
              </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Terradas;