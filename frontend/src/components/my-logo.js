import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
// import Image from "material-ui-image";

const useStyles = makeStyles({
  bgImage: {
    /* Full height */
    height: "100vh",
    // width: "100vw",

    /* Center and scale the image nicely */
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",

    // position: "relative",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // zIndex: -1
  },
});

export function MyLogo() {
  const classes = useStyles();
  const history = useHistory();

  function handleClick() {
    console.log("un click")
    history.push("/main");
  }

  return (
    <div
      className={classes.bgImage}
      style={{
        backgroundImage: `url("logo.png")`,
      }}

      onClick={handleClick}
    >
      {/* <button onClick={handleClick}>Hola</button> */}
    </div>
  )
}