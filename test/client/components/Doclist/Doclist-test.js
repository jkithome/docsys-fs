(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var sinon = require('sinon');
  var DocumentActions = require('../../../../app/scripts/actions/DocumentActions');
  var DocumentStore = require('../../../../app/scripts/stores/DocumentStore');
  var browserHistory = require('react-router').browserHistory;
  var React = require('react');
  var DocList = require('../../../../app/scripts/components/Dashboard/DocList.jsx');

  describe('DocList', function() {
    window.Materialize = {};
    var doc = [{
      "_id": "56cf4520acc801dd33939b95",
      "updatedAt": "2016-02-25T18:17:04.000Z",
      "createdAt": "2016-02-25T18:17:04.000Z",
      "genre": "Fantasy",
      "owner": {
        "_id": "56cf451bacc801dd33939b79",
        "updatedAt": "2016-02-28T08:28:38.818Z",
        "createdAt": "2016-02-25T18:16:59.000Z",
        "email": "jerry@erry.com",
        "username": "Jemmy",
        "role": "56cf451b09db67e133ab284d",
        "__v": 0,
        "loggedIn": true,
        "token": "eyJ",
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
    }];
    before(function() {
      window.Materialize.toast = sinon.spy();
    });
    it('renders the correct component', function() {
      var docList = enzyme.shallow( <DocList /> );
      expect(docList.text()).to.have.string('No documents available');
    });

    it('renders the correct content when no document is available', function() {
      expect(enzyme.shallow( <DocList /> ).find('h2').length).to.be.at.least(1);
    });

    it('renders the correct content when documents are available', function() {
      var docList = enzyme.shallow( <DocList documents={doc} />);
      expect(docList.find('a').length).to.be.at.least(2); expect(docList.find('p').length).to.be.at.least(3);
    });

    it('renders the correct details', function() {
      var docList = enzyme.shallow( <DocList documents = {doc} />);
      expect(docList.text()).to.have.string('Star Wars'); expect(docList.text()).to.have.string('Jeremy');
    });
  });
})();
