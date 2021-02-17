/* global gapi */
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { removeUserSession } from "../utils/common";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faParking,
  faCreditCard,
  faHome,
  faSignOutAlt,
  faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const MyIcon = styled.img`
  width: 1em;
`;

const MyNavbarContainer = styled(Navbar)`
  margin-bottom: 2em;
`;

// navbar styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export function MyNavbar(props) {

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  const classes = useStyles();

  return (
    <MyNavbarContainer bg="light" expand="md" fixed="top">
        <Navbar.Brand href="/main"><MyIcon src="img/bluecity-icon.jpg" alt="icon"/> Bluecity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/main"><FontAwesomeIcon icon={faHome} /> Main</Nav.Link>
            <Nav.Link href="/my-account"><FontAwesomeIcon icon={faUser} /> My account</Nav.Link>
            <Nav.Link href="/parking"><FontAwesomeIcon icon={faParking} /> Parking</Nav.Link>
            <Nav.Link href="/renting"><FontAwesomeIcon icon={faCreditCard} /> Renting</Nav.Link>
            <Nav.Link href="/contact"><FontAwesomeIcon icon={faMapMarkerAlt} /> Contact</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </MyNavbarContainer>

    // <div className={classes.root}>
    //   <AppBar position="fixed">
    //     <Toolbar>
    //       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" className={classes.title}>
    //         News
    //       </Typography>
    //       <Button color="inherit" onClick={handleLogout}>Sign out</Button>
    //     </Toolbar>
    //   </AppBar>
    // </div>
  );
}
