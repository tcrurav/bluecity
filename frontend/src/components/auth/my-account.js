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

import { getApiUser, getDistanceToOpenBox, setApiUser, setDistanceToOpenBox } from '../../utils/common';

import UserDataService from '../../services/user.service';
import BoxDataService from '../../services/box.service';

/*-----------------------------------
        Material-UI Imports
------------------------------------*/
import { Select, MenuItem } from '@material-ui/core';

import { useTranslation } from 'react-i18next';

export default function MyAccount(props) {
  const { t, i18n } = useTranslation();
  const [loadingState, setLoadingState] = useState(true);
  const { userId, history } = props;
  const [profileState, setProfileState] = useState(null);
  const [distanceToOpenBoxState, setDistanceToOpenBoxState] = useState("1");

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

  const reset = () => {
    //Reset parkingId=7 for testing purposes in Citilab
    //Cambiar al 1 para el Museo Elder
    BoxDataService.resetAllBoxesInAParking(7).then((res) => {
      console.log("reset successful");
    }).catch(e => {
      console.log("error resetting");
    });
  }

  const changeDistanceToOpenBox = (event) => {
    setDistanceToOpenBox(event.target.value);
    setDistanceToOpenBoxState(event.target.value);
  }

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
          <MyContainer>
            <Row>
              <Col><h5>{t('User Profile')}</h5><br /></Col>
            </Row>
            <Row>
              <Col>
                <p className="font-weight-bold">{t('Name')}</p>
                <p className="text-capitalize">{profileState.name.toLowerCase()}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="font-weight-bold">Email</p>
                <p className="text-lowercase">{profileState.email}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="font-weight-bold">{t('Language')}</p>
                <Select labelId="language" id="select" value={profileState.language} onChange={changeLanguage}>
                  <MenuItem value="es">
                    <FlagIcon code="es" />&nbsp;Español</MenuItem>
                  <MenuItem value="es-CA">
                    <FlagIcon code="es-ca" />&nbsp;Catal&agrave;</MenuItem>
                  <MenuItem value="en">
                    <FlagIcon code="gb" />&nbsp;English</MenuItem>
                </Select>
              </Col>
            </Row>
            {profileState.isAdmin ?
              <>
                <Row>
                  <Col>
                    {/* <p className="font-weight-bold">Admin options:</p> */}
                    <Button className="mt-4" onClick={reset}>Test Box Reset</Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="font-weight-bold mt-4">Min. distance to open Box:&nbsp;</span>
                    <Select className="mt-4" labelId="Distance to Open Box" id="selectDistanceToOpenBox" value={distanceToOpenBoxState} onChange={changeDistanceToOpenBox}>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                      <MenuItem value="100">100</MenuItem>
                      <MenuItem value="1000">1000</MenuItem>
                      <MenuItem value="10000">10000</MenuItem>
                    </Select>
                  </Col>
                </Row>
              </>
              : <></>
            }
          </MyContainer>
          <Footer />
        </>
      }
    </>
  );
}