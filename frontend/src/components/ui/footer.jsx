import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Link } from "@material-ui/core";
import Image from "material-ui-image";
import { useTranslation } from 'react-i18next';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { DisclaimerLinkText } from "../disclaimer-app/disclaimer-link-text";

const useStyles = makeStyles((theme) => ({
  myBottomStripes: {
    marginTop: "1em"
  },
  myStripes: {
    margin: "auto",
    width: "4em",
    height: "0.3em",
    borderBottom: "2px solid white",
    color: "white",
    // position: "absolute"
  },
  mySwipe: {
    backgroundColor: "#00569F",
    height: '12.5em',
    width: "100%"
  },
  root: {
    backgroundColor: "#00569F",
    position: "absolute",
    display: "flex",
    bottom: 0,
    minHeight: '10vh',
    width: "100%"
  },
  imageGrid: {
    maxWidth: "6em",
    maxHeight: "auto",
    paddingTop: "1vh",
    paddingBottom: "1vh"
  },
  textGrid: {
    textAlign: "center",
    paddingTop: "1vh",
    paddingBottom: "1vh",
    color: "#fafafa",
  },
  links: {
    "&:hover, visited": {
      color: "#fafafa",
    }
  }
}));

export function Footer({ webDisclaimer }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <SwipeableBottomSheet overflowHeight={18}>
      <div className={classes.mySwipe}>
        <Grid container >
          <Grid item xs={12} className={classes.myStripesTogether}>
            <div className={classes.myStripes}></div>
            <div className={classes.myStripes}></div>
          </Grid>
          <Grid className={classes.myBottomStripes}></Grid>
          <Grid item xs={2} md={4} className={classes.imageGrid}>
            <Image src="img/bluecity-favicon.png" aspectRatio={1 / 1} color="" />
          </Grid>
          <Grid item xs={10} md={8} className={classes.textGrid}>
            <Typography variant="body1" fontWeight="fontWeightBold">{t('Participating Organizations')}</Typography>
            <Typography variant="body2">
              <Link href="http://www.ieselrincon.es" color="inherit" className={classes.links}>IES El rincón</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="https://moodle.bernatelferrer.cat/" color="inherit" className={classes.links}>Institut Bernat el Ferrer</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="http://iesesteveterradas.cat/" color="inherit" className={classes.links}>Institut Esteve Terradas</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="https://www.furiouskoalas.com/" color="inherit" className={classes.links}>Furious Koalas</Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <p className="text-center">
              {webDisclaimer == "true" ?
                <a href="/disclaimer" className="text-white">
                  <DisclaimerLinkText />
                </a>
                :
                <a href="/disclaimer-app" className="text-white">
                  <DisclaimerLinkText />
                </a>
              }

            </p>
          </Grid>
        </Grid>
      </div>
      {/* <div className={classes.root}>
        <Grid container >
          <Grid item xs={2} md={4} className={classes.imageGrid}>
            <Image src="img/bluecity-favicon.png" aspectRatio={1 / 1} color="" />
          </Grid>
          <Grid item xs={10} md={8} className={classes.textGrid}>
            <Typography variant="body1" fontWeight="fontWeightBold">{t('Participating Organizations')}</Typography>
            <Typography variant="body2">
              <Link href="http://www.ieselrincon.es" color="inherit" className={classes.links}>IES El rincón</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="https://moodle.bernatelferrer.cat/" color="inherit" className={classes.links}>Institut Bernat el Ferrer</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="http://iesesteveterradas.cat/" color="inherit" className={classes.links}>Institut Esteve Terradas</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="https://www.furiouskoalas.com/" color="inherit" className={classes.links}>Furious Koalas</Link>
            </Typography>
          </Grid>
        </Grid>
      </div> */}
    </SwipeableBottomSheet>
  );
}
