(function() {
  'use strict';
  var React = require('react'),
    moment = require('moment'),
    DocumentStore = require('../../stores/DocumentStore'),
    DocumentActions = require('../../actions/DocumentActions'),
    localStorage = require('localStorage'),
    browserHistory = require('react-router').browserHistory,
    History = require('react-router').History,
    userId = (JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user'))._id : null),
    userRoleId = (JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).role._id : null),
    userRoleTitle = (JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).role.title : null),


    DocumentCard = React.createClass({

      componentDidMount: function() {
        DocumentStore.addChangeListener(this.deleteResult, 'deleteDoc');
      },

      componentWillUnmount() {
        DocumentStore.removeChangeListener(this.deleteResult, 'deleteDoc');
      },

      deleteDocument: function(event) {
        var that = this;
        event.preventDefault();
        var token = localStorage.getItem('x-access-token');
        window.swal({
          title: "Are you sure?",
          text: "You will not be able to recover this document!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: true
        },
          function(){
            DocumentActions.deleteDocument((that.props.document ? this.props.document._id : null), token); });

      },

      deleteResult: function() {
        var data = DocumentStore.getDeletedDocument();
        window.Materialize.toast(data.message, 2000, 'success-toast');
          browserHistory.push('/dashboard');
      },

      render: function() {
          return (
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img className="activator" src={"../../images/image" + Math.ceil(Math.random() * 10) + ".jpg"}/>
                    </div>
                    <div className="card-content">
                      <span className="card-title activator green-text text-darken-4">{this.props.document.title}<i className="material-icons right">more_vert</i></span>
                      <p className="brown-text">Created: {moment(this.props.document.createdAt).fromNow()} by {this.props.document.owner.name.first} {this.props.document.owner.name.last}</p>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">{this.props.document.title}<i className="material-icons right">close</i></span>
                      <p>{this.props.document.content}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
                <a className="btn-floating btn-large teal lighten-1">
                  <i className="large material-icons">menu</i>
                </a>
                <ul>
                  <li>{(userId === this.props.document.owner._id) || ((userRoleTitle === 'admin') && (this.props.document.access).indexOf(userRoleId) !== -1) ? <a id="delete"className='btn-floating red'><i className="material-icons" onClick={this.deleteDocument}>delete</i></a>: <a className='btn-floating red disabled'><i className="material-icons">delete</i></a>  }</li>
                  <li>{(userId === this.props.document.owner._id) || ((userRoleTitle === 'staff' ||userRoleTitle === 'admin') && (this.props.document.access).indexOf(userRoleId) !== -1) ? <a className='btn-floating blue' href={'docs/edit/' + this.props.document._id} ><i className="material-icons">mode_edit</i></a> : <a className='btn-floating blue disabled'><i className="material-icons">mode_edit</i></a> }</li>
                </ul>
              </div>
            </div>
          );
      }
});
  module.exports = DocumentCard;
})();
