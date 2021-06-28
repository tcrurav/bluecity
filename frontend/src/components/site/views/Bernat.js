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

const Bernat = ({ ...props }) => {
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
        <Typography align="center" variant="h2" component="p">Institut Bernat el Ferrer</Typography>
        {/* <Typography align="center" variant="h4" color="textSecondary" component="p">El centro</Typography> */}
      </div>
      <div className={classes.description}>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={6}>
            <Image className={classes.image} fluid width="50%" src="img/centro4.png"></Image>
          </Grid>
          <Grid item sm={6}>
            <Typography>
              El Instituto Bernat el Ferrer es actualmente un centro donde se imparten enseñanzas de ESO; de bachillerato de las modalidades humanística y social, científica y tecnológica; y ciclos formativos medios y superiores, de las familias administrativa, eléctrica-electrónica e informática.
              También se imparte el curso de acceso a ciclos de grado superior (CAS). Se inició su actividad en 1978-79, y fue creado como instituto de Formación Profesional.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default Bernat;