/* global gapi */
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { removeUserSession } from "../../utils/common";
import styled from "styled-components";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

/* const MyIcon = styled.img`
  width: 1em;
`;

const MyNavbarContainer = styled(Navbar)`
  margin-bottom: 2em;
`; */

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function MyNavbar(props) {
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
        <ListItemLink href="/main">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Main" />
        </ListItemLink>
        <ListItemLink href="/my-account">
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="My Account" />
        </ListItemLink>
        <ListItemLink href="/parking">
          <ListItemIcon>
            <LocalParkingIcon />
          </ListItemIcon>
          <ListItemText primary="Parking" />
        </ListItemLink>
        <ListItemLink href="/renting">
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText primary="Renting" />
        </ListItemLink>
        <ListItemLink href="/contact">
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemLink>
      </List>
    </div>
  );

  return (
    /* <MyNavbarContainer bg="light" expand="md" fixed="top">
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
            <Nav.Link onClick={this.handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </MyNavbarContainer> */
    <div className={classes.root}>
      <React.Fragment key="left">
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Bluecity
            </Typography>
            <Button color="inherit" endIcon={<ExitToAppIcon/>} onClick={handleLogout}>logout</Button>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
