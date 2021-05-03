import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Image from "material-ui-image";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import mobileLogo from './assets/images/mobile-logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "10vh",
    },
    image: {
        maxWidth: "20vw",
        backgroundColor: "red"
    },
    buttonContainer: {
        justify: "center",
        alignItems: "center",
        //justifyContent: "center",
    },
    buttons: {
        marginTop: "1vh",
        backgroundColor: "#00a9f4",
        "&:hover": {
            backgroundColor: "#007ac1",
            color: "white",
        },
    },
    footer: {
        top: 0,
    },
}));

const MySiteScreen = () => {
    const classes = useStyles();

    return (
        <>
            <Grid
                container
                className={classes.root}
            >
                <Grid item xs={6}>
                    <Container className={classes.image}>
                        <Typography>Hello, world</Typography>
                        <Button>Accept</Button>
                    </Container>
                </Grid>
                <Grid item xs={6}>
                    <Container className={classes.image}>
                        <Image src={mobileLogo} aspectRatio={5 / 9} />
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}

export default MySiteScreen;