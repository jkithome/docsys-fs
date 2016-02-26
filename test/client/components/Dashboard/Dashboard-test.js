(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var DashboardPath = '../../../../app/scripts/components/Dashboard/index.jsx';
  var Header = '../../../../app/scripts/components/Dashboard/header.jsx';
  var React = require('react');
  var Dashboard = require(DashboardPath);

  describe('Dashboard', function() {
    it('renders the Dashboard component', function() {
      // Render Dashboard page in the document
      var dashboard = enzyme.shallow(<Dashboard />);

      // Test the orgs state
      expect(dashboard.state().users).to.eql(null);
      expect(dashboard.state().documents).to.eql(null);
      expect(dashboard.state().userDocuments).to.eql(null);
      expect(dashboard.state().byUserDocuments).to.eql(null);
    });
  });
})();