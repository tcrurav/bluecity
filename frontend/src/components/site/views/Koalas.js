import React, { useEffect } from 'react';

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
    image: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
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

const Koalas = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const classes = useStyles();

    return (
        <>
            <div className={classes.titleHeader}>
                <Typography align="center" variant="h2" component="p">La empresa</Typography>
                {/* <Typography align="center" variant="h4" color="textSecondary" component="p">El centro</Typography> */}
            </div>
            <div className={classes.description}>
                <Grid container className={classes.root}>
                    <Grid item sm={6}>
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
        </>
    );
}

export default Koalas;