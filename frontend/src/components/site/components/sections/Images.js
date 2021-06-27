import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "1em",
  },
  container: {
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

const Images = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.titleHeader}>
        <Typography align="center" variant="h2" component="p">IES El Rincón</Typography>
        {/* <Typography align="center" variant="h4" color="textSecondary" component="p">El centro</Typography> */}
      </div>
      <div className={classes.description}>
        <Grid container className={classes.root}>
          <Grid item sm={6}>
            <Image className={classes.image} fluid width="50%" src="img/centro1.png"></Image>
          </Grid>
          <Grid item sm={6}>
            <Typography>
              El Instituto de Educación Secundaria  El Rincón está ubicado en la ciudad de Las Palmas de Gran Canaria (Las Palmas, España).

              En el centro se puede cursar la ESO, Bachillerato, FP básica, Ciclos superiores y medios de Formación Profesional de la Familia de Informática y Comunicaciones en turnos de diurno (mañana/tarde) y nocturno (semipresencial).
              Además posee un aula enclave, para alumnado con necesidades educativas especiales.
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </div>

      <div className={classes.title}>
        <Typography align="center" variant="h2" component="p">Conócenos</Typography>
        <Typography align="center" variant="h4" color="textSecondary" component="p">La plantilla que ha trabajado en el proyecto</Typography>
      </div>
      <div className={classes.container}>
        <Grid container className={classes.root} spacing={10}>
          <Grid item xs={12} sm={6} md={4}>
            <Image roundedCircle className={classes.image} src="img/carlos.jpg" rounded width={250} height={300} />
            <Typography variant="h2" component="h5">Carlos Sánchez</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Estudiante</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Image roundedCircle className={classes.image} src="img/user_default.png" rounded width={250} />
            <Typography variant="h2" component="h5">Sebastián Moreno</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Estudiante </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Image roundedCircle className={classes.image} src="img/aaron.jpg" rounded width={250} height={300} />
            <Typography variant="h2" component="h5">Aarón Medina</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Estudiante</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Image roundedCircle className={classes.image} src="img/alejandro.png" rounded width={250} height={300} />
            <Typography variant="h2" component="h5">Alejandro Pazos</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Estudiante</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Image roundedCircle className={classes.image} src="img/gabriel.png" rounded width={250} height={300} />
            <Typography variant="h2" component="h5">Gabriel Rodríguez</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Estudiante</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Image roundedCircle className={classes.image} src="img/juan.png" rounded width={250} height={300} />
            <Typography variant="h2" component="h5">Juan Thielmann</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Estudiante</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Image roundedCircle className={classes.image} src="img/david.jpg" rounded width={250} height={300} />
            <Typography variant="h2" component="h5">David Freyre</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Estudiante</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Image roundedCircle className={classes.image} src="img/sonia.png" rounded width={250} height={300} />
            <Typography variant="h2" component="h5">Sonia Castro</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Estudiante</Typography>
          </Grid>
        </Grid>
        {/* <Divider/> */}
      </div>

    </>
  );
}

export default Images;