(function() {
  'use strict';

  var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    LandingPage = require('./components/LandingPage/header.jsx'),
    SignUpPage = require('./components/SignUpPage/SignUpPage.jsx'),
    LoginPage = require('./components/LoginPage/LoginPage.jsx');

  ReactDOM.render((
    <Router>
      <Route path="/landingpage" component={LandingPage} >
      </Route>
      <Route path="/join" component={SignUpPage} >
      </Route>
      <Route path="/login" component={LoginPage} >
      </Route>
    </Router>
    ), document.getElementById('ui-view'));
})();
