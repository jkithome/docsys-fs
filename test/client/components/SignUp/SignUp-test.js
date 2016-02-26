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
    browserHistory = {};
    before(function() {
        window.Materialize.toast = sinon.spy();
        browserHistory.push = sinon.spy();
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
        sinon.spy(UserStore, 'getCreatedUser');
        enzyme.mount(<SignUp />); // Mount the component
        // Trigger a change in the UserStore
        UserStore.setCreatedUser({message: 'user created successfully'});
        // The getCreatedUser function should be called
        expect(UserStore.getCreatedUser.called).to.eql(true);
        UserStore.getCreatedUser.restore();
      });

    it('sets the correct state if the response is valid', function() {
        var signup = enzyme.mount(<SignUp />);
        // Trigger a change in the UserStore
        UserStore.setCreatedUser({message: 'user created successfully'});
        expect(UserStore.getCreatedUser()).to.be.an('object');
        expect(signup.state().result).to.be.a('string');
        expect(signup.state().result).to.eql('Success!');
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
  });
})();