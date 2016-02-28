(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var DocumentViewPath = '../../../../app/scripts/components/DocumentView/DocumentView.jsx';
  var sinon = require('sinon');
  var DocumentActions = require('../../../../app/scripts/actions/DocumentActions');
  var DocumentStore = require('../../../../app/scripts/stores/DocumentStore');
  var browserHistory = require('react-router').browserHistory;
  var React = require('react');
  var DocumentView = require(DocumentViewPath);

  describe('DocumentView', function() {
    window.Materialize = {};
    before(function() {
        window.Materialize.toast = sinon.spy();
    });
    it('renders the DocumentView component', function() {
      var documentView = enzyme.shallow(<DocumentView />);

      // Test the DocumentView state
      expect(documentView.state().document).to.eql(null);
    });

    it('renders the correct component', function() {
      var documentView = enzyme.mount(<DocumentView />);
      expect(documentView.find('.row').length).to.be.at.least(1);
    });

    it('renders the correct content', function() {
      expect(enzyme.shallow(<DocumentView />).find('Header').length).to.be.at.least(1);
      expect(enzyme.shallow(<DocumentView />).find('CreateDocument').length).to.be.at.least(1);
    });

    it('calls componentDidMount', function() {
      sinon.spy(DocumentView.prototype, 'componentDidMount');
      enzyme.mount(<DocumentView />); // Mount the component
      expect(DocumentView.prototype.componentDidMount.calledOnce).to.eql(true);
      DocumentView.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(DocumentView.prototype, 'componentWillUnmount');
      var documentView = enzyme.mount(<DocumentView />); // Mount the component
      documentView.unmount();
      expect(DocumentView.prototype.componentWillUnmount.calledOnce).to.eql(true);
      DocumentView.prototype.componentWillUnmount.restore();
    });

    it('calls registered callbacks on mount', function() {
      sinon.spy(DocumentStore, 'addChangeListener');
      enzyme.mount(<DocumentView />); // Mount the component
      expect(DocumentStore.addChangeListener.callCount).to.be.at.least(1);
      DocumentStore.addChangeListener.restore();
    });

    it('sets the correct state if document is fetched successfully', function() {
      var documentView = enzyme.mount(<DocumentView />);
      // Trigger a change in the DocumentStore
      DocumentStore.setDocument({
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
    });
      expect(DocumentStore.getDocument()).to.be.an('object');
      expect(documentView.state().document).to.be.an('object');
      expect(DocumentStore.getDocument.called).to.eql(true);
    });
  });
})();