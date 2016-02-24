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
                      <li><a href="/login">Login</a></li>
                    </ul>
                  </div>
                </nav>
              </header>
              <main>
                <div className="row">
                  <div className="sign-up-form">
                    <div className="card-panel">
                      <div className="row">
                        <div className="card-panel teal">
                          <h2 className="black-text">SIGN UP TODAY</h2>
                        </div>
                      </div>
                      <div className="row">
                        <form className="col s12">
                          <div className="row">
                            <div className="input-field col s6">
                              <input id="first_name" type="text" className="validate" />
                              <label for="first_name">First Name *</label>
                            </div>
                            <div className="input-field col s6">
                              <input id="last_name" type="text" className="validate" />
                              <label for="last_name">Last Name *</label>
                            </div>
                            <div className="input-field col s6">
                              <input id="last_name" type="text" className="validate" />
                              <label for="last_name">Username *</label>
                            </div>
                            <div className="input-field col s6">
                              <select>
                                <option value="" disabled selected>Choose your option</option>
                                <option value="admin">Administrator</option>
                                <option value="staff">Staff</option>
                                <option value="user">User</option>
                              </select>
                              <label>Role</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <input id="email" type="email" className="validate" />
                              <label for="email">Email *</label>
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
                              <button className="btn waves-effect waves-light" type="submit" name="action">JOIN
                                <i className="material-icons right">send</i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row col s12 m5">
                </div>
              </main>
          </div>);
      }
  });
})();