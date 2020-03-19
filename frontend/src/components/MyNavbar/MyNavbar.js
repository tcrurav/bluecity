import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export class MyNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="/main">Bluecity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/main">Main</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/parking-search">Parking Search</Nav.Link>
            <Nav.Link href="/rent">Rent</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}