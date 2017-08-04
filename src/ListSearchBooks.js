import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';
import './ListSearchBooks.css';

export default class ListSearchBooks extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    searchPending: PropTypes.bool,
  };
  render() {
    const { query, books, onUpdateBook, searchPending } = this.props;

    let searchForContent;
    if (searchPending) {
      searchForContent = (
        <span className="no-input">
          Snagging results for <strong>"{query}"</strong> ...
        </span>
      );
    } else if (query) {
      searchForContent = (
        <span className="has-input">
          Showing
          {' '}
          <strong>{books.length}</strong>
          {' '}
          results for
          {' '}
          <strong>"{query}"</strong>
        </span>
      );
    } else {
      searchForContent = (
        <span className="no-input">
          Do some typing, find some books &nbsp;
          <span
            role="img"
            aria-label="Party popper emoji because we're excited about finding books">
            🎉
          </span>
        </span>
      );
    }

    return (
      <section className="list-search-books">
        <div className="list-search-books__heading">
          {searchForContent}
        </div>
        {!searchPending &&
          <ListBooks books={books} onUpdateBook={onUpdateBook} />}
      </section>
    );
  }
}
