import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "1em",
        marginLeft: "3em"
    },
    media: {
        height: 140,
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            margin: "2em",
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: "2em",
            marginRight: "2em"
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: "16em",
            marginRight: "16em",
            marginBottom: "2em"
        },
    },
}));

const Images = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
                <Grid container className={classes.root} spacing={10}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={171} height={180} />
                        <Typography variant="h2" component="h5">Carlos Sánchez Rodríguez</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">Estudiante</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={171} height={180} />
                        <Typography variant="h2" component="h5">Aarón Medina Melián</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">Estudiante</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={171} height={180} />
                        <Typography variant="h2" component="h5">Tiburcio Cruz</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">Profesor</Typography>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Images;