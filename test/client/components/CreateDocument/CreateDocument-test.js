(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var sinon = require('sinon');
  var DocumentStore = require('../../../../app/scripts/stores/DocumentStore');
  var DocumentActions = require('../../../../app/scripts/actions/DocumentActions');
  var React = require('react');
  var CreateDocument = require('../../../../app/scripts/components/Dashboard/CreateDocument.jsx');

  describe('CreateDocument component', function() {

    window.Materialize = {};
    before(function() {
      window.Materialize.toast = sinon.spy();
    });

    it('renders the CreateDocument component', function() {
      // Render CreateDocument component in the document
      var createDocument = enzyme.shallow(<CreateDocument />);

      // Test the orgs state
      expect(createDocument.state().document.title).to.eql(null);
      expect(createDocument.state().document.genre).to.eql(null);
      expect(createDocument.state().user).to.eql(false);
      expect(createDocument.state().staff).to.eql(false);
    });

    it('renders the correct content', function() {
      var createDocument = enzyme.mount(<CreateDocument />);
      expect(createDocument.text()).to.have.string('Title');
      expect(createDocument.text()).to.have.string('Genre');
      expect(createDocument.text()).to.have.string('Content');
    });

    it('renders the correct component', function() {
      expect(enzyme.mount(<CreateDocument />).find('.modal-content').length).to.eql(1);
      expect(enzyme.mount(<CreateDocument />).find('form').length).to.eql(1);
    });

    it('calls componentDidMount', function() {
      sinon.spy(CreateDocument.prototype, 'componentDidMount');
      enzyme.mount(<CreateDocument />); // Mount the component
      expect(CreateDocument.prototype.componentDidMount.calledOnce).to.eql(true);
      CreateDocument.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(CreateDocument.prototype, 'componentWillUnmount');
      var createDocument = enzyme.mount(<CreateDocument />); // Mount the component
      createDocument.unmount();
      expect(CreateDocument.prototype.componentWillUnmount.calledOnce).to.eql(true);
      CreateDocument.prototype.componentWillUnmount.restore();
    });

    it('calls registered callbacks on mount', function() {
      sinon.spy(DocumentStore, 'addChangeListener');
      enzyme.mount(<CreateDocument />); // Mount the component
      expect(DocumentStore.addChangeListener.callCount).to.eql(1);
      DocumentStore.addChangeListener.restore();
    });

    it('should correctly handle field change', function() {
      var createDocument = enzyme.mount(<CreateDocument />);
      var event = {
        target: {
          name: 'genre',
          value: 'katniss'
        },
        preventDefault: function() {}
      };
      var instance = createDocument.instance();
      sinon.spy(instance, 'handleFieldChange');
      instance.handleFieldChange(event);
      expect(createDocument.state().document[event.target.name]).to.eql(event.target.value);
      instance.handleFieldChange.restore();
    });

    it('should correctly handles role select', function() {
      var createDocument = enzyme.mount(<CreateDocument />);
      var event = {
        target: {
          name: 'user'
        },
      };
      var instance = createDocument.instance();
      sinon.spy(instance, 'handleRoleSelect');
      instance.handleRoleSelect(event);
      expect(createDocument.state().user).to.eql(true);
      instance.handleRoleSelect.restore();
    });

    it('calls the document change listener', function() {
      sinon.spy(DocumentStore, 'getCreatedDocument');
      enzyme.mount(<CreateDocument />); // Mount the component
      // Trigger a change in the DocumentStore
      DocumentStore.setCreatedDocument({ message: 'Document created successfully.' });
      // The getCreatedDocument function should be called
      expect(DocumentStore.getCreatedDocument.called).to.eql(true);
      DocumentStore.getCreatedDocument.restore();
    });

    it('responds correctly if the document was created successfully', function() {
      var createDocument = enzyme.mount(<CreateDocument />);
      // Trigger a change in the DocumentStore
      DocumentStore.setCreatedDocument({ message: 'Document created successfully.' });
      expect(DocumentStore.getCreatedDocument()).to.be.an('object');
      expect(createDocument.state().result).to.be.a('string');
      expect(createDocument.state().result).to.eql('Success!');
    });

    it('responds correctly if the response has an error', function() {
      var createDocument = enzyme.mount(<CreateDocument />);
      // Trigger a change in the DocumentStore
      createDocument.setState({ title: 'title' })
      DocumentStore.setCreatedDocument({
        code: 11000,
        errmsg: 'Duplicate title'
      });
      expect(DocumentStore.getCreatedDocument()).to.be.an('object');
      expect(createDocument.state().result).to.be.a('string');
      expect(createDocument.state().result).to.eql('Failed!');
    });

    it('should call the create document action on click', function() {
      var mockEvent = {
        preventDefault: function() {}
      };
      sinon.stub(DocumentActions, 'createDocument').returns(true);


      sinon.spy(mockEvent, 'preventDefault');
      var createDocument = enzyme.mount(<CreateDocument />);
      createDocument.setState({
        document: {
          title: 'A time to kill',
          genre: 'crime',
          content: 'There was a lot of murder'
        },
        user: true,
        staff: true,
      })
      var inst = createDocument.instance();
      sinon.spy(inst, 'onSubmit');
      createDocument.find('button').simulate('click', mockEvent);
      expect(mockEvent.preventDefault.called).to.eql(true);
      expect(DocumentActions.createDocument.called).to.eql(true);
    });
  });
})();
