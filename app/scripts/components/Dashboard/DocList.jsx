(function() {
  'use strict';
  var React = require('react');
  var DocList = React.createClass({
      render: function() {
        var renderDoc = function(document) {
          return (
            <div class="col s12 m12 l4" style="top: 0px;">
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <a href="https://adbeus.com/montreal/cabine-m-aeroport-international-de-montreal-de/">
                    <img width="320" height="240" src="http://lorempixel.com/600/337/nature/" class="responsive-img wp-post-image" alt={document.tile} title={document.tile}> </a>
                </div>
                <div class="card-content">
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
