(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var sinon = require('sinon');
  var HeaderPath = '../../../../app/scripts/components/Dashboard/header.jsx';
  var browserHistory = require('react-router').browserHistory;
  var UserStore = require('../../../../app/scripts/stores/UserStore');
  var React = require('react');
  var Header = require(HeaderPath);

  describe('Header component', function() {
    window.Materialize = {};
    before(function() {
        window.Materialize.toast = sinon.spy();
    });
    it('renders the header component', function() {
      // Render Header component
      var header = enzyme.shallow(<Header />);

      // Test the header state
      expect(header.state().loggedIn).to.eql(false);
    });

    it('renders the correct content', function() {
      expect(enzyme.shallow(<Header />).text()).to.have.string('Profile');
      expect(enzyme.shallow(<Header />).text()).to.have.string('Logout');
    });

  it('renders the correct component', function() {
    expect(enzyme.shallow(<Header />).find('.nav-wrapper').length).to.eql(1);
    expect(enzyme.shallow(<Header />).find('.material-icons.tooltipped').length).to.eql(3);
    expect(enzyme.shallow(<Header />).find('.dropdown-button').length).to.eql(1);
  });

  it('calls componentDidMount', function() {
      sinon.spy(Header.prototype, 'componentDidMount');
      enzyme.mount(<Header />); // Mount the component
      expect(Header.prototype.componentDidMount.calledOnce).to.eql(true);
      Header.prototype.componentDidMount.restore();
    });

  it('calls componentWillUnmount', function() {
      sinon.spy(Header.prototype, 'componentWillUnmount');
      var header = enzyme.mount(<Header />); // Mount the component
      header.unmount();
      expect(Header.prototype.componentWillUnmount.calledOnce).to.eql(true);
      Header.prototype.componentWillUnmount.restore();
    });

  it('calls registered callbacks on mount', function() {
      sinon.spy(UserStore, 'addChangeListener');
      enzyme.mount(<Header />); // Mount the component
      expect(UserStore.addChangeListener.callCount).to.eql(2);
      UserStore.addChangeListener.restore();
    });

  it('calls the user session change listener', function() {
        sinon.spy(UserStore, 'getSession');
        enzyme.mount(<Header />); // Mount the component
        // Trigger a change in the UserStore
        UserStore.setSession({loggedIn: true});
        // The getCreatedUser function should be called
        expect(UserStore.getSession.called).to.eql(true);
        UserStore.getSession.restore();
      });

  it('calls the user logout change listener', function() {
        sinon.spy(UserStore, 'getUserLogout');
        enzyme.mount(<Header />); // Mount the component
        // Trigger a change in the UserStore
        UserStore.setUserLogout({error: 'error'});
        // The getCreatedUser function should be called
        expect(UserStore.getUserLogout.called).to.eql(true);
        UserStore.getUserLogout.restore();
      });

  it('responds correctly if user logout is valid', function() {
    sinon.stub(browserHistory, 'push').returns(true);
        sinon.spy(UserStore, 'getUserLogout');
        enzyme.mount(<Header />); // Mount the component
        // Trigger a change in the UserStore
        UserStore.setUserLogout({message: 'user logged out successfully'});
        // The getCreatedUser function should be called
        expect(UserStore.getUserLogout.called).to.eql(true);
        expect(browserHistory.push.called).to.eql(true);
        UserStore.getUserLogout.restore();
        browserHistory.push.restore();
      });

  it('responds correctly if there is error in logout', function() {
        sinon.spy(UserStore, 'getUserLogout');
        enzyme.mount(<Header />); // Mount the component
        // Trigger a change in the UserStore
        UserStore.setUserLogout({error: 'error'});
        // The getCreatedUser function should be called
        expect(UserStore.getUserLogout.called).to.eql(true);
        UserStore.getUserLogout.restore();
      });

  it('sets the correct state if the response is valid', function() {
      var header = enzyme.mount(<Header />);
        // Trigger a change in the UserStore
        UserStore.setSession({loggedIn: true});
        expect(UserStore.getSession()).to.be.an('object');
        expect(header.state().loggedIn).to.be.a('boolean');
        expect(header.state().loggedIn).to.eql(true);
      });

      it('sets the correct state if the response is invalid', function() {
        sinon.stub(browserHistory, 'push').returns(true);
        var header = enzyme.mount(<Header />);
        // Trigger a change in the UserStore
        UserStore.setSession({loggedIn: false});
        expect(UserStore.getSession()).to.be.an('object');
        expect(header.state().loggedIn).to.be.a('boolean');
        expect(header.state().loggedIn).to.eql(false);
        expect(browserHistory.push.called).to.eql(true);
        browserHistory.push.restore();
      });

    // it('should call the logout action on click', function() {
    //     var mockEvent = {
    //       preventDefault: function() {}
    //     };
    //     sinon.stub(UserActions, 'logout').returns(true);
    //     sinon.spy(mockEvent, 'preventDefault');
    //     var header = enzyme.mount(<Header />);
    //     var inst = header.instance();
    //     sinon.spy(inst, 'logout');
    //     header.find('form').simulate('submit', mockEvent);
    //     expect(mockEvent.preventDefault.called).to.eql(true);
    //     expect(UserActions.logout.called).to.eql(true);
    //     expect(inst.logout.calledOnce).to.eql(true);
    //   });
});
})();