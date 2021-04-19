import React, { useEffect, useState } from 'react';
import { MyNavbar } from '../ui/navbar/my-navbar';
import { Footer } from '../ui/footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MyContainer } from '../ui/my-container';
import FlagIcon from '../languages/flagIcon';
import { BallBeat } from "react-pure-loaders";

import { getApiUser, setApiUser } from '../../utils/common';

import UserDataService from '../../services/user.service';

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

  useEffect(() => {
    getUser();
  }, []);

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    setProfileState({
      ...profileState,
      language: event.target.value
    });
    UserDataService.update(userId, { language: event.target.value }).then(()=>{
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
        // console.log(response)
        setProfileState({
          name: response.data.name,
          email: response.data.username,
          language: response.data.language
        });
        setLoadingState(false);
      })
      .catch(e => {
        console.log("error retrieving user data");
      });
  }

  return (
    <>
      { loadingState ?
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
                    <MenuItem value="es-ca">
                      <FlagIcon code="es-ca" />&nbsp;Catalá</MenuItem>
                    <MenuItem value="en">
                      <FlagIcon code="gb" />&nbsp;English</MenuItem>
                  </Select>
              </Col>
            </Row>
          </MyContainer>
          <Footer />
        </>
      }
    </>
  );
}