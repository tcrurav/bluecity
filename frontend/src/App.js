import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Login } from './components/Login/Login';
import { Main } from './components/Main/Main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    library.add(fab);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/main' component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default App;
