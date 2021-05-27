import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


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
            marginBottom: "2em"
        },
    },
    title: {
        marginTop: "2em"
    }
}));

const Images = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.title}>
                <Typography align="center" variant="h2" component="p">Conócenos</Typography>
                <Typography align="center" variant="h4" color="textSecondary" component="p">La plantilla que ha trabajado en el proyecto</Typography>
            </div>
            <div className={classes.container}>
                <Grid container className={classes.root} spacing={10}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={250} height={300} />
                        <Typography variant="h2" component="h5">Carlos Sánchez</Typography>
                        <Typography variant="body" color="textSecondary" component="p">Estudiante Desarrollo de Aplicaciones Multiplataforma</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={250}/>
                        <Typography variant="h2" component="h5">Sebastián Moreno</Typography>
                        <Typography variant="body" color="textSecondary" component="p">Estudiante </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={250} height={300} />
                        <Typography variant="h2" component="h5">Aarón Medina</Typography>
                        <Typography variant="body" color="textSecondary" component="p">Estudiante Desarrollo de Aplicaciones Multiplataforma</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={250} height={300} />
                        <Typography variant="h2" component="h5">Alejandro Pazos</Typography>
                        <Typography variant="body" color="textSecondary" component="p">Estudiante</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={250} height={300} />
                        <Typography variant="h2" component="h5">Gabriel Rodríguez</Typography>
                        <Typography variant="body" color="textSecondary" component="p">Estudiante</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={250} height={300} />
                        <Typography variant="h2" component="h5">Juan Thielman</Typography>
                        <Typography variant="body" color="textSecondary" component="p">Estudiante Desarrollo de Aplicaciones Multiplataforma</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={250} height={300} />
                        <Typography variant="h2" component="h5">David Freyre</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">Estudiante</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Image src="https://preview.cruip.com/tidy/images/team-member-01.jpg" rounded width={250} height={300} />
                        <Typography variant="h2" component="h5">Sonia Castro</Typography>
                        <Typography variant="body" color="textSecondary" component="p">Estudiante</Typography>
                    </Grid>
                </Grid>
                {/* <Divider/> */}
            </div>
            
        </>
    );
}

export default Images;