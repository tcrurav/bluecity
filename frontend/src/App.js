import React, { Suspense } from 'react';
import RoutePrivate from './utils/private-route';
import RoutePublic from './utils/public-route';
import { Login } from './components/auth/login';
import { Main } from './components/main';
import ParkingScreen from './components/mapping/parking/parkingScreen';
import RentingScreen from './components/mapping/renting/rentingScreen';
import { Contact } from './components/contact/contact';
import { MyError } from './components/my-error';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getCurrentUserId } from "./utils/common";
import { Scooter } from "./components/mapping/scooter";
import MyAccount from "./components/auth/my-account";
import 'bootstrap/dist/css/bootstrap.min.css';
import AvailabilityScreen from "./components/mapping/availability/availabilityScreen";
import Site from './components/site/site';
import ParkingProcessInScreen from "./components/mapping/parking-process-in/parkingProcessInScreen";
import ParkingProcessOutScreen from "./components/mapping/parking-process-out/parkingProcessOutScreen";
import RentingProcessInScreen from "./components/mapping/renting-process-in/rentingProcessInScreen";
import RentingProcessOutScreen from "./components/mapping/renting-process-out/rentingProcessOutScreen";
import WhileRenting from "./components/mapping/renting-process-in/whileRenting";
import WhileParking from "./components/mapping/parking-process-in/whileParking";
import { DisclaimerApp } from './components/disclaimer-app/disclaimer-app';

function App() {

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
          <RoutePrivate path='/parking-process-in' component={ParkingProcessInScreen} />
          <RoutePrivate path='/parking-process-out' component={ParkingProcessOutScreen} />
          <RoutePrivate path='/renting-process-in' component={RentingProcessInScreen} />
          <RoutePrivate path='/renting-process-out' component={RentingProcessOutScreen} />
          <RoutePrivate path='/while-renting' component={WhileRenting} />
          <RoutePrivate path='/while-parking' component={WhileParking} />
          <RoutePrivate path="/disclaimer-app" component={DisclaimerApp} />
          {/* <RoutePrivate path='/renting' component={() => <Renting userId={getCurrentUserId()}/>}/> */}
          <RoutePrivate path='/scooter-renting' component={Scooter} />
          <RoutePublic path='/login' component={Login} />
          <Route path='/contact' component={Contact} />
          <Route path="/" component={Site} />
          <Route component={MyError} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
