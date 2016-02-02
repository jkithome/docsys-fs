(function() {
  'use strict';

  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var request = require('superagent');

  module.exports = {
    get: function(url, actionType) {
      request
        .get(url)
        .end(function(err, res) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: res.body
          });
        });
    },

    delete: function(url, data, actionType) {
      request
        .delete(url)
        .send(data || {})
        .end(function(err, res) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: res.body
          });
        });
    },

    put: function(url, data, actionType) {
      request
        .put(url)
        .send(data)
        .end(function(err, res) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: res.body
          });
        });
    },

    post: function(url, data, actionType) {
      request
        .post(url)
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
