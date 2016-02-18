(function(){
  'use strict';
  var React = require('react');

    module.exports = React.createClass({
      render: function() {
        return(
          <div>
            <nav>
              <div className="nav-wrapper">
                <a href="#" className="brand-logo"><img className="logo-img" src="../../images/logo.gif" /></a>
                <ul className="right hide-on-med-and-down">
                  <li><a href="/dashboard"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Dashboard">dashboard</i></a></li>
                  <li><a className="modal-trigger" href="#modal1"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Create Document">note_add</i></a></li>
                  <li><a href="/search"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Search">search</i></a></li>
                  <li><a href="/about"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="About Us">info_outline</i></a></li>
                  <li><a href="/profile"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Profile">account_circle</i></a></li>
                  <li><a href="mobile.html"><i className="material-icons ">more_vert</i></a></li>
                </ul>
              </div>
            </nav>
          </div>
          );
      }
  });
})();