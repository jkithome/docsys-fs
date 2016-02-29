(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var SignUpPath = '../../../../app/scripts/components/SignupPage/SignupPage.jsx';
  var sinon = require('sinon');
  var UserActions = require('../../../../app/scripts/actions/UserActions');
  var browserHistory = require('react-router').browserHistory;
  var UserStore = require('../../../../app/scripts/stores/UserStore');
  var React = require('react');
  var SignUp = require(SignUpPath);

  describe('SignUp', function() {
    window.Materialize = {};
    before(function() {
        window.Materialize.toast = sinon.spy();
    });
    it('renders the signup component', function() {
      // Render Dashboard page in the document
      var signup = enzyme.shallow(<SignUp />);

      // Test the orgs state
      expect(signup.state().firstname).to.eql(null);
      expect(signup.state().lastname).to.eql(null);
      expect(signup.state().username).to.eql(null);
      expect(signup.state().role).to.have.string('user');
    });

    it('renders the correct component', function() {
      expect(enzyme.mount(<SignUp />).find('.nav-wrapper').length).to.be.at.least(1);
      expect(enzyme.mount(<SignUp />).find('.row').length).to.be.at.least(7);
      expect(enzyme.mount(<SignUp />).find('.card-panel').length).to.be.at.least(1);
    });

    it('renders the correct content', function() {
      expect(enzyme.shallow(<SignUp />).text()).to.have.string('Sign Up Today');
      expect(enzyme.shallow(<SignUp />).text()).to.have.string('JOIN');
    });

    it('calls componentDidMount', function() {
      sinon.spy(SignUp.prototype, 'componentDidMount');
      enzyme.mount(<SignUp />); // Mount the component
      expect(SignUp.prototype.componentDidMount.calledOnce).to.eql(true);
      SignUp.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(SignUp.prototype, 'componentWillUnmount');
      let signup = enzyme.mount(<SignUp />); // Mount the component
      signup.unmount();
      expect(SignUp.prototype.componentWillUnmount.calledOnce).to.eql(true);
      SignUp.prototype.componentWillUnmount.restore();
    });

    it('calls registered callbacks on mount', function() {
      sinon.spy(UserStore, 'addChangeListener');
      enzyme.mount(<SignUp />); // Mount the component
      expect(UserStore.addChangeListener.callCount).to.eql(1);
      UserStore.addChangeListener.restore();
    });

    it('calls the user signup change listener', function() {
      sinon.stub(browserHistory, 'push').returns(true);
        sinon.spy(UserStore, 'getCreatedUser');
        enzyme.mount(<SignUp />); // Mount the component
        // Trigger a change in the UserStore
        UserStore.setCreatedUser({message: 'user created successfully'});
        // The getCreatedUser function should be called
        expect(browserHistory.push.called).to.eql(true);
        expect(UserStore.getCreatedUser.called).to.eql(true);
        UserStore.getCreatedUser.restore();
        browserHistory.push.restore();
      });

    it('sets the correct state if the response is valid', function() {
      sinon.stub(browserHistory, 'push').returns(true);
        var signup = enzyme.mount(<SignUp />);
        // Trigger a change in the UserStore
        UserStore.setCreatedUser({message: 'user created successfully'});
        expect(UserStore.getCreatedUser()).to.be.an('object');
        expect(browserHistory.push.called).to.eql(true);
        expect(signup.state().result).to.be.a('string');
        expect(signup.state().result).to.eql('Success!');
        browserHistory.push.restore();
      });

    it('sets the correct state if the response has an error', function() {
      var signup = enzyme.mount(<SignUp />);
      // Trigger a change in the UserStore
      UserStore.setCreatedUser({
        code: 11000,
        errmsg: 'Duplicate username'
      });
      expect(UserStore.getCreatedUser()).to.be.an('object');
      expect(signup.state().result).to.be.a('string');
      expect(signup.state().result).to.eql('Failed!');
    });

    it('should correctly handle field change', function() {
      var signup = enzyme.mount(<SignUp />);
      var event = {
        target: {
          name: 'firstname',
          value: 'katniss'
        },
        preventDefault: function() {}
      };
      var instance = signup.instance();
      sinon.spy(instance, 'handleFieldChange');
      instance.handleFieldChange(event);
      expect(signup.state()[event.target.name]).to.eql(event.target.value);
      instance.handleFieldChange.restore();
    });

    it('should correctly handle search select', function() {
      var signup = enzyme.mount(<SignUp />);
      var event = {
          value: 'content',
      };
      var instance = signup.instance();
      sinon.spy(instance, 'handleRoleSelect');
      instance.handleRoleSelect(event);
      expect(signup.state().role).to.eql(event.value);
      instance.handleRoleSelect.restore();
    });

    it('should call the signup action on click', function() {
      var mockEvent = {
        preventDefault: function() {}
      };
      sinon.stub(UserActions, 'signup').returns(true);


      sinon.spy(mockEvent, 'preventDefault');
      var signup = enzyme.mount(<SignUp />);
      signup.setState({username: 'username',
        firstname: 'firstname',
        lastname: 'lastname',
        role: 'user',
        email: 'email@email.com',
        password: 'password',
        confirmpassword: 'password'
      })
      var inst = signup.instance();
      sinon.spy(inst, 'onSubmit');
      signup.find('form').simulate('submit', mockEvent);
      expect(mockEvent.preventDefault.called).to.eql(true);
      expect(UserActions.signup.called).to.eql(true);
    });

    it('should return true if the passwords match', function() {
      var signup = enzyme.mount(<SignUp />);
      var instance = signup.instance();
      sinon.spy(instance, 'comparepswd');
      instance.comparepswd('password', 'password');
      expect(instance.comparepswd.returnValues[0]).to.eql(true);
      instance.comparepswd.restore();
    });
  });
})();