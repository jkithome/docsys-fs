(function() {
  'use strict';
  var React = require('react'),
    moment = require('moment'),
    DocList = React.createClass({
      render: function() {
        var renderDoc = function(document) {
          {var date = moment(document.createdAt).format('Do MMMM YYYY');}
          return (
            <div className="col s12 m12 l4" style={{top: '0px'}} key={document._id}>
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <a href={'/docs/' + document._id}>
                    <img width="320" height="240" src={"../../images/image" + Math.ceil(Math.random() * 10) + ".jpg"} className=" wp-post-image" alt={document.title} title={document.title} /> </a>
                </div>
                <div className="card-content">
                  <a href={'/docs/' + document._id}><p className="teal-text card-heading">{document.title}</p></a>
                  <p className="genre-text">Genre: {document.genre}</p>
                  <p>{document.owner.name.first} {document.owner.name.last}</p>
                  <p className="date-text">{date}</p>
                </div>
              </div>
            </div>
          );
        };
        return (<div>{this.props.documents ? (this.props.documents.length !== 0
                        ? this.props.documents.map(renderDoc)
                        : <h2 className="white-text shadow center result-text">No documents available.</h2>) :
       <h2 className="white-text shadow center result-text">No documents available.</h2>}</div>);
      }
    });
  module.exports = DocList;
})();
