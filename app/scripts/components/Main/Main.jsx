(function() {
  'use strict';

  var React = require('react');

    Main = React.createClass({
      propTypes: {
        children: React.PropTypes.element.isRequired
      },
      render: function() {
        return (
                <div>{this.props.children}</div>
        );
      }
    });
  module.exports = Main;
})();
