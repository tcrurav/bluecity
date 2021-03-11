/* global gapi */
import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { removeUserSession } from "../../../utils/common";
import UserDataService from '../../../services/user.service';
import styled from "styled-components";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { ListItemAvatar } from "@material-ui/core";
import { API_USER } from "../../mapping/availability/constants/constants";

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
  accordion: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
}));

export function MyNavbar(props) {

  const [stateUser, setStateUser] = useState(
    {
      name: "",
      email: "",
    }
  )

  const getUser = useCallback(
    async () => {
      const newStateUser = await UserDataService.get(API_USER.id)
      
      setStateUser({
        ...stateUser,
        name: newStateUser.data.name,
        email: newStateUser.data.email
      })
    }, [API_USER.id, setStateUser]
  );

  /* const getUser = () => {
    UserDataService.get(props.userId)
      .then(response => {
        setStateUser({
          name: response.data.name,
          email: response.data.username,
          loading: false
        })
      })
      .catch(e => {
        console.log(e);
      });
  } */

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

  function ListItemLink(props, anchor) {
    return (
      <ListItem
        button
        component="a"
        onClick={toggleDrawer("left", false)}
        {...props}
      />
    );
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      //onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
        <CustomizedAccordions 
          stateUser={stateUser}
        />
        <Divider />
        <ListItemLink href="/main">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Main" />
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

  const Accordion = withStyles({
    root: {
      border: "1px solid rgba(0, 0, 0, .125)",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionSummary = withStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
      },
    },
    content: {
      "&$expanded": {
        margin: "12px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  function CustomizedAccordions({stateUser}) {
    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    const avatarLetter = stateUser.name.charAt(0);
    const onlyNameString = stateUser.name.split(" ")[0];

    return (
      <div>
        <Accordion square onChange={handleChange("panel1")}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Grid container direction="row" alignItems="center">
              <Grid item xs={2}>
                <Avatar>{avatarLetter}</Avatar>
              </Grid>
              <Grid item xs={8}>
                <Container>
                  <Typography>{onlyNameString}</Typography>
                </Container>
              </Grid>
              <Grid item xs={2}>
                <ExpandMoreIcon />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <ListItemLink href="my-account">
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItemLink>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.error(error);
    }
  }, [setStateUser]); 

  return (
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
