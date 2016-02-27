(function() {
  'use strict';
  var React = require('react');
  var DocumentStore = require('../../stores/DocumentStore'),
    DocumentActions = require('../../actions/DocumentActions'),
    CreateDocument = require('../Dashboard/CreateDocument.jsx'),
    Select = require('react-select'),
    Header = require('../Dashboard/header.jsx'),
    DocList = require('../Dashboard/DocList.jsx'),

    Search = React.createClass({
    getInitialState: function() {
      return {
        documents: null,
        search: 'genre',
        term: null,
        limit: null,
        searches: [
            { value: 'genre', label: 'genre' },
            { value: 'content', label: 'content' },
            { value: 'date',  label: 'date' }
          ],
      };
    },

    componentDidMount: function() {
      DocumentStore.addChangeListener(this.populateDocuments, 'search');
    },

    componentWillUnmount() {
      DocumentStore.removeChangeListener(this.populateDocuments, 'search');
    },

    handleSearchSelect: function(event) {
        this.setState({search: event.value});
    },

    populateDocuments: function() {
      var data = DocumentStore.getSearchedDocuments();
      this.setState({ documents: data });
    },

    handleFieldChange: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      this.setState({[field] : value});
    },

    onSubmit: function(event) {
        event.preventDefault();
        var token = localStorage.getItem('x-access-token');
        if(this.state.search === 'date') {
          var date = (this.state.term).split(/[\/?\.]/),
              day = parseInt(date[0]),
              month = parseInt(date[1]),
              year = parseInt(date[2]),
              limit = this.state.limit ? this.state.limit : 0;
              console.log(date);
          DocumentActions.dateSearch(day, month, year, limit, token);
        } else if(this.state.search === 'genre') {
          var limit = this.state.limit? this.state.limit: 0;
          DocumentActions.genreSearch(this.state.term, limit, token);
        } else if(this.state.search === 'content') {
          var limit = this.state.limit? this.state.limit: 0;
          DocumentActions.contentSearch(this.state.term, limit, token);
        }
      },

    render: function() {
      return (
        <div>
          <Header/>
          <div className="container">
            <CreateDocument/>
            <div className="section">
              <h5 className="white-text">SEARCH DOCUMENTS</h5>
            </div>
            <div className="divider"></div>
            <div className="card-panel">
              <div className="row">
                <form className="col s12" onSubmit={this.onSubmit}>
                  <div className="input-field col s4">
                    <Select
                      name="search"
                      onChange={this.handleSearchSelect}
                      options={this.state.searches}
                      placeholder="Select Query Type"
                      value={this.state.search}
                    />
                  </div>
                  <div className="input-field col s4">
                    <input name="term" id="term" type="text" className="validate" onChange={this.handleFieldChange} required />
                    <label htmlFor="term">Search term or date(DD/MM/YYYY)</label>
                  </div>
                  <div className="input-field col s4">
                    <input name="limit" id="limit" type="number" min="1" className="validate" onChange={this.handleFieldChange} required />
                    <label htmlFor="limit">Result limit</label>
                  </div>
                  <div className="center-btn">
                    <button className="btn waves-effect waves-light" type="submit" name="action">SEARCH
                      <i className="material-icons right">search</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="divider"></div>
            <div className="section">
              <h5 className="white-text">RESULTS</h5>
            </div>
            <div className="divider"></div>
            <div className="row isotope" style={{position: 'relative'}}>{this.state.documents
                ? (this.state.documents.length !== 0)
                ? <DocList documents={this.state.documents} />
                : <h1>No documents found.</h1>
                : <div className="progress">
                    <div className="indeterminate"></div>
                </div>}</div>
          </div>
        </div>
      );
    }
  });
  module.exports = Search;
})();
