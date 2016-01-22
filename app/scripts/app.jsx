(function() {
  'use strict';

  var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    IndexRoute = ReactRouter.IndexRoute,
    Route = ReactRouter.Route,
    LandingPage = require('./components/LandingPage/header.jsx'),

  ReactDOM.render((
    <Router history={createBrowserHistory()}>
      <Route path="/" component={LandingPage} >
      </Route>
    </Router>
    ), document.getElementById('ui-view'));
})();
