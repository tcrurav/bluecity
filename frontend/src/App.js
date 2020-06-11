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
import {getCurrentUserId} from "./utils/common";
import {Scooter} from "./components/scooter";
import {ParkingsWithFreeScooters} from './components/parkingsWithFreeScooters';
import 'bootstrap/dist/css/bootstrap.min.css';

// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';

class App extends React.Component {
  /*constructor(props) {
     super(props);

     // library.add(fab);
     this.state = {
       userId: 1
     }
  }*/

  // READ following web to uderstand the use of history in react-router-dom
  // https://github.com/ReactTraining/react-router/blob/master/FAQ.md#how-do-i-pass-props-to-the-component-rendered-by-a-route

  render() {
    return (
      <Router>
        <Switch>
          <RoutePrivate path='/main' component={Main} />
          <RoutePrivate path='/parking' component={Parking} />
          <RoutePrivate path='/renting' component={(props) => <Renting userId={getCurrentUserId()} history={props.history} />}/>
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
