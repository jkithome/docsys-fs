(function(){
  'use strict';
  var React = require('react');

    module.exports = React.createClass({
      render: function() {
        return(
          <div>
              <header>
                <nav>
                  <div className="nav-wrapper">
                    <a href="#" className="brand-logo"><img className="logo-img" src="../../images/logo.gif" /></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                      <li><a href="/login">Register</a></li>
                    </ul>
                  </div>
                </nav>
              </header>
              <main>
                <div className="container">
                    <h2 className="login-text white-text">WELCOME BACK</h2></div>
                  <div className="row">
                    <div className="login-form">
                      <div className="login-card card-panel">
                        <div className="row">
                          <form className="col s12">
                            <div className="row">
                              <div className="input-field col s12">
                                <input id="last_name" type="text" className="validate" />
                                <label for="last_name">Username *</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s12">
                                <input id="password" type="password" className="validate" />
                                <label for="password">Password *</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="center-btn">
                                <button className="btn waves-effect waves-light" type="submit" name="action">LOGIN
                                  <i className="material-icons right">send</i>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row col s12 m5">
                  </div>
              </main>
          </div>);
      }
  });
})();