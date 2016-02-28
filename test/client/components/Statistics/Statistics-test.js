(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var sinon = require('sinon');
  var StatisticsPath = '../../../../app/scripts/components/Dashboard/Statistics.jsx';
  var React = require('react');
  var Statistics = require(StatisticsPath);

  describe('Statistics component', function() {
    var users = [{},{},{}];
    var documents = [{},{},{}];
    var userDocuments = [{},{},{}];
  it('renders the correct content', function() {
    var statistics = enzyme.mount(<Statistics users={users} documents={documents} userDocuments={userDocuments}/>);
    expect(statistics.text()).to.have.string('Total Users');
    expect(statistics.text()).to.have.string('Total Documents');
    expect(statistics.text()).to.have.string('My Documents');
  });

  it('renders the correct component', function() {
    var statistics = enzyme.mount(<Statistics users={users} documents={documents} userDocuments={userDocuments}/>);
    expect(statistics.find('.card').length).to.be.at.least(3);
    expect(statistics.find('.card-stats-title').length).to.eql(3);
    expect(statistics.find('.row').length).to.eql(1);
  });
});
})();