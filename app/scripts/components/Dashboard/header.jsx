(function(){
  'use strict';
  var React = require('react');

    module.exports = React.createClass({
      render: function() {
        return(
          <div>
            <ul id="dropdown1" className="dropdown-content">
              <li className="divider"></li>
              <li><i className="material-icons left">face</i><a href="#!">Profile</a></li>
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
                  <li><a className="dropdown-button" href="#!" data-activates="dropdown1">{JSON.parse(localStorage.getItem('user')).name.first}<i className="material-icons right">arrow_drop_down</i></a></li>
                </ul>
              </div>
            </nav>
          </div>
          );
      }
  });
})();