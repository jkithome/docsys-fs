(function() {
  'use strict';
  var Role = require('../models/roles');
  module.exports = {
    create: function(req, res) {
      var role = new Role();
      role.title = req.body.title;
      role.description = req.body.description;

      role.save(function(err) {
        if (err) {
          if(err.code === 11000) {
              res.status(409).send(err);
            } else if(err.name === 'ValidationError') {
              res.status(400).send(err);
            } else {
              res.status(500).send(err);
            }
        } else {
          res.json({
            message: 'Role created successfully.',
            the_role: role
          });
        }
      });
    },

    all: function(req, res) {
      Role.find({}, function(err, roles) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(roles);
        }
      });
    },

    find: function(req, res) {
      Role.findById(req.params.id, function(err, role) {
        if (err) {
          res.json({
            message: 'Error fetching role.'
          });
        } else {
          res.json(role);
        }
      });
    },

    update: function(req, res) {
      Role.findById(req.params.id, function(err, role) {
        if (err) {
          res.status(500).send(err);
        } else {
          if (req.body.description) {
            role.description = req.body.description;
          }
          role.save(function(err) {
            if (err) {
              if(err.code === 11000) {
              res.status(409).send(err);
            } else if(err.name === 'ValidationError') {
              res.status(400).send(err);
            } else {
              res.status(500).send(err);
            }
            } else {
              res.json({
                message: 'Role updated successfully.'
              });
            }
          });
        }
      });
    },

    deleteOne: function(req, res) {
      Role.remove({
        _id: req.params.id
      }, function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            message: 'Role deleted successfully.'
          });
        }
      });
    }
  };
})();
