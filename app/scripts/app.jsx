(function() {
  'use strict';

  var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    IndexRoute = ReactRouter.IndexRoute,
    BrowserHistory = ReactRouter.browserHistory,
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Main = require('./components/Main/Main.jsx'),
    LandingPage = require('./components/LandingPage/header.jsx'),
    SignUpPage = require('./components/SignUpPage/SignUpPage.jsx'),
    LoginPage = require('./components/LoginPage/LoginPage.jsx');

  ReactDOM.render((
    <Router history={BrowserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={LandingPage}/>
        <Route path="/join" component={SignUpPage} >
        </Route>
        <Route path="/login" component={LoginPage} >
        </Route>
      </Route>
    </Router>
    ), document.getElementById('ui-view'));
})();