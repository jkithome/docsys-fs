(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var DocumentCardPath = '../../../../app/scripts/components/DocumentView/DocumentCard.jsx';
  var sinon = require('sinon');
  var DocumentActions = require('../../../../app/scripts/actions/DocumentActions');
  var DocumentStore = require('../../../../app/scripts/stores/DocumentStore');
  var browserHistory = require('react-router').browserHistory;
  var React = require('react');
  var DocumentCard = require(DocumentCardPath);

  describe('DocumentCard', function() {
    window.Materialize = {};
    var doc = {
        "_id": "56cf4520acc801dd33939b95",
        "updatedAt": "2016-02-25T18:17:04.000Z",
        "createdAt": "2016-02-25T18:17:04.000Z",
        "genre": "Fantasy",
        "owner": {
          "_id": "56cf451bacc801dd33939b79",
          "updatedAt": "2016-02-28T08:28:38.818Z",
          "createdAt": "2016-02-25T18:16:59.000Z",
          "password": "$2a$10$OCYrOBL1sImfZVdLv2dh0ezBwMMGFdx6R/6tuz3ovalkDkaV6XMYC",
          "email": "jerry@erry.com",
          "username": "Jemmy",
          "role": "56cf451b09db67e133ab284d",
          "__v": 0,
          "loggedIn": true,
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmNmNDUxYmFjYzgwMWRkMzM5MzliNzkiLCJuYW1lIjp7ImZpcnN0IjoiSmVyZW15IiwibGFzdCI6IktpdGhvbWUifSwiZW1haWwiOiJqZXJyeUBlcnJ5LmNvbSIsInVzZXJuYW1lIjoiSmVtbXkiLCJyb2xlIjp7Il9pZCI6IjU2Y2Y0NTFiMDlkYjY3ZTEzM2FiMjg0ZCIsImRlc2NyaXB0aW9uIjoiQ2FuIGNyZWF0ZSBhbmQgdmlldyBkb2N1bWVudHMiLCJ0aXRsZSI6InVzZXIifSwiY3JlYXRlZEF0IjoiMjAxNi0wMi0yNVQxODoxNjo1OS4wMDBaIiwidXBkYXRlZEF0IjoiMjAxNi0wMi0yN1QxNzozNDoxNC44NTBaIiwiaWF0IjoxNDU2NjQ4MTE4LCJleHAiOjE0NTY2NTE3MTh9.OYcJ3LFSyZThJjuMQWGQWXtC7vjTiulaCKyS-JqAM6M",
          "name": {
            "last": "Kithome",
            "first": "Jeremy"
          }
        },
        "content": "30 years after the defeat of the Galactic Empire, a new threat rises. The First Order attempts to rule the galaxy and only a ragtag group of Heroes can stop them, along with the help of the Resistance.",
        "title": "Star Wars: The Force Awakens",
        "__v": 0,
        "access": [
          "56cf451b09db67e133ab284d",
          "56cf451b09db67e133ab284f",
          "56cf451b09db67e133ab284e"
        ]
      }
    before(function() {
        window.Materialize.toast = sinon.spy();
    });
    it('renders the DocumentCard component', function() {
      var documentCard = enzyme.mount(<DocumentCard document={doc}/>);
      expect(documentCard.find('.container').length).to.eql(1);
    expect(documentCard.find('.card').length).to.be.at.least(1);
    expect(documentCard.find('.card-content').length).to.eql(1);
    });

    it('calls componentDidMount', function() {
      sinon.spy(DocumentCard.prototype, 'componentDidMount');
      enzyme.mount(<DocumentCard document={doc}/>); // Mount the component
      expect(DocumentCard.prototype.componentDidMount.calledOnce).to.eql(true);
      DocumentCard.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(DocumentCard.prototype, 'componentWillUnmount');
      var documentCard = enzyme.mount(<DocumentCard document={doc} />); // Mount the component
      documentCard.unmount();
      expect(DocumentCard.prototype.componentWillUnmount.calledOnce).to.eql(true);
      DocumentCard.prototype.componentWillUnmount.restore();
    });

    it('should call document delete change listener', function() {
        sinon.stub(browserHistory, 'push').returns(true);
        var documentCard = enzyme.mount(<DocumentCard document={doc} />);
        DocumentStore.setDeletedDocument({
          message: 'Document deleted successfully!'
        });
        expect(DocumentStore.getDeletedDocument()).to.be.an('object');
        expect(browserHistory.push.called).to.eql(true);
        browserHistory.push.restore();
      });
  })
})();