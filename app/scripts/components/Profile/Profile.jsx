(function() {
  'use strict';
  var React = require('react'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore'),
    localStorage = require('localStorage'),
    Header = require('../Dashboard/header.jsx'),
    browserHistory = require('react-router').browserHistory,
    user = JSON.parse(localStorage.getItem('user')),


    Profile = React.createClass({
    getInitialState: function() {
        return {
          user: null
        };
      },

    componentDidMount: function() {
      var token = localStorage.getItem('x-access-token');
        UserActions.getUser((user ? user._id : null), token);
        UserStore.addChangeListener(this.populateUser, 'user');
      },

    componentWillUnmount() {
        UserStore.removeChangeListener(this.populateUser, 'user');
      },

    populateUser: function() {
        var data = UserStore.getUser();
        this.setState({ user: data });
      },

    handleClick: function(event) {
      event.preventDefault();
      browserHistory.push('/profile/edit/' + (user ? user._id : null))
    },

    render: function() {
      return (
        <div>
          <Header/>
          {this.state.user
            ?<div className="row">
              <div className="container">
                <div className="col s3">
                  <div className="card-panel white">
                    <img className="responsive-img" src={"../../images/profile.jpg"}/>
                  </div>
                </div>
                <div className="col s9">
                  <div className="card-panel white profile">
                    <div className="row">
                      <h2 className="center-align">PROFILE</h2>
                    </div>
                    <div className="row">
                      <div className="col s8 offset-s3">
                        <h4>Name: {this.state.user.name.first} {this.state.user.name.last}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s8 offset-s3">
                        <h4>Username: {this.state.user.username}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s8 offset-s3">
                        <h4>Email: {this.state.user.email}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s8 offset-s3">
                        <h4>Role: {this.state.user.role.title}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="center-btn">
                        <button id="update" className="btn waves-effect blue center" onClick={this.handleClick}>
                          update
                        </button>
                      </div>
                    </div>
                    <div className="section">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : <div className="container">
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
              </div>
          }
        </div>
      );
    }
  });
  module.exports = Profile;
})();
