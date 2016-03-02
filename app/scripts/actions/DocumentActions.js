(function() {
  'use strict';
  var DocsysConstants = require('../constants/DocsysConstants'),
    BaseActions = require('./BaseActions');

  module.exports = {
    getAllDocuments: function(token) {
      BaseActions.get('/api/documents', DocsysConstants.DOCUMENTS_GET, token);
    },

    getUserDocuments: function(userId,token) {
      BaseActions.get('/api/users/' + userId + '/mydocuments', DocsysConstants.USERDOCUMENTS_GET, token);
    },

    getByUserDocuments: function(userId,token) {
      BaseActions.get('/api/users/' + userId + '/documents', DocsysConstants.USERACCESSDOCUMENTS_GET, token);
    },

    createDocument: function(document, access, token) {
      var data = {
        title: document.title,
        genre: document.genre,
        content: document.content,
        access: access
      };

      BaseActions.post('/api/documents', data,
        DocsysConstants.DOCUMENT_CREATE, token);
    },

    getDocument: function(docId, token) {
      BaseActions.get('/api/documents/' + docId, DocsysConstants.DOCUMENT_GET, token);
    },

    deleteDocument: function(docId, token) {
      BaseActions.delete('/api/documents/' + docId, DocsysConstants.DOCUMENT_DELETE, token);
    },

    editDocument: function(document, access, docId, token) {
      var data = {
        title: document.title,
        genre: document.genre,
        content: document.content,
        access: access
      };

      BaseActions.put('/api/documents/' + docId, data, DocsysConstants.DOCUMENT_EDIT, token);
    },

    search: function(data, limit, token) {
      if (data.genre) {
        BaseActions.get('/api/documents?genre=' + data.genre + '&limit=' + limit, DocsysConstants.DOCUMENT_SEARCH, token);
      } else if (data.search) {
        BaseActions.get('/api/documents?search=' + data.search + '&limit=' + limit, DocsysConstants.DOCUMENT_SEARCH, token);
      } else if (data.year) {
        BaseActions.get('/api/documents?year=' + data.year + '&month=' + data.month + '&date=' + data.date + '&limit=' + limit, DocsysConstants.DOCUMENT_SEARCH, token);
      }
    }
  };
})();
