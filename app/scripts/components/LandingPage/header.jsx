(function(){
  'use strict';
  var React = require('react'),

    module.exports = React.createClass({
      render: function() {
        return(
          <header>
            <nav>
              <div class="nav-wrapper">
                <a href="#" class="brand-logo"><img class="logo-img" src="logo.gif"></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a href="badges.html">Login</a></li>
                </ul>
              </div>
            </nav>
          </header>
          <main>
            <div class="container">
              <h1>The simplest way to manage your documents.</h1>
              <div class="center-btn">
                <button class="join btn waves-effect waves-light" type="submit" name="action">GET STARTED
                </button>
              </div>
            </div>
          </main>
          );
      }
  });
})();