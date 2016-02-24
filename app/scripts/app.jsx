(function() {
  'use strict';

  var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    LandingPage = require('./components/LandingPage/header.jsx');

  ReactDOM.render((
    <Router>
      <Route path="/" component={LandingPage} >
      </Route>
    </Router>
    ), document.getElementById('ui-view'));
})();
