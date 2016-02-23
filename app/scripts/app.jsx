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
    LoginPage = require('./components/LoginPage/LoginPage.jsx'),
    Dashboard = require('./components/Dashboard/index.jsx'),
    DocumentView = require('./components/DocumentView/DocumentView.jsx'),
    Search = require('./components/Search/Search.jsx'),
    Profile = require('./components/Profile/Profile.jsx'),
    DocumentEdit = require('./components/DocumentEdit/DocumentEdit.jsx');

  ReactDOM.render((
    <Router history={BrowserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={LandingPage}/>
        <Route path="/join" component={SignUpPage} >
        </Route>
        <Route path="/login" component={LoginPage} >
        </Route>
        <Route path="/dashboard" component={Dashboard} >
        </Route>
        <Route path="/search" component={Search} >
        </Route>
        <Route path="/profile" component={Profile} >
        </Route>
        <Route path="/docs/:docId" component={DocumentView} >
        </Route>
        <Route path="/docs/edit/:docId" component={DocumentEdit} >
        </Route>
      </Route>
    </Router>
    ), document.getElementById('ui-view'));
})();
