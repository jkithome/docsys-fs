(function() {
  'use strict';

  var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    LandingPage = require('./components/LandingPage/header.jsx'),
    SignUpPage = require('./components/SignUpPage/SignUpPage.jsx');

  ReactDOM.render((
    <Router>
      <Route path="/landingpage" component={LandingPage} >
      </Route>
      <Route path="/join" component={SignUpPage} >
      </Route>
    </Router>
    ), document.getElementById('ui-view'));
})();
