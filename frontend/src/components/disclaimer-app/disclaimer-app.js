import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from "react-router-dom";

import Disclaimer from '../site/views/Disclaimer';
import { Footer } from '../ui/footer';

import { MyNavbar } from "../ui/navbar/my-navbar";

export function DisclaimerApp(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  let history = useHistory();

  useEffect(() => {
    if (!isMobile) {
      history.push("/");
    }
  });

  return (
    <>
      <MyNavbar history={props.history} />
      <Disclaimer extraMargin="2em" />
      <Footer />
    </>
  );
}
