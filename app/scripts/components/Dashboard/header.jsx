(function(){
  'use strict';
  var React = require('react'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore'),
    History = require('react-router').History,
    browserHistory = require('react-router').browserHistory,
    userName = (JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).name.first : null),

    Header = React.createClass({
      getInitialState: function() {
        return {
          loggedIn: false
        };
      },

      componentDidMount: function() {
        var token = localStorage.getItem('x-access-token');
        UserActions.session(token);
        UserStore.addChangeListener(this.getSession, 'session');
        UserStore.addChangeListener(this.handleLogout, 'logout');
      },

      getSession: function() {
        var data = UserStore.getSession();
        if (!data.loggedIn) {
          window.Materialize.toast('Please log in first.', 4000, 'error-toast');
          browserHistory.push('/');
        } else {
          this.state.loggedIn = true;
        }
      },

      handleLogout: function() {
        var data= UserStore.getUserLogout();
        if(data.message) {
          localStorage.removeItem('x-access-token');
          localStorage.removeItem('user');
          window.Materialize.toast(data.message, 2000, 'success-toast');
          browserHistory.push('/');
        } else {
          window.Materialize.toast('Failed to logout User', 2000, 'error-toast');
        }
      },

      logout: function(event) {
        event.preventDefault();
        var userId = (JSON.parse(localStorage.getItem('user')) ?JSON.parse(localStorage.getItem('user'))._id : null),
          token = localStorage.getItem('x-access-token');
        UserActions.logout(userId, null, token);
      },

      render: function() {
        return(
          <div>
            <ul id="dropdown1" className="dropdown-content">
              <li className="divider"></li>
              <li><i className="material-icons left">face</i><a href="/profile">Profile</a></li>
              <li className="divider"></li>
              <li><i className="material-icons left">exit_to_app</i><a onClick={this.logout}>Logout</a></li>
            </ul>
            <nav>
              <div className="nav-wrapper">
                <a href="#" className="brand-logo"><img className="logo-img" src="../../images/logo.gif" /></a>
                <ul className="right hide-on-med-and-down">
                  <li><a href="/dashboard"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Dashboard">dashboard</i></a></li>
                  <li><a className="modal-trigger" href="#modal1"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Create Document">note_add</i></a></li>
                  <li><a href="/search"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Search">search</i></a></li>
                  <li><a className="dropdown-button" data-activates="dropdown1">{userName}<i className="material-icons right">arrow_drop_down</i></a></li>
                </ul>
              </div>
            </nav>
          </div>
          );
      }
  });
  module.exports = Header;
})();