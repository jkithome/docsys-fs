(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var DocumentStore = require('../../../../app/scripts/stores/DocumentStore');
  var UserStore = require('../../../../app/scripts/stores/UserStore');
  var sinon = require('sinon');
  var React = require('react');
  var Dashboard = require('../../../../app/scripts/components/Dashboard/index.jsx');

  describe('Dashboard', function() {
    var users = [{
      "_id": "56cf451bacc801dd33939b79",
      "updatedAt": "2016-02-28T08:28:38.818Z",
      "createdAt": "2016-02-25T18:16:59.000Z",
      "email": "jerry@erry.com",
      "username": "Jemmy",
      "role": "56cf451b09db67e133ab284d",
      "__v": 0,
      "loggedIn": true,
      "token": "ey",
      "name": {
        "last": "Kithome",
        "first": "Jeremy"
      }
    }];
    var docs = [{
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
        "token": "ey",
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
    }]

    it('renders the Dashboard component', function() {
      // Render Dashboard page in the document
      var dashboard = enzyme.shallow(<Dashboard />);

      // Test the orgs state
      expect(dashboard.state().users).to.eql(null);
      expect(dashboard.state().documents).to.eql(null);
      expect(dashboard.state().userDocuments).to.eql(null);
      expect(dashboard.state().byUserDocuments).to.eql(null);
    });

    it('renders the correct component', function() {
      var dashboard = enzyme.mount(<Dashboard />);
      expect(dashboard.find('.container').length).to.be.at.least(1);
      expect(dashboard.find('.section').length).to.eql(3);
    });

    it('renders the correct content', function() {
      expect(enzyme.shallow(<Dashboard />).text()).to.have.string('MY DOCUMENTS');
      expect(enzyme.shallow(<Dashboard />).text()).to.have.string('ACCESSIBLE DOCUMENTS');
    });

    it('calls componentDidMount', function() {
      sinon.spy(Dashboard.prototype, 'componentDidMount');
      enzyme.mount(<Dashboard />); // Mount the component
      expect(Dashboard.prototype.componentDidMount.calledOnce).to.eql(true);
      Dashboard.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(Dashboard.prototype, 'componentWillUnmount');
      var dashboard = enzyme.mount(<Dashboard />); // Mount the component
      dashboard.unmount();
      expect(Dashboard.prototype.componentWillUnmount.calledOnce).to.eql(true);
      Dashboard.prototype.componentWillUnmount.restore();
    });

    it('should call users get change listener', function() {
      var dashboard = enzyme.mount(<Dashboard />);
      UserStore.setUsers(users);
      expect(UserStore.getUsers()).to.be.an('array');
      expect(dashboard.state().users.length).to.eql(1)
    });

    it('should call documents get change listener', function() {
      var dashboard = enzyme.mount(<Dashboard />);
      DocumentStore.setDocuments(docs);
      expect(DocumentStore.getDocuments()).to.be.an('array');
      expect(dashboard.state().documents.length).to.eql(1);
    });

    it('should call user document get change listener', function() {
      var dashboard = enzyme.mount(<Dashboard />);
      DocumentStore.setUserDocuments(docs);
      expect(DocumentStore.getUserDocuments()).to.be.an('array');
      expect(dashboard.state().userDocuments.length).to.eql(1);
    });

    it('should call accessicle by documentschange listener', function() {
      var dashboard = enzyme.mount(<Dashboard />);
      DocumentStore.setByUserDocuments(docs);
      expect(DocumentStore.getByUserDocuments()).to.be.an('array');
      expect(dashboard.state().byUserDocuments.length).to.eql(1);
    });
  });
})();
