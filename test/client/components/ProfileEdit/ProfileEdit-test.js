(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var ProfileEditPath = '../../../../app/scripts/components/ProfileEdit/ProfileEdit.jsx';
  var sinon = require('sinon');
  var UserActions = require('../../../../app/scripts/actions/UserActions');
  var UserStore = require('../../../../app/scripts/stores/UserStore');
  var browserHistory = require('react-router').browserHistory;
  var React = require('react');
  var ProfileEdit = require(ProfileEditPath);

  describe('ProfileEdit', function() {
    window.Materialize = {};
    before(function() {
        window.Materialize.toast = sinon.spy();
    });
    it('renders the ProfileEdit component', function() {
      var profileEdit = enzyme.shallow(<ProfileEdit />);

      // Test the ProfileEdit state
      expect(profileEdit.state().user).to.eql(null);
      expect(profileEdit.state().firstname).to.eql(null);
      expect(profileEdit.state().lastname).to.eql(null);
    });

    it('renders the correct component', function() {
      var profileEdit = enzyme.mount(<ProfileEdit />);
      profileEdit.setState({user: {
      "_id": "56cf451bacc801dd33939b79",
      "updatedAt": "2016-02-28T08:28:38.818Z",
      "createdAt": "2016-02-25T18:16:59.000Z",
      "email": "jerry@erry.com",
      "username": "Jemmy",
      "role": "56cf451b09db67e133ab284d",
      "__v": 0,
      "loggedIn": true,
      "token": "eyJ0eX",
      "name": {
        "last": "Kithome",
        "first": "Jeremy"
      }
    }});
      expect(profileEdit.find('.row').length).to.be.at.least(8);
      expect(profileEdit.find('.card-panel').length).to.be.at.least(1);
    });

    it('renders the correct content', function() {
      expect(enzyme.shallow(<ProfileEdit />).find('.container').length).to.be.at.least(1);
      expect(enzyme.shallow(<ProfileEdit />).find('.progress').length).to.be.at.least(1);
    });

    it('calls componentDidMount', function() {
      sinon.spy(ProfileEdit.prototype, 'componentDidMount');
      enzyme.mount(<ProfileEdit />); // Mount the component
      expect(ProfileEdit.prototype.componentDidMount.calledOnce).to.eql(true);
      ProfileEdit.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(ProfileEdit.prototype, 'componentWillUnmount');
      var profileEdit = enzyme.mount(<ProfileEdit />); // Mount the component
      profileEdit.unmount();
      expect(ProfileEdit.prototype.componentWillUnmount.calledOnce).to.eql(true);
      ProfileEdit.prototype.componentWillUnmount.restore();
    });

    it('calls registered callbacks on mount', function() {
      sinon.spy(UserStore, 'addChangeListener');
      enzyme.mount(<ProfileEdit />); // Mount the component
      expect(UserStore.addChangeListener.callCount).to.be.at.least(2);
      UserStore.addChangeListener.restore();
    });

    it('calls the user get change listener', function() {
      sinon.spy(UserStore, 'getUser');
      var profileEdit = enzyme.mount(<ProfileEdit />); // Mount the component
      // Trigger a change in the UserStore
      UserStore.setUser({
        "_id": "56cf451bacc801dd33939b79",
        "updatedAt": "2016-02-28T08:28:38.818Z",
        "createdAt": "2016-02-25T18:16:59.000Z",
        "email": "jerry@erry.com",
        "username": "Jemmy",
        "role": "56cf451b09db67e133ab284d",
        "__v": 0,
        "loggedIn": true,
        "token": "eyJ0eX",
        "name": {
          "last": "Kithome",
          "first": "Jeremy"
        }
      });
      // The getUser function should be called
      expect(UserStore.getUser.called).to.eql(true);
      expect(profileEdit.state().user).to.be.a('object');
    });

    it('sets the correct state if user is updated successfully', function() {
      sinon.stub(browserHistory, 'push').returns(true);
      var profileEdit = enzyme.mount(<ProfileEdit />);
      // Trigger a change in the UserStore
      UserStore.setUserEdit({message: 'User updated succesfully.'});
      expect(UserStore.getUserEdit()).to.be.an('object');
      expect(profileEdit.state().result).to.be.a('string');
      expect(profileEdit.state().result).to.eql('Success!');
      expect(browserHistory.push.called).to.eql(true);
      browserHistory.push.restore();
    });

    it('sets the correct state if user is not updated successfully', function() {
      var profileEdit = enzyme.mount(<ProfileEdit />);
      profileEdit.setState({username: 'username'})
      // Trigger a change in the UserStore
      UserStore.setUserEdit({
        code: 11000,
        errmsg: 'Duplicate username'
      });
      expect(UserStore.getUserEdit()).to.be.an('object');
      expect(profileEdit.state().result).to.be.a('string');
      expect(profileEdit.state().result).to.eql('Failed!');
    });

    it('should correctly handle field change', function() {
      var profileEdit = enzyme.mount(<ProfileEdit />);
      var event = {
        target: {
          name: 'firstname',
          value: 'firstname'
        },
        preventDefault: function() {}
      };
      var instance = profileEdit.instance();
      sinon.spy(instance, 'handleFieldChange');
      instance.handleFieldChange(event);
      expect(profileEdit.state()[event.target.name]).to.eql(event.target.value);
      instance.handleFieldChange.restore();
    });

    it('should correctly handle search select', function() {
      var profileEdit = enzyme.mount(<ProfileEdit />);
      var event = {
          value: 'admin'
      };
      var instance = profileEdit.instance();
      sinon.spy(instance, 'handleRoleSelect');
      instance.handleRoleSelect(event);
      expect(profileEdit.state().role).to.eql(event.value);
      instance.handleRoleSelect.restore();
    });

    it('should call the profileEdit action on click', function() {
      var mockEvent = {
        preventDefault: function() {}
      };
      sinon.stub(UserActions, 'editUser').returns(true);


      sinon.spy(mockEvent, 'preventDefault');
      var profileEdit = enzyme.mount(<ProfileEdit />);
      profileEdit.setState({user :{
        "_id": "56cf451bacc801dd33939b79",
        "updatedAt": "2016-02-28T08:28:38.818Z",
        "createdAt": "2016-02-25T18:16:59.000Z",
        "email": "jerry@erry.com",
        "username": "Jemmy",
        "role": "56cf451b09db67e133ab284d",
        "__v": 0,
        "loggedIn": true,
        "token": "eyJ0eX",
        "name": {
          "last": "Kithome",
          "first": "Jeremy"
        }
      }});
      profileEdit.setState({password:'password'});
      profileEdit.setState({confirmpassword:'password'})
      var inst = profileEdit.instance();
      sinon.spy(inst, 'onSubmit');
      profileEdit.find('#submit').simulate('click', mockEvent);
      expect(mockEvent.preventDefault.called).to.eql(true);
      expect(UserActions.editUser.called).to.eql(true);
      UserActions.editUser.restore();
    });

    it('should call the profileEdit action on click', function() {
      sinon.stub(browserHistory, 'push').returns(true);
      var mockEvent = {
        preventDefault: function() {}
      };
      sinon.spy(mockEvent, 'preventDefault');
      var profileEdit = enzyme.mount(<ProfileEdit />);
      profileEdit.setState({user :{
        "_id": "56cf451bacc801dd33939b79",
        "updatedAt": "2016-02-28T08:28:38.818Z",
        "createdAt": "2016-02-25T18:16:59.000Z",
        "email": "jerry@erry.com",
        "username": "Jemmy",
        "role": "56cf451b09db67e133ab284d",
        "__v": 0,
        "loggedIn": true,
        "token": "eyJ0eX",
        "name": {
          "last": "Kithome",
          "first": "Jeremy"
        }
      }});
      var inst = profileEdit.instance();
      sinon.spy(inst, 'onCancel');
      profileEdit.find('#cancel').simulate('click', mockEvent);
      expect(mockEvent.preventDefault.called).to.eql(true);
      expect(browserHistory.push.called).to.eql(true);
      browserHistory.push.restore();
    });

    it('should return true if the passwords match', function() {
      var profileEdit = enzyme.mount(<ProfileEdit />);
      var instance = profileEdit.instance();
      sinon.spy(instance, 'comparepswd');
      instance.comparepswd('password', 'password');
      expect(instance.comparepswd.returnValues[0]).to.eql(true);
      instance.comparepswd.restore();
    });
  });
})();