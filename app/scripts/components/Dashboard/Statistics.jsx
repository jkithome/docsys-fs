(function() {
  'use strict';
  var React = require('react');
  var Statistics = React.createClass({
      render: function() {
          return (
            <div id="card-stats">
              <div className="row">
                <div className="col s12 m6 l4">
                  <div className="card">
                    <div className="card-content  green white-text">
                      <p className="card-stats-title"><i className="mdi-social-group-add"></i> Total Users</p>
                      <h4 className="card-stats-number">{this.props.users.length}</h4>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l4">
                  <div className="card">
                    <div className="card-content purple white-text">
                      <p className="card-stats-title"><i className="mdi-action-description"></i> Total Documents</p>
                      <h4 className="card-stats-number">{this.props.documents.length}</h4>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l4">
                  <div className="card">
                    <div className="card-content blue-grey white-text">
                      <p className="card-stats-title"><i className="mdi-action-description"></i> My Documents</p>
                      <h4 className="card-stats-number">{this.props.userDocuments.length}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
    });
  module.exports = Statistics;
})();
