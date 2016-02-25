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
    },

    genreSearch: function(genre, limit) {
      BaseActions.get('/api/documents/genre?genre=' + genre + '&limit=' + limit, DocsysConstants.GENRE_SEARCH, token);
    },

    contentSearch: function(content, limit) {
      BaseActions.get('/api/documents/search?term=' + content + '&limit=' + limit, DocsysConstants.CONTENT_SEARCH, token);
    },

    dateSearch: function(date, month, year, limit) {
      BaseActions.get('/api/documents/date?year=' + year + '&month=' + month + '&date=' + date + '&limit=' + limit, DocsysConstants.DATE_SEARCH, token);
    },
  };
})();
