(function() {
  'use strict';
  var React = require('react');
  var Statistics = React.createClass({
      render: function() {
        var renderOrg = function(users, documents, myDocuments) {
          return (
            <div id="card-stats">
              <div className="row">
                <div className="col s12 m6 l4">
                  <div className="card">
                    <div className="card-content  green white-text">
                      <p className="card-stats-title"><i className="mdi-social-group-add"></i> Total Users</p>
                      <h4 className="card-stats-number">{users.length}</h4>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l4">
                  <div className="card">
                    <div className="card-content purple white-text">
                      <p className="card-stats-title"><i className="mdi-action-description"></i> Total Documents</p>
                      <h4 className="card-stats-number">{documents.length}</h4>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l4">
                  <div className="card">
                    <div className="card-content blue-grey white-text">
                      <p className="card-stats-title"><i className="mdi-action-description"></i> My Documents</p>
                      <h4 className="card-stats-number">{myDocuments.length}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        };
      }
});
  module.exports = Statistics;
})();
