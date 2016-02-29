(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var ProfilePath = '../../../../app/scripts/components/Profile/Profile.jsx';
  var sinon = require('sinon');
  var UserActions = require('../../../../app/scripts/actions/UserActions');
  var browserHistory = require('react-router').browserHistory;
  var UserStore = require('../../../../app/scripts/stores/UserStore');
  var React = require('react');
  var Profile = require(ProfilePath);

  describe('Profile', function() {
    window.Materialize = {};

    before(function() {
      window.Materialize.toast = sinon.spy();
      var user = {
      _id: "56cf451bacc801dd33939b79",
      name: {
        first: "Jeremy",
        last: "Kithome"
      },
      email: "jerry@erry.com",
      username: "Jemmy",
      role: {
        _id: "56cf451b09db67e133ab284d",
        description: "Can create and view documents",
        title: "user"
      },
      createdAt: "2016-02-25T18:16:59.000Z",
      updatedAt: "2016-02-25T18:17:31.419Z",
      iat: 1456519988,
      exp: 1456523588
    };
      var storage = sinon.stub(localStorage, 'getItem');
      storage.withArgs('user').returns({"_id":"56cf451bacc801dd33939b79","name":{"first":"Jeremy","last":"Kithome"},"email":"jerry@erry.com","username":"Jemmy","role":{"_id":"56cf451b09db67e133ab284d","description":"Can create and view documents","title":"user"},"createdAt":"2016-02-25T18:16:59.000Z","updatedAt":"2016-02-26T20:53:08.387Z","iat":1456594454,"exp":1456598054});
      storage.withArgs('x-access-token').returns('faketoken');
    });

    after(function() {
      localStorage.getItem.restore();
    });

    it('renders the profile component', function() {
      // Render Dashboard page in the document
      var profile = enzyme.shallow(<Profile />);

      expect(profile.state().user).to.eql(null);
    });

    it('renders the correct component', function() {
      var profile = enzyme.mount(<Profile />);
        profile.setState({user: {
        _id: "56cf451bacc801dd33939b79",
        name: {
          first: "Jeremy",
          last: "Kithome"
        },
        email: "jerry@erry.com",
        username: "Jemmy",
        role: {
          _id: "56cf451b09db67e133ab284d",
          description: "Can create and view documents",
          title: "user"
        },
        createdAt: "2016-02-25T18:16:59.000Z",
        updatedAt: "2016-02-25T18:17:31.419Z",
        iat: 1456519988,
        exp: 1456523588
      }})
      expect(profile.find('.row').length).to.be.at.least(4);
      expect(profile.find('.card-panel').length).to.be.at.least(0);
    });


    it('calls componentDidMount', function() {
      sinon.spy(Profile.prototype, 'componentDidMount');
      enzyme.mount(<Profile />); // Mount the component
      expect(Profile.prototype.componentDidMount.calledOnce).to.eql(true);
      Profile.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(Profile.prototype, 'componentWillUnmount');
      var profile = enzyme.mount(<Profile />); // Mount the component
      profile.unmount();
      expect(Profile.prototype.componentWillUnmount.calledOnce).to.eql(true);
      Profile.prototype.componentWillUnmount.restore();
    });

    it('calls registered callbacks on mount', function() {
      sinon.spy(UserStore, 'addChangeListener');
      enzyme.mount(<Profile />); // Mount the component
      expect(UserStore.addChangeListener.called).to.eql(true);
      UserStore.addChangeListener.restore();
    });

    it('calls the user get change listener', function() {
      sinon.spy(UserStore, 'getUser');
      enzyme.mount(<Profile />); // Mount the component
      // Trigger a change in the UserStore
      UserStore.setUser({
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
      });
      // The populateUser function should be called
      expect(UserStore.getUser.called).to.eql(true);
      UserStore.getUser.restore();
    });

    it('sets the correct state if the response is valid', function() {
      var profile = enzyme.mount(<Profile />);
      // Trigger a change in the UserStore
      UserStore.setUser({
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
      });
      expect(UserStore.getUser()).to.be.an('object');
      expect(profile.state().user).to.be.an('object');
    });

    it('redirects to profile edit page when edit button is clicked', function() {
      var mockEvent = {
          preventDefault: function() {}
        };
        sinon.stub(browserHistory, 'push').returns(true);
        sinon.spy(mockEvent, 'preventDefault');
      var profile = enzyme.mount(<Profile />);
      profile.setState({user: {
        _id: "56cf451bacc801dd33939b79",
        name: {
          first: "Jeremy",
          last: "Kithome"
        },
        email: "jerry@erry.com",
        username: "Jemmy",
        role: {
          _id: "56cf451b09db67e133ab284d",
          description: "Can create and view documents",
          title: "user"
        },
        createdAt: "2016-02-25T18:16:59.000Z",
        updatedAt: "2016-02-25T18:17:31.419Z",
        iat: 1456519988,
        exp: 1456523588
      }})
      var inst = profile.instance();
      sinon.spy(inst, 'handleClick');
      profile.find('#update').simulate('click', mockEvent);
      expect(mockEvent.preventDefault.called).to.eql(true);
      expect(browserHistory.push.called).to.eql(true);
      browserHistory.push.restore();
    });
  });
})();