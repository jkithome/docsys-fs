(function() {
  'use strict';

  var expect = require('chai').expect;
  var enzyme = require('enzyme');
  var sinon = require('sinon');
  var DocumentStore = require('../../../../app/scripts/stores/DocumentStore');
  var DocumentActions = require('../../../../app/scripts/actions/DocumentActions');
  var React = require('react');
  var Search = require('../../../../app/scripts/components/Search/Search.jsx');

  describe('Search component', function() {
    it('renders the correct content', function() {
      expect(enzyme.shallow(<Search />).text()).to.have.string('SEARCH DOCUMENTS');
      expect(enzyme.shallow(<Search />).text()).to.have.string('RESULTS');
    });

    it('has correct initial states', function() {
      var search = enzyme.shallow(<Search />);
      expect(search.state().documents).to.eql(null);
      expect(search.state().search).to.have.string('genre');
      expect(search.state().term).to.eql(null);
      expect(search.state().limit).to.eql(null);
    });

    it('renders the correct component', function() {
      expect(enzyme.mount(<Search />).find('.container').length).to.be.at.least(1);
      expect(enzyme.mount(<Search />).find('.divider').length).to.be.at.least(3);
      expect(enzyme.mount(<Search />).find('.card-panel').length).to.be.at.least(1);
    });

    it('calls componentDidMount', function() {
      sinon.spy(Search.prototype, 'componentDidMount');
      enzyme.mount(<Search />); // Mount the component
      expect(Search.prototype.componentDidMount.calledOnce).to.eql(true);
      Search.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', function() {
      sinon.spy(Search.prototype, 'componentWillUnmount');
      var search = enzyme.mount(<Search />); // Mount the component
      search.unmount();
      expect(Search.prototype.componentWillUnmount.calledOnce).to.eql(true);
      Search.prototype.componentWillUnmount.restore();
    });

    it('calls the document search change listener', function() {
      sinon.spy(DocumentStore, 'getSearchedDocuments');
      enzyme.mount(<Search />); // Mount the component
      // Trigger a change in the DocumentStore
      DocumentStore.setSearchedDocumentsGenre([{
        _id: "56cf4520acc801dd33939b95",
        updatedAt: "2016-02-25T18:17:04.000Z",
        createdAt: "2016-02-25T18:17:04.000Z",
        genre: "Fantasy",
        owner: {
          _id: "56cf451bacc801dd33939b79",
          updatedAt: "2016-02-25T18:17:31.419Z",
          createdAt: "2016-02-25T18:16:59.000Z",
          email: "jerry@erry.com",
          username: "Jemmy",
          role: "56cf451b09db67e133ab284d",
          __v: 0,
          name: {
            last: "Kithome",
            first: "Jeremy"
          }
        },
        content: "30 years after the defeat of the Galactic Empire, a new threat rises. The First Order attempts to rule the galaxy and only a ragtag group of Heroes can stop them, along with the help of the Resistance.",
        title: "Star Wars: The Force Awakens",
        __v: 0,
        access: [
          "56cf451b09db67e133ab284d",
          "56cf451b09db67e133ab284f",
          "56cf451b09db67e133ab284e"
          ]
        }
      ]);
      // The getSearchedDocuments function should be called
      expect(DocumentStore.getSearchedDocuments.called).to.eql(true);
      DocumentStore.getSearchedDocuments.restore();
    });

    it('should correctly handle field change', function() {
      var search = enzyme.mount(<Search />);
      var event = {
        target: {
          name: 'term',
          value: 'katniss'
        },
        preventDefault: function() {}
      };
      var instance = search.instance();
      sinon.spy(instance, 'handleFieldChange');
      instance.handleFieldChange(event);
      expect(search.state()[event.target.name]).to.eql(event.target.value);
      instance.handleFieldChange.restore();
    });

    it('should correctly handle search select', function() {
      var search = enzyme.mount(<Search />);
      var event = {
          value: 'content',
      };
      var instance = search.instance();
      sinon.spy(instance, 'handleSearchSelect');
      instance.handleSearchSelect(event);
      expect(search.state().search).to.eql(event.value);
      instance.handleSearchSelect.restore();
    });
    it('should call document search action on click', function() {
      var mockEvent = {
        preventDefault: function() {}
      };
      sinon.stub(DocumentActions, 'genreSearch').returns(true);
      sinon.spy(mockEvent, 'preventDefault');
      var search = enzyme.mount(<Search />);
      search.setState({search: 'genre',
        term: 'katniss',
        limit: 100
      });
      var inst = search.instance();
      sinon.spy(inst, 'onSubmit');
      search.find('#search').simulate('click', mockEvent);
      expect(mockEvent.preventDefault.called).to.eql(true);
      expect(DocumentActions.genreSearch.called).to.eql(true);
    })
  });
})();