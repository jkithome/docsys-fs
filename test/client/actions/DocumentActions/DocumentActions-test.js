(function() {
  'use strict';

  var sinon=require('sinon');
  var expect = require('chai').expect;
  var AppConstants=require('../../../../app/scripts/constants/DocsysConstants');
  var BaseActions=require('../../../../app/scripts/actions/BaseActions');
  var DocumentActions=require('../../../../app/scripts/actions/DocumentActions');

  describe('DocumentActions', function() {
    var fakeToken = 'token';
    var payload = {
      title: 'title',
      genre: 'genre',
      content: 'content',
    };
    var userId = 3;
    var limit = 10;
    var date = 10;
    var month = 10;
    var year = 2015;
    var access = 'access'
    var content = 'something';
    var genre = 'coding'

    beforeEach(function() {
      sinon.stub(BaseActions, 'delete').returns(true);
      sinon.stub(BaseActions, 'get').returns(true);
      sinon.stub(BaseActions, 'post').returns(true);
      sinon.stub(BaseActions, 'put').returns(true);
    });

    afterEach(function() {
      BaseActions.delete.restore();
      BaseActions.get.restore();
      BaseActions.post.restore();
      BaseActions.put.restore();
    });

    describe('calls BaseActions', function() {
      it('create', function() {
        DocumentActions.createDocument(payload, access,fakeToken);
        expect(BaseActions.post.withArgs(
          '/api/documents',
          {
            title: payload.title,
            genre: payload.genre,
            content: payload.content,
            access: access
          },
          AppConstants.DOCUMENT_CREATE,
          fakeToken
        ).called).to.eql(true);
      });

      it('get all documents', function() {
        DocumentActions.getAllDocuments(fakeToken);
        expect(BaseActions.get.withArgs(
          '/api/documents',
          AppConstants.DOCUMENTS_GET,
          fakeToken
        ).called).to.eql(true);
      });

      it('get single document', function() {
        DocumentActions.getDocument(userId,fakeToken);
        expect(BaseActions.get.withArgs(
          '/api/documents/' + userId,
          AppConstants.DOCUMENT_GET,
          fakeToken
        ).called).to.eql(true);
      });

      it('update', function() {
        DocumentActions.editDocument(payload, access,userId,fakeToken);
        expect(BaseActions.put.withArgs(
          '/api/documents/' + userId,
          {
            title: payload.title,
            genre: payload.genre,
            content: payload.content,
            access: access
          },
          AppConstants.DOCUMENT_EDIT,
          fakeToken
        ).called).to.eql(true);
      });

       it('delete', function() {
        DocumentActions.deleteDocument(userId,fakeToken);
        expect(BaseActions.delete.withArgs(
          '/api/documents/' + userId,
          AppConstants.DOCUMENT_DELETE,
          fakeToken
        ).called).to.eql(true);
      });

       it('user documents get', function() {
        DocumentActions.getUserDocuments(userId,fakeToken);
        expect(BaseActions.get.withArgs(
          '/api/users/' + userId + '/mydocuments',
          AppConstants.USERDOCUMENTS_GET,
          fakeToken
        ).called).to.eql(true);
      });

       it('user accessible documents get', function() {
        DocumentActions.getByUserDocuments(userId,fakeToken);
        expect(BaseActions.get.withArgs(
          '/api/users/' + userId + '/documents',
          AppConstants.USERACCESSDOCUMENTS_GET,
          fakeToken
        ).called).to.eql(true);
      });

      it('genre search', function() {
        DocumentActions.genreSearch(genre,limit,fakeToken);
        expect(BaseActions.get.withArgs(
          '/api/documents/genre?genre=' + genre + '&limit=' + limit,
          AppConstants.GENRE_SEARCH,
          fakeToken
        ).called).to.eql(true);
      });

      it('content search', function() {
        DocumentActions.contentSearch(content,limit,fakeToken);
        expect(BaseActions.get.withArgs(
          '/api/documents/search?term=' + content + '&limit=' + limit,
          AppConstants.CONTENT_SEARCH,
          fakeToken
        ).called).to.eql(true);
      });

      it('date search', function() {
        DocumentActions.dateSearch(date, month, year, limit, fakeToken);
        expect(BaseActions.get.withArgs(
          '/api/documents/date?year=' + year + '&month=' + month + '&date=' + date + '&limit=' + limit,
          AppConstants.DATE_SEARCH,
          fakeToken
        ).called).to.eql(true);
      });
    });
  });
})();