/* global gapi */
import React from 'react';
import { MyGoogleLoginButton } from './my-google-login-button';
import { setUserSession } from '../utils/common';
import UserDataService from '../services/user.service';

// I have implemented the solution of this url:
// https://w3path.com/react-google-login-with-example/

export class MyLoginWithGoogle extends React.Component {
  constructor(props) {
    super(props);

    this.prepareLoginButton = this.prepareLoginButton.bind(this);
    this.googleSDK = this.googleSDK.bind(this);
  }

  googleSDK() {
    //console.log("googleSDK");
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: process.env.REACT_APP_CLIENT_ID,
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        window['googleSDKLoaded']();
        return;
      }
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }

  componentDidMount() {
    //console.log("componentDidMount")
    this.googleSDK();
  }

  saveUser(token, profile) {
    var data = {
      username: profile.getEmail(),
      name: profile.getName(),
      password: profile.getId(),
    };

    this.props.changeLoadingState(true);

    UserDataService.create(data)
      .then(response => {
        setUserSession(token, profile, response.data.token, response.data.user);

        // setTimeout(() => { //Just to simulate the timeout
          this.props.changeLoadingState(false);

          this.props.history.push("/main");
        // }, 2000);


      })
      .catch(e => {
        console.log(e);
      });
  }

  prepareLoginButton = () => {
    //console.log("prepareLoginButton")
    this.auth2.attachClickHandler(document.querySelector('#login-button'), {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());

        //YOUR CODE HERE

        this.saveUser(googleUser.getAuthResponse().id_token, profile);

      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  render() {
    return (
        <MyGoogleLoginButton />
    );
  }
}