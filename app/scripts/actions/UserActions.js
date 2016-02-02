(function() {
  'use strict';
  var DocsysConstants = require('../constants/DocsysConstants'),
    BaseActions = require('./BaseActions');

  module.exports = {
    signup: function(user) {
      BaseActions.post('/api/users/create', user, DocsysConstants.USER_SIGNUP);
    }
  };
})();
