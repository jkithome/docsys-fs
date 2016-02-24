(function() {
  'use strict';
  var React = require('react');
  var DocumentStore = require('../../stores/DocumentStore'),
    DocumentActions = require('../../actions/DocumentActions'),
    Header = require('../Dashboard/header.jsx'),
    CreateDocument = require('../Dashboard/CreateDocument.jsx'),
    DocumentCard = require('./DocumentCard.jsx'),

    DocumentView = React.createClass({
    getInitialState: function() {
      return {
        document: null,
      };
    },

    componentDidMount: function() {
      DocumentActions.getDocument(this.props.params.docId);
      DocumentStore.addChangeListener(this.populateDocument, 'document');
    },

    populateDocument: function() {
      var data = DocumentStore.getDocument();
      this.setState({ document: data });
    },

    render: function() {
      return (
        <div>
          <Header/>
          <CreateDocument/>
          {
            this.state.document ?
              <DocumentCard document={this.state.document}/>
              : <p>Loadin...</p>
          }
        </div>
      );
    }
  });
  module.exports = DocumentView;
})();
