import React from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import RoutePrivate from './utils/private-route';
import RoutePublic from './utils/public-route';
import { Login } from './components/login';
import { Main } from './components/main';
import { Parking } from './components/parking';
import { Renting } from './components/renting';
import { Contact } from './components/contact/contact';
import { MyError } from './components/my-error';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Scooter} from "./components/scooter";
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';

class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   // library.add(fab);
  //   this.state = {
  //     signedIn: false
  //   }
  // }

  render() {
    return (
      <Router>
        <Switch>
          <RoutePrivate path='/main' component={Main} />
          <RoutePrivate path='/parking' component={Parking} />
          <RoutePrivate path='/renting' component={Renting} />
          <RoutePrivate path='/scooter-renting' component={Scooter} />
          <RoutePublic path='/login' component={Login} />
          <Route path='/contact' component={Contact} />
          <Route component={MyError} />
        </Switch>
      </Router>
    );
  }
}

export default App;
