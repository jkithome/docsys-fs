(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var sinon = require('sinon');
  var React = require('react');
  var Landing = require('../../../../app/scripts/components/LandingPage/header.jsx');

  describe('Landing component', function() {
    it('renders the correct content', function() {
      expect(enzyme.shallow(<Landing />).text()).to.have.string('The simplest way to manage your documents.');
      expect(enzyme.shallow(<Landing />).text()).to.have.string('GET STARTED');
    });

    it('renders the correct component', function() {
      expect(enzyme.shallow(<Landing />).is('#landing')).to.eql(true);
      expect(enzyme.mount(<Landing />).find('.container').length).to.eql(1);
      expect(enzyme.mount(<Landing />).find('.join-btn').length).to.eql(1);
      expect(enzyme.mount(<Landing />).find('#nav-mobile').length).to.eql(1);
    });
  });
})();