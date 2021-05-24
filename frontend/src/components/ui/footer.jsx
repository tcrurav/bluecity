import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Link } from "@material-ui/core";
import Image from "material-ui-image";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
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

export function Footer() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
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
    </div>
  );
}
