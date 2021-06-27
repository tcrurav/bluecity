import React from 'react';

import { Image } from 'react-bootstrap';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { Divider } from '@material-ui/core';

import { useMediaQuery } from 'react-responsive';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2em"
  },
  media: {
    height: 140,
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: "2em",
      marginRight: "2em",
      marginTop: "5em",
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: "2em",
      marginRight: "2em",
      marginTop: "5em"
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: "16em",
      marginRight: "16em",
      marginBottom: "5em",
      marginTop: "5em"
    },
  },
  image: {
    [theme.breakpoints.down('sm')]: {

    },
    [theme.breakpoints.up('md')]: {

    },
    [theme.breakpoints.up('lg')]: {
      marginTop: "5em",
    },
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    
},
}));

const Workflow = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return (
    <>
      <div className={classes.container}>
        <Divider />
        <Typography align="center" variant="h2" component="p">Nuestro trabajo</Typography>
        <Typography align="center" variant="h4" color="textSecondary" component="p">Un pequeño resumen de nuestro trabajo en el proyecto</Typography>
        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h1">La idea</Typography>
            <Typography>El comienzo de la idea fue el curso pasado, cuando nuestro tutor nos propuso este proyecto como algo innovador y un reto a afrontar. Al principio nos pudimos organizar y sacábamos los avances semanalmente en clase todos juntos. Hasta que, como ya todos conocemos, llegó una pandemia mundial y todo ello acarreó ciertas consecuencias, la más importante, el hecho de no poder disfrutar de esta nueva experiencia presencialmente con nuestros compañeros. Según fueron mejorando las cosas aprendimos a organizarnos y seguimos con el trabajo desde nuestras casas, lo que supuso un reto ya que no contábamos con ese “feedback” directo que puede dar la presencialidad.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Image className={classes.image} width="30%" src="img/idea.png" fluid />
          </Grid>
          {
            isMobile ?
            <>
            <Grid item xs={12} sm={8}>
              <Typography variant="h1">Explicación</Typography>
              <Typography>Dado que somos alumnos de un ciclo superior centrado en la programación, nuestra parte giraba alrededor de desarrollar una app completa que pudiera facilitar el uso de esta plataforma que a día de hoy es una realidad y que en aquel entonces parecía algo a alcanzar. Sumado al reto ya planteado también tenemos la implicación de metodologías y tecnologías que no habíamos profundizado tanto y que supimos interiorizar conceptos todos juntos aún dándose esta situación. Por parte general del equipo estamos todos de acuerdo con que ha sido una experiencia reconfortante y de crecimiento general que esperamos llegue tan lejos como pueda.</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Image className={classes.image} width="30%" src="img/note.png" fluid />
            </Grid>
            </>
            : 
            <>
             <Grid item xs={12} sm={4}>
              <Image className={classes.image} width="30%" src="img/note.png" fluid />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h1">Explicación</Typography>
              <Typography>Dado que somos alumnos de un ciclo superior centrado en la programación, nuestra parte giraba alrededor de desarrollar una app completa que pudiera facilitar el uso de esta plataforma que a día de hoy es una realidad y que en aquel entonces parecía algo a alcanzar. Sumado al reto ya planteado también tenemos la implicación de metodologías y tecnologías que no habíamos profundizado tanto y que supimos interiorizar conceptos todos juntos aún dándose esta situación. Por parte general del equipo estamos todos de acuerdo con que ha sido una experiencia reconfortante y de crecimiento general que esperamos llegue tan lejos como pueda.</Typography>
            </Grid>
            </>
          }
        </Grid>
      </div>
    </>
  );
}

export default Workflow;