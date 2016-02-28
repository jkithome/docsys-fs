(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var sinon = require('sinon');
  var StatisticsPath = '../../../../app/scripts/components/Dashboard/Statistics.jsx';
  var React = require('react');
  var Statistics = require(StatisticsPath);

  describe('Statistics component', function() {
    var users = [];
    var documents = [];
    var userDocuments = [];
  it('renders the correct content', function() {
    sinon.stub(users, 'length').returns(5);
    sinon.stub(documents, 'length').returns(30);
    sinon.stub(userDocuments, 'length').returns(2);
    var statistics = enzyme.shallow(<Statistics />);
    statistics.setProps({ users: [1,2,3], documents: [1,2,3,4], userDocuments: [1,2,3,4,5] });
    expect(statistics.is('.card-stats')).to.eql(true);
    expect(statistics.text()).to.have.string('Total Users');
    expect(statistics.text()).to.have.string('Total Documents');
    expect(statistics.text()).to.have.string('My Documents');
    users.length.restore();
    documents.length.restore();
    userDocuments.length.restore();
  });

  it('renders the correct component', function() {
    expect(enzyme.mount(<Statistics />).find('.card').length).to.be.at.least(3);
    expect(enzyme.mount(<Statistics />).find('.card-stats').length).to.eql(1);
    expect(enzyme.mount(<Statistics />).find('row').length).to.eql(1);
  });
});
})();