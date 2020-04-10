/* global gapi */
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { removeUserSession } from '../utils/common';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faParking, faCreditCard, faHome, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

const MyIcon = styled.img`
  width: 1em;
`;

export class MyNavbar extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  // handle click event of logout button
  handleLogout() {
    removeUserSession();
    this.props.history.push('/login');
  }

  render() {
    return (
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="/main"><MyIcon src="img/bluecity-icon.jpg" alt="icon"/> Bluecity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/main"><FontAwesomeIcon icon={faHome} /> Main</Nav.Link>
            <Nav.Link href="/parking-search"><FontAwesomeIcon icon={faParking} /> Parking</Nav.Link>
            <Nav.Link href="/rent"><FontAwesomeIcon icon={faCreditCard} /> Renting</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={this.handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}