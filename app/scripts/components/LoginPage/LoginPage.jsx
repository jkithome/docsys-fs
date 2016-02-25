(function(){
  'use strict';
  var React = require('react'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore'),
    History = require('react-router').History;

    module.exports = React.createClass({
      contextTypes: {
        router: React.PropTypes.object.isRequired
      },

      getInitialState: function() {
        return {
          user: {
            username: '',
            password: ''
          },
          result: ''
        };
      },

      componentDidMount: function() {
        UserStore.addChangeListener(this.handleLogin, 'login');
      },

      handleLogin: function() {
        var data = UserStore.getData();
        if(data.error) {
          if(typeof data.error === 'string') {
            window.Materialize.toast(data.error, 2000, 'error-toast');
          }
        } else {
          localStorage.setItem('x-access-token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.setState({result: 'Success'});
          window.Materialize.toast(data.message, 2000, 'success-toast');
          this.context.router.push('/dashboard');
        }
      },

      handleFieldChange: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.user[field] = value;
        this.setState({user: this.state.user});
      },

      onSubmit: function(event) {
        event.preventDefault();
        UserActions.login(this.state.user);
      },


      render: function() {
        return(
          <div>
              <header>
                <nav>
                  <div className="nav-wrapper">
                    <a href="#" className="brand-logo"><img className="logo-img" src="../../images/logo.gif" /></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                      <li><a href="/join">Register</a></li>
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
                          <form className="col s12" onSubmit={this.onSubmit}>
                            <div className="row">
                              <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input name="username" id="username" type="text" className="validate" onChange={this.handleFieldChange} required />
                                <label htmlFor="username">Username *</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s12">
                                <i className="material-icons prefix">security</i>
                                <input name="password"id="password" type="password" className="validate"onChange={this.handleFieldChange} required />
                                <label htmlFor="password">Password *</label>
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
                  <div className="row col s12 m5">
                  </div>
              </main>
          </div>);
      }
  });
})();