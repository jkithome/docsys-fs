(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var DocumentEditPath = '../../../../app/scripts/components/DocumentEdit/DocumentEdit.jsx';
  var sinon = require('sinon');
  var DocumentActions = require('../../../../app/scripts/actions/DocumentActions');
  var DocumentStore = require('../../../../app/scripts/stores/DocumentStore');
  var browserHistory = require('react-router').browserHistory;
  var React = require('react');
  var DocumentEdit = require(DocumentEditPath);

  describe('DocumentEdit', function() {
    window.Materialize = {};
    before(function() {
        window.Materialize.toast = sinon.spy();
    });
    it('renders the DocumentEdit component', function() {
      var documentEdit = enzyme.shallow(<DocumentEdit />);

      // Test the DocumentEdit state
      expect(documentEdit.state().originalDocument).to.eql(null);
      expect(documentEdit.state().document.title).to.eql(null);
      expect(documentEdit.state().document.genre).to.eql(null);
      expect(documentEdit.state().user).to.eql(false);
    });

    it('renders the correct component', function() {
      var documentEdit = enzyme.mount(< DocumentEdit />);
      documentEdit.setState({originalDocument: {
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
      }});
      expect(documentEdit.find('.row').length).to.be.at.least(1);
      expect(documentEdit.find('.card-panel').length).to.be.at.least(1);
    });

    it('renders the correct content', function() {
      expect(enzyme.shallow(<DocumentEdit />).find('.container').length).to.be.at.least(1);
      expect(enzyme.shallow(<DocumentEdit />).find('.progress').length).to.be.at.least(1);
    });

    it('calls componentDidMount', function() {
      sinon.spy(DocumentEdit.prototype, 'componentDidMount');
      enzyme.mount(<DocumentEdit />); // Mount the component
      expect(DocumentEdit.prototype.componentDidMount.calledOnce).to.eql(true);
      DocumentEdit.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(DocumentEdit.prototype, 'componentWillUnmount');
      var documentEdit = enzyme.mount(<DocumentEdit />); // Mount the component
      documentEdit.unmount();
      expect(DocumentEdit.prototype.componentWillUnmount.calledOnce).to.eql(true);
      DocumentEdit.prototype.componentWillUnmount.restore();
    });

    it('calls registered callbacks on mount', function() {
      sinon.spy(DocumentStore, 'addChangeListener');
      enzyme.mount(<DocumentEdit />); // Mount the component
      expect(DocumentStore.addChangeListener.callCount).to.eql(2);
      DocumentStore.addChangeListener.restore();
    });

    it('calls the document get change listener', function() {
      sinon.spy(DocumentStore, 'getDocument');
      var documentEdit = enzyme.mount(<DocumentEdit />); // Mount the component
      // Trigger a change in the DocumentStore
      DocumentStore.setDocument({});
      // The getDocument function should be called
      expect(DocumentStore.getDocument.called).to.eql(true);
      expect(documentEdit.state().originalDocument).to.eql({})
    });

    it('sets the correct state if document is updated successfully', function() {
      sinon.stub(browserHistory, 'push').returns(true);
      var documentEdit = enzyme.mount(<DocumentEdit />);
      // Trigger a change in the DocumentStore
      DocumentStore.setEditedDocument({message: 'Document updated successfully.'});
      expect(DocumentStore.getEditedDocument()).to.be.an('object');
      expect(documentEdit.state().result).to.be.a('string');
      expect(documentEdit.state().result).to.eql('Success!');
      expect(browserHistory.push.called).to.eql(true);
      browserHistory.push.restore();
    });

    it('sets the correct state if document is not updated successfully', function() {
      var documentEdit = enzyme.mount(<DocumentEdit />);
      documentEdit.setState({document: {title: 'title'}})
      // Trigger a change in the DocumentStore
      DocumentStore.setEditedDocument({
        code: 11000,
        errmsg: 'Duplicate title'
      });
      expect(DocumentStore.getEditedDocument()).to.be.an('object');
      expect(documentEdit.state().result).to.be.a('string');
      expect(documentEdit.state().result).to.eql('Failed!');
    });

    it('should correctly handle field change', function() {
      var documentEdit = enzyme.mount(<DocumentEdit />);
      var event = {
        target: {
          name: 'title',
          value: 'GOT'
        },
        preventDefault: function() {}
      };
      var instance = documentEdit.instance();
      sinon.spy(instance, 'handleFieldChange');
      instance.handleFieldChange(event);
      expect(documentEdit.state().document[event.target.name]).to.eql(event.target.value);
      instance.handleFieldChange.restore();
    });

    it('should correctly handle search select', function() {
      var documentEdit = enzyme.mount(<DocumentEdit />);
      var event = {
        target: {
          name: 'user'
        }
      };
      var instance = documentEdit.instance();
      sinon.spy(instance, 'handleRoleSelect');
      instance.handleRoleSelect(event);
      expect(documentEdit.state().user).to.eql(true);
      instance.handleRoleSelect.restore();
    });

    it('should call the documentEdit action on click', function() {
      var mockEvent = {
        preventDefault: function() {}
      };
      sinon.stub(DocumentActions, 'editDocument').returns(true);


      sinon.spy(mockEvent, 'preventDefault');
      var documentEdit = enzyme.mount(<DocumentEdit />);
      documentEdit.setState({originalDocument: {
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
    }});
      documentEdit.setState({
        document: {
          title: 'blah',
          genre: 'blah',
          content: null
        },
        user: true,
        admin: true,
      })
      var inst = documentEdit.instance();
      sinon.spy(inst, 'onSubmit');
      documentEdit.find('#submit').simulate('click', mockEvent);
      expect(mockEvent.preventDefault.called).to.eql(true);
      expect(DocumentActions.editDocument.called).to.eql(true);
      // expect(inst.onSubmit.calledOnce).to.eql(true);
    });

    it('should call the cancel action on click', function() {
      var mockEvent = {
        preventDefault: function() {}
      };
      sinon.stub(browserHistory, 'push').returns(true);
      var documentEdit = enzyme.mount(<DocumentEdit />);
      documentEdit.setState({originalDocument: {
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
    }});
      var inst = documentEdit.instance();
      sinon.spy(inst, 'onCancel');
      documentEdit.find('#cancel').simulate('click', mockEvent);
      // expect(mockEvent.preventDefault.called).to.eql(true);
      expect(browserHistory.push.called).to.eql(true);
      browserHistory.push.restore();
    });
  });
})();