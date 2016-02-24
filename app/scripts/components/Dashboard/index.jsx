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
    CreateDocument = require('./CreateDocument.jsx'),
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
        UserActions.getUsers();
        UserStore.addChangeListener(this.populateUsers, 'users');
        DocumentActions.getAllDocuments();
        DocumentStore.addChangeListener(this.populateDocuments, 'documents');
        DocumentActions.getUserDocuments();
        DocumentStore.addChangeListener(this.populateUserDocuments,'userDocuments');
        DocumentActions.getByUserDocuments();
        DocumentStore.addChangeListener(this.populateByUserDocuments, 'byUserDocuments');
      },

      populateUsers: function() {
        var data = UserStore.getUsers();
        console.log(data);
        this.setState({
          users: data
        });
      },

      populateDocuments: function() {
        var data = DocumentStore.getDocuments();
        console.log(data);
        this.setState({
          documents: data
        });
      },

      populateUserDocuments: function() {
        var data = DocumentStore.getUserDocuments();
        console.log(data);
        this.setState({
          userDocuments: data
        });
      },

      populateByUserDocuments: function() {
        var data = DocumentStore.getByUserDocuments();
        console.log(data);
        this.setState({
          byUserDocuments: data
        });
      },

      render: function() {
        return ( <div>
          <Header/>
          <div className="container">
            <CreateDocument/>
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
                : <p>Loading...</p>}</div>
          </div>
          </div>
        );
      }
    });
  module.exports = Dashboard;
})();
