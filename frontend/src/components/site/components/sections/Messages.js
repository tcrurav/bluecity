import React from 'react';

import { Image } from 'react-bootstrap';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const Messages = () => {
  const classes = useStyles();

  return (
    <>
    
      <div className={classes.container}>
      <Image fluid width="20%" src="img/centro1.png"></Image>
        <Grid container className={classes.root} spacing={10}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    C
              </Avatar>
                }
                title="Carlos Sánchez"
                subheader="Estudiante"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Donec tincidunt volutpat felis, efficitur gravida ex volutpat ac. Ut urna est, interdum non imperdiet nec, sagittis ac justo.
                  Vivamus at mollis lectus. Cras mauris velit, efficitur ac euismod aliquam, placerat et risus.
            </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    A
              </Avatar>
                }
                title="Aarón Medina"
                subheader="Estudiante"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Tremenda puta mierda es el CSS hijos de puta.
            </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    T
              </Avatar>
                }
                title="Sebastián Moreno"
                subheader="Estudiante"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Donec tincidunt volutpat felis, efficitur gravida ex volutpat ac. Ut urna est, interdum non imperdiet nec, sagittis ac justo.
                  Vivamus at mollis lectus. Cras mauris velit, efficitur ac euismod aliquam, placerat et risus.
            </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    A
              </Avatar>
                }
                title="Aarón Medina Melián"
                subheader="Estudiante"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Donec tincidunt volutpat felis, efficitur gravida ex volutpat ac. Ut urna est, interdum non imperdiet nec, sagittis ac justo.
                  Vivamus at mollis lectus. Cras mauris velit, efficitur ac euismod aliquam, placerat et risus.
            </Typography>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </div>
    </>
  );
}

export default Messages;