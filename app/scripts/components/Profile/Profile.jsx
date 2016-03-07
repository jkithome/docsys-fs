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
          {this.state.user ?
            <div className="container">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img max-width="320" max-height="240" className="activator" src={"../../images/freedom.jpg"}/>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{this.state.user.name.first} {this.state.user.name.last}</span>
                  <br/>
                  <span className="brown-text">Username: {this.state.user.username}</span>
                  <br/>
                  <span className="brown-text">{this.state.user.email}</span>
                  <br/>
                  <span className="brown-text">Role: {this.state.user.role.title}</span>
                </div>
                <div className="row">
                      <div className="col s2 offset-s5">
                        <button id="update" className="btn waves-effect teal center" onClick={this.handleClick}>
                          update
                        </button>
                      </div>
                    </div>
                    <div className="section">
                    </div>
              </div>
            </div> :
          <div></div>}
        </div>
      );
    }
  });
  module.exports = Profile;
})();
