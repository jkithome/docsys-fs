(function(){
  'use strict';
  var React = require('react'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore'),
    History = require('react-router').History,
    userName = (JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).name.first : null);

    module.exports = React.createClass({
      contextTypes: {
        router: React.PropTypes.object.isRequired
      },

      getInitialState: function() {
        return {
          loggedIn: false
        };
      },

      componentDidMount: function() {
        var token = localStorage.getItem('x-access-token');
        UserActions.session();
        UserStore.addChangeListener(this.getSession, 'session');
      },

      getSession: function() {
        var data = UserStore.getSession();
        if (!data.loggedIn) {
          window.Materialize.toast('Please log in first.', 4000, 'error-toast');
          this.context.router.push('/');
        } else {
          this.state.loggedIn = true;
        }
      },

      render: function() {
        return(
          <div>
            <ul id="dropdown1" className="dropdown-content">
              <li className="divider"></li>
              <li><i className="material-icons left">face</i><a href="/profile">Profile</a></li>
              <li className="divider"></li>
              <li><i className="material-icons left">exit_to_app</i><a href="#!">Logout</a></li>
            </ul>
            <nav>
              <div className="nav-wrapper">
                <a href="#" className="brand-logo"><img className="logo-img" src="../../images/logo.gif" /></a>
                <ul className="right hide-on-med-and-down">
                  <li><a href="/dashboard"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Dashboard">dashboard</i></a></li>
                  <li><a className="modal-trigger" href="#modal1"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Create Document">note_add</i></a></li>
                  <li><a href="/search"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Search">search</i></a></li>
                  <li><a className="dropdown-button" href="#!" data-activates="dropdown1">{userName}<i className="material-icons right">arrow_drop_down</i></a></li>
                </ul>
              </div>
            </nav>
          </div>
          );
      }
  });
})();