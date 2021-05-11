import React, { Suspense } from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import RoutePrivate from './utils/private-route';
import RoutePublic from './utils/public-route';
import { Login } from './components/auth/login';
import { Main } from './components/main';
import ParkingScreen from './components/mapping/parking/parkingScreen';
import RentingScreen from './components/mapping/renting/rentingScreen';
// import { Renting } from './components/mapping/renting';
import { Contact } from './components/contact/contact';
// import { MyLogo } from './components/my-logo';
import { MyError } from './components/my-error';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getCurrentUserId } from "./utils/common";
import { Scooter } from "./components/mapping/scooter";
import MyAccount from "./components/auth/my-account";
// import {ParkingsWithFreeScooters} from './components/parkingsWithFreeScooters';
import 'bootstrap/dist/css/bootstrap.min.css';
import AvailabilityScreen from "./components/mapping/availability/availabilityScreen";
//import ParkingProcessScreen from "./components/mapping/parking-process/ParkingProcessScreen";
// import MySite from './components/my-site/mySiteScreen';
import Site from './components/site/site';
import ParkingProcessScreen from "./components/mapping/parking-process/parkingProcessScreen";
import RentingProcessInScreen from "./components/mapping/renting-process-in/rentingProcessScreen";
import RentingProcessOutScreen from "./components/mapping/renting-process-out/rentingProcessScreen";
import WhileRenting from "./components/mapping/renting-process-in/whileRenting";

// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  /*constructor(props) {
     super(props);

     // library.add(fab);
     this.state = {
       userId: 1
     }
  }*/

  // READ following web to understand the use of history in react-router-dom
  // https://github.com/ReactTraining/react-router/blob/master/FAQ.md#how-do-i-pass-props-to-the-component-rendered-by-a-route

  return (
    <Suspense fallback="loading">
      <Router>
        <Switch>
          <RoutePrivate path='/main' component={(props) => <Main history={props.history} />} />
          <RoutePrivate path='/my-account' component={(props) => <MyAccount userId={getCurrentUserId()} history={props.history} />} />
          <RoutePrivate path='/parking' component={ParkingScreen} />
          <RoutePrivate path='/renting' component={RentingScreen} />
          {/* <RoutePrivate path='/renting' component={(props) => <Renting userId={getCurrentUserId()} history={props.history} />}/> */}
          <RoutePrivate path='/availability' component={AvailabilityScreen} />
          <RoutePrivate path='/parking-process' component={ParkingProcessScreen} />
          <RoutePrivate path='/renting-process-in' component={RentingProcessInScreen} />
		  <RoutePrivate path='/renting-process-out' component={RentingProcessOutScreen} />
		  <RoutePrivate path='/while-renting' component={WhileRenting} />
          {/* <RoutePrivate path='/renting' component={() => <Renting userId={getCurrentUserId()}/>}/> */}
          <RoutePrivate path='/scooter-renting' component={Scooter} />
          <RoutePublic path='/login' component={Login} />
          <Route path='/contact' component={Contact} />
          {/* <Route path="/my-site" component={MySite}/> */}
          <Route path="/" component={Site}/>
          {/* <Route path="/" component={MyLogo}/> */}
          <Route component={MyError} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
