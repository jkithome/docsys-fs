(function() {
  'use strict';

  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var DocsysConstants = require('../constants/DocsysConstants');
  var assign = require('object-assign');
  var BaseStore = require('./BaseStore');

  var DocumentStore = assign({}, BaseStore, {
    createdDocument: null,
    documents: null,
    userDocuments: null,
    byUserDocuments: null,

    setDocuments: function(documents) {
      this.documents = documents;
      this.emitChange();
    },

    getDocuments: function() {
      return this.documents;
    }

      setCreatedDocument: function(document) {
      this.createdDocument = document;
      this.emitChange();
    },

    getCreatedDocument: function() {
      return this.createdDocument;
    },

    setUserDocuments: function(documents) {
      this.Userdocuments = documents;
      this.emitChange();
    },

    getUserDocuments: function() {
      return this.Userdocuments;
    },

    setByUserDocuments: function(documents) {
      this.byUserdocuments = documents;
      this.emitChange();
    },

    getByUSerDocuments: function() {
      return this.byUserdocuments;
    }

  });

  // Register callback to handle all updates
  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case DocsysConstants.DOCUMENT_CREATE:
        DocumentStore.setCreatedDocument(action.data);
        break;
      case DocsysConstants.DOCUMENTS_GET:
        DocumentStore.setDocuments(action.data);
        break;
      case DocsysConstants.USERDOCUMENTS_GET:
        DocumentStore.setUserDocuments(action.data);
        break;
      case DocsysConstants.USERACCESSDOCUMENTS_GET:
        DocumentStore.setByUserDocuments(action.data);
        break;
      default:
        // no operation
    }

    return true; // No errors. Needed by promise in Dispatcher.
  });

  module.exports = DocumentStore;

})();
