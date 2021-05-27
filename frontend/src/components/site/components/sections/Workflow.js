import React from 'react';

import { Image } from 'react-bootstrap';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import step0Short from '../../assets/images/step-0-short.png';
import { Divider } from '@material-ui/core';


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
      marginBottom: "2em",
      marginTop: "5em"
    },
  },
}));

const Workflow = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Divider />
        <Typography align="center" variant="h2" component="p">Nuestro trabajo</Typography>
        <Typography align="center" variant="h4" color="textSecondary" component="p">Un pequeño resumen de nuestro trabajo en el proyecto</Typography>
        <Grid container className={classes.root} spacing={10}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h1">Lorem Ipsum dolor sit amet</Typography>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus risus suscipit nisi porta, et elementum magna aliquam. Donec aliquam euismod tortor, in laoreet lacus suscipit non. Proin a turpis sed nisi pellentesque eleifend vel sit amet metus. Sed sodales fermentum sodales. Aenean posuere sem id tortor tincidunt eleifend. Pellentesque a libero id neque viverra fringilla at vel purus. Duis volutpat mauris vel arcu tempus bibendum vel at nunc.</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Image width="30%" src={step0Short} fluid />
          </Grid>
        </Grid>
        <Grid container className={classes.root} spacing={10}>
          <Grid item xs={12} sm={6}>
            <Image width="30%" src={step0Short} fluid />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h1">Lorem Ipsum dolor sit amet</Typography>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus risus suscipit nisi porta, et elementum magna aliquam. Donec aliquam euismod tortor, in laoreet lacus suscipit non. Proin a turpis sed nisi pellentesque eleifend vel sit amet metus. Sed sodales fermentum sodales. Aenean posuere sem id tortor tincidunt eleifend. Pellentesque a libero id neque viverra fringilla at vel purus. Duis volutpat mauris vel arcu tempus bibendum vel at nunc.</Typography>
          </Grid>
        </Grid>
        <Divider />
      </div>
    </>
  );
}

export default Workflow;