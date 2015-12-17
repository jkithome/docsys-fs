(function() {
  'use strict';
  var Role = require('../models/roles');
  module.exports = {
    all: function(req, res) {
      Role.find({}, function(err, roles) {
        if (err) {
          res.send(err);
        } else {
          res.json(roles);
        }
      });
    },

    create: function(req, res) {
      var role = new Role();
      role.title = req.body.title;

      role.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.json({
            message: 'Role created successfully.'
          });
        }
      });
    },
  };
})();
