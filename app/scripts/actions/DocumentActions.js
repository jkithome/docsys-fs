(function() {
  'use strict';
  var DocsysConstants = require('../constants/DocsysConstants'),
    BaseActions = require('./BaseActions'),
    token = localStorage.getItem('x-access-token'),
    userId = JSON.parse(localStorage.getItem('user'))._id;

  module.exports = {
    getAllDocuments: function() {
      BaseActions.get('/api/documents', DocsysConstants.DOCUMENTS_GET, token);
    },

    getUserDocuments: function() {
      BaseActions.get('/api/users/' + userId + '/mydocuments', DocsysConstants.USERDOCUMENTS_GET, token);
    },

    getByUserDocuments: function() {
      BaseActions.get('/api/users/' + userId + '/documents', DocsysConstants.USERACCESSDOCUMENTS_GET, token);
    },

    createDocument: function(document, access) {
      var data = {
        title: document.title,
        genre: document.genre,
        content: document.content,
        access: access
      };

      BaseActions.post('/api/documents', data,
        DocsysConstants.DOCUMENT_CREATE, token);
    },

    getDocument: function(docId) {
      BaseActions.get('/api/documents/' + docId, DocsysConstants.DOCUMENT_GET, token);
    },

    deleteDocument: function(docId) {
      BaseActions.delete('/api/documents/' + docId, DocsysConstants.DOCUMENT_DELETE, token);
    },

    editDocument: function(document, access, docId) {
      var data = {
        title: document.title,
        genre: document.genre,
        content: document.content,
        access: access
      };

      BaseActions.put('/api/documents/' + docId, data, DocsysConstants.DOCUMENT_EDIT, token);
    }
  };
})();
