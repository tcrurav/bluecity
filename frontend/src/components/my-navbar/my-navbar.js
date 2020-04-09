/* global gapi */
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { getUser, removeUserSession } from '../../utils/common';

export class MyNavbar extends React.Component {

  constructor(props) {
    super(props);

    console.log("MyNavbar")
    console.log(this.props.history);
    // this.user = getUser();
    this.handleLogout = this.handleLogout.bind(this);
  }

  // handle click event of logout button
  handleLogout() {
    console.log("handleLogout")
    console.log(this.props.history);
    removeUserSession();
    this.props.history.push('/login');
  }

  render() {
    return (
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
            <Nav.Link onClick={this.handleLogout}>Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}