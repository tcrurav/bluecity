/* global gapi */
import React from 'react';
import MyGoogleLoginButton from '../ui/my-google-login-button';
import { setUserSession } from '../../utils/common';
import UserDataService from '../../services/user.service';

import DisclaimerModal from '../disclaimer-app/disclaimer-modal';

// I have implemented the solution of this url:
// https://w3path.com/react-google-login-with-example/

export class MyLoginWithGoogle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      googleUser: null
    }

    this.prepareLoginButton = this.prepareLoginButton.bind(this);
    this.googleSDK = this.googleSDK.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  googleSDK() {
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
    this.googleSDK();
  }

  saveUser(token, profile) {
    var data = {
      username: profile.getEmail(),
      name: profile.getName(),
      password: profile.getId(),
      language: 'es', //default language
      isAdmin: false
    };

    this.props.changeLoadingState(true);

    UserDataService.create(data)
      .then(response => {
        // console.log(response)
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
    this.auth2.attachClickHandler(document.querySelector('#login-button'), {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());

        //YOUR CODE HERE

        // this.saveUser(googleUser.getAuthResponse().id_token, profile);
        var data = {
          username: profile.getEmail(),
          password: profile.getId()
        };

        UserDataService.signin(data).then(response => {
          if(response.data.token !== null){
            console.log("La respuesta del servidor es")
            console.log(response)
            setUserSession(googleUser.getAuthResponse().id_token, profile, response.data.token, response.data.user);
            this.props.history.push("/main");
            return;
          }
          this.setState({
            ...this.state,
            googleUser: googleUser
          })
        }).catch(err => {
          console.log("some error logging in");
        });
        
      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  handleAccept() {
    const profile = this.state.googleUser.getBasicProfile();
    this.saveUser(this.state.googleUser.getAuthResponse().id_token, profile);
  };

  render() {
    return (
      <>
        <MyGoogleLoginButton />
        <DisclaimerModal open={this.state.googleUser !== null} handleAccept={this.handleAccept} />
      </>
    );
  }
}