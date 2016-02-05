(function(){
  'use strict';
  var React = require('react'),
    Select = require('react-select'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore'),
    History = require('react-router').History;


    module.exports = React.createClass({
      contextTypes: {
        router: React.PropTypes.object.isRequired
      },

      getInitialState: function() {
        return {
          firstname: '',
          lastname: '',
          username: '',
          role: 'user',
          email: '',
          password: '',
          roles: [
            { value: 'admin', label: 'Admin' },
            { value: 'staff', label: 'staff' },
            { value: 'user',  label: 'User' }
          ],
          result: '',
          confirmpassword: ''
        };
      },

      componentDidMount: function() {
        this.comparepswd();
        UserStore.addChangeListener(this.handleSignup);
      },

      comparepswd: function(password, confirmpassword) {
        if (password !== confirmpassword) {
          window.Materialize.toast('Passwords Don\'t Match', 2000, 'error-toast');
          return false;
        } else {
          return true;
        }
      },

      handleSignup: function() {
        var data = UserStore.getData();
        if (data.error) {
          window.Materialize.toast(data.error.message, 2000, 'error-toast');
          this.setState({result: data.error.message});
        } else {
          this.setState({result: 'Success!'});
          window.Materialize.toast(data.message, 2000, 'success-toast');
          this.context.router.push('/login');
        }
      },

      handleRoleSelect: function(event) {
        this.setState({role: event.value});
      },

      handleFieldChange: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        if (field === 'confirmpassword') {
          this.state.confirmpassword = value;
        } else {
          this.state[field] = value;
        }
      },

      onSubmit: function(event) {
        event.preventDefault();
        if (this.comparepswd(this.state.password, this.state.confirmpassword)) {
          UserActions.signup({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            role: this.state.role,
            email: this.state.email,
            password: this.state.password,
          });
        }
      },
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
                        <form className="col s12" onSubmit={this.onSubmit}>
                          <div className="row">
                            <div className="input-field col s6">
                              <i className="material-icons prefix">face</i>
                              <input name = "firstname" id="first_name" type="text" className="validate" onChange={this.handleFieldChange} required />
                              <label htmlFor="first_name">First Name *</label>
                            </div>
                            <div className="input-field col s6">
                              <i className="material-icons prefix">face</i>
                              <input name = "lastname" id="last_name" type="text" className="validate" onChange={this.handleFieldChange} required />
                              <label htmlFor="last_name">Last Name *</label>
                            </div>
                            <div className="input-field col s6">
                              <i className="material-icons prefix">account_circle</i>
                              <input name = "username" id="user_name" type="text" className="validate" onChange={this.handleFieldChange} required />
                              <label htmlFor="user_name">Username *</label>
                            </div>
                            <div className="input-field col s6">
                              <Select
                                name="role"
                                onChange={this.handleRoleSelect}
                                options={this.state.roles}
                                placeholder="Select Role"
                                value={this.state.role}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <i className="material-icons prefix">email</i>
                              <input name = "email" id="email" type="email" className="validate" onChange={this.handleFieldChange} required />
                              <label htmlFor="email">Email *</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <i className="material-icons prefix">security</i>
                              <input name = "password" id="password" type="password" className="validate" onChange={this.handleFieldChange} required />
                              <label htmlFor="password">Password *</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <i className="material-icons prefix">security</i>
                              <input name = "confirmpassword" id="confirm_password" type="password" className="validate" onChange={this.handleFieldChange} required />
                              <label htmlFor="password">Confirm Password *</label>
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