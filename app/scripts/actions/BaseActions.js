(function() {
  'use strict';

  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var request = require('superagent');

  module.exports = {
    get: function(url, actionType, token) {
      request
        .get(url)
        .set('x-access-token', token)
        .end(function(err, res) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: res.body
          });
        });
    },

    delete: function(url, data, actionType, token) {
      request
        .delete(url)
        .set('x-access-token', token)
        .send(data || {})
        .end(function(err, res) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: res.body
          });
        });
    },

    put: function(url, data, actionType, token) {
      request
        .put(url)
        .set('x-access-token', token)
        .send(data)
        .end(function(err, res) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: res.body
          });
        });
    },

    post: function(url, data, actionType, token) {
      request
        .post(url)
        .set('x-access-token', token)
        .send(data)
        .end(function(err, res) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: res.body
          });
        });
    }
  };

})();
