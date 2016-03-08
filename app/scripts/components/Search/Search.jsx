(function() {
  'use strict';
  var React = require('react');
  var DocumentStore = require('../../stores/DocumentStore'),
    DocumentActions = require('../../actions/DocumentActions'),
    Select = require('react-select'),
    Header = require('../Dashboard/header.jsx'),
    DocList = require('../Dashboard/DocList.jsx'),

    Search = React.createClass({
    getInitialState: function() {
      return {
        documents: null,
        search: 'genre',
        term: null,
        date: null,
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
          var date = (this.state.date).split(/[\-]/),
              year = parseInt(date[0]),
              month = parseInt(date[1]),
              day = parseInt(date[2]),
              limit = this.state.limit ? this.state.limit : 0;
              console.log(date);
          DocumentActions.search({
            year: year,
            month: month,
            date: day
          }, limit, token);
        } else if(this.state.search === 'genre') {
          var limit = this.state.limit? this.state.limit: 0;
          DocumentActions.search({
            genre: this.state.term
          }, limit, token);
        } else if(this.state.search === 'content') {
          var limit = this.state.limit? this.state.limit: 0;
          DocumentActions.search({
            search: this.state.term
          }, limit, token);
        }
      },

    render: function() {
      return (
        <div>
          <Header/>
          <div className="container">
            <div className="section section-title">
              <h5 className="white-text shadow">SEARCH DOCUMENTS</h5>
            </div>
            <div className="card-panel">
              <div className="row">
                <form className="col s12 m12 l12">
                  <div className="col s12 m6 l3 ">
                    <Select
                      name="search"
                      onChange={this.handleSearchSelect}
                      options={this.state.searches}
                      placeholder="Select Query Type"
                      value={this.state.search}
                      style={{marginTop: 20}}
                    />
                  </div>
                  {(this.state.search === 'genre' || this.state.search === 'content') ?
                    <div className="input-field col s12 m6 l3">
                      <input name="term" id="term" type="text" className="validate white green-text  search-box" onChange={this.handleFieldChange} required />
                      <label className="label-text" htmlFor="term">Search term</label>
                    </div>
                    :
                    <div className="input-field col s12 m6 l3">
                      <input name="date" id="date" type="date" className="datepicker  white green-text search-box" onChange={this.handleFieldChange} required />
                    </div>
                  }
                  <div className="input-field col s12 m6 l3">
                    <input name="limit" id="limit" type="number" min="1" className="validate white green-text search-box" onChange={this.handleFieldChange} required />
                    <label className="label-text" htmlFor="limit">Result limit</label>
                  </div>
                  <div className="col s12 m6 l3  search-btn">
                    <button id="search" className="btn waves-effect waves-light search" onClick={this.onSubmit} style={{marginTop: 20, marginRight: 10}}>SEARCH
                      <i className="material-icons right">search</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div>
              {this.state.documents
                ?(this.state.documents.length !== 0)
                ? <div>
                    <div className="section section-title">
                      <h5 className="white-text shadow">RESULTS</h5>
                    </div>
                    <div className="row isotope" style={{position: 'relative'}}>
                      <DocList documents={this.state.documents} />
                    </div>
                  </div>
                : <h3 className="white-text shadow center result-text">No documents found.</h3>
                : <div></div>
              }
            </div>
          </div>
        </div>
      );
    }
  });
  module.exports = Search;
})();
