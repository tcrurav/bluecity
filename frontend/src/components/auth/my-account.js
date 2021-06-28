import React, { useEffect, useState } from 'react';
import { MyNavbar } from '../ui/navbar/my-navbar';
import { Footer } from '../ui/footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { MyContainer } from '../ui/my-container';
import FlagIcon from '../languages/flagIcon';
import { BallBeat } from "react-pure-loaders";

// import { CLOSE_DISTANCE_TO_PARKING } from '../mapping/availability/constants/constants';

import { getApiUser, getDistanceToOpenBox, setApiUser, setDistanceToOpenBox, removeUserSession } from '../../utils/common';

import UserDataService from '../../services/user.service';
import BoxDataService from '../../services/box.service';

/*-----------------------------------
        Material-UI Imports
------------------------------------*/
import { Select, MenuItem, Divider } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Grid from "@material-ui/core/Grid";

import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  rootTab: {
    marginTop: "3.5em",
    backgroundColor: theme.palette.background.paper,
  },
  buttonContainer: {
    marginTop: "1em"
  },
  margins: {
    marginTop: "1em",
    // marginBottom: "1em",
    marginLeft: "1em",
    marginRight: "1em"
  }
}));

export default function MyAccount(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [loadingState, setLoadingState] = useState(true);
  const { userId, history } = props;
  const [profileState, setProfileState] = useState(null);
  const [distanceToOpenBoxState, setDistanceToOpenBoxState] = useState("1");

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    let distance = getDistanceToOpenBox();
    setDistanceToOpenBoxState(distance);
  }, []);

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    setProfileState({
      ...profileState,
      language: event.target.value
    });
    UserDataService.update(userId, { language: event.target.value }).then(() => {
      let apiUser = getApiUser();
      apiUser.language = event.target.value;
      setApiUser(apiUser);
      console.log("language updated");
    }).catch(e => {
      console.log("error updating language");
    })
  };

  const getUser = () => {
    UserDataService.get(userId)
      .then(response => {
        setProfileState({
          name: response.data.name,
          email: response.data.username,
          language: response.data.language,
          isAdmin: response.data.isAdmin
        });
        setLoadingState(false);
      })
      .catch(e => {
        console.log("error retrieving user data");
      });
  }

  const deleteAccount = () => {
    UserDataService.delete(userId)
      .then(response => {
        removeUserSession();
        console.log("User account deleted");
        history.push('/');
      })
      .catch(e => {
        console.log("error deleting user account");
      });
  }

  const reset = () => {
    //Reset parkingId=8 for testing purposes in Museo Elder
    BoxDataService.resetAllBoxesInAParking(8).then((res) => {
      console.log("reset successful");
    }).catch(e => {
      console.log("error resetting");
    });
  }

  const changeDistanceToOpenBox = (event) => {
    setDistanceToOpenBox(event.target.value);
    setDistanceToOpenBoxState(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteAccount();
    setOpen(false);
  };

  return (
    <>
      {loadingState ?
        <MyContainer>
          <Row className="justify-content-md-center h-50">
            <Col md={6} className="text-center mt-auto pb-5">
              <BallBeat color={"#123abc"} loading={loadingState} />
            </Col>
          </Row>
        </MyContainer>
        :
        <>
          <MyNavbar history={history} />

          <div className={classes.rootTab}>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange}>
                <Tab label={t('User Profile')} />
                <Tab label={t("Others")} />
              </Tabs>
            </AppBar>

            {value === 0 &&
              <Grid container className={classes.buttonContainer} direction="column">
                <Grid item xs={12} className={classes.margins}>
                  <p className="font-weight-bold">{t('Name')}</p>
                  <p className="text-capitalize">{profileState.name.toLowerCase()}</p>
                </Grid>
                <Grid item xs={12} className={classes.margins}>
                  <p className="font-weight-bold">Email</p>
                  <p className="text-lowercase">{profileState.email}</p>
                </Grid>
                <Grid item xs={12} className={classes.margins}>
                  <p className="font-weight-bold">{t('Language')}</p>
                  <Select labelId="language" id="select" value={profileState.language} onChange={changeLanguage}>
                    <MenuItem value="es">
                      <FlagIcon code="es" />&nbsp;Español</MenuItem>
                    <MenuItem value="es-CA">
                      <FlagIcon code="es-ca" />&nbsp;Catal&agrave;</MenuItem>
                    <MenuItem value="en">
                      <FlagIcon code="gb" />&nbsp;English</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            }
            {value === 1 &&
              <Grid container className={classes.buttonContainer} direction="column">
                <Grid item xs={12} className={classes.margins}>
                  <p>{`${t('If you delete your account all your data in Bluecity App will be erased')}.`}</p>
                  <Button className="mt-2" onClick={handleClickOpen} disabled={profileState.isAdmin}>{t('Delete account')}</Button>
                </Grid>
                {profileState.isAdmin ?
                  <>
                    <Grid item xs={12} className={classes.margins}>
                      <Divider className="mt-4" />
                    </Grid>
                    <Grid item xs={12} className={classes.margins}>
                      <p className="font-weight-bold">Admin Only Options:</p>
                      <Button onClick={reset}>Test Box Reset</Button>
                    </Grid>
                    <Grid item xs={12} className={classes.margins}>
                      <span className="font-weight-bold mt-4">Min. distance to open box:&nbsp;</span>
                      <Select className="mt-2" labelId="Distance to Open box" id="selectDistanceToOpenBox" value={distanceToOpenBoxState} onChange={changeDistanceToOpenBox}>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="100">100</MenuItem>
                        <MenuItem value="1000">1000</MenuItem>
                        <MenuItem value="10000">10000</MenuItem>
                      </Select>
                    </Grid>

                  </>
                  : <></>
                }
              </Grid>
            }
          </div>

          <Footer />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{t('Deleting your account...')}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`${t('You are deleting your account in Bluecity')}. ${t('If you delete your account all your data in Bluecity App will be erased')}. ${t('If you want to access the App later just log in again with your Gmail account')}.`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                {t('Cancel')}
              </Button>
              <Button onClick={handleDelete} variant="danger">
                {t('Delete account')}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      }
    </>
  );
}