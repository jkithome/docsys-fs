(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var sinon = require('sinon');
  var UserActions = require('../../../../app/scripts/actions/UserActions');
  var browserHistory = require('react-router').browserHistory;
  var UserStore = require('../../../../app/scripts/stores/UserStore');
  var React = require('react');
  var Login = require('../../../../app/scripts/components/LoginPage/LoginPage.jsx');

  describe('Login', function() {
    window.Materialize = {};
    window.location = {};
    before(function() {
        window.Materialize.toast = sinon.spy();
        window.location.replace = sinon.spy();
    });

    it('renders the login component', function() {
      // Render Dashboard page in the document
      var login = enzyme.shallow(<Login />);

      // Test the login state
      expect(login.state().user.username).to.eql(null);
      expect(login.state().user.password).to.eql(null);
      expect(login.state().result).to.eql(null);
    });

    it('renders the correct component', function() {
      expect(enzyme.mount(<Login />).find('.container').length).to.be.at.least(1);
      expect(enzyme.mount(<Login />).find('.row').length).to.be.at.least(3);
      expect(enzyme.mount(<Login />).find('.card-panel').length).to.be.at.least(1);
    });

    it('renders the correct content', function() {
      expect(enzyme.shallow(<Login />).text()).to.have.string('WELCOME BACK');
      expect(enzyme.shallow(<Login />).text()).to.have.string('Register');
    });

    it('calls componentDidMount', function() {
      sinon.spy(Login.prototype, 'componentDidMount');
      enzyme.mount(<Login />); // Mount the component
      expect(Login.prototype.componentDidMount.calledOnce).to.eql(true);
      Login.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(Login.prototype, 'componentWillUnmount');
      var login = enzyme.mount(<Login />); // Mount the component
      login.unmount();
      expect(Login.prototype.componentWillUnmount.calledOnce).to.eql(true);
      Login.prototype.componentWillUnmount.restore();
    });

    it('calls registered callbacks on mount', function() {
      sinon.spy(UserStore, 'addChangeListener');
      enzyme.mount(<Login />); // Mount the component
      expect(UserStore.addChangeListener.callCount).to.eql(1);
      UserStore.addChangeListener.restore();
    });

    it('calls the user login change listener', function() {
      sinon.spy(UserStore, 'getData');
      enzyme.mount(<Login />); // Mount the component
      // Trigger a change in the UserStore
      UserStore.setData({
        "message": "User successfully logged in.",
        "user": {
          "_id": "56cf451bacc801dd33939b79",
          "name": {
            "first": "Jeremy",
            "last": "Kithome"
          },
          "email": "jerry@erry.com",
          "username": "Jemmy",
          "role": {
            "_id": "56cf451b09db67e133ab284d",
            "description": "Can create and view documents",
            "title": "user"
          },
        },
        token: "eyJ0eXAiOi"
      });
      // The getCreatedUser function should be called
      expect(UserStore.getData.called).to.eql(true);
      UserStore.getData.restore();
    });

    it('sets the correct state if the response is valid', function() {
      var login = enzyme.mount(<Login />);
        // Trigger a change in the UserStore
      UserStore.setData({
        "message": "User successfully logged in.",
        "user": {
          "_id": "56cf451bacc801dd33939b79",
          "name": {
            "first": "Jeremy",
            "last": "Kithome"
          },
          "email": "jerry@erry.com",
          "username": "Jemmy",
          "role": {
            "_id": "56cf451b09db67e133ab284d",
            "description": "Can create and view documents",
            "title": "user"
          },
        },
        token: "eyJ0eXAiOi"
      });
      expect(UserStore.getData()).to.be.an('object');
      expect(login.state().result).to.be.a('string');
      expect(login.state().result).to.eql('Success');
    });

    it('sets the correct state if the response has an error', function() {
      var login = enzyme.mount(<Login />);
      // Trigger a change in the UserStore
      UserStore.setData({
        error: 'error'
      });
      expect(UserStore.getData()).to.be.an('object');
      expect(login.state().result).to.be.a('string');
      expect(login.state().result).to.eql('Failed!');
    });

    it('should correctly handle field change', function() {
      var login = enzyme.mount(<Login />);
      var event = {
        target: {
          name: 'password',
          value: 'password'
        },
        preventDefault: function() {}
      };
      var instance = login.instance();
      sinon.spy(instance, 'handleFieldChange');
      instance.handleFieldChange(event);
      expect(login.state().user[event.target.name]).to.eql(event.target.value);
      instance.handleFieldChange.restore();
    });

    it('should call the login action on click', function() {
      var mockEvent = {
        preventDefault: function() {}
      };
      sinon.stub(UserActions, 'login').returns(true);
      var data = {
        username: 'jere',
        password: 'password'
      };
      var user = {
        "message": "User successfully logged in.",
        "user": {
          "_id": "56cf451bacc801dd33939b79",
          "name": {
            "first": "Jeremy",
            "last": "Kithome"
          },
          "email": "jerry@erry.com",
          "username": "Jemmy",
          "role": {
            "_id": "56cf451b09db67e133ab284d",
            "description": "Can create and view documents",
            "title": "user"
          },
          "createdAt": "2016-02-25T18:16:59.000Z",
          "updatedAt": "2016-02-25T18:17:31.419Z",
          "iat": 1456519988,
          "exp": 1456523588
        },
        "token": "eyJ"
      };
      sinon.spy(mockEvent, 'preventDefault');
      var login = enzyme.mount(<Login />);
      login.setState({user: {
        username: 'jere',
        password: 'password'
      }})
      var inst = login.instance();
      sinon.spy(inst, 'onSubmit');
      UserStore.setData(user);
      login.find('form').simulate('submit', mockEvent);
      expect(mockEvent.preventDefault.called).to.eql(true);
      expect(UserActions.login.withArgs(data).called).to.eql(true);
      expect(inst.onSubmit.calledOnce).to.eql(true);
    });
  });
})();