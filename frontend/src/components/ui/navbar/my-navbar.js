import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { removeUserSession } from "../../../utils/common";
import UserDataService from "../../../services/user.service";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
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
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { getApiUser } from "../../mapping/availability/constants/constants";
import { getCurrentUserId } from "../../../utils/common";

/* const MyIcon = styled.img`
  width: 1em;
`;

const MyNavbarContainer = styled(Navbar)`
  margin-bottom: 2em;
`; */

const useStyles = makeStyles((theme) => ({
  expanded: {},
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
  appbar: {
    marginBottom: "10vh",
    background: "#00569F",
  },
}));

export const MyNavbar = React.memo(function MyNavbar(props) {
  const { t } = useTranslation();
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
  });

  const getUser = async () => {
    const newStateUser = await UserDataService.get(getApiUser().id);

    setStateUser((s) => ({
      ...s,
      name: newStateUser.data.name,
      email: newStateUser.data.email
    }));
  };

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState((s) => ({ ...s, [anchor]: open }));
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
        <CustomizedAccordions stateUser={stateUser} />
        <Divider />
        <ListItemLink href="/main">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t('Home')} />
        </ListItemLink>
        <ListItemLink
          onClick={() =>
            props.history.push({
              pathname: "/parking"
            })
          }>
          <ListItemIcon>
            <LocalParkingIcon />
          </ListItemIcon>
          <ListItemText primary={t('Parking')} />
        </ListItemLink>
        <ListItemLink
          onClick={() =>
            props.history.push({
              pathname: "/renting",
              state: {
                userId: getCurrentUserId(),
              },
            })
          }
        >
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText primary={t('Renting')} />
        </ListItemLink>
        <ListItemLink onClick={() =>
          props.history.push({
            pathname: "/contact"
          })
        }>
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary={t('Contact')} />
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

  function CustomizedAccordions({ stateUser }) {
    const { t } = useTranslation();
    // const [expanded, setExpanded] = React.useState("panel1");

    // const handleChange = (panel) => (event, newExpanded) => {
    //   setExpanded(newExpanded ? panel : false);
    // };

    const avatarLetter = stateUser.name.charAt(0);
    const onlyNameString = stateUser.name.split(" ")[0];

    return (
      <div>
        {/* <Accordion square onChange={handleChange("panel1")}> */}
        <Accordion square>
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
                <ListItemText primary={t('My Account')} />
              </ListItemLink>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={t('Logout')} />
              </ListItem>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className={classes.root}>
      <React.Fragment key="left">
        <AppBar position="fixed" className={classes.appbar}>
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
);
