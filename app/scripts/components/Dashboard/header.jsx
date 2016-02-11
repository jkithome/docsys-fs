(function(){
  'use strict';
  var React = require('react');

    module.exports = React.createClass({
      render: function() {
        return(
          <div>
            <nav>
              <div class="nav-wrapper">
                <a href="#" class="brand-logo"><img class="logo-img" src="logo.gif"></a>
                <ul class="right hide-on-med-and-down">
                  <li><a href="/dashboard"><i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Dashboard">dashboard</i></a></li>
                  <li><a href="/create"><i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Create Document">note_add</i></a></li>
                  <li><a href="/search"><i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Search">search</i></a></li>
                  <li><a href="/roles"><i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Roles">accessibility</i></a></li>
                  <li><a href="/about"><i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="About Us">info_outline</i></a></li>
                  <li><a href="/profile"><i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Profile">account_circle</i></a></li>
                  <li><a href="mobile.html"><i class="material-icons ">more_vert</i></a></li>
                </ul>
              </div>
            </nav>
          </div>
          );
      }
  });
})();