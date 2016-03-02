(function() {
  'use strict';
  var React = require('react'),
    UserStore = require('../../stores/UserStore'),
    UserActions = require('../../actions/UserActions'),
    DocumentStore = require('../../stores/DocumentStore'),
    DocumentActions = require('../../actions/DocumentActions'),
    Header = require('./header.jsx'),
    Statistics = require('./Statistics.jsx'),
    DocList = require('./DocList.jsx'),
    Dashboard = React.createClass({
      getInitialState: function() {
        return {
          users: null,
          documents: null,
          userDocuments: null,
          byUserDocuments: null
        };
      },

      componentDidMount: function() {
        var token = localStorage.getItem('x-access-token'),
          userId = (JSON.parse(localStorage.getItem('user')) ?JSON.parse(localStorage.getItem('user'))._id : null);
        UserActions.getUsers(token);
        UserStore.addChangeListener(this.populateUsers, 'users');
        DocumentActions.getAllDocuments(token);
        DocumentStore.addChangeListener(this.populateDocuments, 'documents');
        DocumentActions.getUserDocuments(userId,token);
        DocumentStore.addChangeListener(this.populateUserDocuments,'userDocuments');
        DocumentActions.getByUserDocuments(userId,token);
        DocumentStore.addChangeListener(this.populateByUserDocuments, 'byUserDocuments');
      },

      componentWillUnmount() {
        UserStore.removeChangeListener(this.populateUsers, 'users');
        DocumentStore.removeChangeListener(this.populateDocuments, 'documents');
        DocumentStore.removeChangeListener(this.populateUserDocuments,'userDocuments');
        DocumentStore.removeChangeListener(this.populateByUserDocuments, 'byUserDocuments');
      },

      populateUsers: function() {
        var data = UserStore.getUsers();
        this.setState({
          users: data
        });
      },

      populateDocuments: function() {
        var data = DocumentStore.getDocuments();
        this.setState({
          documents: data
        });
      },

      populateUserDocuments: function() {
        var data = DocumentStore.getUserDocuments();
        this.setState({
          userDocuments: data
        });
      },

      populateByUserDocuments: function() {
        var data = DocumentStore.getByUserDocuments();
        this.setState({
          byUserDocuments: data
        });
      },

      render: function() {
        return ( <div>
          <Header/>
          <div className="container">
            <div className="section">
              <h5 className="white-text">STATISTICS</h5>
            </div>
            <div className="divider"></div>
            {this.state.users && this.state.documents && this.state.userDocuments ?
            <Statistics users={this.state.users} documents={this.state.documents} userDocuments={this.state.userDocuments}/> : <p>Loading...</p>}
            <div className="divider"></div>
            <div className="section">
              <h5 className="white-text">MY DOCUMENTS</h5>
            </div>
            <div className="divider"></div>
            <div className="row isotope" style={{position: 'relative'}}>{this.state.userDocuments
                ? <DocList documents={this.state.userDocuments} />
                : <p>Loading...</p>}</div>
            <div className="divider"></div>
            <div className="section">
              <h5 className="white-text">ACCESSIBLE DOCUMENTS</h5>
            </div>
            <div className="divider"></div>
            <div className="row isotope" style={{position: 'relative'}}>{this.state.documents
                ? <DocList documents={this.state.documents} />
                : <div className="progress">
                      <div className="indeterminate"></div>
                  </div>}</div>
          </div>
          </div>
        );
      }
    });
  module.exports = Dashboard;
})();
