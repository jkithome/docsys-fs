(function() {
  'use strict';
  var Document = require('../models/documents');
  var User = require('../models/users');
  var Roles = require('../models/roles');
  var async = require('async');
  var roleFind = function(aRole, callback) {
    Roles.findOne({
      title: aRole
    }, function(err, role) {
      if (err) {
        res.status(500).send(err);
      } else {
        return callback(null, role._id);
      }
    });
  };

  var accessRights = function(req, document, res, callback) {
    var granted = (req.body.access).trim().replace(/\s/g, '').split(',');
    async.map(granted, roleFind, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else {
        document.access = results;
        callback();
      }
    });
  };

  module.exports = {

    create: function(req, res) {
      var document = new Document();

      var saveDocument = function() {
        document.title = req.body.title;
        document.content = req.body.content;
        document.owner = req.decoded._id;
        document.genre = req.body.genre;

        document.save(function(err) {
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
              message: 'Document created successfully.',
              doc: document
            });
          }
        });
      };

      if (req.body.access) {
        accessRights(req, document, res, saveDocument);
      } else {
        var defaultRoles = ['user', 'admin', 'staff'];
        async.map(defaultRoles, roleFind, function(err, results) {
          if (err) {
            res.status(500).send(err);
          } else {
            document.access = results;
            saveDocument();
          }
        });
      }
    },

    update: function(req, res) {
      Document.findById(req.params.id, function(err, document) {
        if (err) {
          res.status(500).send(err);
        } else {
          if (req.decoded._id === document.owner.toString() ||
            (document.access.indexOf(req.decoded.role._id) !== -1 &&
              (req.decoded.role.title === 'staff' || req.decoded.role.title === 'admin'))) {
            var saveDocument = function() {
              if (req.body.title) {
                document.title = req.body.title;
              }
              if (req.body.content) {
                document.content = req.body.content;
              }
              if (req.body.genre) {
                document.genre = req.body.genre;
              }

              document.save(function(err) {
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
                    message: 'Document updated successfully.'
                  });
                }
              });
            };

            if (req.body.access) {
              accessRights(req, document, res, saveDocument);
            } else {
              saveDocument();
            }
          } else {
            res.status(403).json({
              message: 'You are not allowed to update this document!'
            });
          }
        }
      });
    },

    deleteOne: function(req, res) {
      Document.findById(req.params.id, function(err, document) {
        if (err) {
          res.status(500).send(err);
        } else {
          // data exists, remove it.
          if (req.decoded._id === document.owner.toString() ||
            (document.access.indexOf(req.decoded.role._id) !== -1 && req.decoded.role.title === 'admin')) {
            document.remove({
              _id: req.params.id
            }, function(err) {
              if (err) {
                res.status(500).send(err);
              } else {
                res.json({
                  'message': 'Document deleted successfully.'
                });
              }
            });
          } else {
            res.status(403).json({
              message: 'You are not allowed to delete this document!'
            });
          }
        }
      });
    },

    // Return all documents.
    all: function(req, res) {
      var genre = req.query.genre,
        search = req.query.search,
        role = req.query.role,
        year = req.query.year,
        month = req.query.month,
        date = req.query.date,
        start,
        end;

      var $query = {};

      if(genre) {
        $query.genre = new RegExp(genre, 'gi');
      }
      if(search) {
        $query.content = {
          $regex: new RegExp(search, 'gi')
        }
      }
      if(year && month && date) {
        start = new Date(year, (month - 1), date);
        end = new Date(start.getTime() + (24 * 60 * 60 * 1000));
        $query.createdAt = {
          $gte: start,
          $lt: end
        }
      }


      if(role) {
        Roles.findOne({
          title: role
        }, function(err, roleO) {
          if (err) {
            res.status(500).send(err);
          } else {
            var roleId = roleO._id;
            // Find all documents with the role id in access field.
            Document.find({
              access: roleId
            }, function(err, documents) {
              if (err) {
                res.json(err);
              } else {
                res.json(documents);
              }
            })
            .populate('owner')
            .limit(req.query.limit);
          }
        });
      } else {
          Document
            .find($query, function(err, documents) {
              if (err) {
                res.status(500).send(err);
              } else {
                res.json(documents);
              }
            })
            // Populate the owner field
            .populate('owner')
            // Return only a given number
            .limit(req.query.limit)
            // By latest created
            .sort({
              createdAt: -1
            });
        }
    },

    // Find a single document
    find: function(req, res) {
      Document.findById(req.params.id, function(err, document) {
        if (err) {
          res.status(500).send(err);
        } else {
          if ((req.decoded._id === document.owner.toString()) || (document.access.indexOf(req.decoded.role._id) !== -1)) {
            res.json(document);
          } else {
            res.status(403).json({
              message: 'You are not allowed to access this document!'
            });
          }
        }
      })
      .populate('owner');
    },

    allByUser: function(req, res) {
      var userId = req.params.id;
      User.findById(userId, function(err, user) {
        if (err) {
          res.status(500).send(err);
        } else {
          var userRole = user.role;
          // Find documents the users owns or can access.
          Document.find({
            $or: [{
              owner: userId
            }, {
              access: userRole
            }]
          }, function(err, documents) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json(documents);
            }
          })
          .populate('owner')
          .limit(req.query.limit)
          .sort({
            createdAt: -1
          });
        }
      });
    },

    allUserCreated: function(req, res) {
      var userId = req.params.id;
      Document.find({
        owner: userId
      }, function(err, documents) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(documents);
        }
      })
      .populate('owner')
      .limit(req.query.limit)
      .sort({
          createdAt: -1
        });
    }
  };
})();
