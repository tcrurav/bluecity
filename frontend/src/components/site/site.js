import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';

import './assets/scss/style.scss';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import Disclaimer from './views/Disclaimer';
import Rincon from './views/Rincon';
import Terradas from './views/Terradas';
import Koalas from './views/Koalas';
import Bernat from './views/Bernat';

const Site = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    document.body.classList.add('is-loaded')
    childRef.current.init();
  }, [location]);

  return (
    <div className="my-site">
    <ScrollReveal 
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault}/>
          <AppRoute exact path="/disclaimer" component={Disclaimer} layout={LayoutDefault}/>
          <AppRoute exact path="/rincon" component={Rincon} layout={LayoutDefault}/>
          <AppRoute exact path="/bernat" component={Bernat} layout={LayoutDefault}/>
          <AppRoute exact path="/terradas" component={Terradas} layout={LayoutDefault}/>
          <AppRoute exact path="/koalas" component={Koalas} layout={LayoutDefault}/>
        </Switch>
      )} />
      </div>
  );
}

export default Site;