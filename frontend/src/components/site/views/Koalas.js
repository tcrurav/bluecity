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
    marginTop: "-2em"
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

const Koalas = ({ ...props }) => {
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
        <Typography align="center" variant="h2" component="p">Furious Koalas</Typography>
        {/* <Typography align="center" variant="h4" color="textSecondary" component="p">El centro</Typography> */}
      </div>
      <div className={classes.description}>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={6}>
            <Image className={classes.image} fluid width="50%" src="img/centro6.png"></Image>
          </Grid>
          <Grid item sm={6}>
            <Typography>
              Proporcionamos servicios de alta calidad en las áreas de Gamificación, Juegos Serios, Simuladores y Visión por Computador.

              Con más de 15 años de experiencia en el seno de los grupos de investigación Oreto y Artificial Intelligence and Representation, pertenecientes a la Universidad de Castilla-La Mancha, Furious Koalas S.L. ofrece resultados profesionales en el contexto del diseño, desarrollo y despliegue de soluciones interactivas.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default Koalas;