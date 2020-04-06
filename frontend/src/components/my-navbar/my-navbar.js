/* global gapi */
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect } from 'react-router-dom';

export class MyNavbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: true
    }

    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {

    // const successCallback = this.onSuccess.bind(this);

    //if (this.state.isSignedIn) return;

    window.gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '847633477961-hcf33ro35b7kce8856c1ae4lp9bd5aoq.apps.googleusercontent.com',
      });

      //this.auth2.attachClickHandler(document.querySelector('#login-button'), {}, this.onSuccess.bind(this));

      this.auth2.then(() => {
        console.log('on init');
        const isSignedIn = this.auth2.isSignedIn.get();
        if (this.state.isSignedIn !== isSignedIn) {
          this.setState({
            isSignedIn: isSignedIn,
          });
        }
      });
    });

    // window.gapi.load('signin2', function () {
    //   // Method 3: render a sign in button
    //   // using this method will show Signed In if the user is already signed in
    //   var opts = {
    //     width: 200,
    //     height: 50,
    //     client_id: '847633477961-hcf33ro35b7kce8856c1ae4lp9bd5aoq.apps.googleusercontent.com',
    //     onsuccess: successCallback
    //   }
    //   gapi.signin2.render('login-button', opts)
    // })
  }

  // onSuccess() {
  //   console.log('on success')
  //   this.setState({
  //     isSignedIn: true,
  //     err: null
  //   })
  // }

  signOut() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
      this.setState({
        isSignedIn: false
      });
    });
  }

  // doSignOut(){
  //   this.setState({
  //     isSignedIn: true
  //   });
  // }

  render() {
    const isSignedIn = this.state.isSignedIn;
    return (
      <>
        {isSignedIn ? (
          <Navbar bg="light" expand="md">
            <Navbar.Brand href="/main">Bluecity</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/main">Main</Nav.Link>
                <Nav.Link href="/parking-search">Parking Search</Nav.Link>
                <Nav.Link href="/rent">Rent</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link onClick={this.signOut}>Sign out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        ) : (
            <Redirect to={{
              pathname: "/login",
            }} />


          )}
      </>
    );
  }
}