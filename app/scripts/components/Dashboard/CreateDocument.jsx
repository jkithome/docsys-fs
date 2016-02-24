(function(){
  'use strict';
  var React = require('react'),
    DocumentActions = require('../../actions/DocumentActions'),
    DocumentStore = require('../../stores/DocumentStore');

    module.exports = React.createClass({

      getInitialState: function() {
        return {
          document: {
            title: null,
            genre: null,
            content: null,
          },

          user: false,
          staff: false,
          admin: false
        };
      },

      componentDidMount: function() {
        DocumentStore.addChangeListener(this.handleSubmit);
      },

      handleSubmit: function() {
        var data = DocumentStore.getCreatedDocument();
        if(data) {
          if(data.code) {
            if(data.errmsg.indexOf(this.state.document.title) !== -1) {
              window.Materialize.toast('Title already exists', 2000, 'error-toast');
            }
          } else if (data.name === 'ValidationError') {
            window.Materialize.toast('Required fields missing', 2000, 'error-toast');
          } else if (data.message === 'Document created successfully.') {
            window.Materialize.toast('Document created successfully.', 2000, 'success-toast');
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

      onSubmit: function(event) {
        event.preventDefault();
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
        DocumentActions.createDocument(this.state.document, docAccess.replace(/\,$/,'')
        );
      },


      render: function() {
        return(
          <div id="modal1" className="modal">
            <div className="container">
              <div className="modal-content">
                <h4>CREATE DOCUMENT</h4>
                <div className="row">
                  <form className="col s12">
                    <div className="row">
                      <div className="input-field col s6">
                        <textarea name="title" id="title" className="materialize-textarea" onChange={this.handleFieldChange}></textarea>
                        <label htmlFor="title">Title</label>
                      </div>
                      <div className="input-field col s6">
                        <textarea name="genre" id="genre" className="materialize-textarea" onChange={this.handleFieldChange}></textarea>
                        <label htmlFor="textarea1">Genre</label>
                      </div>
                      <div className="input-field col s12">
                        <textarea name="content" id="content" className="materialize-textarea" onChange={this.handleFieldChange}></textarea>
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
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="center-btn">
                <button className="btn waves-effect waves-light modal-close blue center" type="submit" name="action" onClick={this.onSubmit}>Create
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
          );
      }
  });
})();