(function(){
  'use strict';
  var React = require('react'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore'),
    CreateDocument = require('../Dashboard/CreateDocument.jsx'),
    Select = require('react-select'),
    Header = require('../Dashboard/header.jsx'),

    UserEdit = React.createClass({
      contextTypes: {
        router: React.PropTypes.object.isRequired
      },

      getInitialState: function() {
        return {
          user: null,
          firstname: null,
          lastname: null,
          username: null,
          role: (this.user) ? this.user.role.title : null,
          email: null,
          password: null,
          roles: [
            { value: 'admin', label: 'Admin' },
            { value: 'staff', label: 'staff' },
            { value: 'user',  label: 'User' }
          ],
          result: null,
          confirmpassword: null
        };
      },

      componentDidMount: function() {
        var token = localStorage.getItem('x-access-token');
        UserActions.getUser(this.props.params.userId, token);
        UserStore.addChangeListener(this.populateUser, 'user');
        UserStore.addChangeListener(this.handleSubmit, 'userEdit');
      },

      comparepswd: function(password, confirmpassword) {
        if (password !== confirmpassword) {
          window.Materialize.toast('Passwords Don\'t Match', 2000, 'error-toast');
          return false;
        } else {
          return true;
        }
      },

      populateUser: function() {
        var data = UserStore.getUser();
        this.setState({ user: data });
      },

      handleSubmit: function() {
        var data = UserStore.getUserEdit();
        if(data) {
          if(data.code) {
            if(data.errmsg.indexOf(this.state.username) !== -1) {
              window.Materialize.toast('Username already exists', 2000, 'error-toast');
            } else if(data.errmsg.indexOf(this.state.email) !== -1) {
              window.Materialize.toast('Email already exists', 2000, 'error-toast');
            }
          } else if (data.message === 'User updated succesfully.') {
            this.setState({result: 'Success!'});
            window.Materialize.toast(data.message, 2000, 'success-toast');
            this.context.router.push('/profile');
          }
        }

      },

      handleFieldChange: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        if (field === 'confirmpassword') {
          this.setState({confirmpassword : value});
        } else {
          this.setState({[field] : value});
        }
      },

      handleRoleSelect: function(event) {
        this.setState({role: event.value});
      },

      onCancel: function(event) {
        event.preventDefault();
        this.context.router.push('/profile');
      },

      onSubmit: function(event) {
        event.preventDefault();
        var token = localStorage.getItem('x-access-token');
        if (this.comparepswd(this.state.password, this.state.confirmpassword)) {
          var data= {}
          if(this.state.firstname) {
            data.firstname = this.state.firstname
          }
          if(this.state.lastname) {
            data.lastname = this.state.lastname
          }
          if(this.state.username) {
            data.username = this.state.username
          }
          if(this.state.email) {
            data.email = this.state.email
          }
          if(this.state.password) {
            data.password = this.state.password
          }
          UserActions.editUser(data, this.props.params.userId, token);
        }
      },


      render: function() {
        return(
          <div>
            <Header/>
            <CreateDocument/>
            {this.state.user ?
              <div className="container">
                <div className="card-panel white" >
                  <div className="row">
                    <h2 className="center-align">Edit Profile</h2>
                  </div>
                  <form className="col s10 offset-s1" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="col s4 offset-s4">
                        <label htmlFor="firstname">First Name</label>
                        <input className="green-text" id="firstname"
                            name="firstname"
                            defaultValue={this.state.user.name.first}
                            onChange={this.handleFieldChange}
                            type="text"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s4 offset-s4">
                        <label htmlFor="lastname">Last Name</label>
                        <input className="green-text" id="lastname"
                            name="lastname"
                            defaultValue={this.state.user.name.last}
                            onChange={this.handleFieldChange}
                            type="text"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s4 offset-s4">
                        <label htmlFor="username">Username</label>
                        <input className="green-text" id="username"
                            name="username"
                            defaultValue={this.state.user.username}
                            onChange={this.handleFieldChange}
                            type="text"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s4 offset-s4">
                        <label htmlFor="email">Email</label>
                        <input className="green-text" id="email"
                            name="email"
                            defaultValue={this.state.user.email}
                            onChange={this.handleFieldChange}
                            type="text"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s4 offset-s4">
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
                      <div className="col s4 offset-s4">
                        <label htmlFor="password">New Password</label>
                        <input className="green-text" id="password"
                            name="password"
                            value={null}
                            onChange={this.handleFieldChange}
                            type="password"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s4 offset-s4">
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input className="green-text" id="confirmpassword"
                            name="confirmpassword"
                            value={null}
                            onChange={this.handleFieldChange}
                            type="password"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s2 offset-s4">
                        <button className="btn waves-effect red accent-2 center" onClick={this.onCancel}>
                          cancel
                        </button>
                      </div>
                      <div className="col s2">
                        <button className="btn waves-effect blue center" type="submit" name="action">
                          update
                        </button>
                      </div>
                      <div className="section">
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              : <div className="container">
                  <div className="progress">
                      <div className="indeterminate"></div>
                  </div>
                </div>}
          </div>
        );
      }
    });
  module.exports = UserEdit;
})();