(function() {
  'use strict';
  var React = require('react'),
    Header = require('../Dashboard/header.jsx'),
    user = JSON.parse(localStorage.getItem('user')),


    Profile = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
      },

    handleClick: function(event) {
      event.preventDefault();
      this.context.router.push('/profile/edit' + user._id)
    },

    render: function() {
      return (
        <div>
          <Header/>
          <div className="row">
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
                      <h4>Name: {user.name.first} {user.name.last}</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s8 offset-s3">
                      <h4>Username: {user.username}</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s8 offset-s3">
                      <h4>Email: {user.email}</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s8 offset-s3">
                      <h4>Role: {user.role.title}</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="center-btn">
                      <button className="btn waves-effect blue center" onClick={this.handleClick}>
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
        </div>
      );
    }
  });
  module.exports = Profile;
})();
