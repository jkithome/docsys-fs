(function() {
  'use strict';
  var React = require('react');
  var DocList = React.createClass({
      render: function() {
        var renderDoc = function(document) {
          return (
            <div className="col s12 m12 l4" style="top: 0px;">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <a href={'/docs/' + document.id}><p>{document.title}">
                    <img width="320" height="240" src="http://lorempixel.com/600/337/nature/" className="responsive-img wp-post-image" alt={document.tile} title={document.tile}> </a>
                </div>
                <div className="card-content">
                  <a href={'/docs/' + document.id}><p>{document.title}</p></a>
                  <p>{'document.name.first' + ' ' + 'document.name.last'}</p>
                  <p>Genre</p>
                  <p>Created</p>
                </div>
              </div>
            </div>
          );
        };
        return (<div>{this.props.documents.map(renderDoc)}</div>);
      }
});
  module.exports = DocList;
})();
