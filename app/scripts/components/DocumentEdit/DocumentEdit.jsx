(function(){
  'use strict';
  var React = require('react'),
    DocumentActions = require('../../actions/DocumentActions'),
    DocumentStore = require('../../stores/DocumentStore'),
    Header = require('../Dashboard/header.jsx'),
    browserHistory = require('react-router').browserHistory,

    DocumentEdit = React.createClass({
      getInitialState: function() {
        return {
          originalDocument: null,
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
        var token = localStorage.getItem('x-access-token');
        DocumentActions.getDocument(this.props.params ? this.props.params.docId : null, token);
        DocumentStore.addChangeListener(this.populateDocument, 'document');
        DocumentStore.addChangeListener(this.handleSubmit, 'editDoc');
      },

      componentWillUnmount() {
      DocumentStore.removeChangeListener(this.populateDocument, 'document');
      DocumentStore.removeChangeListener(this.handleSubmit, 'editDoc');
    },

      populateDocument: function() {
        var data = DocumentStore.getDocument();
        this.setState({ originalDocument: data });
      },

      handleSubmit: function() {
        var data = DocumentStore.getEditedDocument();
        if(data) {
          if(data.code) {
            this.setState({result: 'Failed!'});
            if(data.errmsg.indexOf(this.state.document.title) !== -1) {
              window.Materialize.toast('Title already exists', 2000, 'error-toast');
            }
          } else if (data.message === 'Document updated successfully.') {
            this.setState({result: 'Success!'});
            window.Materialize.toast('Document updated successfully.', 2000, 'success-toast');
            browserHistory.push('/docs/' + (this.props.params ? this.props.params.docId : null));
          }
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
        browserHistory.push('/docs/' + (this.props.params ? this.props.params.docId : null));
      },

      onSubmit: function(event) {
        event.preventDefault();
        var token = localStorage.getItem('x-access-token');
        var docId = (this.props.params ? this.props.params.docId : null);
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
        DocumentActions.editDocument(this.state.document, docAccess.replace(/\,$/,''), docId, token
        );
      },


      render: function() {
        return(
          <div>
            <Header/>
            {this.state.originalDocument ?
              <div className="container">
                <div className="card-panel white z-depth-5">
                  <div className="row">
                    <form className="col s10 offset-s1">
                      <div className="row">
                        <div className="input-field col s6">
                          <textarea name="title" id="title" className="materialize-textarea" defaultValue={this.state.originalDocument.title} onChange={this.handleFieldChange}></textarea>
                          <label htmlFor="title">Title</label>
                        </div>
                        <div className="input-field col s6">
                          <textarea name="genre" id="genre" className="materialize-textarea"
                            defaultValue={this.state.originalDocument.genre}
                            onChange={this.handleFieldChange}></textarea>
                          <label htmlFor="textarea1">Genre</label>
                        </div>
                        <div className="input-field col s12">
                          <textarea name="content" id="content" className="materialize-textarea"
                          defaultValue={this.state.originalDocument.content}
                          onChange={this.handleFieldChange}></textarea>
                          <label htmlFor="content">Content</label>
                        </div>
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
                      <div className="row">
                        <div className="col s2 offset-s4">
                          <button id="cancel" className="btn waves-effect red accent-2 center" onClick={this.onCancel}>
                            cancel
                          </button>
                        </div>
                        <div className="col s2">
                          <button id="submit" className="btn waves-effect blue center" onClick={this.onSubmit}>
                            edit
                          </button>
                        </div>
                        <div className="section">
                        </div>
                      </div>
                    </form>
                  </div>
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
  module.exports = DocumentEdit;
})();