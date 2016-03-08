(function(){
  'use strict';
  var React = require('react'),
    Header = require('../Dashboard/header.jsx'),
    DocumentActions = require('../../actions/DocumentActions'),
    DocumentStore = require('../../stores/DocumentStore'),
    browserHistory = require('react-router').browserHistory,

    CreateDocument = React.createClass({

      getInitialState: function() {
        return {
          document: {
            title: null,
            genre: null,
            content: null,
          },

          user: false,
          staff: false,
          admin: false,
          result: null
        };
      },

      componentDidMount: function() {
        DocumentStore.addChangeListener(this.handleSubmit, 'createDoc');
      },

      componentWillUnmount() {
      DocumentStore.removeChangeListener(this.handleSubmit, 'createDoc');
    },

      handleSubmit: function() {
        var data = DocumentStore.getCreatedDocument();
        if(data) {
          if(data.code) {
            this.setState({result: 'Failed!'});
            if(data.errmsg.indexOf(this.state.document.title) !== -1) {
              window.Materialize.toast('Title already exists', 2000, 'error-toast');
            }
          } else if (data.name === 'ValidationError') {
            window.Materialize.toast('Required fields missing', 2000, 'error-toast');
          } else if (data.message === 'Document created successfully.') {
            this.setState({result: 'Success!'});
            window.Materialize.toast(data.message, 2000, 'success-toast');
            var id;
            if(data) {
              id = data.doc._id;
            } else {
              id = null;
            }
            browserHistory.push('/docs/' + id);
          }
        } else {
          this.setState({result: 'Failed!'});
          window.Materialize.toast('Error creating document.', 2000, 'error-toast');
        }

      },

      handleFieldChange: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.document[field] = value;
        this.setState({document: this.state.document});
      },

      handleRoleSelect: function(event) {
        var field = event.target.name;

        this.setState({[field] : !this.state[field] });
      },

      onCancel: function(event) {
        event.preventDefault();
        browserHistory.push('/dashboard');
      },

      onSubmit: function(event) {
        event.preventDefault();
        var token = localStorage.getItem('x-access-token');
        var docAccess = '';
        if(this.state.user) {
          docAccess += 'user,'
        }
        if(this.state.staff) {
          docAccess+= 'staff,'
        }
        if(this.state.admin) {
          docAccess+= 'admin'
        }
        DocumentActions.createDocument(this.state.document, docAccess.replace(/\,$/,''), token
        );
      },


      render: function() {
        return(
          <div>
            <Header/>
            <div className="container">
              <div className="card-panel white" >
                <div className="row">
                  <h2 className="center-align">Create Document</h2>
                </div>
                <form className="col s10 offset-s1">
                  <div className="row">
                    <div className="col s6 offset-s3">
                      <label htmlFor="title">Title</label>
                      <input className="green-text" id="title"
                        name="title"
                        onChange={this.handleFieldChange}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s6 offset-s3">
                      <label htmlFor="genre">Genre</label>
                      <input className="green-text" id="genre"
                        name="genre"
                        onChange={this.handleFieldChange}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s6 offset-s3">
                      <label htmlFor="content">Content</label>
                      <textarea name="content" id="content" className="materialize-textarea green-text" onChange={this.handleFieldChange}></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p>Roles Allowed Access</p>
                      <p>
                        <input name="user" type="checkbox" id="user" defaultChecked={this.state.user} onChange={this.handleRoleSelect}/>
                        <label htmlFor="user">User &nbsp; &nbsp;</label>
                        <input name="staff" type="checkbox" id="staff" defaultChecked={this.state.staff} onChange={this.handleRoleSelect}/>
                        <label htmlFor="staff">Staff &nbsp; &nbsp;</label>
                        <input name="admin" type="checkbox" id="admin" defaultChecked={this.state.admin} onChange={this.handleRoleSelect}/>
                        <label htmlFor="admin">Admin &nbsp; &nbsp;</label>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s6 offset-s3 create-btns">
                      <div className="col s12 m6 l6">
                        <button id="cancel" className="btn waves-effect red accent-2 center search" onClick={this.onCancel}>
                          cancel
                        </button>
                      </div>
                      <div className="col s12 m6 l6">
                        <button id="submit" className="btn waves-effect teal search" onClick={this.onSubmit}>
                          create
                        </button>
                      </div>
                    </div>
                    <div className="section">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          );
      }
  });
  module.exports = CreateDocument;
})();