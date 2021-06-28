import React, { useEffect } from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2em"
  },
  description: {
    [theme.breakpoints.down('xs')]: {
      marginRight: "1em",
      marginLeft: "1em"
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: "2em",
      marginRight: "2em"
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: "20em",
      marginRight: "16em"
    }
  },
  titleHeader: {
    marginTop: "2em"
  }
}));

const Terradas = ({ ...props }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const classes = useStyles();

  const outerClasses = classNames(
    'hero section center-content',
    // topOuterDivider && 'has-top-divider',
    // bottomOuterDivider && 'has-bottom-divider',
    // hasBgColor && 'has-bg-color',
    // invertColor && 'invert-color',
    "illustration-section-01"
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className={classes.titleHeader}>
        <Typography align="center" variant="h2" component="p">Institut Esteve Terradas i Illa</Typography>
        {/* <Typography align="center" variant="h4" color="textSecondary" component="p">El centro</Typography> */}
      </div>
      <div className={classes.description}>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={6}>
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
    </section>
  );
}

export default Terradas;