import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
// import ReactGA from 'react-ga';

import { useMediaQuery } from 'react-responsive';
import { useHistory } from "react-router-dom";

import './assets/scss/style.scss';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';

// Initialize Google Analytics
// ReactGA.initialize(process.env.REACT_APP_GA_CODE);

// const trackPage = page => {
//   ReactGA.set({ page });
//   ReactGA.pageview(page);
// };

const Site = () => {

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  let history = useHistory();

  useEffect(() => {
    if(isMobile){
      history.push("/login");
    }
  });

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    // trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="my-site">
    <ScrollReveal 
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault}/>
        </Switch>
      )} />
      </div>
  );
}

export default Site;