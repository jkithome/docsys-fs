(function() {
  'use strict';

  var EventEmitter = require('events').EventEmitter;
  var assign = require('object-assign');

  var BaseStore = assign({}, EventEmitter.prototype, {
    data: null,
    setData: function(data) {
      this.data = data;
      this.emitChange('login');
    },

    getData: function() {
      return this.data;
    },

    emitChange: function(event) {
      event ? this.emit(event) : this.emit('change');
    },

    addChangeListener: function(callback, event) {
      event ? this.on(event, callback) : this.on('change', callback);
    },

    removeChangeListener: function(callback, event) {
      event ? this.removeListener(event, callback) :
      this.removeListener('change', callback);
    }
  });

  module.exports = BaseStore;

})();
