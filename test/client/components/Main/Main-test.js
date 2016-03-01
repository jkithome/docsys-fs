(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var MainPath = '../../../../app/scripts/components/Main/Main.jsx';
  var React = require('react');
  var Main = require(MainPath);

  describe('Main component', function() {

    it('renders the children components', function() {
      // It renders the provided child components
      var component = enzyme.shallow(<Main children={<div>'Child Component'</div>}/>);
      expect(component.contains(<div>'Child Component'</div>)).to.eql(true);
    });
  });
})();