(function() {
  'use strict';

  var React = require('react');

    module.exports = React.createClass({
      propTypes: {
        children: React.PropTypes.element.isRequired
      },
      render: function() {
        return (
                {this.props.children}
        );
      }
    });
})();
