(function() {
  'use strict';

  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var DocsysConstants = require('../constants/DocsysConstants');
  var assign = require('object-assign');
  var BaseStore = require('./BaseStore');

  var DocumentStore = assign({}, BaseStore, {
    createdDocument: null,
    editedDocument: null,
    deletedDocument: null,
    document: null,
    documents: null,
    userDocuments: null,
    byUserDocuments: null,
    searchedDocuments: null,

    setDocuments: function(documents) {
      this.documents = documents;
      this.emitChange('documents');
    },

    getDocuments: function() {
      return this.documents;
    },

    setDocument: function(document) {
      this.document = document;
      this.emitChange('document');
    },

    getDocument: function() {
      return this.document;
    },

    setCreatedDocument: function(document) {
      this.createdDocument = document;
      this.emitChange('createDoc');
    },

    getCreatedDocument: function() {
      return this.createdDocument;
    },

    setEditedDocument: function(document) {
      this.editedDocument = document;
      this.emitChange('editDoc');
    },

    getEditedDocument: function() {
      return this.editedDocument;
    },

    setDeletedDocument: function(document) {
      this.deletedDocument = document;
      this.emitChange('deleteDoc');
    },

    getDeletedDocument: function() {
      return this.deletedDocument;
    },

    setUserDocuments: function(documents) {
      this.userDocuments = documents;
      this.emitChange('userDocuments');
    },

    getUserDocuments: function() {
      return this.userDocuments;
    },

    setByUserDocuments: function(documents) {
      this.byUserDocuments = documents;
      this.emitChange('byUserDocuments');
    },

    getByUserDocuments: function() {
      return this.byUserDocuments;
    },

    setSearchedDocuments: function(documents) {
      this.searchedDocuments = documents;
      this.emitChange('search');
    },

    getSearchedDocuments: function() {
      return this.searchedDocuments;
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
      case DocsysConstants.DOCUMENT_GET:
        DocumentStore.setDocument(action.data);
        break;
      case DocsysConstants.DOCUMENT_EDIT:
        DocumentStore.setEditedDocument(action.data);
        break;
      case DocsysConstants.DOCUMENT_DELETE:
        DocumentStore.setDeletedDocument(action.data);
        break;
      case DocsysConstants.USERDOCUMENTS_GET:
        DocumentStore.setUserDocuments(action.data);
        break;
      case DocsysConstants.DOCUMENT_SEARCH:
        DocumentStore.setSearchedDocuments(action.data);
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
