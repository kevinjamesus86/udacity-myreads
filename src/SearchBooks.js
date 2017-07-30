import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import './SearchBooks.css';

export default class SearchBooks extends Component {
  static propTypes = {
    query: PropTypes.string
  };
  state = {
    books: []
  };
  findBooks = query => {
    if (query) {
      BooksAPI.search(query, 15).then(books => {
        this.setState({
          books: books.error ? [] : books
        });
      });
    } else {
      this.setState({
        books: []
      });
    }
  };
  componentDidMount() {
    this.findBooks(this.props.query);
  }
  componentWillReceiveProps({query}) {
    if (this.props.query !== query) {
      this.findBooks(query);
    }
  }
  render() {
    const {query} = this.props;
    const {books} = this.state;

    let searchForContent;
    if (query) {
      searchForContent = (
        <span className="has-input">
          Showing <strong>{books.length}</strong> results for <strong>"{query}"</strong>
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
      <section className="search-books">
        <div className="search-for">
          {searchForContent}
        </div>
        <ListBooks
          books={books}
        />
      </section>
    );
  }
}
